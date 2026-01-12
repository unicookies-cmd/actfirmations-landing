const AFFS = window.AFFIRMATIONS || [];

const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const toastEl = el("toast");

const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");

// Per-day lock key: same device + same day = same message
function dayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function storageKeyForToday() {
  return `unicookies_actfirmation_${dayKey()}`;
}

function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

function getTodaysAffirmation() {
  if (!AFFS.length) return "Add affirmations in affirmations.js";

  const key = storageKeyForToday();
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const chosen = AFFS[randomIndex(AFFS.length)];
  localStorage.setItem(key, chosen);
  return chosen;
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 1200);
}

function setAffirmation(text) {
  affEl.textContent = text;
}

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
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({ title: "UniCookies Act-firmations", text, url });
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      showToast("Share text copied!");
    } catch {
      showToast("Copy failed — try again");
    }
  }
});

// Init
setAffirmation(getTodaysAffirmation());
