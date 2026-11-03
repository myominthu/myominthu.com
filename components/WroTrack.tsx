"use client";

import { useEffect, useRef } from "react";
import { wroFinals, wroLabel } from "@/lib/content";

// WRO finals on a real map (Mercator, Natural Earth 1:110m land, public/images/wro-map.svg).
// City positions are projected into the map's 1000 x 520 frame; the view crops to the region.
// Airline-style route map: dashed flight arcs link the finals in order, and a small plane
// flies the route once when the map scrolls into view.

const VIEW = "140 150 760 370";

const START = { x: 671, y: 389, name: "Yangon" };

// Same order as wroFinals: 2018 Chiang Mai, 2019 Budapest, 2024 Izmir, 2025 Singapore.
const STOPS = [
  { x: 684, y: 379, label: { x: 700, y: 352, anchor: "start" as const } },
  { x: 307, y: 214, label: { x: 307, y: 186, anchor: "middle" as const } },
  { x: 345, y: 273, label: { x: 330, y: 304, anchor: "end" as const } },
  { x: 707, y: 463, label: { x: 707, y: 492, anchor: "middle" as const } },
];

const TRACK =
  "M671 389 Q678 366 684 379 " +
  "Q500 160 307 214 " +
  "Q356 234 345 273 " +
  "Q570 262 707 463";

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

        <rect x="0" y="0" width="1000" height="520" className="track-ocean" />
        <image href="/images/wro-map.svg" x="0" y="0" width="1000" height="520" />

        {/* start */}
        <circle cx={START.x} cy={START.y} r="5" className="track-start" />
        <text x={START.x - 14} y={START.y + 18} textAnchor="end" className="track-label-small">
          {START.name}
        </text>

        <path d={TRACK} className="track-glow" />
        <path d={TRACK} className="track-line" id="wro-route" />

        {STOPS.map((s, i) => {
          const f = wroFinals[i];
          return (
            <g key={f.year}>
              <circle cx={s.x} cy={s.y} r="11" className={`track-pulse track-zone-${i}`} />
              <circle cx={s.x} cy={s.y} r="6.5" className={`track-zone track-zone-${i}`} />
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

        {/* the plane, turned to face +x so rotate="auto" follows the route */}
        <g className="track-robot" aria-hidden="true">
          <g transform="rotate(45) scale(0.95) translate(-12 -12)">
            <path
              className="track-plane"
              d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
            />
          </g>
          <animateMotion
            ref={motionRef}
            dur="6s"
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
