"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { carouselSlides, type Slide, type Tab } from "@/lib/content";

export function Carousel({
  slides = carouselSlides,
  onNavigate,
}: {
  slides?: Slide[];
  onNavigate?: (tab: Tab, sectionId?: string) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const width = el.clientWidth || 1;
      setIndex(Math.round(el.scrollLeft / width));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || slides.length < 2) return;
    const id = window.setInterval(() => {
      const el = scroller.current;
      if (!el || paused.current || document.hidden) return;
      const width = el.clientWidth;
      const next = (Math.round(el.scrollLeft / width) + 1) % slides.length;
      el.scrollTo({ left: next * width, behavior: "smooth" });
    }, 4500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  function goTo(next: number) {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }

  if (slides.length === 0) return null;

  return (
    <div
      className="relative"
      onPointerDown={() => {
        paused.current = true;
      }}
      onPointerUp={() => {
        paused.current = false;
      }}
      onPointerCancel={() => {
        paused.current = false;
      }}
    >
      <div
        ref={scroller}
        className="surface flex snap-x snap-mandatory overflow-x-auto scrollbar-none"
        aria-roledescription="carousel"
        aria-label="Highlights"
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className="relative min-w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}`}
          >
            <button
              type="button"
              className="relative block aspect-[16/10] w-full cursor-pointer text-left"
              aria-label={slide.caption ? `${slide.caption}. ${slide.alt}` : slide.alt}
              onPointerDown={(event) => {
                dragOrigin.current = { x: event.clientX, y: event.clientY };
                dragged.current = false;
              }}
              onPointerMove={(event) => {
                const origin = dragOrigin.current;
                if (!origin) return;
                const dx = event.clientX - origin.x;
                const dy = event.clientY - origin.y;
                if (dx * dx + dy * dy > 36) dragged.current = true;
              }}
              onPointerUp={(event) => {
                const origin = dragOrigin.current;
                if (!origin) return;
                const dx = event.clientX - origin.x;
                const dy = event.clientY - origin.y;
                if (dx * dx + dy * dy > 36) dragged.current = true;
              }}
              onClick={() => {
                if (dragged.current || !onNavigate) return;
                onNavigate(slide.tab, slide.section);
              }}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={slideIndex === 0}
                loading={slideIndex === 0 ? "eager" : "lazy"}
                sizes="430px"
                className={slide.fit === "contain" ? "object-contain" : "object-cover"}
              />
              {slide.caption ? (
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1c3330]/80 to-transparent px-5 pt-12 pb-4 text-[15px] font-medium tracking-[-0.02em] text-white">
                  {slide.caption}
                </p>
              ) : null}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3.5 flex items-center justify-center gap-1.5">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${slideIndex + 1}: ${slide.alt}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => goTo(slideIndex)}
            className={`h-1.5 rounded-full transition-all ${
              slideIndex === index ? "w-6 bg-forest" : "w-1.5 bg-forest/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
