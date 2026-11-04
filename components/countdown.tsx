"use client";

import { useEffect, useState } from "react";

const START_SECONDS = 2 * 60 * 60 + 3 * 60 + 25;
let endAt = 0;

function format(total: number) {
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

export function Countdown({ tone = "ink", compact = false }: { tone?: "ink" | "light"; compact?: boolean }) {
  const [left, setLeft] = useState(START_SECONDS);
  const label = tone === "light" ? "text-white/75" : "text-muted";
  const time = tone === "light" ? "text-white" : "text-forest";

  useEffect(() => {
    if (endAt === 0) endAt = Date.now() + START_SECONDS * 1000;
    const tick = () => setLeft(Math.max(0, Math.round((endAt - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (left === 0) {
    return (
      <span className={`block font-medium ${compact ? "mt-2.5 text-[14px]" : "mt-4 text-[15px]"} ${time}`}>
        Starting now
      </span>
    );
  }

  return (
    <span className={`block ${compact ? "mt-2.5" : "mt-4"}`}>
      <span className={`block ${compact ? "text-[12px]" : "text-[13px]"} ${label}`}>Starting in</span>
      <span
        className={`block font-medium tabular-nums tracking-[-0.04em] ${time} ${compact ? "mt-0.5 text-[15px]" : "mt-1 text-[1.65rem]"}`}
      >
        {format(left)}
      </span>
    </span>
  );
}
