const EMOJI_SETS: Record<string, string[]> = {
  spark: ["✨", "💫", "⭐", "🌟"],
  love: ["💖", "💗", "💕", "✨"],
  fire: ["🔥", "⚡", "✨", "💥"],
  media: ["🎬", "📸", "🎞️", "✨"],
  party: ["🎉", "✨", "💫", "🌟", "🪩"],
};

export function burstEmoji(
  x: number,
  y: number,
  kind: string = "spark",
  n: number = 8,
) {
  const pool = EMOJI_SETS[kind] ?? EMOJI_SETS.spark;
  for (let i = 0; i < n; i++) {
    const el = document.createElement("span");
    el.className = "emoji-puff";
    el.textContent = pool[Math.floor(Math.random() * pool.length)];
    el.style.left = x + "px";
    el.style.top = y + "px";
    const ang = (Math.random() * 2 - 1) * 1.2 - Math.PI / 2;
    const dist = 70 + Math.random() * 80;
    el.style.setProperty("--ex", Math.cos(ang) * dist + "px");
    el.style.setProperty("--ey", Math.sin(ang) * dist + "px");
    el.style.setProperty("--er", Math.random() * 60 - 30 + "deg");
    el.style.fontSize = 16 + Math.random() * 16 + "px";
    el.style.animationDelay = i * 30 + "ms";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}
