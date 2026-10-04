/*
 * Detail On Demand landing page settings.
 *
 * This is the only file you should need to edit. Anything left blank falls
 * back to a sensible default, and the page still works with nothing filled in:
 * without a lead backend, the form opens a pre-written text to your number.
 */
window.DOD_CONFIG = {
  // The city shown in the hero ("Now booking in Des Moines"). An ad can
  // override it per ad set by adding ?city=Des%20Moines to the link.
  city: "",

  // Where form submissions go. Fill in either one, or both.
  //   Supabase: run supabase/leads.sql and supabase/bookings_web.sql, then
  //   paste the project URL and the public anon key (Project Settings > API).
  supabaseUrl: "",
  supabaseAnonKey: "",
  //   Webhook: a GoHighLevel, Zapier or Make "inbound webhook" URL. Fields
  //   arrive form-encoded: name, phone, zip, service, vehicle_size, price...
  webhookUrl: "",

  // Service area. Detail Pros only take jobs within about 15 miles, so list
  // what an active pro covers. A ZIP that matches neither list goes to the
  // "not there yet" waitlist screen instead of a card hold. Leave both empty
  // and every ZIP is accepted (no check is shown).
  servedZipPrefixes: [], // e.g. ["503", "502"]: every ZIP starting with these
  servedZips: [],        // e.g. ["50309", "50312"]: exact ZIPs

  // Card authorization. The booking page posts to this Vercel function, which
  // opens Stripe Checkout in "hold, don't charge" mode. Needs STRIPE_SECRET_KEY
  // and SITE_URL set in Vercel (see api/create-checkout.js). Leave as is.
  checkoutEndpoint: "/api/create-checkout",

  // Meta Pixel ID (Events Manager > Data sources). Fires PageView on load,
  // Lead on a submitted form and Contact on a call or text tap.
  metaPixelId: "",

  // Contact details shown on the page.
  phoneDisplay: "(424) 722-7053",
  phoneE164: "+14247227053",
  email: "logannewman@getdetailondemand.com",

  // Booking links.
  appStoreUrl: "https://apps.apple.com/us/app/detail-on-demand/id6793673557",
  // Link for Android and desktop customers to book on the web. Leave blank
  // and the page only offers the iPhone app plus the form.
  webAppUrl: "",
  // Where "Become a Detail Pro" sends detailers.
  proSignupUrl: "https://doddetailer.com/join",

  // Promo code shown after someone submits. DETAIL10 is the one code the
  // customer app's checkout accepts today (10% off).
  promoCode: "DETAIL10",

  // Real customer reviews only. Paste them from Google exactly as written.
  // The reviews section stays hidden until at least one is added.
  //   { name: "Sarah K.", car: "2022 Honda Odyssey", text: "..." }
  reviews: [],
};
