"use client";

import { MouseEvent } from "react";

interface Props {
  word: string;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

export function DancingWord({ word, onClick }: Props) {
  return (
    <span className="dance-word" onClick={onClick}>
      {word.split("").map((ch, i) => (
        <span
          key={i}
          className="dance-l"
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
