"use client";

import { useEffect, useRef } from "react";
import { initBriefing } from "@/lib/briefing.js";
import { briefing } from "@/lib/content";

export default function Briefing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initBriefing(ref.current);
  }, []);

  return (
    <div className="brief" ref={ref} role="region" aria-label="Mission briefing: who I am, what I do, how I can help">
      <div className="brief-bar">
        <span className="brief-led" aria-hidden="true" />
        <span className="brief-title">MISSION BRIEFING: MYO MIN THU @ DJ</span>
        <button type="button" className="brief-sound" aria-pressed="true">
          <span className="brief-wave" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="brief-sound-label">Replay with sound</span>
        </button>
      </div>
      <ol className="brief-screen">
        {briefing.map((b) => (
          <li key={b.text} className="brief-line">
            <span className="brief-label">{b.label}</span>
            <span className="brief-text">{b.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
