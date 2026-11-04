"use client";

import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { inr, mediaSrc, member, potluck, products, recipes, workshops, yogaSessions } from "@/lib/content";
import { JarIcon } from "@/components/icons";

function PageTitle({ title, detail }: { title: string; detail: string }) {
  return (
    <header>
      <Image src="/sm-logo-s.jpeg" alt="Satvic Movement" width={44} height={44} className="h-11 w-11 rounded-2xl object-cover" />
      <h1 className="mt-4 text-[2rem] font-medium leading-none tracking-[-0.04em] text-clay">{title}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{detail}</p>
    </header>
  );
}

export function WorkshopsScreen() {
  return (
    <div className="px-5 pt-[max(1.35rem,env(safe-area-inset-top))] pb-10">
      <PageTitle
        title="Workshops"
        detail={`Pick up Workshop Day ${member.workshopDay}, or save a seat ahead.`}
      />

      <article className="surface mt-6 p-5">
        <p className="text-[13px] font-medium text-forest">In progress</p>
        <p className="mt-2 text-[1.35rem] font-medium leading-none tracking-[-0.03em] text-ink">
          Workshop Day {member.workshopDay}
        </p>
        <p className="mt-2 text-[15px] text-muted">Satvic Cooking Basics</p>
        <Countdown />
      </article>

      <ul className="mt-4 space-y-3">
        {workshops
          .filter((item) => item.id !== "retreat")
          .map((workshop) => (
            <li key={workshop.id} className="surface overflow-hidden">
              <div className="relative h-40 bg-[#f6f3ee]">
                <Image src={workshop.image} alt={workshop.imageAlt} fill sizes="430px" className="object-cover" />
              </div>
              <div className="px-4 py-4">
                <p className="text-[16px] font-medium tracking-[-0.02em] text-ink">{workshop.title}</p>
                <p className="mt-1 text-[13px] text-muted">{workshop.when}</p>
              </div>
            </li>
          ))}
      </ul>

      <section id="retreats" className="mt-11 scroll-mt-4">
        <h2 className="text-[1.65rem] font-medium leading-[1.15] tracking-[-0.035em] text-clay">Retreats</h2>
        {workshops
          .filter((item) => item.id === "retreat")
          .map((workshop) => (
            <article key={workshop.id} className="surface mt-4 overflow-hidden">
              <div className="relative h-44 bg-[#f6f3ee]">
                <Image src={workshop.image} alt={workshop.imageAlt} fill sizes="430px" className="object-cover" />
              </div>
              <div className="px-4 py-4">
                <p className="text-[16px] font-medium tracking-[-0.02em] text-ink">{workshop.title}</p>
                <p className="mt-1 text-[13px] text-muted">{workshop.when}</p>
              </div>
            </article>
          ))}
      </section>
    </div>
  );
}

export function ShopScreen() {
  return (
    <div className="px-5 pt-[max(1.35rem,env(safe-area-inset-top))] pb-10">
      <PageTitle title="Shop satvic food" detail="Today’s deals, from the farm kitchen." />
      <div className="surface relative mt-6 h-40 overflow-hidden bg-[#f6f3ee]">
        <Image
          src="/shop-millets.webp"
          alt="The full millet range, now delivering across India"
          fill
          sizes="430px"
          className="object-cover"
        />
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {products.map((product) => (
          <li key={product.id} id={product.id} className="surface scroll-mt-4 overflow-hidden">
            {product.image ? (
              <div className="relative h-32 bg-[#f6f3ee]">
                <Image
                  src={mediaSrc(product.image)}
                  alt={product.imageAlt ?? ""}
                  fill
                  sizes="200px"
                  className={product.imageClass ?? "object-cover"}
                />
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center bg-[#e7f3ef] text-forest">
                <JarIcon className="h-10 w-10" />
              </div>
            )}
            <div className="px-3.5 py-3.5">
              <p className="min-h-10 text-[14px] font-medium leading-5 tracking-[-0.02em] text-ink">{product.name}</p>
              <p className="mt-2 text-[15px] font-medium tracking-[-0.02em] text-ink">{inr(product.price)}</p>
              <p className="mt-1 flex items-baseline gap-2 text-[12px]">
                <span className="text-muted line-through">{inr(product.compareAt)}</span>
                <span className="font-medium text-forest">{product.off}% off</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <section className="mt-11">
        <h2 className="text-[1.65rem] font-medium leading-[1.15] tracking-[-0.035em] text-clay">From the recipe shelf</h2>
        <ul className="mt-4 space-y-2.5">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="surface flex items-center gap-3 p-2.5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#f6f3ee]">
                <Image src={recipe.image} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <p className="text-[15px] font-medium tracking-[-0.02em] text-ink">{recipe.title}</p>
                <p className="mt-0.5 text-[13px] text-muted">{recipe.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ProfileScreen() {
  const progress = (member.streakDay / member.streakGoal) * 100;
  return (
    <div className="px-5 pt-[max(1.35rem,env(safe-area-inset-top))] pb-10">
      <Image src="/sm-logo-s.jpeg" alt="Satvic Movement" width={44} height={44} className="h-11 w-11 rounded-2xl object-cover" />
      <div className="mt-5 flex items-center gap-3.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-[1.35rem] font-medium text-white">
          {member.name.slice(0, 1)}
        </div>
        <div>
          <h1 className="text-[2rem] font-medium leading-none tracking-[-0.04em] text-clay">{member.name}</h1>
          <p className="mt-1.5 text-[14px] text-muted">Your plan, kept in one place</p>
        </div>
      </div>

      <section className="surface mt-6 p-5">
        <p className="text-[13px] font-medium text-forest">Daily yoga streak</p>
        <p className="mt-2 text-[2rem] font-medium leading-none tracking-[-0.04em] text-clay">
          {member.streakDay}
          <span className="text-[15px] font-medium tracking-normal text-muted"> of {member.streakGoal}</span>
        </p>
        <p className="mt-2 text-[14px] text-muted">{member.yogaGoal}</p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-forest/15">
          <div className="h-full rounded-full bg-forest" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="surface mt-3 p-5">
        <p className="text-[13px] font-medium text-forest">In progress</p>
        <p className="mt-2 text-[15px] font-medium tracking-[-0.02em] text-ink">
          Workshop Day {member.workshopDay} · Satvic Cooking Basics
        </p>
        <p className="mt-1 text-[14px] text-muted">Today’s yoga goal: {member.yogaGoal}</p>
      </section>

      {potluck.happening ? (
        <section className="surface mt-3 p-5">
          <p className="text-[13px] font-medium text-forest">Potluck near you</p>
          <p className="mt-2 text-[15px] font-medium tracking-[-0.02em] text-ink">{potluck.title}</p>
          <p className="mt-1 text-[14px] text-muted">{potluck.when}</p>
        </section>
      ) : null}

      <section className="surface mt-3 p-5">
        <p className="text-[13px] font-medium text-forest">Saved sessions</p>
        <ul className="mt-3 space-y-2 text-[15px] text-ink">
          {yogaSessions.map((session) => (
            <li key={session.id} className="flex items-baseline justify-between gap-3">
              <span className="font-medium tracking-[-0.02em]">{session.title}</span>
              <span className="shrink-0 text-[13px] text-muted">{session.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function RecipesScreen() {
  return (
    <div className="px-5 pt-[max(1.35rem,env(safe-area-inset-top))] pb-10">
      <PageTitle title="Recipes" detail="Satvic meals picked for the way you like to cook." />
      <ul className="mt-6 space-y-3">
        {recipes.map((recipe) => (
          <li key={recipe.id} id={recipe.id} className="surface scroll-mt-4 overflow-hidden">
            <div className="relative h-40 bg-[#f6f3ee]">
              <Image src={recipe.image} alt={recipe.imageAlt} fill sizes="430px" className="object-cover" />
            </div>
            <div className="px-4 py-4">
              <p className="text-[16px] font-medium tracking-[-0.02em] text-ink">{recipe.title}</p>
              <p className="mt-1 text-[13px] text-muted">{recipe.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function YogaScreen() {
  const progress = (member.streakDay / member.streakGoal) * 100;
  return (
    <div className="px-5 pt-[max(1.35rem,env(safe-area-inset-top))] pb-10">
      <PageTitle title="Yoga" detail={`Today’s goal is ${member.yogaGoal.toLowerCase()}.`} />
      <section className="surface mt-6 p-5">
        <p className="text-[13px] font-medium text-forest">Daily streak</p>
        <p className="mt-2 text-[2rem] font-medium leading-none tracking-[-0.04em] text-clay">
          {member.streakDay}
          <span className="text-[15px] font-medium tracking-normal text-muted"> of {member.streakGoal}</span>
        </p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-forest/15">
          <div className="h-full rounded-full bg-forest" style={{ width: `${progress}%` }} />
        </div>
      </section>
      <ul className="mt-4 space-y-3">
        {yogaSessions.map((session) => (
          <li key={session.id} id={session.id} className="surface scroll-mt-4 overflow-hidden">
            <div className="relative h-40 bg-[#f6f3ee]">
              <Image
                src={session.image}
                alt={session.imageAlt}
                fill
                sizes="430px"
                className={session.imageClass ?? "object-cover"}
              />
            </div>
            <div className="px-4 py-4">
              <p className="text-[16px] font-medium tracking-[-0.02em] text-ink">{session.title}</p>
              <p className="mt-1 text-[13px] text-muted">{session.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
