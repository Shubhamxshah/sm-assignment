"use client";

import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { inr, member, potluck, products, recipes, workshops, yogaSessions } from "@/lib/content";
import { JarIcon } from "@/components/icons";

export function WorkshopsScreen() {
  return (
    <div className="px-4 pt-5 pb-8">
      <h1 className="text-xl font-bold text-ink">Workshops</h1>
      <p className="mt-1 text-sm text-brown">Pick up Workshop Day {member.workshopDay}, or save a seat ahead.</p>

      <article className="mt-4 rounded-[1.3rem] border border-line bg-card p-4">
        <p className="text-sm font-bold text-ink">Workshop Day {member.workshopDay}</p>
        <p className="mt-1 text-sm text-brown">Satvic Cooking Basics</p>
        <Countdown />
      </article>

      <ul className="mt-4 space-y-3">
        {workshops
          .filter((item) => item.id !== "retreat")
          .map((workshop) => (
            <li key={workshop.id} className="overflow-hidden rounded-2xl border border-line bg-card">
              <div className="relative h-32 bg-white">
                <Image src={workshop.image} alt={workshop.imageAlt} fill sizes="430px" className="object-cover" />
              </div>
              <div className="p-3.5">
                <p className="text-sm font-bold text-ink">{workshop.title}</p>
                <p className="mt-1 text-xs text-brown">{workshop.when}</p>
              </div>
            </li>
          ))}
      </ul>

      <section id="retreats" className="mt-6 scroll-mt-4">
        <h2 className="text-[15px] font-semibold text-brown">Retreats</h2>
        {workshops
          .filter((item) => item.id === "retreat")
          .map((workshop) => (
            <article key={workshop.id} className="mt-3 overflow-hidden rounded-2xl border border-line bg-card">
              <div className="relative h-36 bg-white">
                <Image src={workshop.image} alt={workshop.imageAlt} fill sizes="430px" className="object-cover" />
              </div>
              <div className="p-3.5">
                <p className="text-sm font-bold text-ink">{workshop.title}</p>
                <p className="mt-1 text-xs text-brown">{workshop.when}</p>
              </div>
            </article>
          ))}
      </section>
    </div>
  );
}

export function ShopScreen() {
  return (
    <div className="px-4 pt-5 pb-8">
      <h1 className="text-xl font-bold text-ink">Shop satvic food</h1>
      <p className="mt-1 text-sm text-brown">Today’s deals, from the farm kitchen.</p>
      <div className="relative mt-4 h-36 overflow-hidden rounded-[1.4rem] border border-line bg-white">
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
          <li key={product.id} className="overflow-hidden rounded-2xl border border-line bg-card">
            {product.image ? (
              <div className="relative h-28 bg-white">
                <Image
                  src={product.image}
                  alt={product.imageAlt ?? ""}
                  fill
                  sizes="200px"
                  className={product.imageClass ?? "object-cover"}
                />
              </div>
            ) : (
              <div className="flex h-28 items-center justify-center bg-sage/25 text-sage-deep">
                <JarIcon className="h-10 w-10" />
              </div>
            )}
            <div className="p-3">
              <p className="min-h-8 text-[13px] font-bold leading-4 text-ink">{product.name}</p>
              <p className="mt-2 text-sm font-bold text-ink">{inr(product.price)}</p>
              <p className="text-[11px] text-brown-soft line-through">{inr(product.compareAt)}</p>
              <p className="mt-1 inline-flex rounded-full bg-sage/40 px-1.5 py-0.5 text-[10px] font-bold text-ink">
                {product.off}% off
              </p>
            </div>
          </li>
        ))}
      </ul>
      <section className="mt-6">
        <h2 className="text-[15px] font-semibold text-brown">From the recipe shelf</h2>
        <ul className="mt-3 space-y-2">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="flex items-center gap-3 rounded-2xl border border-line bg-card p-2">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image src={recipe.image} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{recipe.title}</p>
                <p className="text-xs text-brown">{recipe.time}</p>
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
    <div className="px-4 pt-5 pb-8">
      <div className="overflow-hidden rounded-[1.4rem] border border-line">
        <div className="relative aspect-[430/225] bg-sage">
          <Image src="/sm-logo.jpg" alt="Satvic Movement" fill sizes="430px" className="object-contain" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-lg font-bold text-ink">
          {member.name.slice(0, 1)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-ink">{member.name}</h1>
          <p className="text-sm text-brown">Your plan, kept in one place</p>
        </div>
      </div>

      <section className="mt-5 rounded-[1.3rem] border border-line bg-card p-4">
        <p className="text-sm font-bold text-ink">Daily yoga streak</p>
        <p className="mt-1 text-sm text-brown">
          Day {member.streakDay} of {member.streakGoal} · {member.yogaGoal}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sage/35">
          <div className="h-full rounded-full bg-sage-deep" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="mt-3 rounded-[1.3rem] border border-line bg-card p-4">
        <p className="text-sm font-bold text-ink">In progress</p>
        <p className="mt-2 text-sm text-brown">Workshop Day {member.workshopDay} · Satvic Cooking Basics</p>
        <p className="mt-1 text-sm text-brown">Today’s yoga goal: {member.yogaGoal}</p>
      </section>

      {potluck.happening ? (
        <section className="mt-3 rounded-[1.3rem] border border-line bg-card p-4">
          <p className="text-sm font-bold text-ink">Potluck near you</p>
          <p className="mt-1 text-sm text-brown">
            {potluck.title} · {potluck.when}
          </p>
        </section>
      ) : null}

      <section className="mt-3 rounded-[1.3rem] border border-line bg-card p-4">
        <p className="text-sm font-bold text-ink">Saved sessions</p>
        <ul className="mt-2 space-y-1 text-sm text-brown">
          {yogaSessions.map((session) => (
            <li key={session.id}>{session.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
