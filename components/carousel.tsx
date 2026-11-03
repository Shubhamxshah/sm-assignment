"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { carouselSlides, type Slide } from "@/lib/content";

export function Carousel({ slides = carouselSlides }: { slides?: Slide[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

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
        className="flex snap-x snap-mandatory overflow-x-auto rounded-[1.6rem] border border-line bg-card scrollbar-none"
        aria-roledescription="carousel"
        aria-label="Highlights"
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className="relative aspect-[16/10] min-w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              loading={slideIndex === 0 ? "eager" : "lazy"}
              sizes="430px"
              className={slide.fit === "contain" ? "object-contain" : "object-cover"}
            />
            {slide.caption ? (
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-4 pt-10 pb-3 text-sm font-semibold text-cream">
                {slide.caption}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${slideIndex + 1}: ${slide.alt}`}
            aria-current={slideIndex === index}
            onClick={() => goTo(slideIndex)}
            className={`h-1.5 rounded-full transition-all ${
              slideIndex === index ? "w-5 bg-sage-deep" : "w-1.5 bg-sage"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
