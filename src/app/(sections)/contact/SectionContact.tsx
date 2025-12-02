"use client";

import { useMemo } from "react";
import * as Scrollytelling from "@bsmnt/scrollytelling";
import { useConfetti } from "./useConfetti";

export default function SectionContact() {
  const { fireCenterBurst, fireSideBurst, fireFinale, fireOnce, resetFired } =
    useConfetti();

  // Email dividido em caracteres para animação
  const email = "team@capiau.org";
  const splittedEmail = useMemo(() => {
    return email.split("").map((char, idx) => (
      <span
        key={`email-char-${idx}`}
        className={char === "@" || char === "." ? "text-[#4CA99F]" : ""}
      >
        {char}
      </span>
    ));
  }, []);

  // Texto de chamada
  const callToAction = "Let's Talk?";

  return (
    <Scrollytelling.Root end="bottom bottom">
      {/* Spacer: altura grande para criar espaço de scroll */}
      <section
        className="relative h-[700vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgb(91, 189, 180) 0%, rgba(91, 189, 180, 0.98) 5%, rgba(91, 189, 180, 0.95) 15%, rgba(91, 189, 180, 0.9) 30%, rgba(91, 189, 180, 0.85) 50%, rgb(91, 189, 180) 100%)",
        }}
      >
        {/* Waypoints para disparar confetes em momentos específicos */}
        <Scrollytelling.Waypoint
          at={30}
          onCall={() => fireOnce("center-burst", fireCenterBurst)}
          onReverseCall={() => resetFired("center-burst")}
        />
        <Scrollytelling.Waypoint
          at={60}
          onCall={() => fireOnce("side-burst", fireSideBurst)}
          onReverseCall={() => resetFired("side-burst")}
        />
        <Scrollytelling.Waypoint
          at={85}
          onCall={() => fireOnce("finale", fireFinale)}
          onReverseCall={() => resetFired("finale")}
        />

        {/* Pin: conteúdo fixo durante o scroll */}
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Overlay de gradiente */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#5BBDB4]/30 to-[#5BBDB4]/80 z-0" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10 text-center flex flex-col justify-center items-center">
            {/* Texto de chamada */}
            <Scrollytelling.Animation
              tween={{
                start: 0,
                end: 25,
                fromTo: [
                  {
                    opacity: 0.2,
                    y: 20,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                  },
                ],
              }}
            >
              <p
                className="text-lg md:text-xl lg:text-2xl text-black font-normal mb-8"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  letterSpacing: "0.01em",
                  fontWeight: 400,
                }}
              >
                {callToAction}
              </p>
            </Scrollytelling.Animation>

            {/* Email principal - animação caractere por caractere */}
            <div className="relative inline-block overflow-hidden">
              <a
                href={`mailto:${email}`}
                className="block text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-foreground hover:opacity-80 transition-opacity duration-300"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  letterSpacing: "-0.02em",
                  fontWeight: 900,
                  whiteSpace: "nowrap",
                  wordBreak: "keep-all",
                  overflowWrap: "normal",
                }}
              >
                <Scrollytelling.Stagger
                  overlap={0.3}
                  tween={{
                    start: 15,
                    end: 70,
                    fromTo: [
                      {
                        opacity: 0,
                        y: 50,
                        rotateX: -90,
                      },
                      {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        ease: "back.out(1.7)",
                      },
                    ],
                  }}
                >
                  {splittedEmail}
                </Scrollytelling.Stagger>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Scrollytelling.Root>
  );
}
