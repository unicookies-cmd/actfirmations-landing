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
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "UniCookies — A Sweet Message",
        text: `${text}\n\nTag @eatunicookies 🍪`,
        url
      });
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(
        `${text}\n\nTag @eatunicookies 🍪\n${url}`
      );
      showToast("Share text copied!");
    } catch {
      showToast("Unable to share");
    }
  }
});

/* ---------------- Story Card (1080×1920) ---------------- */

async function makeStoryCard(cookieName, message) {
  const W = 1080;
  const H = 1920;
  const bg = "#2aace2";

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const logo = new Image();
  logo.src = "/assets/logo.png";
  await new Promise((res, rej) => {
    logo.onload = res;
    logo.onerror = rej;
  });

  try {
    await document.fonts.load('48px "Bakso Sapi"');
  } catch {}

  // Logo
  const lw = 260;
  const scale = lw / logo.width;
  const lh = logo.height * scale;
  ctx.drawImage(logo, (W - lw) / 2, 140, lw, lh);

  // Cookie name (only if provided)
  if (cookieName) {
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "700 38px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(cookieName, W / 2, 140 + lh + 36);
  }

  // Header
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "700 30px system-ui";
  ctx.fillText("A SWEET MESSAGE FOR YOU", W / 2, 140 + lh + 96);

  // Message
  let fontSize = 92;
  if (message.length > 70) fontSize = 76;
  if (message.length > 100) fontSize = 64;

  ctx.fillStyle = "#fff";
  ctx.font = `400 ${fontSize}px "Bakso Sapi", system-ui`;
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;

  const lines = wrapText(ctx, message, 860);
  let y = 520 + Math.max(0, (800 - lines.length * fontSize * 1.2) / 2);

  for (const line of lines) {
    ctx.fillText(line, W / 2, y);
    y += fontSize * 1.2;
  }

  ctx.shadowBlur = 0;

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "700 40px system-ui";
  ctx.fillText("Tag @eatunicookies", W / 2, H - 120);

  ctx.font = "500 28px system-ui";
  ctx.fillText("Share this moment", W / 2, H - 70);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "unicookies-story.png";
  a.click();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/* ---------------- Init ---------------- */

(function init() {
  const raw = getParam("cookie");
  const cookieId = normalizeCookieId(raw);
  const cookieName = prettyCookieName(cookieId);

  // 🔒 House Blend NOT displayed
  if (cookieId) {
    cookieLineEl.textContent = `${cookieName} • Today’s message`;
    cookieLineEl.style.display = "block";
  } else {
    cookieLineEl.style.display = "none";
  }

  markScanned(cookieId);
  renderCollectionLine();

  const msg = getTodaysMessage(cookieId);
  affEl.textContent = msg;

  storyBtn.addEventListener("click", () =>
    makeStoryCard(cookieName, msg)
  );
})();
