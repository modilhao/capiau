"use client";

import { ReactNode } from "react";
import { useLenisScroll } from "@/lib/motion/useLenisScroll";

export function LayoutMotionClient({ children }: { children: ReactNode }) {
  useLenisScroll();

  return <>{children}</>;
}

