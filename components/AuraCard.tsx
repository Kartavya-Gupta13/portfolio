import { ReactNode } from "react";

interface Props {
  aura: string;
  label?: string;
  num: number;
  total?: string | number;
  kind?: string;
  children?: ReactNode;
}

export function AuraCard({
  aura,
  label,
  num,
  total = "∞",
  kind,
  children,
}: Props) {
  return (
    <div className="card">
      <div className={`aura ${aura}`} />
      <div className="grain" />
      <div className="holo" />
      <svg className="star" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5l2.6 7.4 7.4.5-5.8 4.7 2 7.2L12 17.7l-6.2 3.6 2-7.2L2 9.4l7.4-.5z" />
      </svg>
      <div className="corner-tl">
        {kind || "ILLUS"} · {String(num).padStart(3, "0")}/{total}
      </div>
      <div className="corner-br">
        XP {String(10 + num * 3).padStart(2, "0")}
      </div>
      {label && <div className="pill">{label}</div>}
      {children}
    </div>
  );
}
