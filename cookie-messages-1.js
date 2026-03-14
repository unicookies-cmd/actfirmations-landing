/* cookie-messages-1.js — Generator (COMPLETE & HARDENED)
   - Updated logic for ALL cookie types.
   - Prevents "I am take" / "I release enjoy" grammar errors.
   - 20% "Kick Ass" Power frequency for all pools.
   - Exports UNI_COOKIE_META, UNI_HOUSE_BLEND, and UNI_COOKIE_MESSAGES.
*/

(function () {
  /* ---------------------------
     Cookie meta (UI only)
  --------------------------- */
  const COOKIE_META = {
    "confetti-sparkle": { name: "Confetti Sparkle", tone: "playful" },
    "incognidough":     { name: "Incognidough",     tone: "grounded" },
    "sunburst-love":    { name: "Sunburst Love",    tone: "tender" },
    "moo-moon":         { name: "Moo Moon",         tone: "brave" },
    "starry-night":     { name: "Starry Night",     tone: "visionary" },
    "banana-blossom":   { name: "Banana Blossom",   tone: "light" },
    "smore-unity":      { name: "S'more Unity",     tone: "unity" }
  };

  /* ---------------------------
     Anchor pool (Static thoughts)
  --------------------------- */
  const ANCHOR_MESSAGES = [
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
    "You are appreciated more than you know.",
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
    "I’m proud of my effort today.",
    "The blessings don't complete themselves; get to work.",
    "Stop waiting for the 'right' time; it's now."
  ];

  /* ---------------------------
     Generator Stems
  --------------------------- */
  const STEMS = [
    "I am",
    "I choose to",
    "I allow myself to",
    "I give myself permission to",
    "I trust my power to",
    "I release the need to",
    "I honor my path to",
    "I remember to",
    "I can",
    "I deserve to",
    "I return to",
    "I protect my space to",
    "I focus on",
    "I keep going so I can"
  ];

  const POWER_STEMS = [
    "Get your ass to",
    "It is time to",
    "Stop making excuses and",
    "You have the power to",
    "The vision requires you to",
    "Wake up and",
    "Stop playing small and",
    "Nobody is coming to do it for you, so",
    "Commit right now to",
    "Stop stalling and",
    "Your future self is begging you to"
  ];

  /* ---------------------------
     Generator Endings
  --------------------------- */
  const ENDINGS_BY_TONE = {
    playful: [
      "enjoy one small moment today.",
      "let myself celebrate the progress I made.",
      "make room for sweetness without guilt.",
      "allow joy to be practical and real.",
      "choose a lighter way to move through today."
    ],
    grounded: [
      "take the next step at my own pace.",
      "come back to my breath and reset.",
      "choose what is clear and simple.",
      "do one thing fully and let it be enough.",
      "protect my peace with steady boundaries."
    ],
    tender: [
      "speak to myself with kindness today.",
      "accept softness as strength.",
      "allow rest to count as progress.",
      "treat myself like someone I love.",
      "remember that I belong here."
    ],
    brave: [
      "take action even if I feel nervous.",
      "show up anyway, one step at a time.",
      "trust myself to handle what comes next.",
      "choose courage over comfort right now.",
      "keep going even when it’s imperfect."
    ],
    visionary: [
      "stay aligned with what matters most.",
      "choose clarity over chaos today.",
      "take the next step toward what I want.",
      "keep building—my progress is real.",
      "trust the timing while I grow."
    ],
    light: [
      "release pressure and keep moving.",
      "let today be easier than yesterday.",
      "allow myself to feel okay right now.",
      "stop forcing and start flowing again.",
      "choose relief in this moment."
    ],
    unity: [
      "let support in instead of doing it alone.",
      "choose connection over isolation today.",
      "remember I’m part of something meaningful.",
      "offer and receive kindness freely.",
      "trust that I’m supported more than I know."
    ]
  };

  const POWER_ENDINGS = [
    "work harder than you did yesterday.",
    "finish what you started.",
    "stop talking and start doing.",
    "execute the plan without hesitation.",
    "stop settling for 'good enough'.",
    "realize the dream won't work unless you do.",
    "demand more from yourself.",
    "turn your 'shoulds' into 'musts'.",
    "be your own biggest advocate.",
    "stop waiting for permission to lead.",
    "own the room before you even enter.",
    "outwork your own doubts.",
    "be undeniable in everything you touch."
  ];

  /* ---------------------------
     Grammar & Build Logic
  --------------------------- */
  const clean = (s) => String(s || "").replace(/\s+/g, " ").trim();

  function buildSentence(stem, ending) {
    let s = clean(stem);
    let e = clean(ending);
    const sLow = s.toLowerCase();
    const eLow = e.toLowerCase();

    // Prevent double "to" or handle "I am" transitions
    if (sLow.endsWith("to") && eLow.startsWith("to ")) {
      e = e.substring(3);
    } 
    else if (sLow === "i am" && !eLow.startsWith("to ") && !eLow.includes("ing ")) {
      s = "I am ready to";
    }
    else if (sLow === "i focus on" && !eLow.includes("ing ")) {
      s = "I focus on my power to";
    }
    else if (sLow === "i release" && !eLow.startsWith("the ") && !eLow.startsWith("my ")) {
      s = "I release the pressure to";
    }

    let out = `${s} ${e}`;
    out = out.replace(/\s+/g, " ").trim();
    return /[.!?]$/.test(out) ? out : `${out}.`;
  }

  /* ---------------------------
     Utilities
  --------------------------- */
  function seededRand(seedStr) {
    let h = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return function () {
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      return (h >>> 0) / 4294967296;
    };
  }

  function pick(arr, r) {
    return arr[Math.floor(r() * arr.length)];
  }

  function uniquePush(arr, set, value) {
    const v = clean(value);
    if (!v || set.has(v)) return;
    set.add(v);
    arr.push(v);
  }

  function generateForTone(tone, n, seedKey) {
    const r = seededRand(`${tone}::${seedKey}`);
    const ends = ENDINGS_BY_TONE[tone] || ENDINGS_BY_TONE.grounded;
    const out = [];
    const seen = new Set();

    for (let i = 0; i < n; i++) {
      // 20% "Kick Ass" Power injection
      const isPower = r() < 0.30;
      const stem = isPower ? pick(POWER_STEMS, r) : pick(STEMS, r);
      const ending = isPower ? pick(POWER_ENDINGS, r) : pick(ends, r);
      uniquePush(out, seen, buildSentence(stem, ending));
    }
    return out;
  }

  /* ---------------------------
     Final Pool Construction
  --------------------------- */
  const HOUSE_BLEND = ANCHOR_MESSAGES.map(clean).filter(Boolean);
  const COOKIE_MESSAGES = {};

  Object.keys(COOKIE_META).forEach((cookieId) => {
    const tone = COOKIE_META[cookieId]?.tone || "grounded";
    const generated = generateForTone(tone, 150, cookieId);
    const merged = [];
    const seen = new Set();
    
    HOUSE_BLEND.forEach(m => uniquePush(merged, seen, m));
    generated.forEach(m => uniquePush(merged, seen, m));
    COOKIE_MESSAGES[cookieId] = merged;
  });

  window.UNI_COOKIE_META = COOKIE_META;
  window.UNI_HOUSE_BLEND = HOUSE_BLEND;
  window.UNI_COOKIE_MESSAGES = COOKIE_MESSAGES;
})();
