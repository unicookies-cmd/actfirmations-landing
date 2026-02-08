/* cookie-messages.js (FIXED)
   - HOUSE_BLEND retains your original library
   - COOKIE_MESSAGES generated per cookie at runtime
   - FIX: do NOT inject vibe/category/filter words into the message text
*/

(function () {
  const clean = (arr) => arr.map(s => String(s).trim()).filter(Boolean);

  // 1) HOUSE BLEND (cleaned and deduped)
  const HOUSE_BLEND_RAW = [
    "I am allowed to start messy.",
    "My pace is still progress.",
    "I don’t need permission to evolve.",
    "Today I choose clarity over chaos.",
    "I can be nervous and still be powerful.",
    "What’s for me won’t miss me.",
    "I trust my taste. It’s guiding me.",
    "Small steps still move mountains.",
    "My work deserves to be seen.",
    "I finish what I start—one step at a time.",
    "I’m building something real.",
    "I am becoming undeniable.",
    "Direction over distraction.",
    "I am safe to be visible.",
    "I release perfection and keep the promise.",
    "I create even when it’s quiet.",
    "I choose discipline, not pressure.",
    "I can reset and still win today.",
    "I’m aligned with what’s next.",
    "I don’t chase—I attract.",
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
    "Your effort does not go unnoticed.",
    "Someone thought of you when this cookie was made.",
    "You deserve moments of sweetness.",
    "You are appreciated today — not someday.",
    "You bring something no one else can.",
    "This cookie exists because you matter.",
    "Today is better because you showed up.",
    "You are allowed to slow down.",
    "You are doing better than you think.",
    "You’re allowed to feel proud of yourself.",
    "You don’t have to earn belonging — you already have it.",
    "Your presence adds value here.",
    "Your care makes a difference."
  ];

  const HOUSE_BLEND = Array.from(new Set(clean(HOUSE_BLEND_RAW)));

  // 2) Cookie metadata (KEEP for UI + future targeting, but don't inject vibe into message text)
  const COOKIE_META = {
    "confetti-sparkle": {
      name: "Confetti Sparkle",
      anchor: "You sparkle. Let your light show.",
      vibe: ["bright", "playful", "magnetic", "celebratory", "radiant"]
    },
    "incognidough": {
      name: "Incognidough",
      anchor: "Be you. You are enough.",
      vibe: ["quiet", "grounded", "self-honoring", "real", "unmasked"]
    },
    "sunburst-love": {
      name: "Sunburst Love",
      anchor: "You matter.",
      vibe: ["warm", "tender", "heart-led", "safe", "seen"]
    },
    "moo-moon": {
      name: "Moo Moon",
      anchor: "Be fearless.",
      vibe: ["brave", "steady", "bold", "protective", "calm-courage"]
    },
    "starry-night": {
      name: "Starry Night",
      anchor: "Dream big.",
      vibe: ["visionary", "mystic", "expansive", "poetic", "future-facing"]
    },
    "banana-blossom": {
      name: "Banana Blossom",
      anchor: "Choose joy.",
      vibe: ["light", "fresh", "sunny", "simple"]
    },
    "smore-unity": {
      name: "S'more Unity",
      anchor: "More unity. More together.",
      vibe: ["community", "bond", "partners", "belonging", "we"]
    }
  };

  // 3) Frames (human + genuine; no “vibe injection”)
  const chakraFrames = [
    { stem: "I am", themes: ["safe", "steady", "held", "grounded", "supported"] },
    { stem: "I feel", themes: ["alive", "soft", "open", "true", "present"] },
    { stem: "I do", themes: ["move", "choose", "commit", "begin", "build"] },
    { stem: "I love", themes: ["kindly", "bravely", "without shrinking", "with boundaries", "with ease"] },
    { stem: "I speak", themes: ["clearly", "gently", "honestly", "with respect", "with courage"] },
    { stem: "I see", themes: ["the lesson", "the path", "the opening", "the truth"] },
    { stem: "I know", themes: ["I’m guided", "timing is real", "I’m not late", "I’m becoming", "this will make sense"] }
  ];

  const endings = [
    "even when the room is loud.",
    "without asking permission.",
    "one breath at a time.",
    "and I don’t have to rush it.",
    "because my nervous system deserves peace.",
    "and that is enough for today.",
    "in a way that feels like home.",
    "with softness and spine.",
    "like a secret that protects me.",
    "like light returning."
  ];

  const haikuLines = [
    ["Slow breath in the chest", "A quiet yes in the body", "Sweetness finds its place"],
    ["Not everything is urgent", "Your heart can set the tempo", "Walk like you belong"],
    ["A small pause matters", "You are not behind in life", "Begin where you are"],
    ["Even storms have ends", "Hold steady, then choose again", "The sky will open"],
    ["Hands warm, mind softer", "Let the day be human-sized", "You are allowed rest"],
    ["You are still growing", "Even in invisible ways", "Roots drink in silence"],
    ["Today, choose gentle", "Strong can look like breathing", "Quiet is a win"]
  ];

  // “Divination energy” without labels that feel like fortune/tarot copy
  const gentlePrompts = [
    "Today: choose the kinder route.",
    "If you feel rushed, return to your breath.",
    "A small yes is still a yes. Honor it.",
    "You’ll know it’s right when your body unclenches.",
    "Something good is already in motion—stay present.",
    "Your next step doesn’t need applause—just honesty.",
    "A door opens when you stop forcing it."
  ];

  // Cookie-specific injectors (these are REAL lines; safe to show)
  const cookieVoiceInjectors = {
    "confetti-sparkle": [
      "Make room for joy—your light belongs here.",
      "Be the sparkle on purpose.",
      "You don’t have to dim to be loved.",
      "Let it be obvious that you’re alive."
    ],
    "incognidough": [
      "You can be private and powerful.",
      "You’re allowed to be unseen while you heal.",
      "You don’t owe the world a performance.",
      "Be real, not readable."
    ],
    "sunburst-love": [
      "You deserve softness that stays.",
      "You matter without achieving anything today.",
      "Let love be practical: rest, water, boundaries.",
      "You are worthy of gentle attention."
    ],
    "moo-moon": [
      "Fear can ride along; it doesn’t get the wheel.",
      "Brave is a decision you can repeat.",
      "Stand tall—your future is listening.",
      "Courage can be quiet."
    ],
    "starry-night": [
      "Your vision is valid before it’s proven.",
      "Let wonder lead—then do the work.",
      "Dreams are blueprints in disguise.",
      "Look up. Your life is bigger than this hour."
    ],
    "banana-blossom": [
      "Joy can be disciplined—choose it again.",
      "Make the day lighter on purpose.",
      "Small laughter is medicine.",
      "You’re allowed to enjoy your own life."
    ],
    "smore-unity": [
      "You belong in the circle—pull up close.",
      "Choose togetherness over perfection.",
      "Let your people hold some of the weight.",
      "Unity is a daily practice."
    ]
  };

  function generateCookiePool(cookieId) {
    const meta = COOKIE_META[cookieId];
    const inject = cookieVoiceInjectors[cookieId] || [];
    const set = new Set();

    // Anchor & direct lines
    set.add(meta?.anchor || "A sweet message for you.");
    inject.forEach(s => set.add(s));
    gentlePrompts.forEach(s => set.add(s));

    // Chakra combinations (FIXED: no vibe appended)
    for (const frame of chakraFrames) {
      for (const theme of frame.themes) {
        for (let i = 0; i < endings.length; i++) {
          const line = `${frame.stem} ${theme} ${endings[i]}`
            .replace(/\s+/g, " ")
            .trim();
          set.add(line);
        }
      }
    }

    // Haikus
    for (const h of haikuLines) {
      set.add(`${h[0]}\n${h[1]}\n${h[2]}`);
    }

    // Premium “thoughtful positioning” moments (human, not gimmicky)
    const philosophy = [
      "Your body is giving you feedback. Listen with respect.",
      "Don’t confuse speed with certainty.",
      "The version of you that survived deserves celebration.",
      "Let your inner child be safe again—start with one gentle choice.",
      "Discipline isn’t punishment; it’s devotion to peace.",
      "You can outgrow a belief without apologizing.",
      "Being soft is not being weak; it’s being well."
    ];
    philosophy.forEach(s => set.add(s));

    // Blend in shared House language for coherence
    for (let i = 0; i < Math.min(50, HOUSE_BLEND.length); i++) {
      set.add(HOUSE_BLEND[i]);
    }

    // Expand safely to 150+ without adding metadata words
    const modifiers = ["today", "right now", "in this moment", "this morning", "this afternoon", "tonight"];
    const closers = ["You’re safe to begin.", "You’re safe to pause.", "You’re safe to be seen.", "You’re safe to try again."];

    const base = Array.from(set);
    for (let i = 0; i < base.length && set.size < 160; i++) {
      const b = base[i];
      if (b.includes("\n")) continue; // don’t ruin haikus
      set.add(`${b} (${modifiers[i % modifiers.length]})`);
      if (set.size < 175) set.add(`${b} ${closers[i % closers.length]}`);
    }

    return Array.from(set);
  }

  // Export to window
  window.UNI_COOKIE_META = COOKIE_META;

  const COOKIE_MESSAGES = {};
  Object.keys(COOKIE_META).forEach(id => {
    COOKIE_MESSAGES[id] = generateCookiePool(id);
  });

  window.UNI_HOUSE_BLEND = HOUSE_BLEND;
  window.UNI_COOKIE_MESSAGES = COOKIE_MESSAGES;
})();
