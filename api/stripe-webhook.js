// Vercel serverless function: Stripe calls this when a card is authorized.
// It forwards the booking to your lead webhook (GoHighLevel, Zapier, Make)
// so you get the text and the contact is created, and it emails nothing
// itself.
//
// Environment variables:
//   STRIPE_SECRET_KEY       same key as create-checkout.js
//   STRIPE_WEBHOOK_SECRET   whsec_... from Stripe > Developers > Webhooks
//                           (endpoint: https://<your domain>/api/stripe-webhook,
//                            event: checkout.session.completed)
//   BOOKING_WEBHOOK_URL     the GoHighLevel/Zapier inbound webhook for booked jobs

const Stripe = require("stripe");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    const raw = await readRaw(req);
    event = stripe.webhooks.constructEvent(raw, req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).send(`Webhook signature failed: ${e.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const m = s.metadata || {};
    const booking = Object.assign({}, m, {
      status: "card_authorized",
      email: s.customer_details && s.customer_details.email,
      amount_authorized: (s.amount_total || 0) / 100,
      stripe_session_id: s.id,
      stripe_payment_intent: s.payment_intent
    });
    if (process.env.BOOKING_WEBHOOK_URL) {
      try {
        await fetch(process.env.BOOKING_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(booking) });
      } catch (e) {
        console.error("forward failed", e.message);
      }
    }
  }
  res.status(200).json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };

function readRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
