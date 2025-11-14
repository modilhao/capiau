"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";

export default function SectionIntro() {
  const containerRef = useRef<HTMLElement | null>(null);
  const momentumRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const momentum = momentumRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Estado inicial do container
      gsap.set(container, {
        y: 60,
        opacity: 0.5,
      });

      // Selecionar apenas as palavras do título principal
      const words = gsap.utils.toArray<HTMLElement>(
        ".intro-word",
        container
      ) as HTMLElement[];
      
      if (words.length === 0) {
        console.warn("Nenhuma palavra encontrada com classe .intro-word");
        return;
      }

      // Configurar estado inicial de cada palavra
      words.forEach((word, idx) => {
        const isEven = idx % 2 === 0;
        word.style.transformOrigin = "center bottom";
        
        gsap.set(word, {
          opacity: 0,
          y: 40,
          scale: 0.5,
          rotation: isEven ? 5 : -5,
          filter: "blur(5px)",
        });
      });

      // Timeline principal com ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "top 10%",
          scrub: 0.8,
        },
      });

      // Animação do container
      tl.to(container, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }, 0);

      // Animação das palavras com stagger e overlap
      // Usar fromTo para ter controle total sobre início e fim
      words.forEach((word, idx) => {
        const isEven = idx % 2 === 0;
        const staggerAmount = 0.1; // Delay entre palavras
        const overlap = 0.65; // 65% de overlap
        
        // Calcular posição na timeline com overlap
        const startTime = idx * staggerAmount * (1 - overlap);
        
        tl.fromTo(
          word,
          {
            opacity: 0,
            y: 40,
            scale: 0.5,
            rotation: isEven ? 5 : -5,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          startTime
        );
      });

      // Efeito "momentum" para a frase final - movimento acelerado
      if (momentum) {
        gsap.set(momentum, {
          opacity: 0,
          x: -100, // começa deslocado para a esquerda
          scale: 0.8,
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top 50%",
          end: "top 10%",
          scrub: 0.6,
          onUpdate: (self) => {
            // Efeito de aceleração/momentum: começa devagar e acelera
            const momentumProgress = gsap.utils.clamp(0, 1, self.progress);
            // Easing exponencial para simular aceleração (momentum)
            const exponentialEase = 1 - Math.pow(1 - momentumProgress, 3); // ease-out cubic

            gsap.set(momentum, {
              opacity: exponentialEase,
              x: -100 * (1 - exponentialEase), // desliza da esquerda para o centro
              scale: 0.8 + exponentialEase * 0.2, // cresce de 0.8 para 1.0
              filter: `blur(${8 * (1 - exponentialEase)}px)`, // blur desaparece
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
      className="relative -mt-px min-h-[90vh] text-foreground flex items-center"
    >
      {/* overlay de gradiente, mesma vibe da hero */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/95" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-muted">
          capiau — social-first studio
        </p>

        {/* wrapper da frase com highlight palavra por palavra */}
        <div className="mt-6 relative inline-block overflow-hidden">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground">
            <span className="intro-word inline-block mr-2">THE</span>
            <span className="intro-word inline-block mr-2">RESULTS-DRIVEN,</span>
            <br />
            <span className="intro-word inline-block mr-2 font-semibold">CONVERSATION-LED</span>
            <span className="intro-word inline-block mr-2 font-semibold">STUDIO</span>
            <br />
            <span className="intro-word inline-block mr-2">BUILT</span>
            <span className="intro-word inline-block mr-2">FOR</span>
            <span className="intro-word inline-block mr-2">THE</span>
            <span className="intro-word inline-block mr-2">NEW</span>
            <span className="intro-word inline-block">INTERNET.</span>
          </h2>
        </div>

        <p ref={momentumRef} className="mt-8 text-lg md:text-2xl text-muted">
          We turn attention into momentum.
        </p>
      </div>
    </section>
  );
}
