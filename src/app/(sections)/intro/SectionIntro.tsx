"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, TextPlugin } from "@/lib/gsap/gsapClient";

export default function SectionIntro() {
  const containerRef = useRef<HTMLElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Estado inicial bem definido
      gsap.set(container, {
        y: 60,
        opacity: 0.5,
      });

      // palavras já visíveis, mas desbotadas
      gsap.set(".intro-word", {
        opacity: 0.25,
      });

      // Timeline controlada pelo scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "top 10%",
          scrub: 0.8,
        },
      });

      // container "encaixando" na tela
      tl.to(container, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      // highlight revelando palavra por palavra via opacidade
      tl.to(
        ".intro-word",
        {
          opacity: 1,
          ease: "power2.out",
          duration: 1,
          stagger: 0.18,
        },
        "+=0.25" // começa um pouco depois de o container estabilizar
      );

      // Efeito typewriter para o subtítulo "We turn attention into momentum."
      const fullText = "We turn attention into momentum.";
      if (subtitleRef.current) {
        // Estado inicial: texto vazio
        subtitleRef.current.textContent = "";

        // Criar elemento de cursor separado para animação
        const cursorElement = document.createElement("span");
        cursorElement.className = "typewriter-cursor";
        cursorElement.textContent = "|";
        cursorElement.style.opacity = "1";
        subtitleRef.current.appendChild(cursorElement);

        // Animação de cursor piscando
        gsap.to(cursorElement, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });

        // Animação typewriter controlada pelo scroll
        let wasComplete = false;
        const typewriterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "top 20%",
            scrub: 1.2, // Controle preciso do typewriter
            onUpdate: (self) => {
              if (subtitleRef.current && cursorElement) {
                const progress = self.progress;
                const charCount = Math.floor(fullText.length * progress);
                const currentText = fullText.substring(0, charCount);
                
                // Atualizar texto mantendo o cursor
                const textNode = subtitleRef.current.firstChild;
                if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                  textNode.textContent = currentText;
                } else {
                  subtitleRef.current.insertBefore(
                    document.createTextNode(currentText),
                    cursorElement
                  );
                }

                // Esconder e remover cursor quando completo
                if (progress >= 1 && !wasComplete) {
                  wasComplete = true;
                  gsap.to(cursorElement, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                      if (cursorElement && cursorElement.parentNode) {
                        cursorElement.remove();
                      }
                    },
                  });
                } else if (progress < 1 && wasComplete) {
                  wasComplete = false;
                }
              }
            },
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
      className="relative min-h-screen text-foreground flex items-center"
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
            <span className="intro-word inline-block mr-2 font-semibold">
              CONVERSATION-LED
            </span>
            <span className="intro-word inline-block mr-2 font-semibold">
              STUDIO
            </span>
            <br />
            <span className="intro-word inline-block mr-2">BUILT</span>
            <span className="intro-word inline-block mr-2">FOR</span>
            <span className="intro-word inline-block mr-2">THE</span>
            <span className="intro-word inline-block mr-2">NEW</span>
            <span className="intro-word inline-block">INTERNET.</span>
          </h2>
        </div>

        <p
          ref={subtitleRef}
          className="mt-8 text-lg md:text-2xl text-muted font-light"
          style={{
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          {/* Texto será preenchido via GSAP typewriter */}
        </p>
      </div>
    </section>
  );
}