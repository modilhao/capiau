"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/gsapClient";
import MatrixBackground from "./MatrixBackground";

export default function HeroMatrix() {
  const containerRef = useRef<HTMLElement | null>(null);
  const matrixRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [capiauProgress, setCapiauProgress] = useState(0); // Progresso da animação do CAPIAU no matrix

  // Refs e estado para scroll indicator
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

      // Fade in do matrix (Opacidade total para permitir branco puro no CAPIAU)
      tl.to(matrixRef.current, {
        opacity: 1, 
        duration: 1.2,
      });

      // Animação do CAPIAU surgindo de dentro do matrix
      // A palavra é formada pelos próprios caracteres do canvas
      tl.to(
        {},
        {
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: function () {
            setCapiauProgress(this.progress());
          },
        }
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
        {mounted && <MatrixBackground capiauProgress={capiauProgress} />}
      </div>

      {/* 3. Adicionar o JSX na parte inferior (substituir a área de social icons) */}
      {!hasScrolled && (
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-0"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white font-normal drop-shadow-md">
            Explore
          </span>
          <div className="scroll-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white drop-shadow-md"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
