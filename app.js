/* app.js */
const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const cookieLineEl = el("cookieLine");
const collectionLineEl = el("collectionLine");
const toastEl = el("toast");
const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");
const storyBtn = el("storyBtn");

const CFG = window.UNI_CONFIG || {
  brandHandle: "@eatunicookies",
  storyBg: "#2aace2",
  maxCookiesPerDay: 7
};

function dayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getParam(name) {
  return (new URL(window.location.href).searchParams.get(name) || "").trim();
}

function getTodaysMessage(cookieId) {
  const pool = (cookieId && window.UNI_COOKIE_MESSAGES[cookieId]) ? window.UNI_COOKIE_MESSAGES[cookieId] : window.UNI_HOUSE_BLEND;
  if (!pool || pool.length === 0) return "A sweet message for you.";

  const key = `unicookies_msg_${cookieId || "default"}_${dayKey()}`;
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  localStorage.setItem(key, chosen);
  return chosen;
}

function renderCollectionLine() {
  const raw = localStorage.getItem(`unicookies_scanned_${dayKey()}`);
  const count = raw ? JSON.parse(raw).length : 0;
  if (count > 0) {
    collectionLineEl.textContent = `You scanned ${Math.min(count, CFG.maxCookiesPerDay)} of ${CFG.maxCookiesPerDay} cookies today.`;
  }
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

// Actions (Copy, Share) simplified for brevity
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(affEl.textContent);
  toastEl.style.display = "block";
  setTimeout(() => toastEl.style.display = "none", 1400);
});

(function init() {
  const cookieId = getParam("cookie");
  const meta = window.UNI_COOKIE_META[cookieId];

  if (meta) {
    cookieLineEl.textContent = `${meta.name} • Today’s message`;
    markScanned(cookieId);
  } else {
    cookieLineEl.style.display = "none";
  }

  renderCollectionLine();
  affEl.textContent = getTodaysMessage(cookieId);
})();
