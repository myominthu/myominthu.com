"use client";

import { useEffect, useRef } from "react";
import { wroFinals, wroLabel } from "@/lib/content";

// A WRO-style line-following mat: black line on white, coloured stop zones.
// One small robot drives the route once when the track scrolls into view.

const TRACK =
  "M40 190 C140 190 150 80 250 80 C350 80 380 190 480 190 C580 190 610 80 710 80 C810 80 840 190 940 190";

const STOPS = [
  { x: 250, y: 80 },
  { x: 480, y: 190 },
  { x: 710, y: 80 },
  { x: 940, y: 190 },
];

export default function WroTrack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<SVGAnimateMotionElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const motion = motionRef.current;
    if (!wrap || !motion) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      wrap.dataset.state = "parked";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          wrap.dataset.state = "driving";
          motion.beginElement();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div className="track" ref={wrapRef} data-state="idle">
      <svg
        className="track-svg"
        viewBox="0 0 1000 270"
        role="img"
        aria-labelledby="track-title"
      >
        <title id="track-title">
          Route of Myanmar WRO teams to the International Finals: {wroFinals.map(wroLabel).join("; ")}.
        </title>

        {/* start zone */}
        <rect x="14" y="166" width="48" height="48" className="track-start" />
        <text x="38" y="248" className="track-label-small" textAnchor="middle">
          Yangon
        </text>

        <path d={TRACK} className="track-line" id="wro-route" />

        {STOPS.map((s, i) => {
          const f = wroFinals[i];
          const above = s.y < 135;
          const yearY = above ? s.y - 50 : s.y + 46;
          const cityY = above ? s.y - 28 : s.y + 68;
          return (
            <g key={f.year}>
              <rect
                x={s.x - 17}
                y={s.y - 17}
                width="34"
                height="34"
                className={`track-zone track-zone-${i}`}
              />
              <text x={s.x} y={yearY} textAnchor="middle" className="track-year">
                WRO {f.year}
              </text>
              <text x={s.x} y={cityY} textAnchor="middle" className="track-label-small">
                {f.place}
              </text>
            </g>
          );
        })}

        {/* the robot, drawn facing +x so rotate="auto" follows the line */}
        <g className="track-robot" aria-hidden="true">
          <rect x="-15" y="-16" width="8" height="32" rx="2" className="robot-wheel" />
          <rect x="-12" y="-12" width="28" height="24" rx="5" className="robot-body" />
          <rect x="-12" y="-21" width="16" height="6" rx="2" className="robot-wheel" />
          <rect x="-12" y="15" width="16" height="6" rx="2" className="robot-wheel" />
          <circle cx="11" cy="0" r="3.2" className="robot-eye" />
          <animateMotion
            ref={motionRef}
            dur="4.2s"
            begin="indefinite"
            fill="freeze"
            rotate="auto"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.45 0 0.25 1"
          >
            <mpath href="#wro-route" />
          </animateMotion>
        </g>
      </svg>

      <ol className="track-list">
        {wroFinals.map((f) => (
          <li key={f.year}>
            <span className="track-list-year">WRO {f.year}</span>
            <span>- {f.place}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
