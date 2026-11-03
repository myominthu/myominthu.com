"use client";

import { useEffect, useRef } from "react";
import { wroFinals, wroLabel, otherPlaces } from "@/lib/content";

// WRO finals on a real map (Mercator, Natural Earth 1:110m land, public/images/wro-map.svg).
// City positions are projected into the map's 1000 x 520 frame; the view crops to the region.
// Route map: dashed arcs link the finals in order, and a small WRO robot
// drives the route once when the map scrolls into view.

const VIEW = "180 130 700 350";

const START = { x: 656, y: 355, name: "Yangon" };

// Same order as wroFinals: 2018 Chiang Mai, 2019 Budapest, 2024 Izmir, 2025 Singapore.
const STOPS = [
  { x: 668, y: 346, label: { x: 676, y: 300, anchor: "start" as const } },
  { x: 324, y: 196, label: { x: 336, y: 168, anchor: "middle" as const } },
  { x: 359, y: 249, label: { x: 346, y: 278, anchor: "end" as const } },
  { x: 689, y: 423, label: { x: 674, y: 438, anchor: "end" as const } },
];

// Other trips, same order as otherPlaces: Jakarta, Bangkok, Vienna, Hanoi.
// Each has its true position and a numbered badge set off to one side.
const PLACES = [
  { x: 702, y: 455, bx: 734, by: 462 },
  { x: 674, y: 369, bx: 712, by: 384 },
  { x: 312, y: 191, bx: 284, by: 216 },
  { x: 697, y: 336, bx: 744, by: 344 },
];

const TRACK =
  "M656 355 Q660 340 668 346 " +
  "Q500 135 324 196 " +
  "Q370 214 359 249 " +
  "Q560 236 689 423";

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
            .join("; ")}. Other trips: ${otherPlaces
            .map((o) => `${o.place} ${o.year}${o.note ? ` (${o.note})` : ""}`)
            .join("; ")}.`}
        </title>

        <rect x="0" y="0" width="1000" height="520" className="track-ocean" />
        <image href="/images/wro-map.svg" x="0" y="0" width="1000" height="520" />

        {/* start */}
        <circle cx={START.x} cy={START.y} r="5" className="track-start" />
        <text x={START.x - 12} y={START.y + 30} textAnchor="end" className="track-label-small">
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

        {/* other trips */}
        {PLACES.map((p, i) => (
          <g key={otherPlaces[i].place} className="track-place">
            <line x1={p.x} y1={p.y} x2={p.bx} y2={p.by} className="track-leader" />
            <circle cx={p.x} cy={p.y} r="3.2" className="track-place-dot" />
            <circle cx={p.bx} cy={p.by} r="8" className="track-badge" />
            <text x={p.bx} y={p.by + 3.3} textAnchor="middle" className="track-badge-num">
              {otherPlaces[i].n}
            </text>
          </g>
        ))}

        {/* the WRO robot, drawn facing +x so rotate="auto" follows the route */}
        <g className="track-robot" aria-hidden="true">
          <g transform="scale(0.62)">
            <rect x="-15" y="-16" width="8" height="32" rx="2" className="robot-wheel" />
            <rect x="-12" y="-12" width="28" height="24" rx="5" className="robot-body" />
            <rect x="-12" y="-21" width="16" height="6" rx="2" className="robot-wheel" />
            <rect x="-12" y="15" width="16" height="6" rx="2" className="robot-wheel" />
            <rect x="2" y="-7" width="9" height="14" rx="2" className="robot-panel" />
            <circle cx="12.5" cy="0" r="3" className="robot-eye" />
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

      <div className="track-key">
        <p className="track-key-title">
          <span className="track-key-swatch" aria-hidden="true" />
          WRO International Finals, the robot&apos;s route
        </p>
        <p className="track-key-title track-key-sub">Other trips</p>
        <ol className="track-key-list">
          {otherPlaces.map((o) => (
            <li key={o.place}>
              <span className="track-key-num" aria-hidden="true">
                {o.n}
              </span>
              <span>
                <strong>{o.place}</strong>, {o.year}
                {o.note ? `: ${o.note}` : ""}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
