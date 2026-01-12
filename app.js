const AFFS = window.AFFIRMATIONS || [];

const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const toastEl = el("toast");

const newBtn = el("newBtn");
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

// Choose a random item index
function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Get today’s message (locked per device/day)
function getTodaysAffirmation() {
  if (!AFFS.length) return "Add affirmations in affirmations.js";

  const key = storageKeyForToday();
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const chosen = AFFS[randomIndex(AFFS.length)];
  localStorage.setItem(key, chosen);

  // Optional cleanup: keep storage from growing forever
  // Remove older keys (keep last ~14 days)
  try {
    const keepDays = 14;
    const now = new Date();
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith("unicookies_actfirmation_")) continue;

      const datePart = k.replace("unicookies_actfirmation_", "");
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

// "New one" will override today’s locked message *for this device* (still only lasts today)
function newOne() {
  if (!AFFS.length) return;

  const chosen = AFFS[randomIndex(AFFS.length)];
  localStorage.setItem(storageKeyForToday(), chosen);
  setAffirmation(chosen);
}

newBtn.addEventListener("click", newOne);

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
    // fallback: copy share text
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
