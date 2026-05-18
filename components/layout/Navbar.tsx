"use client";

interface Props {
  palette: string;
  onPalette: (v: string) => void;
}

export function Navbar({ palette, onPalette }: Props) {
  return (
    <div className="nav-wrap">
      <nav className="nav">
        <a href="#top" className="nav-brand">
          <span className="dot" />
          Kartavya
        </a>
        <div className="nav-links">
          <a href="#about">about</a>
          <a href="#long-form">long form</a>
          <a href="#short-form">short form</a>
          <a href="#gen-ai">gen ai</a>
          <a href="#contact">contact</a>
        </div>
        <div className="nav-palette" role="group" aria-label="Palette">
          <button
            className={`sw-warm ${palette === "warm" ? "active" : ""}`}
            onClick={() => onPalette("warm")}
            aria-label="Warm"
            title="warm"
          />
          <button
            className={`sw-cosmic ${palette === "cosmic" ? "active" : ""}`}
            onClick={() => onPalette("cosmic")}
            aria-label="Cosmic"
            title="cosmic"
          />
          <button
            className={`sw-cream ${palette === "cream" ? "active" : ""}`}
            onClick={() => onPalette("cream")}
            aria-label="Cream"
            title="cream"
          />
        </div>
      </nav>
    </div>
  );
}
