"use client";

import { useRef, useState, CSSProperties, ReactNode } from "react";

function YTShape() {
  return (
    <svg viewBox="-50 -34 100 68">
      <rect
        x="-46"
        y="-26"
        width="92"
        height="52"
        rx="14"
        fill="#e94d4d"
        stroke="#1c130c"
        strokeWidth="2.5"
      />
      <path d="M -10,-12 L 14,0 L -10,12 Z" fill="#fff" />
    </svg>
  );
}
function IGShape() {
  return (
    <svg viewBox="-50 -50 100 100">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#fdd05a" />
          <stop offset="40%" stopColor="#e94e7e" />
          <stop offset="100%" stopColor="#9b3aff" />
        </linearGradient>
      </defs>
      <rect
        x="-34"
        y="-34"
        width="68"
        height="68"
        rx="18"
        fill="url(#ig-grad)"
        stroke="#1c130c"
        strokeWidth="2.5"
      />
      <text
        x="0"
        y="11"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fontFamily="sans-serif"
        fill="#fff"
        style={{ letterSpacing: "-0.04em" }}
      >
        IG
      </text>
    </svg>
  );
}
function XShape() {
  return (
    <svg viewBox="-50 -50 100 100">
      <rect x="-34" y="-34" width="68" height="68" rx="14" fill="#1c130c" />
      <path
        d="M -16,-16 L 16,16 M 16,-16 L -16,16"
        stroke="#fff"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function LIShape() {
  return (
    <svg viewBox="-50 -50 100 100">
      <rect
        x="-34"
        y="-34"
        width="68"
        height="68"
        rx="10"
        fill="#0a66c2"
        stroke="#1c130c"
        strokeWidth="2"
      />
      <text
        x="0"
        y="13"
        textAnchor="middle"
        fontSize="34"
        fontWeight="800"
        fontFamily="sans-serif"
        fill="#fff"
        style={{ letterSpacing: "-0.04em" }}
      >
        Li
      </text>
    </svg>
  );
}
function PlaneShape() {
  return (
    <svg viewBox="-50 -50 100 100">
      <path
        d="M -42,-6 L 42,-30 L 8,8 L 42,32 L -42,12 L -10,-2 Z"
        fill="#fff"
        stroke="#1c130c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M -42,12 L -10,-2 L 8,8 Z"
        fill="#f0d8b8"
        stroke="#1c130c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function StarShape() {
  return (
    <svg viewBox="-50 -50 100 100">
      <path
        d="M 0,-38 L 11,-12 L 38,-7 L 17,10 L 23,38 L 0,22 L -23,38 L -17,10 L -38,-7 L -11,-12 Z"
        fill="#ffd24c"
        stroke="#1c130c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="0" r="6" fill="#fff5b0" />
    </svg>
  );
}

const SHAPES: Record<string, ReactNode> = {
  yt: <YTShape />,
  ig: <IGShape />,
  x: <XShape />,
  li: <LIShape />,
  plane: <PlaneShape />,
  star: <StarShape />,
};

interface Props {
  kind: string;
  style: CSSProperties;
  size: number;
  rot: number;
  dur: number;
  delay: number;
  dx: number;
  dy: number;
  dy2: number;
  hideOnMobile?: boolean;
  onClick?: (e: React.PointerEvent) => void;
}

export function FloatingObject({
  kind,
  style,
  size,
  rot,
  dur,
  delay,
  dx,
  dy,
  dy2,
  hideOnMobile,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef({
    down: false,
    sx: 0,
    sy: 0,
    baseX: 0,
    baseY: 0,
    moved: 0,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const r = ref.current!.getBoundingClientRect();
    const parent = (ref.current!.offsetParent ||
      ref.current!.parentElement) as HTMLElement;
    const parentR = parent.getBoundingClientRect();
    drag.current = {
      down: true,
      sx: e.clientX,
      sy: e.clientY,
      baseX: r.left - parentR.left,
      baseY: r.top - parentR.top,
      moved: 0,
    };
    try {
      ref.current!.setPointerCapture(e.pointerId);
    } catch {}
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const dxm = e.clientX - drag.current.sx;
    const dym = e.clientY - drag.current.sy;
    drag.current.moved = Math.max(drag.current.moved, Math.hypot(dxm, dym));
    if (drag.current.moved > 3) {
      setDragPos({ x: drag.current.baseX + dxm, y: drag.current.baseY + dym });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    drag.current.down = false;
    try {
      ref.current!.releasePointerCapture(e.pointerId);
    } catch {}
    if (drag.current.moved < 5) onClick?.(e);
  };

  const dragged = dragPos !== null;

  const baseStyle: CSSProperties = dragged
    ? {
        position: "absolute",
        left: dragPos.x,
        top: dragPos.y,
        width: size,
        height: size,
        right: "auto",
        bottom: "auto",
      }
    : ({
        ...style,
        width: size,
        height: size,
        "--dur": `${dur}s`,
        "--delay": `${delay}s`,
        "--rot": `${rot}deg`,
        "--dx": `${dx}px`,
        "--dy": `${dy}px`,
        "--dy2": `${dy2}px`,
      } as CSSProperties);

  return (
    <div
      ref={ref}
      className={`floater ${hideOnMobile ? "hide-mobile" : ""} ${dragged ? "dragged" : ""}`}
      style={baseStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {SHAPES[kind] ?? SHAPES.star}
    </div>
  );
}
