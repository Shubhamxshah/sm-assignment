"use client";

import { useEffect, useRef, useState } from "react";
import { HomeScreen } from "@/components/home-screen";
import { HomeIcon, ProfileIcon, ShopIcon, WorkshopIcon } from "@/components/icons";
import { ProfileScreen, ShopScreen, WorkshopsScreen } from "@/components/other-screens";
import type { Tab } from "@/lib/content";

const tabs: Array<{ id: Tab; label: string; Icon: typeof HomeIcon }> = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "workshops", label: "Workshops", Icon: WorkshopIcon },
  { id: "shop", label: "Shop", Icon: ShopIcon },
  { id: "profile", label: "Profile", Icon: ProfileIcon },
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
    <div className="flex min-h-dvh justify-center bg-gradient-to-b from-sage to-cream">
      <div className="flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-gradient-to-b from-sage to-cream sm:my-4 sm:h-[calc(100dvh-2rem)] sm:rounded-[2rem] sm:shadow-[0_0_0_1px_rgba(107,83,68,0.08),0_24px_60px_rgba(44,40,37,0.14)]">
        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
          {tab === "home" ? <HomeScreen onNavigate={navigate} /> : null}
          {tab === "workshops" ? <WorkshopsScreen /> : null}
          {tab === "shop" ? <ShopScreen /> : null}
          {tab === "profile" ? <ProfileScreen /> : null}
        </div>
        <nav
          aria-label="Primary"
          className="grid shrink-0 grid-cols-4 border-t border-line bg-card px-1 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))]"
        >
          {tabs.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => navigate(id)}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold ${
                  active ? "text-sage-deep" : "text-brown-soft"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
