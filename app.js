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

// -------- Helpers --------
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
  return META[id] ? id : ""; // invalid → ""
}

function prettyCookieName(cookieId) {
  if (!cookieId) return "House Blend";
  return META[cookieId]?.name || "House Blend";
}

function storageKeyForToday(cookieId) {
  // Per-cookie, per-device, per-day lock
  const cid = cookieId || "house-blend";
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

function setMessage(text) {
  affEl.textContent = text;
}

function getPool(cookieId) {
  if (cookieId && COOKIE_POOLS[cookieId]?.length) return COOKIE_POOLS[cookieId];
  return HOUSE_BLEND;
}

function getTodaysMessage(cookieId) {
  const pool = getPool(cookieId);
  if (!pool.length) return "Add messages in cookie-messages.js";

  const key = storageKeyForToday(cookieId);
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const chosen = pool[randomIndex(pool.length)];
  localStorage.setItem(key, chosen);
  return chosen;
}

// -------- Collection behavior (local-only) --------
function scannedKeyForToday() {
  return `unicookies_scanned_${dayKey()}`;
}

function markScanned(cookieId) {
  if (!cookieId) return; // House Blend doesn't count toward 7-cookie set
  try {
    const key = scannedKeyForToday();
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    const set = new Set(Array.isArray(arr) ? arr : []);
    set.add(cookieId);
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch {
    // ignore
  }
}

function renderCollectionLine() {
  try {
    const key = scannedKeyForToday();
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    const set = new Set(Array.isArray(arr) ? arr : []);
    const count = set.size;

    if (count <= 0) {
      collectionLineEl.textContent = "";
      return;
    }

    collectionLineEl.textContent = `You scanned ${count} of 7 cookies today.`;
  } catch {
    collectionLineEl.textContent = "";
  }
}

// -------- Actions --------
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
        title: "UniCookies — A Sweet Message For You",
        text: `${text}\n\nTag @eatunicookies 🍪`,
        url
      });
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(`${text}\n\nTag @eatunicookies 🍪\n${url}`);
      showToast("Share text copied!");
    } catch {
      showToast("Copy failed — try again");
    }
  }
});

// -------- Story Card (1080×1920) --------
async function makeStoryCard(cookieName, message) {
  const W = 1080;
  const H = 1920;
  const bg = "#2aace2";

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Load logo
  const logoImg = new Image();
  logoImg.crossOrigin = "anonymous";
  logoImg.src = "./assets/logo.png";

  await new Promise((resolve, reject) => {
    logoImg.onload = resolve;
    logoImg.onerror = reject;
  });

  // Load Bakso Sapi if available
  try { await document.fonts.load('48px "Bakso Sapi"'); } catch {}

  // Layout
  const safeTop = 140;
  const safeBottom = 180;

  // Logo
  const logoTargetW = 260;
  const scale = logoTargetW / logoImg.width;
  const logoW = logoImg.width * scale;
  const logoH = logoImg.height * scale;
  const logoX = (W - logoW) / 2;
  const logoY = safeTop;
  ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);

  // Cookie name line
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = '700 38px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(cookieName, W / 2, logoY + logoH + 34);

  // Header
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = '700 30px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.fillText("A SWEET MESSAGE FOR YOU", W / 2, logoY + logoH + 86);

  // Message sizing
  const maxTextWidth = 860;
  const messageY = logoY + logoH + 180;

  let fontSize = 92;
  if (message.length > 70) fontSize = 76;
  if (message.length > 100) fontSize = 64;

  ctx.fillStyle = "#ffffff";
  ctx.font = `400 ${fontSize}px "Bakso Sapi", system-ui, -apple-system, Segoe UI, Roboto, Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const lines = wrapText(ctx, message, maxTextWidth);
  const lineHeight = Math.round(fontSize * 1.18);
  const totalHeight = lines.length * lineHeight;

  // Center in remaining space
  const contentTop = messageY;
  const contentBottom = H - safeBottom;
  const contentArea = contentBottom - contentTop;
  let startY = contentTop + Math.max(0, (contentArea - totalHeight) / 2);

  // Shadow for readability
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;

  for (const line of lines) {
    ctx.fillText(line, W / 2, startY);
    startY += lineHeight;
  }

  // Footer
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = '700 40px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Tag @eatunicookies", W / 2, H - 110);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = '500 28px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.fillText("Share this moment", W / 2, H - 60);

  // Download
  const dataUrl = canvas.toDataURL("image/png");
  downloadDataUrl(dataUrl, "unicookies-story.png");
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    const width = ctx.measureText(test).width;

    if (width <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);

      if (ctx.measureText(word).width > maxWidth) {
        lines.push(...breakLongWord(ctx, word, maxWidth));
        line = "";
      } else {
        line = word;
      }
    }
  }
  if (line) lines.push(line);
  return lines;
}

function breakLongWord(ctx, word, maxWidth) {
  const chunks = [];
  let chunk = "";
  for (const ch of word) {
    const test = chunk + ch;
    if (ctx.measureText(test).width <= maxWidth) chunk = test;
    else { if (chunk) chunks.push(chunk); chunk = ch; }
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// -------- Init --------
(function init() {
  const rawCookie = getParam("cookie");
  const cookieId = normalizeCookieId(rawCookie);

  const cookieName = prettyCookieName(cookieId);
  cookieLineEl.textContent = `${cookieName} • Today’s message`;

  // Mark scan for collection (only if cookie is one of the 7)
  markScanned(cookieId);
  renderCollectionLine();

  const msg = getTodaysMessage(cookieId);
  setMessage(msg);

  storyBtn.addEventListener("click", async () => {
    try {
      await makeStoryCard(cookieName, msg);
      showToast("Story card saved!");
    } catch (e) {
      console.error(e);
      showToast("Couldn’t make card — try again");
    }
  });
})();
