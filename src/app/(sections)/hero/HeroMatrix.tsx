"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import MatrixBackground from "./MatrixBackground";

export default function HeroMatrix() {
  const containerRef = useRef<HTMLElement | null>(null);
  const matrixRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação inicial de entrada (on load)
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
        );

      // Animação typewriter + glitch para o subtítulo (scroll-driven)
      const subtitleWords = gsap.utils.toArray<HTMLElement>(
        ".subtitle-word",
        containerRef.current
      ) as HTMLElement[];

      console.log(`Encontradas ${subtitleWords.length} palavras do subtítulo`);

      if (subtitleWords.length > 0) {
        // Estado inicial: palavras completamente invisíveis
        subtitleWords.forEach((word, idx) => {
          const element = word as HTMLElement;
          element.style.display = "inline-block";
          element.style.opacity = "0";
          element.style.visibility = "hidden"; // Esconder completamente inicialmente
          element.style.transform = "translateX(0px) scale(0.95)";
          element.style.filter = "blur(10px)";
        });

        // ScrollTrigger com onUpdate manual
        // A animação acontece quando você rola um pouco para baixo, mas ainda vê o hero
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom", // Começa quando o topo do hero toca o bottom da viewport (rolou um pouco)
          end: "top 30%", // Termina quando o topo do hero está em 30% (ainda bem visível)
          scrub: 0.6,
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;
            const wordDuration = 0.2; // Duração menor para cada palavra
            const stagger = 0.12; // Delay menor entre palavras

            subtitleWords.forEach((word, idx) => {
              const wordStart = idx * stagger;
              const wordEnd = wordStart + wordDuration;

              let wordProgress = 0;

              if (progress >= wordEnd) {
                wordProgress = 1;
              } else if (progress > wordStart) {
                wordProgress = (progress - wordStart) / wordDuration;
              }

              wordProgress = gsap.utils.clamp(0, 1, wordProgress);

              // Valores da animação
              const opacity = wordProgress;
              const blur = 10 * (1 - wordProgress);
              const scale = 0.95 + wordProgress * 0.05;

              // Glitch apenas durante revelação
              let glitchX = 0;
              let glitchHue = 0;

              if (wordProgress > 0 && wordProgress < 1) {
                const glitchIntensity = Math.sin(wordProgress * Math.PI * 8) * 0.3;
                glitchX = glitchIntensity * 10;
                glitchHue = glitchIntensity * 60;
              }

              // Aplicar diretamente via style
              const element = word as HTMLElement;
              if (wordProgress > 0) {
                element.style.visibility = "visible";
              } else {
                element.style.visibility = "hidden";
              }
              element.style.opacity = opacity.toString();
              element.style.transform = `translateX(${glitchX}px) scale(${scale})`;
              element.style.filter = `blur(${blur}px) hue-rotate(${glitchHue}deg)`;
            });
          },
        });
      }
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
          <span className="font-light" style={{ WebkitTextStroke: "1px currentColor", WebkitTextFillColor: "transparent" }}>
            cap
          </span>
          <span className="font-bold">ia</span>
          <span className="font-light" style={{ WebkitTextStroke: "1px currentColor", WebkitTextFillColor: "transparent" }}>
            u
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-muted mt-4"
        >
          <span className="subtitle-word inline-block">Conversas</span>{" "}
          <span className="subtitle-word inline-block">que</span>{" "}
          <span className="subtitle-word inline-block">viram</span>{" "}
          <span className="subtitle-word inline-block">crescimento.</span>
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
