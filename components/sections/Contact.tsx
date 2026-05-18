"use client";

import { SectionMark } from "@/components/SectionMark";
import { FloatingObject } from "@/components/FloatingObject";
import { DancingWord } from "@/components/DancingWord";
import { burstEmoji } from "@/lib/emoji-burst";
import { site } from "@/content/site";

const FLOATERS = [
  {
    kind: "yt",
    style: { left: "10%", top: "12%" },
    size: 64,
    rot: -10,
    dur: 9,
    delay: -1,
    dx: 18,
    dy: -20,
    dy2: -10,
  },
  {
    kind: "ig",
    style: { left: "84%", top: "16%" },
    size: 60,
    rot: 8,
    dur: 10,
    delay: -3,
    dx: -16,
    dy: -18,
    dy2: -8,
  },
  {
    kind: "x",
    style: { left: "8%", top: "70%" },
    size: 52,
    rot: -16,
    dur: 12,
    delay: -4,
    dx: 14,
    dy: -14,
    dy2: -6,
  },
  {
    kind: "li",
    style: { left: "86%", top: "68%" },
    size: 60,
    rot: -8,
    dur: 10,
    delay: -2,
    dx: -14,
    dy: -16,
    dy2: -8,
  },
  {
    kind: "plane",
    style: { left: "20%", top: "84%" },
    size: 56,
    rot: 12,
    dur: 11,
    delay: -1,
    dx: -18,
    dy: -18,
    dy2: -10,
    hideOnMobile: true,
  },
  {
    kind: "star",
    style: { left: "78%", top: "86%" },
    size: 48,
    rot: -6,
    dur: 9,
    delay: -3,
    dx: 12,
    dy: -12,
    dy2: -6,
    hideOnMobile: true,
  },
] as const;

const SOCIAL_KINDS = new Set(["yt", "tt", "ig", "x", "li"]);

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-field">
        {FLOATERS.map((o, i) => (
          <FloatingObject
            key={i}
            {...o}
            style={o.style as React.CSSProperties}
            hideOnMobile={"hideOnMobile" in o ? o.hideOnMobile : false}
            onClick={(e) =>
              burstEmoji(
                e.clientX,
                e.clientY,
                SOCIAL_KINDS.has(o.kind)
                  ? "party"
                  : o.kind === "star"
                    ? "spark"
                    : "love",
                8,
              )
            }
          />
        ))}
      </div>

      <div className="contact-inner">
        <SectionMark label="LET'S MAKE SOMETHING" />
        <h2>
          your next piece{" "}
          <em
            className="serif-i shimmer wiggle"
            style={{ cursor: "pointer" }}
            onClick={(e) => burstEmoji(e.clientX, e.clientY, "love", 10)}
          >
            starts
          </em>{" "}
          with{" "}
          <DancingWord
            word="you"
            onClick={(e) => burstEmoji(e.clientX, e.clientY, "party", 12)}
          />
          .
        </h2>
        <p className="sub">
          Tell me what you&rsquo;re building. I&rsquo;ll tell you how it lands.
        </p>
        <div className="contact-links">
          <a className="contact-link" href={`mailto:${site.email}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            email
          </a>
          <a
            className="contact-link"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.67H5.67v8.67h2.67zM7 8.5a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.84v-4.74c0-2.55-1.36-3.73-3.18-3.73-1.46 0-2.12.8-2.49 1.37V9.67h-2.67c.04.75 0 8.67 0 8.67h2.67v-4.84c0-.24.02-.48.09-.65.19-.48.63-.97 1.36-.97.96 0 1.35.73 1.35 1.8v4.66h2.87z" />
            </svg>
            linkedin
          </a>
        </div>
      </div>

      <footer>
        <svg viewBox="0 0 100 30" className="crane-foot">
          <path
            d="M 50,4 L 56,16 L 70,18 L 60,22 L 64,30 L 50,25 L 36,30 L 40,22 L 30,18 L 44,16 Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        © 2026 Kartavya Gupta · made with too much coffee.
      </footer>
    </section>
  );
}
