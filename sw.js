Add subtle polish (no UX changes)

These are “premium touches” that match your brand ethos:

A) Fade-in message

In style.css:

.affirmation {
  animation: fadeUp .5s ease-out both;
}

@keyframes fadeUp {
  from { opacity:0; transform: translateY(6px); }
  to { opacity:1; transform:none; }
}

B) Haptic feedback (mobile only)

In app.js, on copy/share:

if (navigator.vibrate) navigator.vibrate(20);


Tiny. Emotional. Feels intentional.
