import { SectionMark } from "@/components/SectionMark";
import { WorkCard } from "@/components/WorkCard";

const AURAS = [
  "peach",
  "lavender",
  "dusk",
  "mint",
  "ocean",
  "fire",
  "rose",
  "electric",
];

interface Props {
  num: number;
  slug: string;
  italicWord: string;
  restTitle: string;
  kind: string;
  blurb: string;
  titles: string[];
  runtimes: string[];
}

export function WorkSection({
  num,
  slug,
  italicWord,
  restTitle,
  kind,
  blurb,
  titles,
  runtimes,
}: Props) {
  const cards = [1, 2, 3, 4].map((i) => ({
    aura: AURAS[(num * 4 + i - 1) % AURAS.length],
    num: i,
    kind,
    title: titles[i - 1] ?? `Project ${i}`,
    runtime: runtimes[i - 1] ?? "—",
  }));

  return (
    <section className="section work-section" id={slug}>
      <div className="section-inner">
        <SectionMark label={kind} />
        <div className="work-head">
          <div className="index">{String(num).padStart(2, "0")}</div>
          <h2>
            <em className="serif-i">{italicWord}</em>
            {restTitle ? " " + restTitle : ""}
          </h2>
          <div className="meta">{blurb}</div>
        </div>
        <div className="work-grid">
          {cards.map((c, i) => (
            <WorkCard key={i} {...c} revealDelay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
