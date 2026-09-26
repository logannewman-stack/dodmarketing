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
  //   Supabase: run supabase/leads.sql, then paste the project URL and the
  //   public anon key (Supabase > Project Settings > API).
  supabaseUrl: "",
  supabaseAnonKey: "",
  //   Webhook: a GoHighLevel, Zapier or Make "inbound webhook" URL. Fields
  //   arrive form-encoded: name, phone, zip, service, vehicle_size, price...
  webhookUrl: "",

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
