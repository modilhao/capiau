"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsapClient";
import MatrixBackground from "./MatrixBackground";

export default function HeroMatrix() {
  const containerRef = useRef<HTMLElement | null>(null);
  const matrixRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(matrixRef.current, {
        opacity: 0.2,
        duration: 1,
      })
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div
        ref={matrixRef}
        className="absolute inset-0 pointer-events-none opacity-0"
      >
        <MatrixBackground />
      </div>

      {/* Toggle White Label - canto superior direito */}
      <div className="absolute top-6 right-6 z-10">
        <button
          className="px-4 py-2 text-sm text-foreground border border-muted rounded-md hover:border-accent transition-colors"
          aria-label="Alternar modo White Label"
        >
          White Label
        </button>
      </div>

      {/* Conteúdo centralizado */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold tracking-tight text-foreground opacity-0 translate-y-10 will-change-transform"
        >
          CAPIAU
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-muted mt-4 opacity-0 translate-y-5 will-change-transform"
        >
          Conversas que viram crescimento.
        </p>
      </div>

      {/* Área para social icons - parte inferior */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        {/* Social icons placeholder - será implementado depois */}
        <div className="flex gap-4">
          {/* Placeholder para ícones sociais */}
        </div>
      </div>
    </section>
  );
}
