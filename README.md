# Detail On Demand: marketing

The Facebook and Instagram ad kit and the landing page those ads point to.

| File | What it is |
|---|---|
| [`index.html`](index.html) | **The landing page** ads point to. A one-question-per-screen quiz: vehicle → need → condition → ZIP → when → name and phone → the price is revealed (lead saved here) → one suggested add-on screen → day and time → address → card held through Stripe Checkout (charged after the job, like the app). |
| [`quote.html`](quote.html) | The lighter lead-only variant: a 30-second price form, no card. Keep it for an A/B test against the booking page. |
| [`thanks.html`](thanks.html) | Confirmation after the card is held. Fires the Pixel's Schedule event. |
| [`api/create-checkout.js`](api/create-checkout.js) | Vercel function that recomputes the price server-side and opens Stripe Checkout with `capture_method: manual`. |
| [`api/stripe-webhook.js`](api/stripe-webhook.js) | Vercel function Stripe calls when a card is authorized; forwards the booking to your GoHighLevel/Zapier webhook. |
| [`supabase/bookings_web.sql`](supabase/bookings_web.sql) | Creates the `bookings_web` table the booking page writes to before Stripe opens. |
| [`config.js`](config.js) | **The only file you edit:** city, where leads go, Meta Pixel, phone, links, real reviews. |
| [`privacy.html`](privacy.html) | Privacy policy. Facebook asks for one, and the form links to it. |
| [`supabase/leads.sql`](supabase/leads.sql) | Creates the `leads` table the form writes to. Anyone can add a lead; nobody can read them through the API. |
| [`marketing/facebook-ads.md`](marketing/facebook-ads.md) | 8 customer ads, 2 retargeting ads, 3 image ads and 3 recruiting ads. Each has hooks, a shot list, the voiceover word for word, the caption, headline and button. |
| [`marketing/filming-guide.md`](marketing/filming-guide.md) | The 12 shots to film on every job, phone settings, voiceover recording, and CapCut editing. |
| [`marketing/signup-funnel.md`](marketing/signup-funnel.md) | How customers and detailers sign up, deploying the page, lead texting templates, Ads Manager settings, what to measure. |
| [`marketing/strategy.md`](marketing/strategy.md) | The go-to-market strategy: unit economics, why the landing-page-plus-SMS funnel beats app installs, which video to lead with, the 2-week creative test, budget, 90-day plan and KPIs. |
| [`marketing/fix-before-launch.md`](marketing/fix-before-launch.md) | Contradictions in the apps and site that ads would expose, with file and line references. |

## Launch checklist

1. Merge the "must fix" branches (`marketing/fix-before-launch.md`).
2. Deploy this repo on Vercel (the `api/` functions need Vercel; GitHub Pages can only host `quote.html`).
3. In Vercel > Settings > Environment Variables add `STRIPE_SECRET_KEY`, `SITE_URL`, `STRIPE_WEBHOOK_SECRET` and `BOOKING_WEBHOOK_URL`. In Stripe > Developers > Webhooks add `https://<domain>/api/stripe-webhook` for `checkout.session.completed`.
4. Fill in `config.js`: lead destination, Meta Pixel ID, and your city. Run both SQL files if you use Supabase.
5. Book yourself with a Stripe test card (4242 4242 4242 4242), confirm the hold shows in Stripe as uncaptured, and that the booking reached GoHighLevel.
6. Capture the payment in Stripe after the job (Payments > the hold > Capture), or cancel it to release the hold.
5. Film A1, A2 and A3 (`marketing/filming-guide.md`).
6. Launch the customer campaign in one city at $30–50 a day.

## Brand

These are taken from the existing apps and website, not invented for this page:

- **Navy:** `#040D1F` → `#071A3E` → `#0A2D6B`, the app's splash gradient.
- **Blue:** `#0A84FF`, the app's primary color. **Light blue:** `#60A5FA`.
- **Tint:** `#F0F7FC`, the website's alternate sections.
- **Fonts:** Oswald for headings and Inter for body text, as on the website.
- **Logo:** `detail_on_demand_v4_transparent.png`, the same image as the app's splash screen, hosted on Base44. If it fails to load, the page shows the text wordmark "DETAIL ON DEMAND" instead.

Prices on the landing page come from the customer app's checkout (`BookNow.jsx`). If checkout prices change, update `SERVICES` near the bottom of `index.html` and the four `$` amounts in the pricing cards.
