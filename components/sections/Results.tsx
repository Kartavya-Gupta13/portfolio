"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionMark } from "@/components/SectionMark";
import { results } from "@/content/site";

/** Dashed rail label used above each sub-block. */
function Rail({ label }: { label: string }) {
  return (
    <div className="results-rail">
      <div className="results-rail-label">{label}</div>
      <div className="results-rail-line" />
    </div>
  );
}

function DownArrow() {
  return (
    <div className="results-arrow">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4v16" />
        <path d="M6 14l6 6 6-6" />
      </svg>
    </div>
  );
}

/**
 * Analytics clip. The poster paints the frame immediately, so the shell is
 * never an empty box while bytes are in flight. The source is faststart H.264
 * with no audio track, so it starts on the first chunk: the src is attached
 * as soon as the card is within 600px of the viewport (and idle-preloaded on
 * desktop after load), rather than waiting for the card to actually appear.
 * `muted`/`loop`/`playsInline` are set imperatively because React drops them
 * as JSX attributes and iOS Safari refuses to autoplay without the real
 * `muted` attribute.
 */
function AnalyticsVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.loop = true;
    el.playsInline = true;
    el.setAttribute("muted", "");

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData || conn?.effectiveType === "2g") return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const attach = () => {
      if (!el.src) el.src = results.video.src;
    };

    // Attach well before the clip scrolls in so the fetch overlaps the scroll.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attach();
          if (!still) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);

    // Desktop: warm the clip once the page is idle, same as the card previews.
    let cancelWarm: (() => void) | undefined;
    const warm = () => {
      if (window.innerWidth <= 720) return;
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (w.requestIdleCallback && w.cancelIdleCallback) {
        const id = w.requestIdleCallback(attach);
        cancelWarm = () => w.cancelIdleCallback!(id);
      } else {
        const id = window.setTimeout(attach, 1200);
        cancelWarm = () => window.clearTimeout(id);
      }
    };
    if (document.readyState === "complete") warm();
    else window.addEventListener("load", warm, { once: true });

    return () => {
      io.disconnect();
      window.removeEventListener("load", warm);
      cancelWarm?.();
    };
  }, []);

  return (
    <div className="results-video-shell">
      <video
        ref={ref}
        poster={results.video.poster}
        width={results.video.width}
        height={results.video.height}
        preload="metadata"
      />
    </div>
  );
}

export function Results() {
  return (
    <section className="section" id={results.slug}>
      <div className="section-inner">
        <SectionMark label={results.kind} />

        <div className="work-head results-head">
          <div className="index">{String(results.num).padStart(2, "0")}</div>
          <h2>
            <em className="serif-i">{results.italicWord}</em>.
          </h2>
          <div className="meta">{results.blurb}</div>
        </div>

        <div className="results-stats">
          {results.stats.map((s) => (
            <div className="results-stat" key={s.label}>
              <div className={`results-aura ${s.aura}`} />
              <div className="results-stat-value">{s.value}</div>
              <div className="results-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="results-ba">
          <div className="results-ba-col">
            <Rail label={results.beforeAfterLabel} />
            {results.beforeAfter.map((pair) => (
              <div className="results-pair" key={pair.before.src}>
                <div className="results-tag">Before</div>
                <div className="results-frame">
                  <Image
                    src={pair.before.src}
                    alt={pair.before.alt}
                    width={pair.before.width}
                    height={pair.before.height}
                    sizes="(max-width: 860px) 100vw, (max-width: 1080px) calc(100vw - 356px), 744px"
                  />
                </div>
                <DownArrow />
                <div className="results-tag after">After</div>
                <div className="results-frame lift">
                  <Image
                    src={pair.after.src}
                    alt={pair.after.alt}
                    width={pair.after.width}
                    height={pair.after.height}
                    sizes="(max-width: 860px) 100vw, (max-width: 1080px) calc(100vw - 356px), 744px"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="results-sticky">
            <Rail label={results.videoLabel} />
            <AnalyticsVideo />
          </div>
        </div>

        <div className="results-process-block">
          <Rail label={results.processLabel} />
          <div className="results-process">
            {results.process.map((step) => (
              <div className="results-step" key={step.title}>
                <div className="results-step-title">{step.title}</div>
                <div className="results-step-frame">
                  {step.images.map((img) => (
                    <Image
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 279px"
                    />
                  ))}
                </div>
                <div className="results-step-caption">{step.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
