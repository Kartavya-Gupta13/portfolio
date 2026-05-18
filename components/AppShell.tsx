"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Mascot } from "@/components/Mascot";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WorkSection } from "@/components/sections/WorkSection";
import { Contact } from "@/components/sections/Contact";
import { workSections } from "@/content/site";

export function AppShell() {
  const [palette, setPalette] = useState("warm");
  const [mascot, setMascot] = useState(true);

  useEffect(() => {
    const map: Record<string, string> = {
      warm: "",
      cosmic: "cosmic",
      cream: "cream",
    };
    document.documentElement.setAttribute("data-palette", map[palette] ?? "");
  }, [palette]);

  return (
    <>
      <Navbar palette={palette} onPalette={setPalette} />
      <Mascot enabled={mascot} />
      <Hero />
      <About />
      {workSections.map((ws) => (
        <WorkSection key={ws.slug} {...ws} />
      ))}
      <Contact />
    </>
  );
}
