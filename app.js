/* app.js */
const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const cookieLineEl = el("cookieLine");
const collectionLineEl = el("collectionLine");
const toastEl = el("toast");

const getParam = (name) => new URL(window.location.href).searchParams.get(name);
const dayKey = () => new Date().toISOString().split('T')[0];

function getTodaysMessage(cookieId) {
  const pool = window.UNI_COOKIE_MESSAGES[cookieId] || window.UNI_HOUSE_BLEND;
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
  const scanned = JSON.parse(localStorage.getItem(key) || "[]");
  if (!scanned.includes(cookieId)) {
    scanned.push(cookieId);
    localStorage.setItem(key, JSON.stringify(scanned));
  }
  const count = scanned.length;
  collectionLineEl.textContent = `You scanned ${count} of 7 cookies today.`;
}

(function init() {
  const cookieId = getParam("cookie");
  const meta = window.UNI_COOKIE_META[cookieId];

  if (meta) {
    cookieLineEl.textContent = `${meta.name} • Today’s message`;
    markScanned(cookieId);
  } else {
    cookieLineEl.style.display = "none";
  }

  // The final message is pulled directly from the clean library
  affEl.textContent = getTodaysMessage(cookieId);
})();
