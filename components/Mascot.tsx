"use client";

import { useRef, useEffect } from "react";
import { burstEmoji } from "@/lib/emoji-burst";

export function Mascot({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const lastInputAt = useRef(Date.now());
  const initialized = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    target.current = {
      x: window.innerWidth * 0.85,
      y: window.innerHeight * 0.4,
    };
    pos.current = { x: window.innerWidth * 0.85, y: window.innerHeight * 0.4 };
    lastPos.current = { ...pos.current };
    initialized.current = true;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX + 60;
      target.current.y = e.clientY - 60;
      lastInputAt.current = Date.now();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      target.current.x = t.clientX + 50;
      target.current.y = t.clientY - 70;
      lastInputAt.current = Date.now();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    let driftT = 0;
    const loop = () => {
      driftT += 0.012;
      const idleMs = Date.now() - lastInputAt.current;
      if (idleMs > 2200) {
        const cx = window.innerWidth * (window.innerWidth < 720 ? 0.78 : 0.85);
        const cy = window.innerHeight * 0.32;
        target.current.x = cx + Math.cos(driftT) * 80;
        target.current.y = cy + Math.sin(driftT * 2) * 40;
      }
      pos.current.x += (target.current.x - pos.current.x) * 0.06;
      pos.current.y += (target.current.y - pos.current.y) * 0.06;
      const dx = pos.current.x - lastPos.current.x;
      const dy = pos.current.y - lastPos.current.y;
      const movement = Math.hypot(dx, dy);
      if (movement > 0.5) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        let diff = targetAngle - angle.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        angle.current += diff * 0.1;
      }
      if (ref.current) {
        const size = ref.current.offsetWidth || 56;
        ref.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0)`;
        const inner = ref.current.querySelector<HTMLElement>(".body-rot");
        if (inner) inner.style.transform = `rotate(${angle.current * 0.3}deg)`;
      }
      lastPos.current.x = pos.current.x;
      lastPos.current.y = pos.current.y;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="mascot"
      ref={ref}
      aria-hidden="true"
      style={{ pointerEvents: "auto", cursor: "pointer" }}
      onClick={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r)
          burstEmoji(r.left + r.width / 2, r.top + r.height / 2, "spark", 10);
      }}
    >
      <div className="body-rot" style={{ transformOrigin: "center" }}>
        <div className="body">
          <svg viewBox="-50 -50 100 100" width="100%" height="100%">
            <defs>
              <radialGradient id="spark-grad" cx="0.35" cy="0.35" r="0.7">
                <stop offset="0%" stopColor="#ffe4a0" />
                <stop offset="40%" stopColor="#ffb185" />
                <stop offset="100%" stopColor="#c4b5fd" />
              </radialGradient>
              <filter id="spark-glow">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle r="44" fill="url(#spark-grad)" opacity="0.18" />
            <path
              d="M 0,-42 C 4,-14 14,-4 42,0 C 14,4 4,14 0,42 C -4,14 -14,4 -42,0 C -14,-4 -4,-14 0,-42 Z"
              fill="url(#spark-grad)"
              stroke="#1c130c"
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#spark-glow)"
            />
            <g>
              <ellipse cx="-7" cy="-3" rx="2.6" ry="3.4" fill="#1c130c" />
              <ellipse cx="7" cy="-3" rx="2.6" ry="3.4" fill="#1c130c" />
              <circle cx="-6" cy="-4" r="0.9" fill="#fff" />
              <circle cx="8" cy="-4" r="0.9" fill="#fff" />
            </g>
            <path
              d="M -5,5 Q 0,9 5,5"
              stroke="#1c130c"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="-12" cy="3" r="3" fill="#ff8aaa" opacity="0.5" />
            <circle cx="12" cy="3" r="3" fill="#ff8aaa" opacity="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
