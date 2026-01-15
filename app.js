/* app.js — UniCookies "A Sweet Message"
   - Per-cookie, per-device, per-day message lock
   - Default = House Blend pool (NO label shown)
   - Cookie identity line shown ONLY when cookie param exists
   - Local-only collection behavior (7-cookie set)
   - Copy / Share / Story Card (1080×1920)
*/

const el = (id) => document.getElementById(id);

const affEl = el("affirmation");
const cookieLineEl = el("cookieLine");
const collectionLineEl = el("collectionLine");
const toastEl = el("toast");

const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");
const storyBtn = el("storyBtn");

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
  return Math.floor(Math.random() * max);
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 1400);
}

function getPool(cookieId) {
  if (cookieId && COOKIE_POOLS[cookieId]?.length) {
    return COOKIE_POOLS[cookieId];
  }
  return HOUSE_BLEND;
}

function getTodaysMessage(cookieId) {
  const pool = getPool(cookieId);
  if (!pool.length) return "A sweet message for you.";

  const key = storageKeyForToday(cookieId);
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const chosen = pool[randomIndex(pool.length)];
  localStorage.setItem(key, chosen);
  return chosen;
}

/* -------- Collection behavior (local only) -------- */

function scannedKeyForToday() {
  return `unicookies_scanned_${dayKey()}`;
}

function markScanned(cookieId) {
  if (!cookieId) return; // Default scans do not count
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
  try {
    const raw = localStorage.getItem(scannedKeyForToday());
    const arr = raw ? JSON.parse(raw) : [];
    const count = new Set(arr).size;

    if (count > 0) {
      collectionLineEl.textContent = `You scanned ${count} of 7 cookies today.`;
    } else {
      collectionLineEl.textContent = "";
    }
  } catch {
    collectionLineEl.textContent = "";
  }
}

/* ---------------- Actions ---------------- */

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(affEl.textContent);
    showToast("Copied!");
  } catch {
    const t = document.createElement("textarea");
    t.value = affEl.textContent;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    showToast("Copied!");
  }
});

shareBtn.addEventListener("click", async () => {
  const text = affEl.textContent;
  const url = window.location.
