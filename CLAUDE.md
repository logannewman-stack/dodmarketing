# Detail On Demand — marketing repo rules

## Standing rule: NO AI-generated ad content (set by Logan, 2026-10-08)

- **Never generate video, images, or voiceover with Higgsfield** (or any other
  AI generation service) for Detail On Demand ads. Do not call
  `generate_video`, `generate_image`, `generate_audio`, `execute_preset`,
  Ads Studio, Shorts Studio, or anything else that spends Higgsfield credits —
  not even one credit, not even if it seems like the only way to hit a
  deadline. If a task seems to require it, stop and ask Logan; the answer is
  almost certainly no.
- **All ad footage must be real**: clips Logan or Emil film themselves (see
  `marketing/filming-guide.md` for the shot list), or properly licensed stock
  footage that Logan downloads and provides (Pexels / Pixabay / Mixkit /
  Coverr — these are blocked from the cloud container, so Logan downloads on
  his own machine and shares the files).
- Free editing/assembly of footage Logan provides (ffmpeg, captions, end
  cards, the Higgsfield sandbox as a free edit bay) is fine. The constraint is
  on *generating* content and on *spending credits*, not on editing real
  footage.
- Voiceovers: Logan records them himself (scripts live in the Friday Ad Pack
  doc and `marketing/facebook-ads.md`).

## Other standing constraints

- Ad claims allowed: we come to you · driveway, office or apartment lot ·
  you don't pay until it's done · vetted pros · $50 off your first detail.
  Never claim: live GPS tracking, "nationwide", insurance/background checks
  (unconfirmed), referral programs, or any invented reviews/ratings/counts.
- Checkout economics are fixed in `api/create-checkout.js`; never change
  prices, multipliers, add-ons, or promo codes without Logan's say-so.
