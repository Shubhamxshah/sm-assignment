"use client";

import { useEffect, useRef, useState } from "react";
import { HomeScreen } from "@/components/home-screen";
import { BowlIcon, HomeIcon, LeafIcon, ShopIcon, WorkshopIcon } from "@/components/icons";
import { RecipesScreen, ShopScreen, WorkshopsScreen, YogaScreen } from "@/components/other-screens";
import type { Tab } from "@/lib/content";

const tabs: Array<{ id: Tab; label: string; Icon: typeof HomeIcon }> = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "workshops", label: "Workshops", Icon: WorkshopIcon },
  { id: "shop", label: "Shop", Icon: ShopIcon },
  { id: "recipes", label: "Recipes", Icon: BowlIcon },
  { id: "yoga", label: "Yoga", Icon: LeafIcon },
];

export function AppShell() {
  const [tab, setTab] = useState<Tab>("home");
  const scroller = useRef<HTMLDivElement>(null);
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const sectionId = pendingSection.current;
    pendingSection.current = null;
    if (!sectionId) {
      root.scrollTo({ top: 0 });
      return;
    }
    const target = root.querySelector<HTMLElement>(`#${sectionId}`);
    if (!target) {
      root.scrollTo({ top: 0 });
      return;
    }
    const top = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 12;
    root.scrollTo({ top, behavior: "smooth" });
  }, [tab]);

  function navigate(next: Tab, sectionId?: string) {
    pendingSection.current = sectionId ?? null;
    if (next === tab) {
      const root = scroller.current;
      if (!root) return;
      if (!sectionId) {
        root.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = root.querySelector<HTMLElement>(`#${sectionId}`);
      if (!target) return;
      const top = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 12;
      root.scrollTo({ top, behavior: "smooth" });
      return;
    }
    setTab(next);
  }

  return (
    <div className="flex min-h-dvh justify-center bg-[#d7e8e3]">
      <div className="flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[linear-gradient(180deg,#e5f3ef_0%,#f3f7f4_32%,#f6f4ef_100%)] sm:my-4 sm:h-[calc(100dvh-2rem)] sm:rounded-[2rem] sm:shadow-[0_24px_70px_rgba(36,72,66,0.16)]">
        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
          {tab === "home" ? <HomeScreen onNavigate={navigate} /> : null}
          {tab === "workshops" ? <WorkshopsScreen /> : null}
          {tab === "shop" ? <ShopScreen /> : null}
          {tab === "recipes" ? <RecipesScreen /> : null}
          {tab === "yoga" ? <YogaScreen /> : null}
        </div>
        <nav
          aria-label="Primary"
          className="grid shrink-0 grid-cols-5 border-t border-line bg-white/95 px-1 pt-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] backdrop-blur-md"
        >
          {tabs.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => navigate(id)}
                className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium tracking-[-0.01em] ${
                  active ? "text-forest" : "text-muted"
                }`}
              >
                <span className={`flex h-8 w-9 items-center justify-center rounded-full ${active ? "bg-forest/10" : ""}`}>
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
