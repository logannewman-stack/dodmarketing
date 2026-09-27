# Detail On Demand: go-to-market strategy

*What to run, where to send people, and why. Built on your unit economics, published benchmarks, and what your apps can and can't do today.*

---

## The decision in one page

**Run a lead campaign, not an app-install campaign.** Send ad traffic to the landing page's 30-second price form, text every lead within 5 minutes with their price and two open times, and let them book in the app or by replying. Add a real online booking step (calendar) as soon as the app can take a booking without a login. Do not send cold traffic to the App Store.

**Lead with one video: A1, the seat-extraction before/after, voiced by you, shot on a phone.** Test three hooks of it against A2 (customer POV) and A3 (founder). Judge by cost per *booked job*, not cost per lead.

**One city, 15-mile radius, $40–50/day, Advantage+ audience, no interest targeting.** Recruit pros in that city before you spend a dollar on customers.

The reasoning, the numbers and the plan follow. Every external figure is sourced at the end; most are vendor-published benchmarks, so treat them as directional, and treat your own first 200 leads as the only numbers that count.

---

## 1. Your economics set the rules

Everything in marketing comes down to: what can you pay for a customer, and how fast do you find out whether you're paying too much?

### What a first booking is worth to you

| | Car | SUV | Truck | 3-Row |
|---|---|---|---|---|
| Full Detail price (checkout) | $199 | $229 | $239 | $259 |
| Detailer share (40%) | $80 | $92 | $96 | $104 |
| Stripe (~2.9% + $0.30) | $6 | $7 | $7 | $8 |
| **Your gross margin, first job** | **$113** | **$130** | **$136** | **$147** |

Mix will skew toward SUVs and family vehicles (that's who watches car-cleaning content), so call it **about $125 gross margin per first job**, before any refund, re-service or promo. DETAIL10 takes ~$20 off that when it's used.

### What a customer is worth over time

Detailing retention benchmarks put healthy repeat rates at 50–70% of customers coming back. Reasonable planning assumptions for a marketplace that's new in a city:

| Scenario | Repeat rate | Jobs / year | Gross margin / customer / year |
|---|---|---|---|
| Pessimistic | 30% rebook once | 1.3 | ~$160 |
| Base | 50% rebook, avg 2.5 jobs | 2.5 | ~$310 |
| Good | 65% rebook, quarterly | 3.5 | ~$440 |

Industry planning models for mobile detailing target a CAC of roughly $50–$85 against an LTV of $255–$500+, i.e. a 3:1 LTV:CAC. Your numbers land in the same range.

### What you can pay

- **Per booked job (first job only, no reliance on repeat):** up to ~$60 keeps you profitable on job one. That's the safe ceiling while you learn.
- **Per booked job (base LTV):** up to ~$100 pays back inside a year.
- **Per lead:** depends entirely on lead→booking rate. At 33%, a lead is worth ~$40; at 20%, ~$25; at 50%, ~$60.

**That last row is the whole strategy.** Meta home-services benchmarks put cost per lead at $30–$50 (one 2026 aggregate: $41). At $41 a lead you need to book at least 1 in 3 to be safe on job one. Every decision below (video, destination, follow-up) is chosen to push lead→booking above 33%, because that's the lever you control that Meta doesn't.

---

## 2. Where to send the click (landing page vs SMS vs calendar vs app)

Five options were on the table. Here's each one scored against your situation, then the pick.

### Option A: App install campaign (send to the App Store)

**How it works:** Meta "App promotion" objective → App Store → download → sign in → onboard → book.

**What the data says:**
- North American iOS installs cost ~$2.50–$5.50 on Meta.
- App onboarding completion is brutal: the global 30-day onboarding completion rate sits around 8%; more than 90% of installers never finish onboarding. Even generous consumer-app benchmarks have install→registration well under half, and deferred signup lifts activation 10–30%, meaning login-first flows are the worst case.
- Your app is **login-first** (`App.jsx:110–114`): nothing is visible until sign-in. It is **iOS-only**; Android users (roughly 40% of US phones) hit a dead end.

**The math:** $4 CPI ÷ 15% who reach onboarding ÷ 40% who complete a booking = **~$65 per booking, on iOS only, with zero ability to follow up** the 85% who bounced (you never got their number). Plausible best case, likely worse.

**Verdict: No.** Not for cold traffic. The App Store link belongs *after* someone's given you their number, when it's a convenience, not the gate.

### Option B: Click-to-Messenger / click-to-text ("just text us")

**How it works:** Ad opens a Messenger, WhatsApp or SMS thread; you quote and book in the conversation.

**What the data says:** SMS is read (98% open, 80% within 5 minutes) and answered (~45% average response rate; 18–35% on promotional offers for service businesses). Conversational leads are high-intent, and the thread doubles as your follow-up channel.

**The problems for you:**
- Meta click-to-message ads optimize for "conversations started," which includes one-word messages and people asking "how much?" who never reply. Volume looks great; quality is unpredictable.
- You are the bottleneck. Every conversation needs a human within minutes. That works at 5 leads/day, not 50, and it doesn't work while you're detailing a car.
- No price is shown before the click, so you eat the "how much?" question on every lead.

**Verdict: Not as the primary destination.** But SMS is the *follow-up* channel for everything else, and the landing page's fallback when no lead backend is connected. Keep a "Text us" button as a secondary CTA (it's already on the page).

### Option C: Facebook Instant Forms (lead stays inside Facebook)

**How it works:** The ad opens a prefilled native form; no website.

**What the data says:**
- Lowest cost per lead of any format; industry-wide ~$34 average, and lead ads convert clicks to leads at ~12.5% vs ~10.5% for landing pages in WordStream's dataset.
- Quality is consistently worse. Across multiple studies, website leads close at 2–3× the rate of Instant Form leads; one B2B dataset showed 2% vs 17% conversion to appointments. Prefilled forms produce accidental submissions and people who don't remember filling it in.

**Verdict: A volume lever, not the core.** Worth a 20–30% budget test in weeks 3–4, *only* with "Higher intent" form type, a price shown in the ad, and GoHighLevel firing the first text within a minute. Kill it if lead→booking comes in under two-thirds of the landing page's rate.

### Option D: Landing page with an instant quote form (what's built)

**How it works:** Ad → page shows the exact app price for their vehicle → 3 fields (name, mobile, ZIP) → you text within 5 minutes → they book in the app or reply "yes".

**What the data says:**
- Landing pages win on lead quality and downstream close rate because they pre-qualify: the visitor has seen the price before giving you their number.
- Form length is the biggest single conversion lever: cutting to three fields improves conversion by ~50%; multi-step/interactive forms convert at ~14% vs ~4.5% for long single-page forms; mobile forms broken into steps see up to 63% higher completion. Your form is three typed fields plus two taps, with the price updating live, which is the multi-step pattern without the extra screens.
- Home-services landing pages convert at roughly 5–5.5% on Meta lead campaigns as an industry average. A page this short, with the price visible and a city in the headline, should beat that; under 10% is the signal that something's wrong (page speed, price shock, city mismatch).
- Speed to lead is the most-replicated finding in lead management: responding within 5 minutes vs 30 minutes makes you ~100× more likely to reach the lead and ~21× more likely to qualify them (MIT/InsideSales, 15,000+ leads); firms responding within an hour were 7× more likely to qualify a lead than those waiting longer (HBR, 2,241 companies). The average company takes 42 hours; 23% never respond. **This is the biggest edge available to you and it costs nothing.**

**Verdict: Yes. This is the primary destination.** It captures the number *before* the app's login wall, works on Android, shows the price (so the "how much?" objection is handled pre-click), and hands you a phone number to text within minutes.

### Option E: Calendar / real-time booking on the page

**How it works:** The page shows live openings; the visitor picks a slot and enters a card.

**What the data says:** Online scheduling leads book at markedly higher rates than call-back leads (one dataset: 56%), adding a booking step lifts form→booked by 25–50%, and automated reminders cut no-shows ~29%. When a customer compares two providers and one offers instant booking, instant booking wins the intent.

**Why not today:** your availability lives inside Base44 (`checkScheduleAvailability`, 15-mile match, 30-minute slots 8:00–3:30), payment authorization requires the app's Stripe flow, and both sit behind login. A fake calendar that collects a "preferred time" and then makes them wait for a text is *worse* than an honest form, because it sets an expectation you then break.

**Verdict: Yes, in phase 2.** The single highest-value product change for marketing is **a web booking flow that shows real openings and takes a card without an account** (create the account after payment). When that exists, embed it on the landing page as step 2 after the phone number, and measure form→booked before/after. Expect it to be the biggest conversion jump you'll see.

### The pick, and the sequence

```
Phase 1 (now)      Ad → landing page price form → SMS in <5 min → app or reply to book
Phase 2 (product)  Ad → landing page price form → live openings + card, no login → booked
Always             App Store link only after the number is captured; Instant Forms as a volume test
```

Why this order beats "just download the app": you never lose the 85–90% who don't finish an app funnel, because you got their number first. Why it beats "just text us": the price is shown before the click, and the lead is structured (service, vehicle, ZIP, ad source) so the first text can be specific. Why it beats a calendar today: the calendar would be fake.

---

## 3. Which video will convert best (and how to prove it)

### What the format research says

- **Raw beats polished on Meta.** UGC-style video pulled ~1.8% CTR vs ~1.1% for studio spots (a ~64% lift) with 20–35% lower CPC; UGC Reels ROAS benchmarks run ~2.8–3.8× vs ~1.6–2.2× for studio. The gap is biggest on Reels, smaller on Feed.
- **The hook decides everything.** The first 2–3 seconds determine whether the rest plays; getting past the 3-second mark roughly doubles downstream conversion. Hook structure matters more than production value.
- **Transformation is the native format for detailing.** Detailing-specific ad practitioners consistently report before/after content, gloss close-ups and "process" footage as the top performers, with case studies of $15 leads on before/after creative. Leading with the transformation ("here's the result") works because it promises the value immediately.

### Ranking your scripts

| Rank | Ad | Why it should win | Risk |
|---|---|---|---|
| **1** | **A1 Watch the water** (extraction before/after, your voice) | Transformation in the first 2 seconds; the "dirty water" shot is a proven hook in the cleaning niche; phone-shot = UGC look; price and "pay after" land at 12–15s | Needs one truly filthy interior to film |
| **2** | **A2 Didn't leave the couch** (customer POV) | Pure UGC; the *convenience* pitch, which is your real differentiator vs a shop; screen recording shows how easy booking is | Needs a willing customer; risk it feels staged |
| **3** | **A3 Founder** | Trust; best retargeting asset; longer watch = better-qualified clicks | Lower hook rate cold; higher CPC |
| 4 | A5 Under the car seat | A1 aimed at the highest-value segment (family SUVs) | Same as A1; run after A1 proves |
| 5 | A4 What $199 gets you | Handles the price objection; good for Feed | Less emotional; lower hook |
| 6 | A6 Office / A7 Paint / A8 Lease | Segment and seasonal ads | Smaller audiences; run once the core works |

**Prediction:** A1 wins on cost per lead; A2 or A3 wins on lead→booking (people who watched a person explain it are further along). The winning *combination* is likely A1 for cold reach and A3 for retargeting. That is a hypothesis, and the test below is how you find out in two weeks instead of guessing.

### The creative test (weeks 1–2)

One campaign, one ad set (your city, 15 miles, Advantage+ audience, Advantage+ placements), five ads:

```
A1-hook1   A1-hook2   A1-hook3   A2-hook1   A3-hook1
```

Same body footage in the three A1s; only the first two seconds differ. Meta will shift budget to the winner on its own (that's what you want at this stage).

**Leading indicators (read daily, act after 3 days):**

| Metric | Formula | Kill below | Scale above |
|---|---|---|---|
| Hook rate | 3-second plays ÷ impressions | 20% | 30% |
| Hold rate | ThruPlay ÷ 3-second plays | 25% | 40% |
| Link CTR | link clicks ÷ impressions | 1.0% | 2.0% |
| Cost per lead | spend ÷ leads | $60 | $30 |

**The only metric that decides (read weekly):** cost per booked job = spend ÷ jobs that actually happened, by ad. The page saves the ad name with every lead (`utm_content`), and you mark each lead `booked` or `lost`. Without that column, you will scale the ad that produces cheap, unbookable leads.

**How much data is enough:** at ~$40/lead, $50/day buys ~9 leads a week. Don't kill an ad on fewer than ~8 leads or ~$300 spend; don't declare a winner on fewer than ~20 leads. Hook rate and CTR stabilize on a few thousand impressions (a day or two), which is why they're the early read.

---

## 4. Targeting, budget and structure

**Geography is your only hard rule.** A scheduled booking needs a pro within 15 miles (`checkScheduleAvailability`), so an ad shown 20 miles out is a refund conversation. Drop a pin on each active pro's home base, 15-mile radius, "people living in this location." One ad set per city, each with its own `?city=` so the headline matches.

**Audience: Advantage+, broad, no interests.** Meta's system now treats interests as suggestions anyway, and it needs conversion volume (ideally 30–50 conversions a week per ad set) to learn. Splitting a small local budget into "parents", "car enthusiasts", "professionals" starves every ad set. Let the *video* do the targeting: parents watch the car-seat ad, enthusiasts watch the 50/50. Sophisticated local advertisers typically run 70–80% broad, 10–20% retargeting, ≤10% tests.

**Budget:** $40–50/day per city to start. That's enough to exit the learning phase within a few weeks at home-services CPLs and enough to make a creative decision inside two weeks. Below $30/day you'll be making decisions on noise.

**Campaign structure:**

| Campaign | Objective | Audience | Budget | Ads |
|---|---|---|---|---|
| 1. Prospecting | Leads → Website → Lead event | City pin, 15 mi, 25–65+, Advantage+ | $40–50/day | A1 ×3 hooks, A2, A3 |
| 2. Retargeting | Leads → Website | Page visitors 30d + 50% video viewers 30d, excluding Lead submitters | $10–15/day | R1 (DETAIL10), R2, A3 |
| 3. Pros | Leads → Website → doddetailer.com/join or /apply | 25 mi | $15–20/day, only where you need pros | P1–P3 |

Optimization event: **Lead** (the form). Not "landing page views," not "link clicks": those buy you cheap clicks from people who don't convert. Once you have ~50 leads/month you can test optimizing for a downstream "Booked" event sent server-side from GoHighLevel; that's the point where Meta starts finding *bookers* instead of *form-fillers*.

---

## 5. The follow-up system is half the campaign

The research is unambiguous and you can act on all of it this week:

1. **First text within 5 minutes, automated.** GHL webhook → SMS with their name, service, exact price and two concrete slots. A lead that gets a slot offer books; a lead that gets "thanks, we'll be in touch" evaporates. Template #1 in the funnel doc.
2. **Call within 15 minutes during working hours.** Calls convert higher than texts for service leads (phone leads convert ~46% industry-wide; high-intent calls 70%+). Text first so they recognize the number, then call.
3. **Three touches over 24 hours, then stop.** Templates #2 and #3. Response rates for service-business SMS run 18–45%, so most of your bookings come from touches 1–2.
4. **Close in the thread.** If they say "yes" to a slot, book it for them in Ops and send the payment link. Don't send them to download an app to finish a booking they've already said yes to.
5. **After the job:** review request at +2 hours (template #4), rebook nudge at +5 weeks (template #5). Reviews feed ads (S3) and the landing page; the rebook nudge is where the LTV in section 1 comes from.

Target: **≥33% lead→booking in month one, ≥45% by month three** (after the calendar step exists). If you're under 25%, the problem is response time or slot availability, not the ads.

---

## 6. The 90-day plan

### Weeks 0–1: Fix and set up (no spend)
- The must-fix items are in the app repos on branch `claude/marketing-fixes-10tfas` (customer app and website). Merge and deploy them.
- Deploy the landing page; connect GHL (or Supabase) and the Meta Pixel; verify with a test lead.
- Confirm active pros in the launch city and their true coverage; set the radius from *their* locations.
- Film A1, A2, A3 and the app screen recording (filming guide). Record hooks separately.
- Claim/clean the Google Business Profile in the launch city; it's where warm searchers land after seeing the ad.

### Weeks 1–2: Creative test
- Campaign 1 live with the five ads at $40–50/day.
- Text every lead inside 5 minutes; log every outcome.
- Day 3: pause anything under 20% hook rate or 1% CTR with >$100 spent. Day 7: read CPL. Day 14: read cost per booked job.

### Weeks 3–4: Exploit and expand
- Winner gets 3 new hooks; loser's budget moves to it.
- Turn on Campaign 2 (retargeting) once the visitor audience passes ~1,000.
- Run the Instant Form test at 20–30% of budget; compare lead→booking, not CPL.
- Start A5 (car seat) if A1 won, since it's the same format aimed at your best segment.

### Weeks 5–8: Second city or deeper city
- If cost per booked job ≤ $60 and lead→booking ≥ 33%: add the second city (with pros recruited first, Campaign 3 two weeks ahead).
- If not: don't expand. Fix the weakest funnel step (section 7) and re-test. Expanding a leaky funnel multiplies the leak.
- Ship the phase-2 booking flow (live openings, card, no login). Measure form→booked before and after.

### Weeks 9–12: Compounding
- Real reviews into the landing page and the S3 image ad.
- Fixed referral program ($20/$20 is the right size once checkout honors it), promoted in the +2h post-job text.
- Seasonal creative: detailing demand peaks in spring (May) with a smaller autumn bump; you're launching in the shoulder season. Lean on interior/odor/pet-hair angles and holiday gift cards through winter, and have the exterior/paint/ceramic ads ready for March.

---

## 7. What to do when it's not working

| Symptom | Likely cause | Fix |
|---|---|---|
| Hook rate < 20% on every ad | The first 2 seconds are slow or the footage is dull | New hooks: dirtier "before", faster push-in, on-screen question. Re-film before spending more. |
| Good hook, CTR < 1% | The offer isn't landing or the price isn't shown | Say the price and "pay after" by second 12; test a "$199 in [CITY]" text overlay |
| CTR fine, page conversion < 8% | Page speed, city mismatch, price shock | Check `?city=` matches the ad; check load time on cellular; test "from $149" (Interior) as the hero price |
| Leads fine, lead→booking < 25% | Response time, or no slots near them | Automate text #1; call within 15 min; check that pros actually cover the ZIPs you're advertising |
| Bookings fine, no repeats | Job quality or no rebook prompt | +5-week text; pro rating floor; secret-shop the job |
| Everything fine, can't scale | Radius too small for more spend | Recruit pros → widen radius, not budget-per-radius |

---

## 8. Risks that can end the campaign

1. **Truth in ads.** The fabricated reviews and stats have been removed from the app and site for a reason: the FTC's 2024 rule on fake reviews and testimonials carries civil penalties, and Meta rejects or restricts accounts over misleading claims. Use only real reviews, real numbers, and only claims the product honors ("pay after", "cancel free 24h before", DETAIL10).
2. **SMS compliance.** The form's consent language is on the page; A2P 10DLC registration in GHL is required to send at volume; STOP must work. One carrier complaint can shut your number off mid-campaign.
3. **Supply.** Advertising to a city with one pro means the first sick day cancels a week of ad spend. Two pros per city minimum before Campaign 1.
4. **Contractor pay mismatch.** The contract promises 60% of upsells; the app pays 40%. Fix before recruiting ads run, or you're recruiting with a promise the software breaks.
5. **Spending to learn on noise.** Under $30/day or fewer than ~8 leads per ad, every "insight" is a coin flip. Fund the test properly or don't run it.

---

## 9. What "working" looks like at 90 days

| KPI | Month 1 target | Month 3 target |
|---|---|---|
| Hook rate (best ad) | ≥ 25% | ≥ 30% |
| Link CTR | ≥ 1.5% | ≥ 2% |
| Landing page conversion | ≥ 10% | ≥ 14% |
| Cost per lead | ≤ $45 | ≤ $30 |
| Lead → booked | ≥ 33% | ≥ 45% |
| **Cost per booked job** | **≤ $60** | **≤ $40** |
| Repeat rate (of month-1 customers) | — | ≥ 40% |
| Reviews (real, Google) | 10 | 40 |

Hit the month-3 column and the base LTV case in section 1 makes each city a profit center that can fund the next one. Miss cost per booked job for two consecutive weeks and stop spend until the weakest step in section 7 is fixed. The ads are the cheap part; the funnel behind them is what decides.

---

## Sources

Benchmarks and studies referenced above. Most are vendor-published aggregates, useful for direction, not precision.

- Meta home-services benchmarks (CPL $30–50 / $41.26, CTR 1.94%, CVR 5.22%, CPC $2.23): [Enrich Labs](https://www.enrichlabs.ai/blog/meta-ads-benchmarks-2025), [LocaliQ](https://localiq.com/blog/facebook-advertising-benchmarks/), [Adamigo](https://www.adamigo.ai/blog/meta-ads-cost-per-lead-benchmarks-industry-2026), [Elev8 Operations](https://www.elev8operations.com/guides/facebook-ads-statistics-for-contractors-2026)
- Speed to lead (5 min = 100× contact / 21× qualify; 1 hour = 7×; 42-hour average; 23% never respond): [MIT/InsideSales and HBR summaries via AInora](https://ainora.lt/blog/lead-response-time-statistics-every-study-2026), [Workato](https://www.workato.com/the-connector/lead-response-time-study/), [Voiso](https://voiso.com/articles/lead-response-time-metrics/)
- UGC vs studio creative (1.8% vs 1.1% CTR, ROAS ranges, 3-second rule): [Finsi](https://www.finsi.ai/blog/ugc-ads-performance-benchmarks/), [Stackmatix](https://www.stackmatix.com/blog/ugc-ads-strategy-for-brands), [Reloop](https://reloop.so/blog/article/ugc-advertising/)
- App funnels (iOS CPI $2.50–5.50 NA; ~8% onboarding completion; deferred signup +10–30%): [IdeaEquity](https://ideaequity.ai/blog/cost-per-install-benchmarks-2026), [Business of Apps](https://www.businessofapps.com/ads/cpi/research/cost-per-install/), [Digia](https://www.digia.tech/post/app-onboarding-rates-statistics/), [UXCam](https://uxcam.com/blog/mobile-app-conversion-rate/)
- Instant Forms vs landing pages (12.5% vs 10.5% CVR; 2–3× close rate; 2% vs 17% appointments): [WordStream](https://www.wordstream.com/blog/ws/2019/02/14/facebook-lead-ads-vs-landing-pages), [Jon Loomer](https://www.jonloomer.com/testing-quality-leads/), [Wevion](https://wevion.ai/en/blog/lead-ads-vs-landing-page-which-converts-better/), [Nuru](https://nurudigitalmarketing.com/blog/facebook-lead-forms-vs-landing-pages)
- Form design (3 fields +50%; multi-step 13.85% vs 4.53%; mobile +63%): [Numinam](https://www.numinam.com/en/blog/multi-step-vs-single-page-forms-which-really-generates-more-leads-complete-guide-2026), [IvyForms](https://ivyforms.com/blog/multi-step-forms-single-step-forms/), [KlientBoost](https://www.klientboost.com/landing-pages/landing-page-forms/)
- SMS (98% open, 80% in 5 min, ~45% response, 18–35% for service offers): [Notifyre](https://notifyre.com/us/blog/sms-marketing-statistics), [Sakari](https://sakari.io/blog/sms-marketing-statistics-data-backed-insights-for-2025-2026), [MessageFlow](https://messageflow.com/blog/sms-marketing-benchmarks/)
- Online booking (56% booking rate for scheduling leads; +25–50% form→booked; −29% no-shows; phone leads ~46%): [CozyCal](https://www.cozycal.com/blog/scheduling-increases-customer-conversion), [PipelineOn](https://pipelineon.com/blog/contractor-online-booking-widget/), [NextPhone](https://www.getnextphone.com/blog/call-booking-conversion-rate-optimization)
- Detailing economics (CAC $50–85, LTV $255–500+, 50–70% retention): [FinancialModelsLab](https://financialmodelslab.com/blogs/kpi-metrics/mobile-auto-detailing), [FinancialModelsLab (car detailing KPIs)](https://financialmodelslab.com/blogs/kpi-metrics/mobile-car-detailing), [Monetizely](https://www.getmonetizely.com/articles/how-to-create-a-profitable-recurring-pricing-strategy-for-mobile-car-wash-amp-auto-detailing-services)
- Detailing ad case studies ($14.96 CPL; before/after creative): [Grounded Group](https://groundedgroup.com/facebook-ads-for-auto-detailing-businesses/), [Noah for Detailers](https://noahfordetailers.com/blog/facebook-ads-for-car-detailers/), [Detailers Movement](https://www.detailersmovement.com/facebook-ads/)
- Targeting (Advantage+ treats interests as suggestions; 30–50 conversions/week to learn; 70/20/10 split): [Adligator](https://adligator.com/blog/meta-broad-targeting-advantage-plus-audiences-2026), [TrueFuture Media](https://www.truefuturemedia.com/articles/advantage-plus-audience), [Meta](https://www.facebook.com/business/ads/meta-advantage-plus/audience)
- Seasonality (May peak, autumn bump): [Simporter](https://simporter.com/trends/car-interior-detailer/), [Focus2Move](https://www.focus2move.com/data-driven-insights-into-automotive-detailing-demand-and-market-trends/)
