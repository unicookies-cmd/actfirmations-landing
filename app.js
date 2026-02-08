/* app.js */
const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const cookieLineEl = el("cookieLine");
const collectionLineEl = el("collectionLine");
const toastEl = el("toast");
const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");
const storyBtn = el("storyBtn");

const CFG = window.UNI_CONFIG || { brandHandle: "@eatunicookies", storyBg: "#2aace2", maxCookiesPerDay: 7 };
const META = window.UNI_COOKIE_META || {};
const HOUSE_BLEND = window.UNI_HOUSE_BLEND || [];
const COOKIE_POOLS = window.UNI_COOKIE_MESSAGES || {};

function dayKey() { return new Date().toISOString().split('T')[0]; }
function getParam(name) { return (new URL(window.location.href).searchParams.get(name) || "").trim(); }

function getTodaysMessage(cookieId) {
  const pool = (cookieId && COOKIE_POOLS[cookieId]?.length) ? COOKIE_POOLS[cookieId] : HOUSE_BLEND;
  if (!pool.length) return "A sweet message for you."; // Hard fallback

  const key = `unicookies_msg_${cookieId || "default"}_${dayKey()}`;
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  localStorage.setItem(key, chosen);
  return chosen;
}

function markScanned(cookieId) {
  if (!cookieId) return;
  const key = `unicookies_scanned_${dayKey()}`;
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  if (!arr.includes(cookieId)) {
    arr.push(cookieId);
    localStorage.setItem(key, JSON.stringify(arr));
  }
}

function renderCollectionLine() {
  const raw = localStorage.getItem(`unicookies_scanned_${dayKey()}`);
  const count = raw ? JSON.parse(raw).length : 0;
  if (count > 0) {
    collectionLineEl.textContent = `You scanned ${Math.min(count, CFG.maxCookiesPerDay)} of ${CFG.maxCookiesPerDay} cookies today.`;
  }
}

// Copy Action
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(affEl.textContent);
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 1400);
});

(function init() {
  const rawId = getParam("cookie").toLowerCase();
  const cookieId = META[rawId] ? rawId : "";

  if (cookieId) {
    cookieLineEl.textContent = `${META[cookieId].name} • Today’s message`;
    cookieLineEl.style.display = "block";
    markScanned(cookieId);
  } else {
    cookieLineEl.style.display = "none";
  }

  renderCollectionLine();
  
  // FINAL FIX: Ensure message is never undefined
  const finalMsg = getTodaysMessage(cookieId);
  affEl.textContent = finalMsg || HOUSE_BLEND[0]; 
})();
