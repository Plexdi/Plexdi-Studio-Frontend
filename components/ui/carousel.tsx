'use client';
import { useState, useRef, useId, useEffect } from "react";

export interface SlideData {
  title: string;
  button?: string;
  src: string;   // e.g. /portfolio/banners/DripKaijuBanner.png
  link?: string;
}

/* ---------- Small thumbs bar ---------- */
function ThumbStrip({
  slides,
  current,
  onPick,
}: {
  slides: { title: string; src: string }[];
  current: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {slides.map((s, i) => (
        <button
          key={`${s.title}-${i}`}
          onClick={() => onPick(i)}
          className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-lg ring-1 transition
            ${i === current ? "ring-gray-900" : "ring-gray-200 hover:ring-gray-300"}`}
          title={s.title}
        >
          <img src={s.src} alt="" className="h-full w-full object-cover" />
          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[10px] text-white">
            {i + 1}
          </span>
        </button>
      ))}
    </div>
  );
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement | null>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  // FIX: give an initial value and allow null
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      const el = slideRef.current;
      if (!el) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      el.style.setProperty("--x", `${xRef.current}px`);
      el.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    // FIX: cleanup must not return a value
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = e.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = e.clientY - (r.top + Math.floor(r.height / 2));
  };
  const onLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { src, title, link, button = "View" } = slide;

  return (
    <li
      ref={slideRef}
      className="relative h-full w-full shrink-0 list-none"
      onClick={() => handleSlideClick(index)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: current !== index ? "scale(0.995) rotateX(6deg)" : "scale(1)",
        transition: "transform .4s cubic-bezier(.4,0,.2,1)",
        transformOrigin: "bottom",
      }}
      aria-label={title}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-[#111]"
        style={{
          transform:
            current === index
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none",
        }}
      >
        <img src={src} alt={title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        {current === index && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
        )}
      </div>

      <div
        className={`pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between transition-opacity ${
          current === index ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {title}
        </span>
        {link && (
          <span className="rounded-md bg-white/90 px-2 py-1 text-[11px] text-gray-800">
            {button} →
          </span>
        )}
      </div>
    </li>
  );
};

function CircleBtn({
  title,
  onClick,
  dir = "next",
}: {
  title: string;
  onClick: () => void;
  dir?: "prev" | "next";
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="h-9 w-9 rounded-full border border-gray-300 bg-white/90 text-gray-700 shadow-sm transition hover:bg-white hover:-translate-y-0.5 active:translate-y-0"
      aria-label={title}
    >
      <svg
        viewBox="0 0 24 24"
        className={`mx-auto h-5 w-5 ${dir === "prev" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function PortfolioCarousel({ slides }: { slides: SlideData[] }) {
  const [current, setCurrent] = useState(0);
  const id = useId();

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const jump = (i: number) => current !== i && setCurrent(i);

  return (
    <div className="relative mx-auto w-full max-w-6xl" aria-labelledby={`carousel-${id}`}>
      {/* 3:1 container */}
      <div className="relative aspect-[3/1] w-full overflow-hidden">
        <ul
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s, i) => (
            <Slide
              key={`${s.title}-${i}`}
              slide={s}
              index={i}
              current={current}
              handleSlideClick={jump}
            />
          ))}
        </ul>
      </div>

      {/* controls */}
      <div className="mt-3 flex w-full items-center justify-between">
        <div className="flex gap-2">
          <CircleBtn title="Previous" onClick={prev} dir="prev" />
          <CircleBtn title="Next" onClick={next} dir="next" />
        </div>
        <span className="text-xs text-gray-500">{slides.length} banners • 1500×500</span>
      </div>

      {/* NEW: thumbnails */}
      <ThumbStrip slides={slides} current={current} onPick={setCurrent} />
    </div>
  );
}
