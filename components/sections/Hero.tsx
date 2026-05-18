"use client";

import { useRef, useEffect, useMemo } from "react";
import { FloatingCard, CardConfig } from "@/components/FloatingCard";
import { DancingWord } from "@/components/DancingWord";
import { burstEmoji } from "@/lib/emoji-burst";

const AURAS = [
  "peach",
  "lavender",
  "dusk",
  "mint",
  "ocean",
  "fire",
  "rose",
  "electric",
];

const PRESETS = [
  { x: "3%", y: "8%", w: 200, rot: -22, depth: 1.6, kind: "LONG FORM" },
  { x: "78%", y: "5%", w: 220, rot: 15, depth: 1.8, kind: "SHORT FORM" },
  { x: "4%", y: "50%", w: 230, rot: 18, depth: 2.0, kind: "GEN AI" },
  { x: "82%", y: "46%", w: 210, rot: -12, depth: 1.7, kind: "LONG FORM" },
  { x: "8%", y: "78%", w: 190, rot: -7, depth: 1.3, kind: "SHORT FORM" },
  { x: "72%", y: "76%", w: 220, rot: 22, depth: 1.5, kind: "GEN AI" },
  { x: "40%", y: "-6%", w: 180, rot: -8, depth: 2.2, kind: "LONG FORM" },
  { x: "48%", y: "92%", w: 200, rot: 8, depth: 2.4, kind: "SHORT FORM" },
  { x: "20%", y: "30%", w: 150, rot: -28, depth: 0.8, kind: "GEN AI" },
  { x: "68%", y: "28%", w: 160, rot: 24, depth: 0.9, kind: "LONG FORM" },
  { x: "18%", y: "64%", w: 140, rot: 10, depth: 0.7, kind: "SHORT FORM" },
  { x: "66%", y: "60%", w: 150, rot: -20, depth: 0.8, kind: "GEN AI" },
  { x: "88%", y: "24%", w: 170, rot: 32, depth: 1.1, kind: "LONG FORM" },
  { x: "-2%", y: "28%", w: 170, rot: -32, depth: 1.1, kind: "SHORT FORM" },
];

const LABELS = [
  "DAY 07",
  "DAY 14",
  "DAY 02",
  "DAY 09",
  "DAY 21",
  "DAY 03",
  "DAY 16",
  "DAY 05",
  "DAY 12",
  "DAY 19",
  "DAY 04",
  "DAY 11",
  "DAY 23",
  "DAY 08",
];

function buildHeroCards(count: number): CardConfig[] {
  return PRESETS.slice(0, Math.max(4, Math.min(count, PRESETS.length))).map(
    (p, i) => ({
      ...p,
      aura: AURAS[i % AURAS.length],
      label: LABELS[i],
      dur: 10 + (i % 6) * 2.5,
      delay: -(i * 1.3),
      dx: (i % 2 ? 1 : -1) * (8 + (i % 3) * 6),
      dy: -16 - (i % 4) * 6,
      dz: 20 + (i % 5) * 12,
      rx: ((i % 3) - 1) * 4,
      ry: ((i % 4) - 2) * 6,
    }),
  );
}

interface Props {
  density?: number;
  speed?: "slow" | "normal" | "fast";
  headlinePart1?: string;
  headlineItalic?: string;
  headlinePart2?: string;
}

const SPEED_MAP = { slow: 0.6, normal: 1, fast: 1.6 };

export function Hero({
  density = 14,
  speed = "fast",
  headlinePart1 = "what do your",
  headlineItalic = "stories",
  headlinePart2 = "say about who you really are?",
}: Props) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const cards = useMemo(() => buildHeroCards(density), [density]);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const loop = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    burstEmoji(e.clientX, e.clientY, "party", 10);
    const target = document.querySelector("#long-form");
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 60,
        behavior: "smooth",
      });
    }
  };

  const speedVal = SPEED_MAP[speed];

  return (
    <section className="hero" id="top">
      <div
        className="card-field"
        ref={fieldRef}
        style={{ "--speed": speedVal } as React.CSSProperties}
      >
        {cards.map((c, i) => (
          <FloatingCard key={i} idx={i} config={c} />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-name">
          <span className="avatar-mini" />
          <span className="ping" />
          <span>Kartavya Gupta · content strategist</span>
        </div>

        <h1>
          {headlinePart1}{" "}
          <em
            className="serif-i shimmer wiggle"
            onClick={(e) => burstEmoji(e.clientX, e.clientY, "spark", 8)}
          >
            {headlineItalic}
          </em>{" "}
          {headlinePart2}
        </h1>

        <p className="sub">
          Research · ideation · scripting · editing · distribution. I handle the
          full lifecycle of a content piece across{" "}
          <em
            className="serif-i"
            style={{ cursor: "pointer" }}
            onClick={(e) => burstEmoji(e.clientX, e.clientY, "media", 8)}
          >
            YouTube, Instagram, TikTok, X &amp; LinkedIn
          </em>{" "}
          — end to end. made for{" "}
          <DancingWord
            word="you"
            onClick={(e) => burstEmoji(e.clientX, e.clientY, "party", 12)}
          />
          .
        </p>

        <a className="cta" href="#long-form" onClick={handleCta}>
          see the work
          <span className="arrow">▶</span>
        </a>
      </div>
    </section>
  );
}
