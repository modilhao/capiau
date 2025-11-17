"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/gsapClient";
import MatrixBackground from "./MatrixBackground";

export default function HeroMatrix() {
  const containerRef = useRef<HTMLElement | null>(null);
  const matrixRef = useRef<HTMLDivElement | null>(null);
  const capiauRef = useRef<HTMLSpanElement | null>(null);
  const [whiteLabel, setWhiteLabel] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Adicionar refs e estado
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Animação inicial de entrada (on load)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(matrixRef.current, {
        opacity: 0.18,
        duration: 1.2,
      })
        .fromTo(
          capiauRef.current,
          { opacity: 0, filter: "blur(12px)" },
          { opacity: 1, filter: "blur(0px)", duration: 1.1 },
          "-=0.6"
        );

      // Animação de entrada do scroll indicator (após animação do CAPIAU)
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 2, // Aparece após as animações iniciais
            ease: "power2.out",
          }
        );

        // Animação contínua de "bounce" sutil
        gsap.to(scrollIndicatorRef.current.querySelector(".scroll-arrow"), {
          y: 8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Detectar scroll e esconder o indicator
      const handleScroll = () => {
        // Usar requestAnimationFrame para melhor performance com Lenis
        requestAnimationFrame(() => {
          if (window.scrollY > 50 && !hasScrolled) {
            setHasScrolled(true);
            if (scrollIndicatorRef.current) {
              gsap.to(scrollIndicatorRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                  if (scrollIndicatorRef.current) {
                    scrollIndicatorRef.current.style.display = "none";
                  }
                },
              });
            }
          }
        });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [mounted, hasScrolled]);

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative min-h-screen flex items-center justify-center bg-background text-foreground"
      >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div
        ref={matrixRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        suppressHydrationWarning
      >
        {mounted && <MatrixBackground />}
      </div>

      {/* Toggle White Label - canto superior direito */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setWhiteLabel((prev) => !prev)}
          className="px-4 py-2 text-xs md:text-sm uppercase tracking-[0.25em] text-foreground/80 border border-foreground/25 rounded-full bg-black/40 backdrop-blur-md hover:border-foreground/60 hover:text-foreground transition-colors"
          aria-label="Alternar modo White Label"
        >
          {whiteLabel ? "WHITE LABEL: ON" : "WHITE LABEL: OFF"}
        </button>
      </div>

      {/* CAPIAU pequeno centralizado sobre o Matrix */}
      {mounted && !whiteLabel && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <span
            ref={capiauRef}
            className="
              font-[var(--font-inter)]
              text-xs md:text-sm
              tracking-[0.6em]
              uppercase
              text-white
              drop-shadow-[0_0_10px_rgba(255,255,255,0.75)]
              drop-shadow-[0_0_22px_rgba(255,255,255,0.55)]
              drop-shadow-[0_0_42px_rgba(255,255,255,0.45)]
            "
          >
            C&nbsp;A&nbsp;P&nbsp;I&nbsp;A&nbsp;U
          </span>
        </div>
      )}

      {/* 3. Adicionar o JSX na parte inferior (substituir a área de social icons) */}
      {!hasScrolled && (
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-0"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-foreground/60 font-light">
            Explore
          </span>
          <div className="scroll-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/60"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
