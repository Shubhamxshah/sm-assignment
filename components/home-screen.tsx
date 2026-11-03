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

export function HomeScreen({
  onNavigate,
}: {
  onNavigate: (tab: Tab, sectionId?: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [hello, setHello] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    const next = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
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
    <div className="px-4 pt-5 pb-8">
      <section className="rounded-[1.4rem] border-2 border-brown/20 bg-card px-5 py-4 text-center">
        <h1 className="text-[17px] font-bold tracking-tight text-ink">
          {hello}, {member.name}!
        </h1>
        <p className="mt-1 text-sm leading-5 text-brown">Your plan for today, based on what you told us!</p>
      </section>

      <form className="relative mt-3" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="global-search" className="sr-only">
          Global Search
        </label>
        {query ? (
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-brown-soft" />
        ) : null}
        <input
          id="global-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Global Search"
          className={`w-full rounded-2xl border border-line bg-card py-3 text-sm text-ink outline-none placeholder:text-brown-soft focus:border-sage ${
            query ? "pr-10 pl-10 text-left" : "px-4 text-center"
          }`}
        />
        {query ? (
          <button
            type="button"
            className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brown"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        ) : null}
      </form>

      {slides.length > 0 ? (
        <div className="mt-4">
          <Carousel slides={slides} />
        </div>
      ) : null}

      {visibleCategories.length > 0 ? (
        <div className="-mx-4 mt-4 flex gap-2.5 overflow-x-auto px-4 pb-1 scrollbar-none">
          {visibleCategories.map((item) => {
            const Icon = categoryIcons[item.id as keyof typeof categoryIcons];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.tab, item.section)}
                className="flex h-[5.15rem] w-[4.15rem] shrink-0 snap-start flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-card px-1 text-center"
              >
                <Icon className="h-4 w-4 text-sage-deep" />
                <span className="text-[10px] font-semibold leading-[1.15] text-brown">{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {showContinue ? (
        <section id="continue" className="mt-7 scroll-mt-4">
          <h2 className="text-[15px] font-semibold text-brown">Continue where you left off :</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigate("workshops")}
              className="rounded-[1.3rem] border border-line bg-card p-3.5 text-left"
            >
              <span className="block text-sm font-bold leading-5 text-ink">Workshop Day {member.workshopDay}</span>
              <Countdown />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("home", "yoga")}
              className="rounded-[1.3rem] border border-line bg-card p-3.5 text-left"
            >
              <span className="block text-sm font-bold text-ink">Daily Yoga</span>
              <span className="mt-2 block text-[12px] leading-4 text-brown">Today’s goal: {member.yogaGoal}</span>
              <span className="mt-3 block text-[12px] font-semibold leading-4 text-sage-deep">Continue the streak!</span>
              <span className="mt-1 block text-[12px] font-bold text-ink">
                Day {member.streakDay}/{member.streakGoal}
              </span>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-sage/35">
                <span
                  className="block h-full rounded-full bg-sage-deep"
                  style={{ width: `${(member.streakDay / member.streakGoal) * 100}%` }}
                />
              </span>
            </button>
          </div>
        </section>
      ) : null}

      {visibleProducts.length > 0 ? (
        <section id="deals" className="mt-7 scroll-mt-4">
          <h2 className="text-[15px] font-semibold text-brown">Deals of the day:</h2>
          <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none snap-x">
            {visibleProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onNavigate("shop")}
                className="w-[9.4rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-card text-left"
              >
                {product.image ? (
                  <span className="relative block h-24 bg-white">
                    <Image
                      src={product.image}
                      alt={product.imageAlt ?? ""}
                      fill
                      sizes="150px"
                      className={product.imageClass ?? "object-cover"}
                    />
                  </span>
                ) : (
                  <span className="flex h-24 items-center justify-center bg-sage/25 text-sage-deep">
                    <JarIcon className="h-10 w-10" />
                  </span>
                )}
                <span className="block p-2.5">
                  <span className="block min-h-8 text-[12px] font-bold leading-4 text-ink">{product.name}</span>
                  <span className="mt-1.5 block text-sm font-bold text-ink">{inr(product.price)}</span>
                  <span className="block text-[11px] text-brown-soft line-through">{inr(product.compareAt)}</span>
                  <span className="mt-1 inline-flex rounded-full bg-sage/40 px-1.5 py-0.5 text-[10px] font-bold text-ink">
                    {product.off}% off
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {visibleWorkshops.length > 0 ? (
        <section id="workshops-home" className="mt-7 scroll-mt-4">
          <h2 className="text-[15px] font-semibold text-brown">Upcoming workshops:</h2>
          <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none snap-x">
            {visibleWorkshops.map((workshop) => (
              <button
                key={workshop.id}
                type="button"
                onClick={() => onNavigate("workshops", workshop.id === "retreat" ? "retreats" : undefined)}
                className="w-[13.5rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-card text-left"
              >
                <span className="relative block h-24 bg-white">
                  <Image src={workshop.image} alt={workshop.imageAlt} fill sizes="220px" className="object-cover" />
                </span>
                <span className="block p-3">
                  <span className="block text-sm font-bold text-ink">{workshop.title}</span>
                  <span className="mt-1 block text-xs text-brown">{workshop.when}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {visibleYoga.length > 0 ? (
        <section id="yoga" className="mt-7 scroll-mt-4">
          <h2 className="text-[15px] font-semibold text-brown">Yoga recommended for you:</h2>
          <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none snap-x">
            {visibleYoga.map((session) => (
              <article key={session.id} className="w-[12.5rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-card">
                <div className="relative h-28 bg-white">
                  <Image
                    src={session.image}
                    alt={session.imageAlt}
                    fill
                    sizes="200px"
                    className={session.imageClass ?? "object-cover"}
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-ink">{session.title}</p>
                  <p className="mt-1 text-xs text-brown">{session.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {visibleQuotes.length > 0 ? (
        <section id="testimonials" className="mt-7 scroll-mt-4">
          <h2 className="text-[15px] font-semibold text-brown">Testimonials</h2>
          <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none snap-x">
            {visibleQuotes.map((quote) => (
              <blockquote key={quote.id} className="w-[16.5rem] shrink-0 snap-start rounded-2xl border border-line bg-card p-4">
                <p className="text-sm leading-6 text-ink">“{quote.quote}”</p>
                <footer className="mt-3 text-xs font-bold text-brown">
                  {quote.name} · {quote.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      {visibleRecipes.length > 0 ? (
        <section id="recipes" className="mt-7 scroll-mt-4">
          <h2 className="text-[15px] font-semibold text-brown">Recipes recommended for you:</h2>
          <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none snap-x">
            {visibleRecipes.map((recipe) => (
              <article key={recipe.id} className="w-[12.5rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-card">
                <div className="relative h-24 bg-white">
                  <Image src={recipe.image} alt={recipe.imageAlt} fill sizes="200px" className="object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-ink">{recipe.title}</p>
                  <p className="mt-1 text-xs text-brown">{recipe.time}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showPotluck ? (
        <section id="potlucks" className="mt-7 scroll-mt-4">
          <h2 className="text-[15px] font-semibold text-brown">Discover potlucks happening in your city</h2>
          <article className="mt-3 overflow-hidden rounded-[1.4rem] border border-line bg-card">
            <div className="relative h-36 bg-white">
              <Image src={potluck.image} alt={potluck.imageAlt} fill sizes="430px" className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-[11px] font-bold tracking-wide text-sage-deep uppercase">Happening near you</p>
              <h3 className="mt-1 text-base font-bold text-ink">{potluck.title}</h3>
              <p className="mt-1 text-sm text-brown">{potluck.when}</p>
              <p className="mt-1 text-sm text-brown">{potluck.detail}</p>
            </div>
          </article>
        </section>
      ) : null}

      {query.trim() && !anyResults ? (
        <p className="mt-8 text-center text-sm text-brown">Nothing matches “{query.trim()}”.</p>
      ) : null}
    </div>
  );
}
