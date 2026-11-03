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

export function Countdown() {
  const [left, setLeft] = useState(START_SECONDS);

  useEffect(() => {
    if (endAt === 0) endAt = Date.now() + START_SECONDS * 1000;
    const tick = () => setLeft(Math.max(0, Math.round((endAt - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (left === 0) {
    return <span className="mt-3 block text-sm font-bold text-sage-deep">Starting now</span>;
  }

  return (
    <span className="mt-3 block text-[13px] leading-5 text-brown">
      Starting in
      <span className="mt-1 block font-bold text-lg tabular-nums tracking-wide text-sage-deep">
        {format(left)}
      </span>
    </span>
  );
}
