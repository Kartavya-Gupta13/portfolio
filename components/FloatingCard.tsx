"use client";

import { AuraCard } from "./AuraCard";

export interface CardConfig {
  x: string;
  y: string;
  w: number;
  rot: number;
  dur: number;
  delay: number;
  depth: number;
  dx: number;
  dy: number;
  dz: number;
  rx: number;
  ry: number;
  aura: string;
  label: string;
  kind: string;
}

interface Props {
  config: CardConfig;
  idx: number;
}

export function FloatingCard({ config, idx }: Props) {
  const {
    x,
    y,
    w,
    rot,
    dur,
    delay,
    depth,
    dx,
    dy,
    dz,
    rx,
    ry,
    aura,
    label,
    kind,
  } = config;
  return (
    <div
      className="card-parallax"
      style={
        {
          "--depth": depth,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        } as React.CSSProperties
      }
    >
      <div
        className="float-card"
        style={
          {
            left: x,
            top: y,
            "--card-w": `${w}px`,
            "--card-h": `${w * 1.42}px`,
            "--rz": `${rot}deg`,
            "--rx": `${rx}deg`,
            "--ry": `${ry}deg`,
            "--dur": `${dur}s`,
            "--delay": `${delay}s`,
            "--dx": `${dx}px`,
            "--dy": `${dy}px`,
            "--dz": `${dz}px`,
          } as React.CSSProperties
        }
      >
        <AuraCard
          aura={aura}
          label={label}
          num={idx + 1}
          total="∞"
          kind={kind}
        />
      </div>
    </div>
  );
}
