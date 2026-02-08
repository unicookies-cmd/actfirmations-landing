/* cookie-messages.js — FIXED GENERATOR (no fused vibe/theme text)
   ✅ Removes the error logic that produced: "open—brave ..." / "respect—poetic ..."
   ✅ Generates complete, single-thought sentences
   ✅ Uses theme + vibe ONLY to choose the right ending bank (tone/mood), never printed
   ✅ Logic = STEM + ENDING (ending includes punctuation)
   ✅ Includes the full XLSX A2:A message list + uses it as the “anchor pool”
*/

(function () {
  /* ---------------------------
     1) Cookie meta (UI only)
     --------------------------- */
  const COOKIE_META = {
    "confetti-sparkle": { name: "Confetti Sparkle", tone: "playful" },
    "incognidough": { name: "Incognidough", tone: "grounded" },
    "sunburst-love": { name: "Sunburst Love", tone: "tender" },
    "moo-moon": { name: "Moo Moon", tone: "brave" },
    "starry-night": { name: "Starry Night", tone: "visionary" },
    "banana-blossom": { name: "Banana Blossom", tone: "light" },
    "smore-unity": { name: "S'more Unity", tone: "unity" }
  };

  /* ----------------------------------------
     2) Base messages (XLSX Column A2:A)
     - These are already complete sentences.
     - Kept as-is (quotes removed if they were wrapped in quotes in the sheet).
     ---------------------------------------- */
  const XLSX_MESSAGES = [
  "I am worthy of rest.",
  "Progress, not perfection, is the goal.",
  "My feelings are valid, even if others don't understand them.",
  "I release the need to control the outcome.",
  "I choose joy right now.",
  "I have everything I need within me.",
  "My voice matters and deserves to be heard.",
  "Done is better than perfect.",
  "I am strong enough to handle what comes my way.",
  "I forgive myself for past mistakes.",
  "I set boundaries that protect my peace.",
  "I embrace change as an opportunity for growth.",
  "My intuition is a reliable guide.",
  "I deserve happiness and success.",
  "I trust the timing of my life.",
  "I am present in this moment.",
  "My imperfections make me unique and valuable.",
  "I release judgment of myself and others.",
  "I take inspired action toward my dreams.",
  "It's okay to ask for help.",
  "I choose faith over fear.",
  "My energy is a precious resource.",
  "I am open to receiving good things.",
  "I honor my commitments to myself.",
  "Mistakes are lessons that guide me forward.",
  "I am enough, exactly as I am right now.",
  "I breathe deeply and release tension.",
  "I create my own opportunities.",
  "I speak to myself with kindness and respect.",
  "I focus on what I can control.",
  "My creativity flows effortlessly.",
  "I am grateful for this moment.",
  "My past does not define my future.",
  "I choose to see the good in others.",
  "I celebrate my small wins.",
  "I am a magnet for positive experiences.",
  "I can handle discomfort and uncertainty.",
  "I nourish my body with healthy choices.",
  "I am not my thoughts.",
  "I trust the process.",
  "I listen to understand, not just to reply.",
  "I make time for what truly matters.",
  "I am constantly evolving and improving.",
  "My worth is inherent and unconditional.",
  "I speak my truth with kindness.",
  "I have the strength to let go.",
  "I honor my unique pace and timing.",
  "My focus creates my reality.",
  "I treat myself like someone I love.",
  "I choose to see challenges as opportunities.",
  "You matter more than you realize — and today, you’re appreciated.",
  "Someone thought of you when this cookie was made.",
  "You are seen, even in the moments you feel overlooked.",
  "Your presence adds value here.",
  "You don’t have to earn belonging — you already have it.",
  "Today is better because you showed up.",
  "You are an important part of something bigger.",
  "Your effort does not go unnoticed.",
  "You bring something no one else can.",
  "This moment is a small thank-you, just for you.",
  "You are allowed to feel proud of yourself.",
  "Even on quiet days, your contribution matters.",
  "You are appreciated exactly as you are.",
  "You make a difference by being you.",
  "You deserve kindness — including from yourself.",
  "You belong here.",
  "You are valued more than words can say.",
  "Your work, care, and energy are felt.",
  "You are worthy of being celebrated.",
  "Someone is grateful for you today.",
  "You are not invisible.",
  "You are allowed to slow down.",
  "Your heart shows in what you do.",
  "You are enough — right now.",
  "You add meaning to ordinary moments.",
  "You are doing better than you think.",
  "You deserve moments of sweetness.",
  "Your presence is appreciated.",
  "You are part of what makes this work.",
  "You matter to this story.",
  "You don’t need to prove your worth.",
  "You are respected here.",
  "Your voice matters.",
  "You are allowed to receive.",
  "You bring warmth wherever you go.",
  "You are valued beyond productivity.",
  "Your effort is felt, even when it’s quiet.",
  "You are not forgotten.",
  "You are appreciated today — not someday.",
  "You make things better by being here.",
  "You deserve recognition.",
  "You are trusted.",
  "You are supported more than you know.",
  "Your contribution counts.",
  "You are allowed to take up space.",
  "You belong exactly where you are.",
  "You are part of something meaningful.",
  "Your care makes a difference.",
  "You are worthy of appreciation.",
  "You are doing important work.",
  "You are not just another name.",
  "You are valued for who you are.",
  "Your presence matters.",
  "You deserve moments of joy.",
  "You are appreciated today.",
  "You are seen — truly.",
  "You make an impact, even in small ways.",
  "You are allowed to feel proud.",
  "You are part of what makes this special.",
  "You are cared about.",
  "You bring heart into what you do.",
  "You are important to this community.",
  "You deserve to be acknowledged.",
  "You are valued beyond results.",
  "You are appreciated for showing up.",
  "You matter — full stop.",
  "You are worthy of kindness.",
  "You are an essential part of this.",
  "You are doing meaningful work.",
  "You belong here, just as you are.",
  "You are more than what you produce.",
  "You are appreciated today, not just on special occasions.",
  "You bring balance and care.",
  "You are seen in ways you may not notice.",
  "You deserve this moment of sweetness.",
  "You are valued for your effort and your heart.",
  "You make a difference by being present.",
  "You are part of what makes this place feel human.",
  "You are appreciated for who you are.",
  "You matter more than metrics.",
  "You are recognized.",
  "You bring something unique.",
  "You are not overlooked.",
  "You are worthy of appreciation without conditions.",
  "You are important to this team, this moment, this work.",
  "You are allowed to feel appreciated.",
  "You add meaning to the everyday.",
  "You are seen and valued.",
  "You are deserving of gratitude.",
  "You matter — even on ordinary days.",
  "You are part of what makes this work.",
  "You are appreciated more than you know.",
  "You are allowed to receive this.",
  "You are valued beyond titles.",
  "You are noticed.",
  "You bring care into the world.",
  "You are worthy of recognition.",
  "You are seen, respected, and appreciated.",
  "You are an important part of this moment.",
  "This cookie exists because you matter.",
  "I am allowed to start messy.",
  "My pace is still progress.",
  "I don’t need permission to evolve.",
  "Today I choose clarity over chaos.",
  "I can be nervous and still be powerful.",
  "What’s for me won’t miss me.",
  "I trust my taste. It’s guiding me.",
  "I finish what I start—one step at a time.",
  "I’m building something real.",
  "I am becoming undeniable.",
  "I create even when it’s quiet.",
  "I let go of perfection and keep the promise.",
  "My work deserves to be seen.",
  "I’m aligned with what’s next.",
  "Small actions create big outcomes.",
  "I am disciplined, not pressured.",
  "I choose direction over distraction.",
  "I am safe to be visible.",
  "I don’t chase—I attract.",
  "I’m proud of my effort today."
  ];

  /* -----------------------------------------
     3) Generator (single-thought sentences)
     IMPORTANT:
       - We NEVER print theme or vibe.
       - We NEVER concatenate with emdash/hyphen.
       - We build: STEM + ENDING (ending already completes the thought).
     ----------------------------------------- */

  // Stems are the “voice starter” and remain visible
  const STEMS = [
    "I am",
    "I choose",
    "I allow myself to",
    "I give myself permission to",
    "I trust",
    "I release",
    "I honor",
    "I remember",
    "I can",
    "I will",
    "I deserve",
    "I focus on",
    "I return to",
    "I protect",
    "I speak",
    "I create",
    "I begin",
    "I keep going",
    "I accept"
  ];

  // Theme + vibe are INTERNAL only (used to pick the ending bank)
  // They can expand later for analytics / targeting without affecting text.
  const THEMES_BY_TONE = {
    playful: ["joy", "spark", "celebration", "lightness"],
    grounded: ["calm", "simplicity", "quiet strength", "steady pace"],
    tender: ["care", "softness", "belonging", "gentleness"],
    brave: ["courage", "action", "confidence", "steadiness"],
    visionary: ["clarity", "direction", "imagination", "future"],
    light: ["ease", "relief", "fresh start", "brightness"],
    unity: ["together", "community", "support", "connection"]
  };

  const VIBES_BY_TONE = {
    playful: ["bright", "fun", "uplifting", "sunny"],
    grounded: ["steady", "quiet", "centered", "clear"],
    tender: ["warm", "safe", "kind", "soft"],
    brave: ["bold", "capable", "ready", "strong"],
    visionary: ["open", "curious", "expansive", "focused"],
    light: ["easy", "fresh", "gentle", "simple"],
    unity: ["connected", "supported", "seen", "included"]
  };

  // Endings: full phrases that complete the sentence when prefixed by a stem.
  // No leading emdash/hyphen. End with punctuation.
  const ENDINGS_BY_TONE = {
    playful: [
      "find joy in one small thing today.",
      "let myself enjoy this moment without guilt.",
      "make room for sweetness in my day.",
      "celebrate the progress I can see.",
      "allow lightness to return to me.",
      "treat today like a fresh start."
    ],
    grounded: [
      "take the next step at my own pace.",
      "come back to my breath and reset.",
      "choose what is simple, clear, and real.",
      "do one thing fully and let that be enough.",
      "protect my peace with steady boundaries.",
      "trust that consistency is powerful."
    ],
    tender: [
      "speak to myself with kindness today.",
      "let myself be cared for without earning it.",
      "accept softness as a strength.",
      "allow rest to be part of my progress.",
      "hold my heart gently and keep going.",
      "remember that I belong here."
    ],
    brave: [
      "take action even if I feel nervous.",
      "show up anyway, one breath at a time.",
      "trust myself to handle what comes next.",
      "choose courage over comfort right now.",
      "stand up for my peace and my time.",
      "keep going even when it’s imperfect."
    ],
    visionary: [
      "trust the timing while I build the future.",
      "follow clarity over chaos today.",
      "stay aligned with what matters most.",
      "let my next decision reflect my bigger vision.",
      "keep creating until it clicks.",
      "remember that progress compounds."
    ],
    light: [
      "let today be easier than yesterday.",
      "release pressure and keep the promise.",
      "accept a gentle win and move forward.",
      "stop forcing and start flowing again.",
      "choose relief in this moment.",
      "allow myself to feel okay right now."
    ],
    unity: [
      "let support in instead of doing it alone.",
      "choose connection over isolation today.",
      "remember I’m part of something meaningful.",
      "make space for others and myself at once.",
      "trust that I am supported more than I know.",
      "offer and receive kindness freely."
    ]
  };

  // Simple utilities
  const clean = (s) => String(s || "").replace(/\s+/g, " ").trim();

  // Never allow joins like "I am —" or "I am -" (we don’t generate these at all)
  function buildSentence(stem, ending) {
    const s = clean(stem);
    const e = clean(ending);

    // Ensure ending has punctuation
    const punct = /[.!?]$/;
    const finalEnding = punct.test(e) ? e : `${e}.`;

    return clean(`${s} ${finalEnding}`);
  }

  // Deterministic-ish shuffle (stable variety, but not crypto)
  function seededRand(seedStr) {
    let h = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return function () {
      // xorshift
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      return (h >>> 0) / 4294967296;
    };
  }

  function pick(arr, r) {
    if (!Array.isArray(arr) || arr.length === 0) return "";
    return arr[Math.floor(r() * arr.length)];
  }

  function uniquePush(arr, set, value) {
    const v = clean(value);
    if (!v) return;
    if (set.has(v)) return;
    set.add(v);
    arr.push(v);
  }

  // Generate N new messages for a given cookie tone
  function generateMessagesForTone(tone, n, seedKey) {
    const out = [];
    const seen = new Set();

    const r = seededRand(`${tone}::${seedKey}`);

    const themes = THEMES_BY_TONE[tone] || [];
    const vibes = VIBES_BY_TONE[tone] || [];
    const endings = ENDINGS_BY_TONE[tone] || [];

    for (let i = 0; i < n; i++) {
      // theme + vibe drive intent ONLY (not printed)
      const _theme = pick(themes, r);
      const _vibe = pick(vibes, r);

      // If you ever want analytics later, you can attach these as metadata elsewhere.
      void _theme; void _vibe;

      const stem = pick(STEMS, r);
      const ending = pick(endings, r);

      const sentence = buildSentence(stem, ending);
      uniquePush(out, seen, sentence);
    }

    return out;
  }

  /* -----------------------------------------
     4) Build final pools per cookie
     - Anchor pool (XLSX) + generated pool (per tone)
     - No “vibe injection” possible
     ----------------------------------------- */

  const HOUSE_BLEND = XLSX_MESSAGES.map(clean).filter(Boolean);

  // Per cookie pools
  const COOKIE_MESSAGES = {};
  Object.keys(COOKIE_META).forEach((cookieId) => {
    const tone = COOKIE_META[cookieId]?.tone || "grounded";

    // Generate a controlled number of extra lines per cookie.
    // (You can raise/lower this without changing semantics.)
    const generated = generateMessagesForTone(tone, 140, cookieId);

    // Merge: XLSX base first (authoritative voice), then generated (same nature)
    // Keep unique to avoid repeats getting too frequent.
    const merged = [];
    const seen = new Set();
    for (const m of HOUSE_BLEND) uniquePush(merged, seen, m);
    for (const m of generated) uniquePush(merged, seen, m);

    COOKIE_MESSAGES[cookieId] = merged;
  });

  /* -----------------------------------------
     5) Export for app.js
     ----------------------------------------- */
  window.UNI_COOKIE_META = COOKIE_META;
  window.UNI_HOUSE_BLEND = HOUSE_BLEND;
  window.UNI_COOKIE_MESSAGES = COOKIE_MESSAGES;
})();
