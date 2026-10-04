// Vercel serverless function: turns a booking from index.html into a Stripe
// Checkout session that AUTHORIZES the card without charging it
// (capture_method: manual), the same model the customer app uses. You capture
// the payment after the job from the Stripe dashboard, or the app does.
//
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   STRIPE_SECRET_KEY   sk_live_... (or sk_test_... while testing)
//   SITE_URL            https://book.getdetailondemand.com (no trailing slash)
//
// A Stripe card authorization is valid for 7 days, which is why the page
// only offers the next 7 days.

const Stripe = require("stripe");

// Same numbers as the page and the app's checkout. The total is recomputed
// here so nothing sent by the browser can change the amount authorized.
const SERVICES = { interior: 149, full_detail: 199, paint_correction: 399, ceramic_coating: 799 };
const NAMES = { interior: "Interior Detail", full_detail: "Full Detail", paint_correction: "Paint Correction", ceramic_coating: "Ceramic Coating" };
const SIZES = { sedan: 1.0, suv: 1.15, truck: 1.2, three_row: 1.3 };
const SIZE_NAMES = { sedan: "Car", suv: "SUV", truck: "Truck", three_row: "3-Row" };
const ADDONS = { pet_hair: 75, stain_removal: 60, odor_bomb: 65, leather_conditioning: 45, engine_bay: 80, headlight_restoration: 115, clay_bar: 55, bug_tar_removal: 40 };
const ADDON_NAMES = { pet_hair: "Pet hair removal", stain_removal: "Stain removal", odor_bomb: "Odor bomb / ozone", leather_conditioning: "Leather conditioning", engine_bay: "Engine bay cleaning", headlight_restoration: "Headlight restoration", clay_bar: "Clay bar treatment", bug_tar_removal: "Bug & tar removal" };
const PROMOS = { DETAIL10: 0.1 };

function clean(s, max) { return typeof s === "string" ? s.trim().slice(0, max) : ""; }

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "POST only" }); }
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: "Payments not configured" });

  const b = req.body || {};
  const service = SERVICES[b.service] ? b.service : null;
  const size = SIZES[b.vehicle_size] ? b.vehicle_size : null;
  if (!service || !size) return res.status(400).json({ error: "Unknown service or vehicle size" });
  const addons = (Array.isArray(b.addons) ? b.addons : []).filter((id) => ADDONS[id]);
  const promo = typeof b.promo === "string" && PROMOS[b.promo.toUpperCase()] ? b.promo.toUpperCase() : null;
  const email = clean(b.email, 160);
  const phone = (b.phone || "").toString().replace(/\D/g, "").slice(-10);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length !== 10) return res.status(400).json({ error: "Email and phone are required" });

  const base = Math.round(SERVICES[service] * SIZES[size]);
  const subtotal = base + addons.reduce((n, id) => n + ADDONS[id], 0);
  const discount = promo ? Math.round(subtotal * PROMOS[promo]) : 0;
  const total = subtotal - discount;

  const when = b.asap ? "Soonest available" : `${clean(b.date, 10)} ${clean(b.time, 5)}`.trim();
  const site = (process.env.SITE_URL || `https://${req.headers.host}`).replace(/\/$/, "");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const line_items = [{
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: base * 100,
      product_data: { name: `${NAMES[service]} · ${SIZE_NAMES[size]}`, description: `Mobile detail, ${when}. Card held now, charged after the job.` }
    }
  }].concat(addons.map((id) => ({ quantity: 1, price_data: { currency: "usd", unit_amount: ADDONS[id] * 100, product_data: { name: ADDON_NAMES[id] } } })));

  const metadata = {
    service, vehicle_size: size, vehicle: clean(b.vehicle, 80), addons: addons.join(","),
    when, address: clean(b.address, 160), city: clean(b.city, 60), zip: clean(b.zip, 5), notes: clean(b.notes, 200),
    name: clean(b.name, 120), phone, promo: promo || "", total: String(total),
    utm_source: clean(b.utm_source, 100), utm_medium: clean(b.utm_medium, 100), utm_campaign: clean(b.utm_campaign, 100),
    utm_content: clean(b.utm_content, 100), utm_term: clean(b.utm_term, 100), fbclid: clean(b.fbclid, 200)
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items,
      discounts: discount ? [{ coupon: await couponFor(stripe, promo) }] : undefined,
      payment_intent_data: {
        capture_method: "manual",
        description: `Detail On Demand · ${NAMES[service]} · ${metadata.name} · ${when}`,
        metadata
      },
      metadata,
      phone_number_collection: { enabled: false },
      success_url: `${site}/thanks.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/?service=${service}`
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("checkout", e.message);
    return res.status(500).json({ error: "Could not start checkout" });
  }
};

// One reusable 10%-off coupon per promo code, created on first use.
async function couponFor(stripe, code) {
  const id = `web-${code.toLowerCase()}`;
  try { await stripe.coupons.retrieve(id); return id; } catch (e) { /* create below */ }
  const c = await stripe.coupons.create({ id, name: code, percent_off: Math.round(PROMOS[code] * 100), duration: "once" });
  return c.id;
}
