"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Grid3x3, Maximize, Minimize, X } from "lucide-react";
import type { VarcampSlide } from "@/lib/varcamp-slides";

const W = 1920;
const H = 1080;

// Fits a fixed 1920×1080 slide into its box.
function useScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setScale(Math.min(width / W, height / H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

function Slide({ slide, scale }: { slide: VarcampSlide; scale: number }) {
  return (
    <div className="vc-canvas" style={{ width: W * scale, height: H * scale }}>
      <div
        className="vc-slide"
        style={{ transform: `scale(${scale})` }}
        dangerouslySetInnerHTML={{ __html: slide.html }}
      />
    </div>
  );
}

function Thumb({ slide, n, active, onPick }: { slide: VarcampSlide; n: number; active: boolean; onPick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useScale(ref);
  return (
    <button className={`vc-thumb${active ? " is-active" : ""}`} onClick={onPick} aria-label={`Slide ${n}: ${slide.title}`}>
      <div className="vc-thumb-box" ref={ref}>
        {scale > 0 && <Slide slide={slide} scale={scale} />}
      </div>
      <span>
        {n}. {slide.title}
      </span>
    </button>
  );
}

// Phones held upright: show every slide in one scrolling column instead.
function SlideList({ slides }: { slides: VarcampSlide[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="vc-list" ref={ref}>
      {scale > 0 &&
        slides.map((s, n) => (
          <div key={s.id} id={`slide-${n + 1}`} className="vc-list-item" aria-label={`Slide ${n + 1}: ${s.title}`} role="group">
            <Slide slide={s} scale={scale} />
          </div>
        ))}
    </div>
  );
}

function usePortraitPhone() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px) and (orientation: portrait)");
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return v;
}

export default function SlideDeck({ slides }: { slides: VarcampSlide[] }) {
  const phone = usePortraitPhone();
  if (phone) {
    return (
      <div className="vc-deck is-list">
        <header className="vc-bar">
          <a href="/" className="vc-home">
            ← Myo Min Thu <span>@ DJ</span>
          </a>
          <p className="vc-event">BarCamp Yangon 2026</p>
        </header>
        <SlideList slides={slides} />
        <p className="vc-hint">Turn your phone sideways to present one slide at a time.</p>
      </div>
    );
  }
  return <Presenter slides={slides} />;
}

function Presenter({ slides }: { slides: VarcampSlide[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scale = useScale(stageRef);
  const [i, setI] = useState(0);
  const [grid, setGrid] = useState(false);
  const [full, setFull] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const last = slides.length - 1;

  const go = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(last, n));
      setI(next);
      history.replaceState(null, "", `#slide-${next + 1}`);
    },
    [last]
  );

  // Open at #slide-N.
  useEffect(() => {
    const m = /^#slide-(\d+)$/.exec(location.hash);
    if (m) setI(Math.max(0, Math.min(last, Number(m[1]) - 1)));
  }, [last]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (grid) {
        if (e.key === "Escape") setGrid(false);
        return;
      }
      if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        go(i + 1);
      } else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) {
        e.preventDefault();
        go(i - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(last);
      else if (e.key === "f") toggleFull();
      else if (e.key === "g") setGrid(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen?.().catch(() => {});
  }

  const slide = slides[i];

  return (
    <div className={`vc-deck${full ? " is-full" : ""}`} ref={rootRef}>
      <header className="vc-bar">
        <a href="/" className="vc-home">
          ← Myo Min Thu <span>@ DJ</span>
        </a>
        <p className="vc-event">BarCamp Yangon 2026</p>
        <div className="vc-tools">
          <button onClick={() => setGrid(true)} aria-label="Show all slides" title="All slides (G)">
            <Grid3x3 size={20} aria-hidden="true" />
          </button>
          <button onClick={toggleFull} aria-label={full ? "Exit full screen" : "Full screen"} title="Full screen (F)">
            {full ? <Minimize size={20} aria-hidden="true" /> : <Maximize size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        className="vc-stage"
        ref={stageRef}
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x;
          const dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? i + 1 : i - 1);
        }}
        aria-roledescription="carousel"
        aria-label="Talk slides"
      >
        {scale > 0 && (
          <div key={slide.id} className="vc-fade" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}>
            <Slide slide={slide} scale={scale} />
          </div>
        )}
      </div>

      <footer className="vc-controls">
        <button onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous slide">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <div className="vc-progress" aria-hidden="true">
          <div style={{ width: `${((i + 1) / slides.length) * 100}%` }} />
        </div>
        <p className="vc-count" aria-live="polite">
          {i + 1} / {slides.length}
        </p>
        <button onClick={() => go(i + 1)} disabled={i === last} aria-label="Next slide">
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </footer>

      {grid && (
        <div className="vc-grid" role="dialog" aria-modal="true" aria-label="All slides">
          <div className="vc-grid-head">
            <p>All slides</p>
            <button onClick={() => setGrid(false)} aria-label="Close">
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <div className="vc-grid-list">
            {slides.map((s, n) => (
              <Thumb
                key={s.id}
                slide={s}
                n={n + 1}
                active={n === i}
                onPick={() => {
                  go(n);
                  setGrid(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
