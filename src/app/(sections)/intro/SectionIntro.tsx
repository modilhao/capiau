"use client";

import { useMemo } from "react";
import * as Scrollytelling from "@bsmnt/scrollytelling";

export default function SectionIntro() {
  // Dividir o texto principal em linhas
  const lines = ["ELITE THINKERS."];

  const splittedText = useMemo(() => {
    const elements: React.ReactElement[] = [];

    lines.forEach((line, lineIdx) => {
      const wordsArray = line.split(" ");

      wordsArray.forEach((word, wordIdx) => {
        const key = `line-${lineIdx}-word-${wordIdx}`;
        const isLastWord = wordIdx === wordsArray.length - 1;

        // Adicionar a palavra com espaço incluído
        elements.push(
          <span key={key}>
            {word}
            {!isLastWord && " "}
          </span>
        );
      });
    });

    return elements;
  }, []);

  // Texto do subtítulo dividido em CARACTERES (como o email no SectionContact)
  const subtitle = "The results-driven, social-first agency you've been looking for.";
  
  // Palavras que terão destaque visual
  const highlightWords = ["results-driven,", "social-first"];
  
  const splittedSubtitle = useMemo(() => {
    // Dividir em palavras primeiro para poder destacar
    const words = subtitle.split(" ");
    const elements: React.ReactElement[] = [];
    
    words.forEach((word, wordIdx) => {
      const isHighlight = highlightWords.includes(word);
      
      // Dividir cada palavra em caracteres
      word.split("").forEach((char, charIdx) => {
        elements.push(
          <span
            key={`subtitle-word-${wordIdx}-char-${charIdx}`}
            className={isHighlight ? "text-[#1a1a1a]" : ""}
            style={{
              display: "inline-block",
              ...(isHighlight && { 
                textShadow: "0 0 40px rgba(0,0,0,0.15)"
              })
            }}
          >
            {char}
          </span>
        );
      });
      
      // Adicionar espaço entre palavras (também como span para animar)
      if (wordIdx < words.length - 1) {
        elements.push(
          <span
            key={`subtitle-space-${wordIdx}`}
            style={{ display: "inline-block" }}
          >
            &nbsp;
          </span>
        );
      }
    });
    
    return elements;
  }, []);

  return (
    <Scrollytelling.Root end="bottom bottom">
      {/* Spacer: altura grande para criar espaço de scroll */}
      <section 
        className="relative h-[700vh]"
        style={{
          background: 'linear-gradient(to bottom, rgb(91, 189, 180) 0%, rgba(91, 189, 180, 0.98) 5%, rgba(91, 189, 180, 0.95) 15%, rgba(91, 189, 180, 0.9) 30%, rgba(91, 189, 180, 0.85) 50%, rgb(91, 189, 180) 100%)'
        }}
      >
        {/* Pin: conteúdo fixo durante o scroll */}
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Overlay de gradiente */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#5BBDB4]/30 to-[#5BBDB4]/80 z-0" />

          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 z-10 text-center">
            {/* Título principal - animação palavra por palavra */}
            <div className="relative inline-block overflow-hidden">
              <h2
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-foreground"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  letterSpacing: "-0.02em",
                  fontWeight: 900,
                }}
              >
                <Scrollytelling.Stagger
                  overlap={0.1}
                  tween={{
                    start: 0,
                    end: 60,
                    fromTo: [
                      {
                        opacity: 0.2,
                      },
                      {
                        opacity: 1,
                        ease: "power2.out",
                      },
                    ],
                  }}
                >
                  {splittedText}
                </Scrollytelling.Stagger>
              </h2>
            </div>

            {/* Subtítulo - animação caractere por caractere com efeito 3D */}
            <div 
              className="mt-10 md:mt-14 relative overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              <p
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black/90 leading-[1.15] md:leading-[1.2]"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  letterSpacing: "-0.01em",
                  fontWeight: 800,
                  maxWidth: "90%",
                  margin: "0 auto",
                }}
              >
                <Scrollytelling.Stagger
                  overlap={0.4}
                  tween={{
                    start: 25,
                    end: 75,
                    fromTo: [
                      {
                        opacity: 0,
                        y: 60,
                        rotateX: -90,
                        scale: 0.8,
                      },
                      {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        ease: "back.out(1.7)",
                      },
                    ],
                  }}
                >
                  {splittedSubtitle}
                </Scrollytelling.Stagger>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Scrollytelling.Root>
  );
}