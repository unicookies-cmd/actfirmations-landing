/* cookie-messages.js */
(function () {
  const clean = (arr) => Array.from(new Set(arr.map(s => String(s).trim()).filter(Boolean)));
  const HOUSE_BLEND = clean(window.AFFIRMATIONS || []);

  const COOKIE_META = {
    "confetti-sparkle": { name: "Confetti Sparkle", keywords: ["proud", "sparkle", "joy", "celebrate", "undeniable"] },
    "incognidough": { name: "Incognidough", keywords: ["quiet", "unseen", "invisible", "private", "enough"] },
    "sunburst-love": { name: "Sunburst Love", keywords: ["love", "tender", "kindness", "heart", "seen"] },
    "moo-moon": { name: "Moo Moon", keywords: ["brave", "strong", "handled", "steady", "fearless"] },
    "starry-night": { name: "Starry Night", keywords: ["dream", "timing", "future", "evolve", "vision"] },
    "banana-blossom": { name: "Banana Blossom", keywords: ["sweetness", "fresh", "joy", "laughter", "light"] },
    "smore-unity": { name: "S'more Unity", keywords: ["together", "belong", "unity", "community", "presence"] }
  };

  function generateCookiePool(cookieId) {
    const meta = COOKIE_META[cookieId];
    if (!meta) return HOUSE_BLEND;

    // Filter master list for messages that naturally fit the cookie's vibe
    const themed = HOUSE_BLEND.filter(msg => 
      meta.keywords.some(k => msg.toLowerCase().includes(k))
    );

    // Ensure variety by mixing in the full blend if the theme pool is small
    const finalPool = themed.length > 5 ? themed : HOUSE_BLEND;
    return finalPool;
  }

  window.UNI_COOKIE_META = COOKIE_META;
  window.UNI_HOUSE_BLEND = HOUSE_BLEND;
  window.UNI_COOKIE_MESSAGES = {};
  
  Object.keys(COOKIE_META).forEach(id => {
    window.UNI_COOKIE_MESSAGES[id] = generateCookiePool(id);
  });
})();
