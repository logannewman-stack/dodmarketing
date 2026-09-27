# Detail On Demand: marketing

The Facebook and Instagram ad kit and the landing page those ads point to.

| File | What it is |
|---|---|
| [`index.html`](index.html) | The landing page: hero, a 30-second price form, real app prices by vehicle size, how it works, FAQ. A static page with no build step. |
| [`config.js`](config.js) | **The only file you edit:** city, where leads go, Meta Pixel, phone, links, real reviews. |
| [`privacy.html`](privacy.html) | Privacy policy. Facebook asks for one, and the form links to it. |
| [`supabase/leads.sql`](supabase/leads.sql) | Creates the `leads` table the form writes to. Anyone can add a lead; nobody can read them through the API. |
| [`marketing/facebook-ads.md`](marketing/facebook-ads.md) | 8 customer ads, 2 retargeting ads, 3 image ads and 3 recruiting ads. Each has hooks, a shot list, the voiceover word for word, the caption, headline and button. |
| [`marketing/filming-guide.md`](marketing/filming-guide.md) | The 12 shots to film on every job, phone settings, voiceover recording, and CapCut editing. |
| [`marketing/signup-funnel.md`](marketing/signup-funnel.md) | How customers and detailers sign up, deploying the page, lead texting templates, Ads Manager settings, what to measure. |
| [`marketing/strategy.md`](marketing/strategy.md) | The go-to-market strategy: unit economics, why the landing-page-plus-SMS funnel beats app installs, which video to lead with, the 2-week creative test, budget, 90-day plan and KPIs. |
| [`marketing/fix-before-launch.md`](marketing/fix-before-launch.md) | Contradictions in the apps and site that ads would expose, with file and line references. |

## Launch checklist

1. Fix the "must fix" items in `marketing/fix-before-launch.md`.
2. Deploy this repo on Vercel or GitHub Pages (`marketing/signup-funnel.md`, step 1).
3. Fill in `config.js`: lead destination, Meta Pixel ID, and your city.
4. Send yourself a test lead and check it arrives.
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
