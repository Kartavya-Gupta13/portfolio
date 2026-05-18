"use client";

import { useRef, useState, useEffect } from "react";
import { AuraCard } from "./AuraCard";
import { burstEmoji } from "@/lib/emoji-burst";

interface Props {
  aura: string;
  num: number;
  kind: string;
  title: string;
  runtime: string;
  revealDelay?: number;
}

export function WorkCard({
  aura,
  num,
  kind,
  title,
  runtime,
  revealDelay = 0,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slug = kind.toLowerCase().replace(/ /g, "-");
  const computedSrc = `videos/${slug}-${num}.mp4`;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile scroll-driven auto-flip
  useEffect(() => {
    if (!isMobile) {
      setFlipped(false);
      return;
    }
    const check = () => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const center = (r.top + r.bottom) / 2;
      const vc = window.innerHeight / 2;
      const inFocus =
        Math.abs(center - vc) < window.innerHeight * 0.28 &&
        r.top < window.innerHeight &&
        r.bottom > 0;
      setFlipped(inFocus);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isMobile]);

  // Hover preview (desktop)
  useEffect(() => {
    if (isMobile || !previewRef.current) return;
    if (hovering && previewLoaded && !videoError) {
      previewRef.current.play().catch(() => {});
    } else {
      previewRef.current.pause();
      previewRef.current.currentTime = 0.05;
    }
  }, [hovering, previewLoaded, isMobile, videoError]);

  // Back-face video
  useEffect(() => {
    if (!videoRef.current) return;
    if (flipped && !videoError) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [flipped, videoError]);

  const handleClick = (e: React.MouseEvent) => {
    if (flipped || isMobile) return;
    e.stopPropagation();
    burstEmoji(
      e.clientX,
      e.clientY,
      kind.includes("GEN")
        ? "spark"
        : kind.includes("SHORT")
          ? "fire"
          : "media",
      6,
    );
    setFlipped(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(false);
  };

  const previewVisible = !isMobile && hovering && previewLoaded && !videoError;

  return (
    <div
      ref={cardRef}
      className={`work-card ${flipped ? "flipped" : ""}`}
      style={{ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="face front">
        <AuraCard aura={aura} num={num} kind={kind} total={4}>
          {!isMobile && !videoError && (
            <video
              ref={previewRef}
              className="video-preview"
              src={computedSrc}
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setPreviewLoaded(true)}
              onError={() => setVideoError(true)}
              style={{ opacity: previewVisible ? 1 : 0 }}
            />
          )}

          <div
            className="play-big-overlay"
            style={{ opacity: previewVisible ? 0 : 1 }}
          >
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="rgba(255,251,244,0.94)"
                stroke="#1c130c"
                strokeWidth="2.5"
              />
              <path d="M 41,32 L 70,50 L 41,68 Z" fill="#1c130c" />
            </svg>
          </div>

          <div className="work-info">
            <div className="work-title">{title}</div>
            <div className="work-row">
              <span>{kind}</span>
              <span>{runtime}</span>
            </div>
          </div>

          <div className="tap-hint-mini">{isMobile ? "scroll" : "tap"}</div>
          <div className="tap-hint">play</div>
        </AuraCard>
      </div>

      <div className="face back">
        <button className="close" onClick={handleClose} aria-label="Close">
          ×
        </button>
        {!videoError ? (
          <video
            ref={videoRef}
            src={computedSrc}
            controls={!isMobile}
            muted={isMobile}
            loop={isMobile}
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className="video-placeholder">
            <div className="play-big" />
            <div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {title}
              </div>
              add your file at
              <br />
              <span style={{ opacity: 0.6, fontSize: 11 }}>{computedSrc}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
