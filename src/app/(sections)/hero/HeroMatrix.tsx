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
  const animationCompletedRef = useRef(false); // Flag para garantir que animação não seja revertida

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animação inicial do CAPIAU - executa apenas uma vez
  useEffect(() => {
    if (!mounted || animationCompletedRef.current) return;

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
          onComplete: function () {
            // Garantir que progresso fique em 1 e marcar como completo
            setCapiauProgress(1);
            animationCompletedRef.current = true;
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
    }, containerRef);

    // Não fazer cleanup/revert aqui - deixar a animação persistir
    return () => {
      // Não fazer ctx.revert() para manter a animação
    };
  }, [mounted]); // Remover hasScrolled das dependências

  // Handler de scroll separado - não interfere na animação
  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted, hasScrolled]);

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative min-h-screen flex items-center justify-center bg-background text-foreground"
      >
      <div
        ref={matrixRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        suppressHydrationWarning
      >
        {mounted && <MatrixBackground capiauProgress={capiauProgress} />}
      </div>
      {/* Gradiente de transição na parte inferior para conectar com a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#5BBDB4]/30 to-[#5BBDB4] pointer-events-none z-[5]" />

      {/* 3. Adicionar o JSX na parte inferior (substituir a área de social icons) */}
      {!hasScrolled && (
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-0"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-black font-normal drop-shadow-md">
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
              className="text-black drop-shadow-md"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
