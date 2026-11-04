"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "@/components/carousel";
import { Countdown } from "@/components/countdown";
import { BowlIcon, CloseIcon, JarIcon, LeafIcon, PeopleIcon, SearchIcon, WorkshopIcon } from "@/components/icons";
import {
  carouselSlides,
  categories,
  inr,
  mediaSrc,
  member,
  potluck,
  products,
  recipes,
  testimonials,
  workshops,
  yogaSessions,
  type Tab,
} from "@/lib/content";

const categoryIcons = {
  workshops: WorkshopIcon,
  yoga: LeafIcon,
  shop: BowlIcon,
  potlucks: PeopleIcon,
  recipes: BowlIcon,
  retreats: LeafIcon,
};

function hit(query: string, ...parts: Array<string | undefined>) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(needle);
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-[1.65rem] font-medium leading-[1.15] tracking-[-0.035em] text-clay">{children}</h2>
  );
}

export function HomeScreen({
  onNavigate,
}: {
  onNavigate: (tab: Tab, sectionId?: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [hello, setHello] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();
    const next = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    setHello(next);
  }, []);

  const slides = carouselSlides.filter((slide) => hit(query, slide.alt, slide.caption));
  const visibleCategories = categories.filter((item) => hit(query, item.label));
  const showContinue = hit(query, "continue", "workshop", "yoga", "streak", member.yogaGoal, "day");
  const visibleProducts = products.filter((item) =>
    hit(query, "deal", "shop", item.name, `${item.off}% off`),
  );
  const visibleWorkshops = workshops.filter((item) => hit(query, "workshop", "upcoming", item.title, item.when));
  const visibleYoga = yogaSessions.filter((item) => hit(query, "yoga", "recommended", item.title, item.detail));
  const visibleQuotes = testimonials.filter((item) => hit(query, "testimonial", item.quote, item.name, item.city));
  const visibleRecipes = recipes.filter((item) => hit(query, "recipe", item.title, item.time));
  const showPotluck = potluck.happening && hit(query, "potluck", "city", potluck.title, potluck.when, potluck.detail);

  const anyResults =
    !query.trim() ||
    slides.length > 0 ||
    visibleCategories.length > 0 ||
    showContinue ||
    visibleProducts.length > 0 ||
    visibleWorkshops.length > 0 ||
    visibleYoga.length > 0 ||
    visibleQuotes.length > 0 ||
    visibleRecipes.length > 0 ||
    showPotluck;

  return (
    <div className="px-5 pt-[max(1.35rem,env(safe-area-inset-top))] pb-10">
      <header className="flex items-center gap-3">
        <Image
          src="/sm-logo-s.jpeg"
          alt="Satvic Movement"
          width={48}
          height={48}
          priority
          className="h-12 w-12 shrink-0 rounded-2xl object-cover"
        />
        <form className="relative min-w-0 flex-1" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="global-search" className="sr-only">
            Search
          </label>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-forest" />
          <input
            id="global-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="h-12 w-full rounded-full bg-white pr-10 pl-10 text-[15px] text-ink shadow-[0_8px_24px_rgba(47,92,84,0.07)] outline-none placeholder:text-[#8aa39c]"
          />
          {query ? (
            <button
              type="button"
              className="absolute top-1/2 right-1.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          ) : null}
        </form>
      </header>

      <section className="mt-7">
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-[2.05rem] font-medium leading-[1.05] tracking-[-0.04em] text-clay">
            {hello},
            <br />
            {member.name}
          </h1>
          <p className="shrink-0 pb-1 text-right text-[13px] leading-4 text-muted">
            <span className="block font-medium text-forest">Day {member.streakDay}</span>
            of {member.streakGoal}
          </p>
        </div>
        <p className="mt-3 text-[15px] leading-6 text-muted">Your plan for today, based on what you told us.</p>
      </section>

      {slides.length > 0 ? (
        <div className="mt-6">
          <Carousel slides={slides} onNavigate={onNavigate} />
        </div>
      ) : null}

      {visibleCategories.length > 0 ? (
        <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none">
          {visibleCategories.map((item) => {
            const Icon = categoryIcons[item.id as keyof typeof categoryIcons];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.tab, item.section)}
                className="flex shrink-0 items-center gap-2 rounded-full bg-white py-2.5 pr-4 pl-3.5 shadow-[0_8px_22px_rgba(47,92,84,0.06)]"
              >
                <Icon className="h-4 w-4 text-forest" />
                <span className="text-[13px] font-medium tracking-[-0.01em] text-ink capitalize">{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {showContinue ? (
        <section id="continue" className="mt-11 scroll-mt-4">
          <SectionTitle>Continue where you left off</SectionTitle>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigate("workshops")}
              className="surface relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden p-4 text-left text-white"
            >
              <Image
                src="/namaste.jpeg"
                alt=""
                fill
                sizes="45vw"
                className="object-cover object-[center_18%]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#1c3330] via-[#1c3330]/55 to-transparent" />
              <span className="relative">
                <span className="block text-[13px] font-medium text-white/80">Workshop</span>
                <span className="mt-2 block text-[1.35rem] font-medium leading-none tracking-[-0.03em]">
                  Day {member.workshopDay}
                </span>
                <Countdown tone="light" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("yoga")}
              className="surface relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden p-4 text-left text-white"
            >
              <Image
                src="/yog.jpeg"
                alt=""
                fill
                sizes="45vw"
                className="object-cover object-[center_12%]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#1c3330] via-[#1c3330]/55 to-transparent" />
              <span className="relative">
                <span className="block text-[13px] font-medium text-white/80">Daily yoga</span>
                <span className="mt-2 block text-[15px] font-medium leading-5 tracking-[-0.02em]">
                  {member.yogaGoal}
                </span>
                <span className="mt-4 block text-[2rem] font-medium leading-none tracking-[-0.04em]">
                  {member.streakDay}
                  <span className="ml-1.5 text-[13px] font-normal tracking-normal text-white/75">
                    of {member.streakGoal}
                  </span>
                </span>
                <span className="mt-3 block h-1 overflow-hidden rounded-full bg-white/25">
                  <span
                    className="block h-full rounded-full bg-white"
                    style={{ width: `${(member.streakDay / member.streakGoal) * 100}%` }}
                  />
                </span>
                <span className="mt-3 block text-[13px] text-white/80">Continue the streak</span>
              </span>
            </button>
          </div>
        </section>
      ) : null}

      {visibleProducts.length > 0 ? (
        <section id="deals" className="mt-11 scroll-mt-4">
          <SectionTitle>Deals of the day</SectionTitle>
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none snap-x">
            {visibleProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onNavigate("shop")}
                className="surface w-[10.6rem] shrink-0 snap-start overflow-hidden text-left"
              >
                {product.image ? (
                  <span className="relative block h-28 bg-[#f6f3ee]">
                    <Image
                      src={mediaSrc(product.image)}
                      alt={product.imageAlt ?? ""}
                      fill
                      sizes="180px"
                      className={product.imageClass ?? "object-cover"}
                    />
                  </span>
                ) : (
                  <span className="flex h-28 items-center justify-center bg-[#e7f3ef] text-forest">
                    <JarIcon className="h-10 w-10" />
                  </span>
                )}
                <span className="block px-3.5 pt-3 pb-3.5">
                  <span className="block min-h-10 text-[14px] font-medium leading-5 tracking-[-0.02em] text-ink">
                    {product.name}
                  </span>
                  <span className="mt-2 block text-[15px] font-medium tracking-[-0.02em] text-ink">
                    {inr(product.price)}
                  </span>
                  <span className="mt-1 flex items-baseline gap-2 text-[12px]">
                    <span className="text-muted line-through">{inr(product.compareAt)}</span>
                    <span className="font-medium text-forest">{product.off}% off</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {visibleWorkshops.length > 0 ? (
        <section id="workshops-home" className="mt-11 scroll-mt-4">
          <SectionTitle>Upcoming workshops</SectionTitle>
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none snap-x">
            {visibleWorkshops.map((workshop) => (
              <button
                key={workshop.id}
                type="button"
                onClick={() => onNavigate("workshops", workshop.id === "retreat" ? "retreats" : undefined)}
                className="surface w-[15.5rem] shrink-0 snap-start overflow-hidden text-left"
              >
                <span className="relative block h-32 bg-[#f6f3ee]">
                  <Image src={workshop.image} alt={workshop.imageAlt} fill sizes="260px" className="object-cover" />
                </span>
                <span className="block px-4 py-3.5">
                  <span className="block text-[16px] font-medium tracking-[-0.02em] text-ink">{workshop.title}</span>
                  <span className="mt-1 block text-[13px] text-muted">{workshop.when}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {visibleYoga.length > 0 ? (
        <section id="yoga" className="mt-11 scroll-mt-4">
          <SectionTitle>Yoga recommended for you</SectionTitle>
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none snap-x">
            {visibleYoga.map((session) => (
              <article key={session.id} className="surface w-[14.5rem] shrink-0 snap-start overflow-hidden">
                <div className="relative h-36 bg-[#f6f3ee]">
                  <Image
                    src={session.image}
                    alt={session.imageAlt}
                    fill
                    sizes="240px"
                    className={session.imageClass ?? "object-cover"}
                  />
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-[16px] font-medium tracking-[-0.02em] text-ink">{session.title}</p>
                  <p className="mt-1 text-[13px] text-muted">{session.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {visibleQuotes.length > 0 ? (
        <section id="testimonials" className="mt-11 scroll-mt-4">
          <SectionTitle>Testimonials</SectionTitle>
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none snap-x">
            {visibleQuotes.map((quote) => (
              <blockquote key={quote.id} className="surface w-[18rem] shrink-0 snap-start p-5">
                <p className="text-[1.05rem] font-medium leading-snug tracking-[-0.025em] text-clay">
                  “{quote.quote}”
                </p>
                <footer className="mt-4 text-[13px] font-medium text-forest">
                  {quote.name}
                  <span className="font-normal text-muted"> · {quote.city}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      {visibleRecipes.length > 0 ? (
        <section id="recipes" className="mt-11 scroll-mt-4">
          <SectionTitle>Recipes recommended for you</SectionTitle>
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none snap-x">
            {visibleRecipes.map((recipe) => (
              <article key={recipe.id} className="surface w-[14.5rem] shrink-0 snap-start overflow-hidden">
                <div className="relative h-32 bg-[#f6f3ee]">
                  <Image src={recipe.image} alt={recipe.imageAlt} fill sizes="240px" className="object-cover" />
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-[16px] font-medium tracking-[-0.02em] text-ink">{recipe.title}</p>
                  <p className="mt-1 text-[13px] text-muted">{recipe.time}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showPotluck ? (
        <section id="potlucks" className="mt-11 scroll-mt-4">
          <SectionTitle>Discover potlucks happening in your city</SectionTitle>
          <article className="surface relative mt-4 h-64 overflow-hidden">
            <Image src={potluck.image} alt={potluck.imageAlt} fill sizes="430px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c3330] via-[#1c3330]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[13px] font-medium text-white/80">Happening near you</p>
              <h3 className="mt-1 text-[1.35rem] font-medium leading-tight tracking-[-0.03em]">{potluck.title}</h3>
              <p className="mt-1.5 text-[14px] text-white/85">
                {potluck.when}
                <span className="mx-1.5 text-white/50">·</span>
                {potluck.detail}
              </p>
            </div>
          </article>
        </section>
      ) : null}

      {query.trim() && !anyResults ? (
        <p className="mt-10 text-center text-[15px] text-muted">Nothing matches “{query.trim()}”.</p>
      ) : null}
    </div>
  );
}
