"use client";

import * as Scrollytelling from "@bsmnt/scrollytelling";
import { CapsModel } from "./CapsModel";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

const splitText = (text: string, highlightClass?: string) => {
  const wordsArray = text.split(" ");

  const htmlWords = wordsArray.map((word, i) => {
    const hasLineBreak = word.includes("\n");

    return (
      <span className={highlightClass} key={i}>
        {word}
        {i < wordsArray.length - 1 && " "}
        {hasLineBreak && <br />}
      </span>
    );
  });

  return htmlWords;
};

const lines = ["We want to help", "make the internet", "everything it can be."];

export const FallingCaps = () => {
  const splittedText = useMemo(
    () =>
      lines
        .map((line, lineIdx) => {
          const isLast = lineIdx === lines.length - 1;
          // Using standard Tailwind for the highlight
          const wordElements = splitText(
            line + "\n",
            isLast ? "text-orange-500" : undefined
          );

          return wordElements;
        })
        .flat(),
    []
  );

  return (
    // debug={true} can be added to Root to see markers
    <Scrollytelling.Root end="bottom bottom" debug={{ label: "Falling Caps" }}>
      {/* spacer: relative h-[700vh] */}
      <section className="relative h-[700vh]">
        {/* pin: sticky top-0 h-screen flex col justify-center */}
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          {/* canvas-container: absolute, manual centering logic from SCSS converted */}
          {/* SCSS was: top: 50%, height: 140% (calc(100% + 40%)), translateY(-50%) */}
          <div className="absolute top-1/2 left-0 w-full h-[140%] -translate-y-1/2 z-[1] pointer-events-none">
            <Canvas
              camera={{ position: [0, 0, 10], fov: 35 }}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
              }}
            >
              <CapsModel />
            </Canvas>
          </div>

          {/* paragraph: typography and positioning */}
          <p className="relative z-10 text-[min(17px,5vw)] md:text-[min(56px,5vw)] font-black max-w-max mx-auto capitalize leading-tight pointer-events-none text-center">
            <Scrollytelling.Stagger
              overlap={0}
              tween={{
                start: 0,
                end: 50,
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
          </p>
        </div>
      </section>
    </Scrollytelling.Root>
  );
};

