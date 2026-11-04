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
  const recommendedWorkshop = workshops.find((item) =>
    hit(query, "recommended", "workshop", "upcoming", item.title, item.when),
  );
  const recommendedYoga = yogaSessions.find((item) =>
    hit(query, "recommended", "yoga", item.title, item.detail),
  );
  const recommendedRecipe = recipes.find((item) => hit(query, "recommended", "recipe", item.title, item.time));
  const visibleRecipes = recipes.filter((item) => hit(query, "recipe", item.title, item.time));
  const recommendations = [
    recommendedWorkshop
      ? {
          id: `workshop-${recommendedWorkshop.id}`,
          kind: "Workshop",
          title: recommendedWorkshop.title,
          detail: recommendedWorkshop.when,
          image: recommendedWorkshop.image,
          imageAlt: recommendedWorkshop.imageAlt,
          tab: "workshops" as const,
          section: recommendedWorkshop.id === "retreat" ? "retreats" : recommendedWorkshop.id,
        }
      : null,
    recommendedYoga
      ? {
          id: `yoga-${recommendedYoga.id}`,
          kind: "Yoga",
          title: recommendedYoga.title,
          detail: recommendedYoga.detail,
          image: recommendedYoga.image,
          imageAlt: recommendedYoga.imageAlt,
          imageClass: recommendedYoga.imageClass,
          tab: "yoga" as const,
          section: recommendedYoga.id,
        }
      : null,
    recommendedRecipe
      ? {
          id: `recipe-${recommendedRecipe.id}`,
          kind: "Recipe",
          title: recommendedRecipe.title,
          detail: recommendedRecipe.time,
          image: recommendedRecipe.image,
          imageAlt: recommendedRecipe.imageAlt,
          tab: "recipes" as const,
          section: recommendedRecipe.id,
        }
      : null,
  ].filter((item) => item !== null);
  const visibleQuotes = testimonials.filter((item) =>
    hit(query, "testimonial", "tweet", item.quote, item.name, item.handle, item.city),
  );
  const showPotluck = potluck.happening && hit(query, "potluck", "city", potluck.title, potluck.when, potluck.detail);

  const anyResults =
    !query.trim() ||
    slides.length > 0 ||
    visibleCategories.length > 0 ||
    showContinue ||
    visibleProducts.length > 0 ||
    recommendations.length > 0 ||
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

      {recommendations.length > 0 ? (
        <section id="recommended" className="mt-11 scroll-mt-4">
          <SectionTitle>Recommended for you</SectionTitle>
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none snap-x">
            {recommendations.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.tab, item.section)}
                className="surface w-[14.5rem] shrink-0 snap-start overflow-hidden text-left"
              >
                <span className="relative block h-36 bg-[#f6f3ee]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="240px"
                    className={item.imageClass ?? "object-cover"}
                  />
                </span>
                <span className="block px-4 py-3.5">
                  <span className="block text-[12px] font-medium text-forest">{item.kind}</span>
                  <span className="mt-1 block text-[16px] font-medium tracking-[-0.02em] text-ink">{item.title}</span>
                  <span className="mt-1 block text-[13px] text-muted">{item.detail}</span>
                </span>
              </button>
            ))}
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

      {visibleQuotes.length > 0 ? (
        <section id="testimonials" className="mt-11 scroll-mt-4">
          <SectionTitle>From the community</SectionTitle>
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none snap-x">
            {visibleQuotes.map((quote) => (
              <article key={quote.id} className="surface w-[19rem] shrink-0 snap-start p-4">
                <header className="flex items-start gap-3">
                  <Image
                    src={quote.avatar}
                    alt=""
                    width={80}
                    height={80}
                    className="h-10 w-10 shrink-0 rounded-full object-cover object-[70%_center]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0">
                        <span className="block truncate text-[15px] font-medium tracking-[-0.02em] text-ink">
                          {quote.name}
                        </span>
                        <span className="block truncate text-[13px] text-muted">@{quote.handle}</span>
                      </p>
                      <XMark className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    </div>
                  </div>
                </header>
                <p className="mt-3 text-[15px] leading-snug tracking-[-0.02em] text-ink">{quote.quote}</p>
                <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-2xl bg-[#f6f3ee]">
                  <Image src={quote.image} alt={quote.imageAlt} fill sizes="300px" className="object-cover" />
                </div>
                <p className="mt-3 text-[12px] text-muted">
                  {quote.time}
                  <span className="mx-1 text-muted/60">·</span>
                  {quote.city}
                </p>
                <div className="mt-3 flex items-center justify-between pr-2 text-[12px] text-muted" aria-hidden="true">
                  <span className="flex items-center gap-1.5">
                    <ReplyIcon className="h-4 w-4" />
                    {quote.replies}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RepostIcon className="h-4 w-4" />
                    {quote.reposts}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HeartIcon className="h-4 w-4" />
                    {quote.likes}
                  </span>
                  <ShareIcon className="h-4 w-4" />
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showPotluck ? (
        <section id="potlucks" className="mt-11 scroll-mt-4">
          <SectionTitle>Discover potlucks happening in your city</SectionTitle>
          <button
            type="button"
            onClick={() => onNavigate("potlucks")}
            className="surface relative mt-4 block h-64 w-full overflow-hidden text-left"
          >
            <Image src={potluck.image} alt={potluck.imageAlt} fill sizes="430px" className="object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-[#1c3330] via-[#1c3330]/55 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-white">
              <span className="block text-[13px] font-medium text-white/80">Happening near you</span>
              <span className="mt-1 block text-[1.35rem] font-medium leading-tight tracking-[-0.03em]">
                {potluck.title}
              </span>
              <span className="mt-1.5 block text-[14px] text-white/85">
                {potluck.when}
                <span className="mx-1.5 text-white/50">·</span>
                {potluck.detail}
              </span>
            </span>
          </button>
        </section>
      ) : null}

      {query.trim() && !anyResults ? (
        <p className="mt-10 text-center text-[15px] text-muted">Nothing matches “{query.trim()}”.</p>
      ) : null}
    </div>
  );
}

function XMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.6 3.5h2.7l-5.9 6.8 7 9.2h-5.5l-4.3-5.6-4.9 5.6H1l6.3-7.3L.6 3.5h5.6l3.9 5.1 4.5-5.1Zm-1 14.3h1.5L6.5 5H4.9l8.7 12.8Z"
      />
    </svg>
  );
}

function ReplyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6a2.5 2.5 0 0 1-2.5 2.5H10l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 13.5v-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RepostIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 7h9.2M14.5 4.5 17 7l-2.5 2.5M17 17H7.8M9.5 19.5 7 17l2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 18.5s-6.2-3.8-6.2-8A3.4 3.4 0 0 1 12 8.2a3.4 3.4 0 0 1 6.2 2.3c0 4.2-6.2 8-6.2 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 14.5V5.5m0 0 3 3m-3-3-3 3M6 13.5V18a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 18v-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
