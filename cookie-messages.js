/* cookie-messages.js */
(function () {
  const clean = (arr) => Array.from(new Set(arr.map(s => String(s).trim()).filter(Boolean)));

  const HOUSE_BLEND = clean(window.AFFIRMATIONS || []);

  const COOKIE_META = {
    "confetti-sparkle": { name: "Confetti Sparkle", anchor: "You sparkle. Let your light show." },
    "incognidough": { name: "Incognidough", anchor: "Be you. You are enough." },
    "sunburst-love": { name: "Sunburst Love", anchor: "You matter." },
    "moo-moon": { name: "Moo Moon", anchor: "Be fearless." },
    "starry-night": { name: "Starry Night", anchor: "Dream big." },
    "banana-blossom": { name: "Banana Blossom", anchor: "Choose joy." },
    "smore-unity": { name: "S'more Unity", anchor: "More together." }
  };

  const humanTemplates = [
    "I am choosing to be [theme] [ending]",
    "I feel [theme] because I am [ending]",
    "I will [theme] [ending]",
    "Today, I [theme] [ending]",
    "It is safe for me to be [theme] [ending]"
  ];

  const themes = ["steady", "supported", "present", "honest", "clear", "gentle", "brave", "open"];
  const endings = [
    "even when the room is loud.",
    "without asking for permission.",
    "one breath at a time.",
    "and I don't have to rush it.",
    "in a way that feels like home.",
    "with softness and strength.",
    "because I deserve peace."
  ];

  const haikus = [
    "Slow breath in the chest\nA quiet yes in the body\nSweetness finds its place",
    "Not everything is urgent\nYour heart can set the tempo\nWalk like you belong",
    "A small pause matters\nYou are not behind in life\nBegin where you are"
  ];

  function generateCookiePool(cookieId) {
    const set = new Set();
    const meta = COOKIE_META[cookieId];
    
    set.add(meta.anchor);

    // Generate human-sounding sentences without "Vibe Tags"
    humanTemplates.forEach(temp => {
      themes.forEach(t => {
        const e = endings[Math.floor(Math.random() * endings.length)];
        set.add(temp.replace("[theme]", t).replace("[ending]", e));
      });
    });

    haikus.forEach(h => set.add(h));
    
    // Add House Blend for variety
    HOUSE_BLEND.forEach(msg => set.add(msg));

    return Array.from(set);
  }

  window.UNI_COOKIE_META = COOKIE_META;
  window.UNI_HOUSE_BLEND = HOUSE_BLEND;
  window.UNI_COOKIE_MESSAGES = {};
  
  Object.keys(COOKIE_META).forEach(id => {
    window.UNI_COOKIE_MESSAGES[id] = generateCookiePool(id);
  });
})();
