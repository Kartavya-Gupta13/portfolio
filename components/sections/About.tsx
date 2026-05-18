import Image from "next/image";
import { SectionMark } from "@/components/SectionMark";
import { site } from "@/content/site";

export function About() {
  return (
    <section className="section about" id="about">
      <div className="section-inner">
        <SectionMark label="ABOUT" />
        <div className="about-grid">
          <div className="about-photo">
            <Image
              src="/images/portrait.jpg"
              alt="Kartavya Gupta"
              fill
              style={{ objectFit: "cover", objectPosition: "55% 30%" }}
              sizes="(max-width: 860px) 100vw, 40vw"
              priority
            />
            <div className="photo-tag">
              <span className="dot" />
              Kartavya
            </div>
          </div>

          <div className="about-text">
            <h2>
              a strategist who can{" "}
              <em className="serif-i wiggle" style={{ cursor: "pointer" }}>
                actually
              </em>{" "}
              execute.
            </h2>
            <p>
              Most strategy decks die in a Google Drive folder. Mine ship —
              because I run the full pipeline myself. Research, ideation,
              scripting, editing, uploading, distribution. No handoffs lost in
              translation, no &ldquo;the vibe got watered down somewhere&rdquo;.
            </p>
            <p>
              I make content for{" "}
              <em className="serif-i">YouTube, Instagram, TikTok, X</em> and{" "}
              <em className="serif-i">LinkedIn</em> — each one with its own
              rhythm, audience, and edit logic. The thread that holds it
              together is taste, and an obsession with the small choices that
              make a piece feel inevitable.
            </p>
            <div className="skills">
              {site.skills.map((s) => (
                <span key={s} className="skill-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
