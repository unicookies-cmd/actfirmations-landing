const AFFS = window.AFFIRMATIONS || [];

const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const toastEl = el("toast");

const newBtn = el("newBtn");
const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");

// Pick your mode:
// "random" = changes every visit + New one button
// "daily"  = same affirmation each day
const MODE = "random"; // change to "daily" if you want true daily behavior

function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

function dailyIndex(max) {
  const d = new Date();
  const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return hash % max;
}

function pickAffirmation() {
  if (!AFFS.length) return "Add affirmations in affirmations.js";
  const idx = MODE === "daily" ? dailyIndex(AFFS.length) : randomIndex(AFFS.length);
  return AFFS[idx];
}

function setAffirmation(text) {
  affEl.textContent = text;
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 1200);
}

newBtn.addEventListener("click", () => setAffirmation(pickAffirmation()));

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
setAffirmation(pickAffirmation());
