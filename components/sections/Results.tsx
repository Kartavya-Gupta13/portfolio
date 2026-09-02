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
 * Analytics clip. Rendered with no `src` and `preload="none"` so nothing is
 * fetched until it is nearly on screen; `muted`/`loop`/`playsInline` are set
 * imperatively because React drops them as JSX attributes and iOS Safari
 * refuses to autoplay without the real `muted` attribute.
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

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = results.video.src;
          if (!still) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div className="results-video-shell">
      <video
        ref={ref}
        width={results.video.width}
        height={results.video.height}
        preload="none"
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
