const AFFS = window.AFFIRMATIONS || [];

const el = (id) => document.getElementById(id);
const affEl = el("affirmation");
const toastEl = el("toast");

const copyBtn = el("copyBtn");
const shareBtn = el("shareBtn");
const storyBtn = el("storyBtn");

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
  setTimeout(() => (toastEl.style.display = "none"), 1400);
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

/**
 * STORY CARD GENERATOR (1080 x 1920)
 * - Background: #2aace2
 * - Logo: /assets/logo.png
 * - Message: daily locked message
 * - Footer: "Tag @eatunicookies"
 */
async function makeStoryCard() {
  const W = 1080;
  const H = 1920;
  const bg = "#2aace2";
  const message = affEl.textContent || getTodaysAffirmation();

  // Make a canvas
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Load logo
  const logoImg = new Image();
  // Helps avoid tainting if you ever host assets elsewhere
  logoImg.crossOrigin = "anonymous";
  logoImg.src = "./assets/logo.png";

  await new Promise((resolve, reject) => {
    logoImg.onload = resolve;
    logoImg.onerror = reject;
  });

  // Optional: load Bakso Sapi if available
  // Even if it fails, we’ll fallback gracefully
  try {
    await document.fonts.load('48px "Bakso Sapi"');
  } catch {}

  // Layout system
  const safeTop = 140;
  const safeBottom = 180;

  // Draw logo (centered)
  const logoTargetW = 260; // adjust if you want bigger/smaller
  const scale = logoTargetW / logoImg.width;
  const logoW = logoImg.width * scale;
  const logoH = logoImg.height * scale;
  const logoX = (W - logoW) / 2;
  const logoY = safeTop;
  ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);

  // Header line
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = '700 34px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("A SWEET MESSAGE FOR YOU", W / 2, logoY + logoH + 40);

  // Message block (Bakso Sapi if loaded)
  const maxTextWidth = 860;
  const messageY = logoY + logoH + 140;

  // Choose font size based on length
  let fontSize = 96;
  if (message.length > 70) fontSize = 78;
  if (message.length > 100) fontSize = 66;

  ctx.fillStyle = "#ffffff";
  ctx.font = `400 ${fontSize}px "Bakso Sapi", system-ui, -apple-system, Segoe UI, Roboto, Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Wrap text
  const lines = wrapText(ctx, message, maxTextWidth);
  const lineHeight = Math.round(fontSize * 1.18);
  const totalHeight = lines.length * lineHeight;

  // Center the block vertically-ish (between header and footer)
  const contentTop = messageY;
  const contentBottom = H - safeBottom;
  const contentArea = contentBottom - contentTop;
  let startY = contentTop + Math.max(0, (contentArea - totalHeight) / 2);

  // Draw message lines with slight shadow for pop
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;

  for (const line of lines) {
    ctx.fillText(line, W / 2, startY);
    startY += lineHeight;
  }

  // Remove shadow for footer
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = '700 40px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Tag @eatunicookies", W / 2, H - 110);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = '500 28px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.fillText("Share this to enter our monthly drawing", W / 2, H - 60);

  // Download as PNG
  const dataUrl = canvas.toDataURL("image/png");
  downloadDataUrl(dataUrl, "unicookies-story.png");
  showToast("Story card saved — upload to Stories/TikTok!");
}

function wrapText(ctx, text, maxWidth) {
  // Handles normal spaces; also gracefully wraps long strings
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

      // If a single word is too long, hard-break it
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
    if (ctx.measureText(test).width <= maxWidth) {
      chunk = test;
    } else {
      if (chunk) chunks.push(chunk);
      chunk = ch;
    }
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

storyBtn.addEventListener("click", async () => {
  try {
    await makeStoryCard();
  } catch (e) {
    console.error(e);
    showToast("Couldn’t make card — try again");
  }
});

// Init
setAffirmation(getTodaysAffirmation());
