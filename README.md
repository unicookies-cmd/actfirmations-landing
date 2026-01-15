# UniCookies — A Sweet Message (Event QR Experience)

This repo powers UniCookies’ QR-code experience for pop-ups, activations, and exhibits.

Customers scan a QR code on cookie packaging and instantly receive a premium “sweet message” that refreshes daily (locked per device/day). Different cookies have different voices and message pools.

No login. No backend. Built to feel intentional and calm.

---

## What this is (for customers)

1) Scan the QR on your UniCookies package  
2) Receive “A Sweet Message For You”  
3) Tap **Copy**, **Share**, or **Make Story Card**  
4) Share your moment and tag **@eatunicookies**

---

## How QR codes map to cookies

All cookie QRs point to the same site, but each cookie uses a query parameter:

- Confetti Sparkle → `?cookie=confetti-sparkle`
- Incognidough → `?cookie=incognidough`
- Sunburst Love → `?cookie=sunburst-love`
- Moo Moon → `?cookie=moo-moon`
- Starry Night → `?cookie=starry-night`
- Banana Blossom → `?cookie=banana-blossom`
- S’more Unity → `?cookie=smore-unity`

If someone scans a general QR (no `?cookie=`), they still receive a message (default pool). The page does NOT display “House Blend.”

---

## How to test before an event (5 minutes)

Open these URLs on your phone:

1) Main:
- `/` (general scan)
- `/?cookie=confetti-sparkle` (example cookie scan)

2) Asset health checks (should NOT 404):
- `/styles.css`
- `/config.js`
- `/app.js`
- `/cookie-messages.js`
- `/assets/logo.png`
- `/assets/BaksoSapi.woff2`

3) Daily lock test:
- Refresh the same cookie link multiple times → you should get the SAME message for the day on that device.
- Open in another device → message can differ.

4) Story card:
- Tap “Make Story Card” → downloads a 1080×1920 image.

---

## If the page looks broken (quick fixes)

Most “broken layout” issues are caused by missing files or name mismatches.

Check:
1) Does `/styles.css` load (no 404)?
2) Does `/app.js` load?
3) Does `/cookie-messages.js` load?
4) Does `/assets/logo.png` load?

If any are 404:
- Confirm file names match exactly (GitHub Pages is case-sensitive)
- Confirm the files are in the repo root
- Hard refresh: Ctrl+Shift+R (or open in a new tab on mobile)

---

## How to add a new cookie later

1) Add the cookie to `cookie-messages.js`:
- Add metadata (cookie name)
- Add voice/tone rules or message pool for that cookie ID

2) Create a new QR destination:
- `https://<your-domain>/?cookie=<new-cookie-id>`

3) Print and test the QR.

---

## Files (what each does)

- `index.html` — layout and buttons
- `styles.css` — brand styling (includes Bakso Sapi font)
- `config.js` — centralized brand settings (handle, story color, max cookies/day)
- `cookie-messages.js` — cookie voices + message pools
- `app.js` — daily lock logic, copy/share/story card, local “collection” count
- `sw.js` — service worker for caching assets (event resilience)
- `assets/` — logo + Bakso font

---

## Notes for pop-ups

This experience is built to be fast, lightweight, and resilient on weak Wi-Fi.
The service worker (`sw.js`) caches key assets so the experience still loads if signal drops after first visit.
