const AFFS = window.AFFIRMATIONS || [];

const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const modeNoteEl = el("modeNote");
const toastEl = el("toast");

const newBtn = el("newBtn");
const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");

// ====== Choose your mode ======
// MODE = "random" => new affirmation on every load + button
// MODE = "daily"  => same affirmation per day (changes each day)
const MODE = "random"; // change to "daily" if you prefer

function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Deterministic index based on date (so everyone sees "the daily" for that date)
function dailyIndex(max) {
  const d = new Date();
  const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  // Simple hash
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

  // Update share link
  const url = new URL(window.location.href);
  url.searchParams.set("a", text);
  shareBtn.href = url.toString();

  if (navigator.share) {
    shareBtn.onclick = async (e) => {
      e.preventDefault();
      try {
        await navigator.share({ title: "Inspiration Drop", text, url: window.location.href });
      } catch {}
    };
  } else {
    // Fallback: just open share URL (copyable)
    shareBtn.onclick = null;
  }
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 1200);
}

function init() {
  // If the URL already has an affirmation param, show it (useful for sharing)
  const params = new URLSearchParams(window.location.search);
  const shared = params.get("a");
  if (shared) {
    setAffirmation(shared);
    modeNoteEl.textContent = "Shared affirmation";
    return;
  }

  setAffirmation(pickAffirmation());
  modeNoteEl.textContent = MODE === "daily" ? "Daily mode: changes once per day" : "Random mode: changes every visit";
}

newBtn.addEventListener("click", () => setAffirmation(pickAffirmation()));

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(affEl.textContent);
    showToast("Copied!");
  } catch {
    // fallback
    const t = document.createElement("textarea");
    t.value = affEl.textContent;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    showToast("Copied!");
  }
});

init();
