# How people sign up

```
 Facebook / Instagram ad
          │  tap "Book Now"
          ▼
 Landing page  (this repo: index.html)
   ├── fills the 30-second form ───────────────► Lead saved (Supabase and/or GoHighLevel)
   │                                                     │
   │                                                     ▼
   │                                         You text them within 5 minutes
   │                                         (price + two open times)
   │                                                     │
   └── taps "Get the iPhone app" ──► App Store ──► signs in ──► books in the app
                                                         │
                                                         ▼
                                                  Pro does the job, card charged
                                                         │
                                                         ▼
                                               Review request → rebook in 4–6 weeks
```

People sign up two ways. Most will use the form, because it asks for nothing up front.

---

## 1. Customer sign-up paths

### Path A: the form (most people)

1. They tap your ad and land on the page with `[CITY]` in the headline (set by `?city=` in the ad link).
2. They pick a service and a vehicle size and see the exact app price, then enter name, mobile and ZIP.
3. The lead is saved, the Meta Pixel records a **Lead**, and the page shows a thank-you with the App Store link and code **DETAIL10**.
4. **You text them** with their price and two open times. Speed matters more than anything else in this funnel; see section 3.
5. They either book themselves in the app, or reply "yes" and you book it for them. You can send a payment link from the Ops dashboard in the customer app.

### Path B: straight to the app (iPhone only)

1. They tap "Get the iPhone app" → App Store → download **Detail On Demand**.
2. **Sign in** on the Base44 login screen. The app shows nothing until they do (`App.jsx:110–114`). This is the biggest drop-off point in the funnel, and it's why the form comes first.
3. A three-screen onboarding: welcome → phone & address → vehicle.
4. **Book Now:** location → vehicle → service → add-ons → time, either "Soonest Available" or "Schedule Later" (next 7 days, 8:00 AM to 3:30 PM starts). They enter DETAIL10 at checkout.
5. The card is authorized, the job gets dispatched, and the card is charged when the job is done.

### Android and desktop

There's no Play Store app for customers. The customer app runs on the web, but no public link to it appears anywhere in the code. Once you know the link, put it in `config.js` → `webAppUrl` and the thank-you screen will show a "Book now on the web" button. Until then, Android users can only use the form, which works fine because you text them either way.

---

## 2. Setup, in order

### Step 1: Put the page online (10 minutes)

**Option A, Vercel (recommended; you already use it):**
1. vercel.com → **Add New → Project** → import `logannewman-stack/dodmarketing`.
2. Framework preset **Other**. Leave the build command empty. **Deploy.**
3. Settings → **Domains** → add a subdomain such as `book.getdetailondemand.com`, then add the CNAME record it shows you at your domain registrar.

**Option B, GitHub Pages (free, 2 minutes):** repo **Settings → Pages →** Deploy from a branch → choose the branch and `/ (root)` → Save. The page goes live at `https://logannewman-stack.github.io/dodmarketing/`.

### Step 2: Decide where leads go

Pick one, or both. Supabase keeps a permanent record and GoHighLevel does the texting.

**GoHighLevel (best if you already use it; the customer app's footer pulls your number from GHL):**
1. Automation → Workflows → **Create workflow** → trigger **Inbound Webhook** → copy the URL.
2. Paste it into `config.js` → `webhookUrl`, commit, and wait for the deploy.
3. Submit a test lead from your phone, then map the fields in GHL: `name`, `phone`, `zip`, `service`, `vehicle_size`, `quoted_price`, `city`, `utm_content` and `marketing_opt_in`.
4. Add these actions:
   - **Create/Update Contact**
   - **Send SMS** with text #1 below
   - An **internal notification** to your phone
   - **Wait** steps for texts #2 and #3, set to stop if they reply

**Supabase (the same project the apps use):**
1. Supabase → SQL Editor → paste in [`supabase/leads.sql`](../supabase/leads.sql) → **Run**. This creates a `leads` table that anyone can add to but nobody can read through the API.
2. Project Settings → API → copy the **Project URL** and the **anon public** key into `config.js`. The anon key is designed to be public; the table's security rules do the protecting. **Never** paste the `service_role` key.
3. To get pinged on each lead: Database → **Webhooks** → on insert into `leads` → send it to GHL, Zapier or Slack.
4. Read your leads under Table Editor → `leads`, and update `status` (`texted`, `booked`, `lost`) as you go.

**Neither yet?** The page still works: on submit it opens the visitor's texting app with a pre-written message to (424) 722-7053. You lose anyone who doesn't press send, so connect a backend before you spend real money.

### Step 3: Meta Pixel

1. Meta **Events Manager** → Connect data sources → Web → **Meta Pixel** → name it "Detail On Demand" → copy the **Pixel ID**.
2. Paste it into `config.js` → `metaPixelId`.
3. Events Manager → **Test Events** → enter your landing page URL → submit a test lead. You should see **PageView** and **Lead**. A tap on call or text logs **Contact**, and an App Store tap logs **AppStoreClick**.
4. Business Settings → Brand Safety → **Domains** → add and verify your landing domain.

### Step 4: Test it yourself

Submit the form from your phone with `?city=Test` on the URL. Confirm the lead arrived (in GHL or Supabase), you got the auto-text, and Test Events shows the Lead. Then delete the test lead.

---

## 3. The first 5 minutes decide the booking

Someone who fills in a form expects a reply while they're still holding their phone. Text within 5 minutes during working hours. Better still, call first and text if they don't pick up. The thank-you screen says "within the hour", so an hour is the most you can take.

### Text templates

**#1: Instant (automatic, or within 5 minutes)**
> Hi {first}, it's Logan with Detail On Demand 👋 Got your request for a {service} on your {vehicle}. It's ${price}, and we come to you. I have {Tue 10am} or {Wed 2pm} open near {zip}. Want one? Or book yourself in the app: {App Store link} (code DETAIL10 = 10% off)

**#2: No reply after 2 hours**
> Hey {first}, still want the car done this week? {slot} is still open near you.

**#3: Next morning**
> Last one from me, {first}. I can hold {slot} for you until tonight. Just reply YES.

**#4: 2 hours after the job**
> Thanks {first}! If the car came out great, a quick Google review helps us a ton: {review link}. If anything's not right, reply here within 48 hours and we'll come back.

**#5: 5 weeks later**
> Hi {first}, it's been about a month since your detail. Want the same pro back this week? {link}

Reviews from #4 feed straight back into your ads (image ad S3) and the landing page (`config.js` → `reviews`). That's where the funnel starts paying for itself.

---

## 4. Ads Manager setup

### Campaign 1: New customers

| Setting | Value |
|---|---|
| Objective | **Leads** |
| Conversion location | **Website** |
| Pixel and event | Detail On Demand pixel, **Lead** |
| Budget | $30–50/day per city to start (campaign budget) |
| Location | "People living in this location." Drop a pin on each area where you have active pros, **15-mile radius**. The app only schedules a pro within 15 miles, so don't advertise past that. |
| Age | 25–65+ |
| Audience | Advantage+ audience on, no interests. The video does the targeting. |
| Placements | Advantage+ (Reels will take most of the budget, which is what you want) |
| Ads | Start with 5: A1 × 3 hooks, A2, A3 |
| Website URL | Your landing page |
| URL parameters | `city=Des%20Moines&utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}` (change the city) |
| Button | Book Now |

One ad set per city, each with its own `city=` in the URL parameters, so the page headline matches the ad.

### Campaign 2: Retargeting (once the audiences hit about 1,000 people)

Custom audiences:
- Landing page visitors, last 30 days.
- Video viewers at 50%+, last 30 days.
- Exclude anyone who submitted a Lead.

Ads: R1 (DETAIL10) and R2. Budget: $10–15/day.

### Campaign 3: Detail Pro recruiting (only where you need pros)

- **Objective:** Leads → Website, pointed at `https://doddetailer.com/join` or `/apply`.
- **Location and budget:** 25-mile radius, $15–20/day.
- **Ads:** P1–P3.

Recruit before you advertise to customers. A city with no pros turns every customer lead into a refund conversation.

---

## 5. Reading the numbers

**What you can afford per lead.** You keep 60% of a $199 Full Detail, which is $119 before Stripe fees. If 1 in 3 leads books, a lead is worth about $37 on the first job alone. Repeat bookings make that better. Treat that number as your ceiling while you learn your real booking rate.

| Metric | Where to find it | What it tells you | Rule of thumb |
|---|---|---|---|
| **Hook rate** | 3-second video plays ÷ impressions (add it as a custom column) | Is the first 2 seconds working? | Under ~20%: new hook |
| **Link CTR** | Ads Manager | Does the ad make people want it? | Under ~1%: new offer angle |
| **Page conversion** | Leads ÷ landing page views | Is the page doing its job? | This short form should convert well into the double digits. Under 10% means something's off (speed, city mismatch, price shock). |
| **Cost per lead** | Ads Manager | What you pay for each form | Compare it to the ceiling above |
| **Lead → booking** | Your GHL or Supabase `status` column | Is your follow-up working? | Under 30%: text faster, call first |

**Weekly routine:**
1. Turn off any ad that has spent about twice your target cost per lead with no leads.
2. Keep the winners, then film 2–3 new hooks for the best one and add them.
3. After you change an ad set, leave it alone for 3–4 days while Meta re-learns.
4. Mark every lead's outcome. It's the only way to know which ad brings bookings, not just forms. `utm_content` tells you which ad each lead came from.

---

## 6. Alternative: Facebook Instant Forms

Instant Forms keep people inside Facebook, so they get more leads at a lower cost, but those leads are less likely to book. Use them if the landing page campaign struggles to get volume.

- Form type **Higher intent**, which adds a review screen.
- Questions:
  - ZIP (short answer)
  - Vehicle (Car / SUV / Truck / 3-Row)
  - Service (the four)
  - Name and phone, prefilled
- **Privacy policy URL:** `https://<your landing domain>/privacy.html`.
- Connect them to GoHighLevel's Facebook integration so text #1 still fires in under 5 minutes.

---

## 7. Detail Pro sign-up

| Page | What it asks | Use it when |
|---|---|---|
| `doddetailer.com/join` | Name, phone, email, city (about 30 seconds) | Opening a **new** city: build a list before launch |
| `doddetailer.com/apply` | 11 steps: ID photos, contract signature, service cities, hours, experience, a setup photo, a password (about 5 minutes) | You need pros **now**. Applicants are auto-approved once the contract is signed and both ID photos are in. |

Fix these two before running recruiting ads (details in [fix-before-launch.md](fix-before-launch.md)):
- `/join` saves to the Supabase `waitlist` table, but the `/admin` map reads a different database. **Facebook recruits won't show up on your admin map.**
- `/join` saves `source = 'join'` for everyone, so you can't tell which signups came from ads. Pass the UTM tags through like the landing page does.
