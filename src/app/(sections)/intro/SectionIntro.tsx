"use client";

import { useMemo } from "react";
import * as Scrollytelling from "@bsmnt/scrollytelling";

const splitText = (text: string, wordClass?: string, keyPrefix = "") => {
  const wordsArray = text.split(" ");

  const htmlWords = wordsArray.map((word, i) => {
    const hasLineBreak = word.includes("\n");

    return (
      <span className={wordClass} key={`${keyPrefix}-${i}`}>
        {word}
        {i < wordsArray.length - 1 && " "}
        {hasLineBreak && <br />}
      </span>
    );
  });

  return htmlWords;
};

export default function SectionIntro() {
  // Dividir o texto principal em linhas
  const lines = [
    "THE RESULTS-DRIVEN,",
    "CONVERSATION-LED STUDIO",
    "BUILT FOR THE NEW INTERNET.",
  ];

  const splittedText = useMemo(() => {
    const elements: React.ReactElement[] = [];
    
    lines.forEach((line, lineIdx) => {
      const isLast = lineIdx === lines.length - 1;
      const wordsArray = line.split(" ");
      
      wordsArray.forEach((word, wordIdx) => {
        const key = `line-${lineIdx}-word-${wordIdx}`;
        const isLastWord = wordIdx === wordsArray.length - 1;
        
        // Adicionar a palavra com espaço e quebra de linha incluídos
        elements.push(
          <span key={key} className={isLast ? "text-orange-500 font-semibold" : undefined}>
            {word}
            {!isLastWord && " "}
            {isLastWord && <br />}
          </span>
        );
      });
    });
    
    return elements;
  }, []);

  // Texto do subtítulo também dividido
  const subtitleLines = ["We turn attention into momentum."];
  const splittedSubtitle = useMemo(() => {
    const elements: React.ReactElement[] = [];
    
    subtitleLines.forEach((line, lineIdx) => {
      const wordsArray = line.split(" ");
      wordsArray.forEach((word, wordIdx) => {
        const key = `subtitle-${lineIdx}-word-${wordIdx}`;
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

  return (
    <Scrollytelling.Root end="bottom bottom">
      {/* Spacer: altura grande para criar espaço de scroll */}
      <section 
        className="relative h-[700vh]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0.95) 50%, rgb(0, 0, 0) 100%)'
        }}
      >
        {/* Pin: conteúdo fixo durante o scroll */}
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Overlay de gradiente */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/95 z-0" />

          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 z-10">
            {/* Label superior */}
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-muted mb-6">
              capiau — social-first studio
            </p>

            {/* Título principal - animação palavra por palavra */}
            <div className="mt-6 relative inline-block overflow-hidden">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground">
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

            {/* Subtítulo - animação palavra por palavra (começa depois) */}
            <p
              className="mt-8 text-lg md:text-2xl text-muted font-light"
              style={{
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}
            >
              <Scrollytelling.Stagger
                overlap={0.1}
                tween={{
                  start: 40, // Começa um pouco depois do título
                  end: 80,
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
                {splittedSubtitle}
              </Scrollytelling.Stagger>
            </p>
          </div>
        </div>
      </section>
    </Scrollytelling.Root>
  );
}