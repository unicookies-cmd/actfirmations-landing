/* app.js — PATCHED
   Fixes:
   - No-affirmation bug caused by missing #affirmation element (crash prevention)
   - “Undefined” messages saved to localStorage (self-heal + pool validation)
*/

const el = (id) => document.getElementById(id);

// Prefer #affirmation, but fall back safely
function getAffirmationElement() {
  return (
    el("affirmation") ||
    document.querySelector("[data-role='affirmation']") ||
    document.querySelector(".affirmation") ||
    null
  );
}

const affEl = getAffirmationElement();
const cookieLineEl = el("cookieLine");
const collectionLineEl = el("collectionLine");
const toastEl = el("toast");

const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");
const storyBtn = el("storyBtn");

// Config (future-proof)
const CFG = window.UNI_CONFIG || {
  brandHandle: "@eatunicookies",
  storyBg: "#2aace2",
  maxCookiesPerDay: 7
};

const META = window.UNI_COOKIE_META || {};
const HOUSE_BLEND = window.UNI_HOUSE_BLEND || [];
const COOKIE_POOLS = window.UNI_COOKIE_MESSAGES || {};

/* ---------------- Helpers ---------------- */

function dayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getParam(name) {
  const u = new URL(window.location.href);
  return (u.searchParams.get(name) || "").trim();
}

function normalizeCookieId(raw) {
  const id = String(raw || "").toLowerCase().trim();
  return META[id] ? id : "";
}

function prettyCookieName(cookieId) {
  return META[cookieId]?.name || "";
}

function storageKeyForToday(cookieId) {
  const cid = cookieId || "default";
  return `unicookies_msg_${cid}_${dayKey()}`;
}

function randomIndex(max) {
  const n = Number(max);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.floor(Math.random() * n);
}

function haptic() {
  if (navigator.vibrate) navigator.vibrate(20);
}

function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 1400);
}

// Ensure pool is always an array
function asArrayPool(maybePool) {
  return Array.isArray(maybePool) ? maybePool : [];
}

function getPool(cookieId) {
  const cookiePool = cookieId ? asArrayPool(COOKIE_POOLS[cookieId]) : [];
  const housePool = asArrayPool(HOUSE_BLEND);

  if (cookiePool.length) return cookiePool;
  if (housePool.length) return housePool;

  // Absolute fallback: never allow empty
  return ["A sweet message for you."];
}

function getTodaysMessage(cookieId) {
  const pool = getPool(cookieId);
  const key = storageKeyForToday(cookieId);

  const existing = localStorage.getItem(key);

  // Self-heal bad saved values
  if (existing && existing !== "undefined" && existing.trim() !== "") {
    return existing;
  }

  const chosen = pool[randomIndex(pool.length)] || "A sweet message for you.";
  localStorage.setItem(key, chosen);
  return chosen;
}

/* -------- Collection behavior (local only) -------- */

function scannedKeyForToday() {
  return `unicookies_scanned_${dayKey()}`;
}

function markScanned(cookieId) {
  if (!cookieId) return;
  try {
    const key = scannedKeyForToday();
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    const set = new Set(Array.isArray(arr) ? arr : []);
    set.add(cookieId);
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {}
}

function renderCollectionLine() {
  if (!collectionLineEl) return;
  try {
    const raw = localStorage.getItem(scannedKeyForToday());
    const arr = raw ? JSON.parse(raw) : [];
    const count = new Set(Array.isArray(arr) ? arr : []).size;

    if (count > 0) {
      collectionLineEl.textContent = `You scanned ${Math.min(count, CFG.maxCookiesPerDay)} of ${CFG.maxCookiesPerDay} cookies today.`;
    } else {
      collectionLineEl.textContent = "";
    }
  } catch {
    collectionLineEl.textContent = "";
  }
}

/* ---------------- Actions ---------------- */

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    haptic();
    const text = affEl?.textContent || "";
    if (!text) return showToast("Nothing to copy yet");

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied!");
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      showToast("Copied!");
    }
  });
}

if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    haptic();
    const text = affEl?.textContent || "";
    if (!text) return showToast("Nothing to share yet");

    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "UniCookies — A Sweet Message",
          text: `${text}\n\nTag ${CFG.brandHandle} 🍪`,
          url
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n\nTag ${CFG.brandHandle} 🍪\n${url}`);
        showToast("Share text copied!");
      } catch {
        showToast("Unable to share");
      }
    }
  });
}

/* ---------------- Story Card (unchanged) ---------------- */
// Keep your existing makeStoryCard + wrapText here…

/* ---------------- Init ---------------- */

(function init() {
  const cookieId = normalizeCookieId(getParam("cookie"));
  const cookieName = prettyCookieName(cookieId);

  if (cookieLineEl) {
    if (cookieId) {
      cookieLineEl.textContent = `${cookieName} • Today’s message`;
      cookieLineEl.style.display = "block";
    } else {
      cookieLineEl.style.display = "none";
    }
  }

  markScanned(cookieId);
  renderCollectionLine();

  const msg = getTodaysMessage(cookieId);

  // Don’t crash if the element is missing
  if (affEl) {
    affEl.textContent = msg;
  } else {
    // If you want: log for debugging without breaking UX
    console.warn("Affirmation element not found. Add id='affirmation' to the message element.");
  }

  if (storyBtn) {
    storyBtn.addEventListener("click", () => {
      haptic();
      if (!msg) return showToast("No message yet");
      makeStoryCard(cookieName, msg).catch(() => showToast("Couldn’t make card — try again"));
    });
  }
})();
