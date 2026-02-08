/* app.js — UniCookies "A Sweet Message" (safe, preserves original UX)
   - Per-cookie, per-device, per-day message lock
   - Cookie identity shown only when cookie param exists
   - Local collection behavior (7-cookie set)
   - Copy / Share / Story Card (1080×1920)
   - Purges stored "undefined" etc
   - Shows a useful error if cookie-messages.js failed to load (instead of LOADING forever)
*/

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
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getParam(name) {
  const u = new URL(window.location.href);
  return (u.searchParams.get(name) || "").trim();
}

function haptic() {
  if (navigator.vibrate) navigator.vibrate(20);
}

function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  setTimeout(() => (toastEl.style.display = "none"), 1400);
}

/* -------- Storage cleanup (kills "undefined") -------- */
function purgeBadStoredMessages() {
  const BAD = new Set(["undefined", "null", "[object Object]", ""]);
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (!k) continue;
    if (!k.startsWith("unicookies_msg_")) continue;

    const v = (localStorage.getItem(k) ?? "").trim();
    if (BAD.has(v)) localStorage.removeItem(k);
  }
}

/* -------- Pools from cookie-messages.js -------- */
function getPoolsOrFail() {
  const META = window.UNI_COOKIE_META || {};
  const HOUSE_BLEND = window.UNI_HOUSE_BLEND || [];
  const COOKIE_POOLS = window.UNI_COOKIE_MESSAGES || {};

  const ok =
    typeof META === "object" &&
    Array.isArray(HOUSE_BLEND) &&
    HOUSE_BLEND.length > 0 &&
    typeof COOKIE_POOLS === "object";

  return { ok, META, HOUSE_BLEND, COOKIE_POOLS };
}

function normalizeCookieId(raw, META) {
  const id = String(raw || "").toLowerCase().trim();
  return META[id] ? id : "";
}

function prettyCookieName(cookieId, META) {
  return META[cookieId]?.name || "";
}

function storageKeyForToday(cookieId) {
  const cid = cookieId || "default";
  return `unicookies_msg_${cid}_${dayKey()}`;
}

function randomIndex(max) {
  const n = Number(max);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.floor(Math.random() * n);
}

function getPool(cookieId, HOUSE_BLEND, COOKIE_POOLS) {
  if (cookieId && Array.isArray(COOKIE_POOLS[cookieId]) && COOKIE_POOLS[cookieId].length) {
    return COOKIE_POOLS[cookieId];
  }
  return HOUSE_BLEND;
}

function getTodaysMessage(cookieId, HOUSE_BLEND, COOKIE_POOLS) {
  const pool = getPool(cookieId, HOUSE_BLEND, COOKIE_POOLS);
  if (!pool.length) return "A sweet message for you.";

  const key = storageKeyForToday(cookieId);
  const existing = localStorage.getItem(key);

  if (existing && existing !== "undefined" && existing.trim() !== "") return existing;

  const chosen = pool[randomIndex(pool.length)];
  localStorage.setItem(key, chosen);
  return chosen;
}

/* -------- Collection behavior -------- */
function scannedKeyForToday() {
  return `unicookies_scanned_${dayKey()}`;
}

function markScanned(cookieId) {
  if (!cookieId) return;
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
  if (!collectionLineEl) return;
  try {
    const raw = localStorage.getItem(scannedKeyForToday());
    const arr = raw ? JSON.parse(raw) : [];
    const count = new Set(Array.isArray(arr) ? arr : []).size;

    if (count > 0) {
      collectionLineEl.textContent =
        `You scanned ${Math.min(count, CFG.maxCookiesPerDay)} of ${CFG.maxCookiesPerDay} cookies today.`;
    } else {
      collectionLineEl.textContent = "";
    }
  } catch {
    collectionLineEl.textContent = "";
  }
}

/* -------- Copy / Share -------- */
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    haptic();
    const text = affEl?.textContent || "";
    if (!text || text.toUpperCase().includes("LOADING")) return showToast("Nothing to copy yet");

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied!");
    } catch {
      // Fallback
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      showToast("Copied!");
    }
  });
}

if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    haptic();
    const text = affEl?.textContent || "";
    if (!text || text.toUpperCase().includes("LOADING")) return showToast("Nothing to share yet");

    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "UniCookies — A Sweet Message",
          text: `${text}\n\nTag ${CFG.brandHandle} 🍪`,
          url
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n\nTag ${CFG.brandHandle} 🍪\n${url}`);
        showToast("Share text copied!");
      } catch {
        showToast("Unable to share");
      }
    }
  });
}

/* -------- Story Card -------- */
async function makeStoryCard(cookieName, message) {
  const W = 1080;
  const H = 1920;
  const bg = CFG.storyBg || "#2aace2";

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const logo = new Image();
  logo.src = "./assets/logo.png";
  await new Promise((res, rej) => { logo.onload = res; logo.onerror = rej; });

  try { await document.fonts.load('48px "Bakso Sapi"'); } catch {}

  const lw = 260;
  const scale = lw / logo.width;
  const lh = logo.height * scale;
  ctx.drawImage(logo, (W - lw) / 2, 140, lw, lh);

  if (cookieName) {
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "700 38px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(cookieName, W / 2, 140 + lh + 36);
  }

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "700 30px system-ui";
  ctx.fillText("A SWEET MESSAGE FOR YOU", W / 2, 140 + lh + 96);

  let fontSize = 92;
  if (message.length > 70) fontSize = 76;
  if (message.length > 100) fontSize = 64;

  ctx.fillStyle = "#fff";
  ctx.font = `400 ${fontSize}px "Bakso Sapi", system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;

  const lines = wrapText(ctx, message, 860);
  const lineHeight = fontSize * 1.18;

  let y = 520;
  for (const line of lines) {
    ctx.fillText(line, W / 2, y);
    y += lineHeight;
  }

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "700 40px system-ui";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(`Tag ${CFG.brandHandle}`, W / 2, H - 120);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "unicookies-story.png";
  a.click();
}

function wrapText(ctx, text, maxWidth) {
  const parts = String(text).split("\n");
  const finalLines = [];

  for (const part of parts) {
    const words = part.split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width <= maxWidth) line = test;
      else { if (line) finalLines.push(line); line = word; }
    }
    if (line) finalLines.push(line);
  }
  return finalLines;
}

/* -------- Init -------- */
(function init() {
  purgeBadStoredMessages();

  // If scripts are cached wrong / cookie-messages.js failed, don't stay on LOADING...
  const { ok, META, HOUSE_BLEND, COOKIE_POOLS } = getPoolsOrFail();
  if (!ok) {
    if (affEl) affEl.textContent = "Message system not loaded — refresh once.";
    return;
  }

  const cookieId = normalizeCookieId(getParam("cookie"), META);
  const cookieName = prettyCookieName(cookieId, META);

  if (cookieLineEl) {
    if (cookieId) {
      cookieLineEl.textContent = `${cookieName} • Today’s message`;
      cookieLineEl.style.display = "block";
    } else {
      cookieLineEl.style.display = "none";
    }
  }

  markScanned(cookieId);
  renderCollectionLine();

  const msg = getTodaysMessage(cookieId, HOUSE_BLEND, COOKIE_POOLS);
  if (affEl) affEl.textContent = msg;

  if (storyBtn) {
    storyBtn.addEventListener("click", () => {
      haptic();
      const current = affEl?.textContent || "";
      if (!current || current.toUpperCase().includes("LOADING")) return showToast("No message yet");
      makeStoryCard(cookieName, current).catch(() => showToast("Couldn’t make card — try again"));
    });
  }
})();
