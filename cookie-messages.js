/* cookie-messages.js */
(function () {
  const clean = (arr) => Array.from(new Set(arr.map(s => String(s).trim()).filter(Boolean)));
  const HOUSE_BLEND = clean(window.AFFIRMATIONS || []);

  const COOKIE_META = {
    "confetti-sparkle": { name: "Confetti Sparkle", keywords: ["joy", "light", "sparkle", "celebrate", "proud"] },
    "incognidough": { name: "Incognidough", keywords: ["unseen", "private", "real", "enough", "quiet"] },
    "sunburst-love": { name: "Sunburst Love", keywords: ["tender", "heart", "seen", "kindness", "love"] },
    "moo-moon": { name: "Moo Moon", keywords: ["brave", "fearless", "steady", "strong", "handled"] },
    "starry-night": { name: "Starry Night", keywords: ["dream", "vision", "timing", "evolve", "future"] },
    "banana-blossom": { name: "Banana Blossom", keywords: ["fresh", "laugh", "sweetness", "simple", "joy"] },
    "smore-unity": { name: "S'more Unity", keywords: ["together", "belong", "circle", "unity", "community"] }
  };

  function generateCookiePool(cookieId) {
    const meta = COOKIE_META[cookieId];
    if (!meta) return HOUSE_BLEND;

    // Filter the master list for messages that fit the cookie's "vibe" 
    // without actually appending the vibe words to the message.
    const themed = HOUSE_BLEND.filter(msg => 
      meta.keywords.some(k => msg.toLowerCase().includes(k))
    );

    // If the themed pool is small, mix in the rest of the blend to maintain variety
    return themed.length > 20 ? themed : HOUSE_BLEND;
  }

  window.UNI_COOKIE_META = COOKIE_META;
  window.UNI_HOUSE_BLEND = HOUSE_BLEND;
  window.UNI_COOKIE_MESSAGES = {};
  
  Object.keys(COOKIE_META).forEach(id => {
    window.UNI_COOKIE_MESSAGES[id] = generateCookiePool(id);
  });
})();
