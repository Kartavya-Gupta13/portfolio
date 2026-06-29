"use client";

import { useRef, useState, useEffect } from "react";
import { AuraCard } from "./AuraCard";

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
  const [hasFlipped, setHasFlipped] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissed = useRef(false);

  const slug = kind.toLowerCase().replace(/ /g, "-");
  const computedSrc = `/videos/${slug}-${num}.mp4`;
  const poster = `/images/posters/${slug}-${num}.jpg`;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-driven auto-flip for all devices
  useEffect(() => {
    const check = () => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const inFocus =
        r.top < window.innerHeight * 0.85 &&
        r.bottom > window.innerHeight * 0.15;
      if (!inFocus) {
        dismissed.current = false;
        setFlipped(false);
      } else if (!dismissed.current) {
        setFlipped(true);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Hover preview (desktop)
  useEffect(() => {
    if (isMobile || !previewRef.current) return;
    if (hovering && !videoError) {
      previewRef.current.play().catch(() => {});
    } else {
      previewRef.current.pause();
      previewRef.current.currentTime = 0.05;
    }
  }, [hovering, previewLoaded, isMobile, videoError]);

  // Mount back-face video lazily on first flip
  useEffect(() => {
    if (flipped) setHasFlipped(true);
  }, [flipped]);

  // Back-face video
  useEffect(() => {
    if (!videoRef.current) return;
    if (flipped && !videoError) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [flipped, videoError]);

  const handleClick = () => {
    if (!flipped) {
      dismissed.current = true;
      setFlipped(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismissed.current = true;
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
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
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

          <div className="tap-hint-mini">scroll</div>
          <div className="tap-hint">play</div>
        </AuraCard>
      </div>

      <div className="face back">
        <button className="close" onClick={handleClose} aria-label="Close">
          ×
        </button>
        {videoError ? (
          <div className="video-placeholder">
            <div className="play-big" />
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
              {title}
            </div>
          </div>
        ) : hasFlipped ? (
          <video
            ref={videoRef}
            src={computedSrc}
            poster={poster}
            controls
            muted
            loop={isMobile}
            playsInline
            preload="none"
            onError={() => setVideoError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className="video-placeholder">
            <div className="play-big" />
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
              {title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
