"use client";

import { useEffect, useRef } from "react";
import { wroFinals, wroLabel } from "@/lib/content";

// WRO finals on a real map (Mercator, Natural Earth 1:110m land, public/images/wro-map.svg).
// City positions are projected into the map's 1000 x 520 frame; the view crops to the region.
// A WRO-style black line links the finals in order, and one small robot drives it once
// when the map scrolls into view.

const VIEW = "170 110 660 410";

const START = { x: 671, y: 389, name: "Yangon" };

// Same order as wroFinals: 2018 Chiang Mai, 2019 Budapest, 2024 Izmir, 2025 Singapore.
const STOPS = [
  { x: 684, y: 379, label: { x: 700, y: 352, anchor: "start" as const } },
  { x: 307, y: 214, label: { x: 307, y: 186, anchor: "middle" as const } },
  { x: 345, y: 273, label: { x: 330, y: 304, anchor: "end" as const } },
  { x: 707, y: 463, label: { x: 707, y: 492, anchor: "middle" as const } },
];

const TRACK =
  "M671 389 C676 384 680 381 684 379 " +
  "C610 300 420 170 307 214 " +
  "C292 236 318 266 345 273 " +
  "C455 318 600 478 707 463";

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
      <svg className="track-svg" viewBox={VIEW} role="img" aria-labelledby="track-title">
        <title id="track-title">
          {`Map of the WRO International Finals reached by Myanmar teams from Yangon: ${wroFinals
            .map(wroLabel)
            .join("; ")}.`}
        </title>

        <image href="/images/wro-map.svg" x="0" y="0" width="1000" height="520" />

        {/* start */}
        <rect
          x={START.x - 7}
          y={START.y - 7}
          width="14"
          height="14"
          className="track-start"
        />
        <text x={START.x - 14} y={START.y + 18} textAnchor="end" className="track-label-small">
          {START.name}
        </text>

        <path d={TRACK} className="track-line" id="wro-route" />

        {STOPS.map((s, i) => {
          const f = wroFinals[i];
          return (
            <g key={f.year}>
              <rect
                x={s.x - 9}
                y={s.y - 9}
                width="18"
                height="18"
                className={`track-zone track-zone-${i}`}
              />
              <text
                x={s.label.x}
                y={s.label.y}
                textAnchor={s.label.anchor}
                className="track-year"
              >
                WRO {f.year}
              </text>
              <text
                x={s.label.x}
                y={s.label.y + 14}
                textAnchor={s.label.anchor}
                className="track-label-small"
              >
                {f.place}
              </text>
            </g>
          );
        })}

        {/* the robot, drawn facing +x so rotate="auto" follows the line */}
        <g className="track-robot" aria-hidden="true">
          <g transform="scale(0.5)">
            <rect x="-15" y="-16" width="8" height="32" rx="2" className="robot-wheel" />
            <rect x="-12" y="-12" width="28" height="24" rx="5" className="robot-body" />
            <rect x="-12" y="-21" width="16" height="6" rx="2" className="robot-wheel" />
            <rect x="-12" y="15" width="16" height="6" rx="2" className="robot-wheel" />
            <circle cx="11" cy="0" r="3.2" className="robot-eye" />
          </g>
          <animateMotion
            ref={motionRef}
            dur="5s"
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
            <span>{f.place}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
