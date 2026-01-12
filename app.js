const AFFS = window.AFFIRMATIONS || [];

const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const toastEl = el("toast");

const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");

// Same device + same day = same message
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

  // Optional cleanup: keep last 14 days
  try {
    const keepDays = 14;
    const now = new Date();
    const prefix = "unicookies_actfirmation_";

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith(prefix)) continue;

      const datePart = k.slice(prefix.length);
      const dt = new Date(datePart + "T00:00:00");
      const ageDays = (now - dt) / (1000 * 60 * 60 * 24);

      if (Number.isFinite(ageDays) && ageDays > keepDays) {
        localStorage.removeItem(k);
      }
    }
  } catch {
    // ignore cleanup errors
  }

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

  // Native share sheet (works on most mobile browsers)
  if (navigator.share) {
    try {
      await navigator.share({
        title: "UniCookies — A Sweet Message For You",
        text: `${text}\n\nTag @eatunicookies 🍪`,
        url
      });
    } catch {}
  } else {
    // fallback: copy share text
    try {
      await navigator.clipboard.writeText(`${text}\n\nTag @eatunicookies 🍪\n${url}`);
      showToast("Share text copied!");
    } catch {
      showToast("Copy failed — try again");
    }
  }
});

// Init
setAffirmation(getTodaysAffirmation());
