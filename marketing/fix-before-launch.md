# Fix before you spend on ads

I read the customer app (`detail-on-demand-app`), both detailer apps (`updated-DODDetailer`, `detail-on-demand-detailer`) and the website (`detailondemand`). Several places contradict each other.

Paid traffic makes these worse: every mismatch a new customer hits turns into a refund, a bad review, or a complaint to Facebook that can get the ad account restricted. They're sorted by how much they'd hurt a customer who arrives from an ad.

File paths point into those repos.

---

## Must fix: the ads depend on these

### 1. "Pay after it's done" vs a 25% deposit
- **What the app does:** authorizes the full amount and charges after the job (`TechnicianSelection.jsx:240`, `base44/functions/createStripeDeposit/entry.ts:44`).
- **What it says elsewhere:**
  - The Terms say 25% deposit + 75% later (`TermsOfService.jsx:33–34`).
  - The confirmation screen says "Pay the remaining 75%" (`BookingConfirmation.jsx:70`).
  - The cancellation policy refers to "the deposit" (`TermsOfService.jsx:49–51`).
- **Fix:** rewrite the Terms, the confirmation screen and the cancellation wording to match what the code does. Every ad leads with "you don't pay until it's done".

### 2. Made-up reviews and numbers
- **Website:** the three testimonials (Marcus D., Priya S., Tom R.) are placeholders according to the site's own README. The FAQ and About copy are marked "PLACEHOLDER" in the code.
- **Customer app:** the stats disagree with each other:
  - 5.0 vs "4.9 · 2.1k"
  - 1,000+ vs 5,000+ vs 500+ cars
  - "~1 hr" vs "2hr" arrival
  - Detailer cards use stock photos (`ContractorPreviewCards.jsx:41`).
- **Why it matters:** the FTC's rule on fake reviews and testimonials (in force since October 2024) allows civil penalties per violation. Facebook reviewers and customers also notice.
- **Fix:** remove them, or replace them with real Google reviews and real counts. The landing page already hides its reviews section until you add real ones in `config.js`.

### 3. "Nationwide" vs a 15-mile match radius
- **The problem:** the website and footer say nationwide. In the code:
  - A scheduled booking needs a pro within 15 miles (`checkScheduleAvailability/entry.ts:3`).
  - ASAP requests search 50 miles (`dispatchBooking/entry.ts:3`).
- **Fix:** only run customer ads within 15 miles of active pros (the funnel doc sets this up). Change "nationwide" to your real cities on the site.

### 4. Two different price lists
- **App checkout charges:**
  - Interior $149
  - Full $199
  - Paint Correction $399
  - Ceramic $799
  - Plus size multipliers of 1.15 / 1.2 / 1.3 (`BookNow.jsx:20–35`).
- **The website and the app's Services page show nine packages** (Express $120, Signature $199, Deep Cleanse $175 and so on). They can't be booked by name: the Services page "Book Now" sends IDs like `deep_cleanse` that checkout ignores (`Services.jsx:301`).
- **Other mismatches:** Headlight restoration is $99 on the home page but $115 as an add-on. Ceramic claims a "2-year warranty" (`OneTimeCleans.jsx:70`) that the app doesn't define.
- **Fix:** pick one menu. The ads and the landing page use the checkout prices, because that's what customers are charged.

### 5. Customers from ads get texts from "SudBuds"
- The old brand name is still in:
  - the SMS function (`base44/functions/sendSMS/entry.ts:60,101`)
  - the chat assistant (`base44/agents/customer_service.jsonc:2,3,27`)
  - `OurApp.jsx` and `Feedback.jsx`
- **Fix:** rename them to Detail On Demand.

### 6. Codes and offers that don't work
- **Referral card:** shows "Give $20, get $20", but checkout won't accept referral codes and nothing pays the reward (`ReferralCard.jsx`).
- **Memberships:** Plus and Elite have no checkout; the buttons go back to home (`Memberships.jsx:164,190`).
- **Promo emails:** `WEEKEND15` and `COMEBACK10` are in the Ops promo templates, and checkout rejects both (`OpsPromoBlast.jsx:9,23`).
- **Fix:** hide these until they work. Only advertise **DETAIL10**.

---

## Should fix: wording that overpromises

| Claim | Where | Reality | Fix |
|---|---|---|---|
| "Track them in real time" | `BookingConfirmation.jsx:73`, `index.html:9` meta | Status steps and chat, no live GPS | "Get updates and message your pro" |
| "24/7 On-Demand" | `HomeRide.jsx:42` | Bookings 8 AM–6 PM | "7 days a week" |
| "100% satisfaction or we come back, every time, without exception" | `OneTimeCleans.jsx:197`, `About.jsx:21` | Terms: within 48 hours, "may" re-service at our discretion (`TermsOfService.jsx:52`) | Make them say the same thing. The landing page uses "tell us within 48 hours and we'll send a pro back". |
| "Background-checked, licensed & insured" | `About.jsx:19–29` | The app doesn't collect insurance proof or run checks. Terms say checks happen only "where permitted" | Confirm, or soften to "vetted" |
| "Our own water, our own power" | Website Process and FAQ | Only true for pros with a rig. The detailer application treats water as optional | Confirm, or use the landing page's FAQ wording |
| Contact details | Footer, Contact, About | Five-plus phone numbers and three emails | Pick one number and one email everywhere |

---

## Detailer side: before running recruiting ads

1. **Upsell pay.** The contract and the apply screen promise **60% of upsells** (`contract.ts:28`, `steps.tsx`). The new app pays add-ons at **40%** (`JobDetailScreen.tsx:575`). Pay what the contract says, or change the contract.
2. **Payout timing.** The apply screen and profile say weekly, automatic payouts through Stripe. The earnings screen says "Payouts are sent to you manually" (`EarningsScreen.tsx:423`). Recruiting ads can't say "paid weekly" until that's true.
3. **Insurance.** The contract requires $1M general liability naming Detail On Demand (`contract.ts:68`). The apply flow never asks for a certificate, and approval is automatic. Either collect proof before the first job or change the requirement. This also decides whether customer ads can say "insured".
4. **Waitlist doesn't reach the admin map.** `/join` writes to the Supabase `waitlist` table; `/admin` reads Vercel Postgres `signups` (`AdminScreen.tsx:54`, `api/waitlist.ts`). It also saves `state` as "Texas" where the map expects "TX".
5. **Ad source is lost.** Every waitlist row gets `source = 'join'`. Save `utm_source` and `utm_content` so you know which recruiting ad worked.

---

## Customer app: conversion blockers (not claims, but they cost bookings)

- **Login first:** nothing is visible until the visitor signs in (`App.jsx:110–114`). Consider letting people see prices and pick a service before they log in.
- **No Android or web link:** there's no Play Store listing and no public web URL in the code. Android users from ads can only use the landing page form.
- **Services page "Book Now" goes nowhere useful** (see #4 above).
