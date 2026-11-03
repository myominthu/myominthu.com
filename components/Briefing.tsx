"use client";

import { useEffect, useRef } from "react";
import { initBriefing } from "@/lib/briefing.js";
import { briefing } from "@/lib/content";

export default function Briefing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initBriefing(ref.current);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="brief" ref={ref} role="region" aria-label="Mission briefing: current role">
      <div className="brief-bar">
        <span className="brief-led" aria-hidden="true" />
        <span className="brief-title">MISSION BRIEFING: ILBC HOLDING</span>
        <button type="button" className="brief-play" aria-pressed="false">
          <span className="brief-wave" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="brief-play-label">Play audio briefing</span>
        </button>
      </div>
      <ol className="brief-screen">
        {briefing.map((b) => (
          <li key={b.label} className="brief-line">
            <span className="brief-label">{b.label}</span>
            <span className="brief-text">{b.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
