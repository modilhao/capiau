"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/gsapClient";

export default function CustomCursor() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const outerCircleRef = useRef<SVGSVGElement | null>(null);
  const innerHeartRef = useRef<SVGSVGElement | null>(null);
  const hoverTextRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null); // Nova ref para spotlight

  const [mounted, setMounted] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // evita rodar em dispositivos touch
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let frameId: number | null = null;

    const updateCursor = () => {
      // lerp para suavizar o outer circle
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;

      // Círculo externo (suavizado)
      if (outerCircleRef.current) {
        gsap.set(outerCircleRef.current, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
        });
      }

      // Coração segue o mouse diretamente (sem lerp) - SUGESTÃO OPCIONAL
      if (innerHeartRef.current) {
        gsap.set(innerHeartRef.current, {
          x: mouseX,  // direto, sem lerp
          y: mouseY,  // direto, sem lerp
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
        });
      }

      // Spotlight segue o mouse (suavizado para movimento fluido)
      if (spotlightRef.current) {
        gsap.set(spotlightRef.current, {
          x: mouseX,
          y: mouseY,
          xPercent: -50,
          yPercent: -50,
        });
      }

      // Texto grande acompanha o mouse (levemente deslocado)
      if (hoverTextRef.current && hoverText) {
        gsap.set(hoverTextRef.current, {
          x: mouseX + 40,
          y: mouseY + 40,
          transformOrigin: "left top",
        });
      }

      frameId = window.requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const raw = target.dataset.cursorText || "";
      const text = raw.trim();
      setHoverText(text ? (text.length > 24 ? text.slice(0, 24) : text) : null);

      if (outerCircleRef.current) {
        gsap.to(outerCircleRef.current, {
          scale: 1.25,
          duration: 0.22,
          ease: "power2.out",
        });
      }

      // Spotlight aumenta ao fazer hover
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          scale: 1.6,
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      setHoverText(null);
      if (outerCircleRef.current) {
        gsap.to(outerCircleRef.current, {
          scale: 1,
          duration: 0.22,
          ease: "power2.out",
        });
      }

      // Spotlight volta ao normal
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          scale: 1,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const interactiveElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor-hover], [data-cursor-text]"
      )
    );

    window.addEventListener("mousemove", handleMouseMove);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Inicializar spotlight com opacidade um pouco maior para ser mais visível
    if (spotlightRef.current) {
      gsap.set(spotlightRef.current, {
        opacity: 0.3,
        scale: 1,
      });
    }

    frameId = window.requestAnimationFrame(updateCursor);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [mounted, hoverText]);

  if (!mounted) return null;

  return (
    <>
      {/* Camada de Spotlight - clareia a área ao redor do cursor */}
      <div
        ref={spotlightRef}
        className="cursor-spotlight fixed pointer-events-none z-[9998]"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.02) 60%, transparent 75%)",
          willChange: "transform, opacity",
          mixBlendMode: "screen", // Clareia o conteúdo abaixo
        }}
      />

      {/* Camada do cursor */}
      <div
        ref={layerRef}
        className="cursor-layer fixed inset-0 pointer-events-none z-[9999]"
      >
        {/* Círculo externo (segue suavizado) */}
        <svg
          ref={outerCircleRef}
          className="cursor-outer"
          width={70}
          height={70}
          viewBox="0 0 34 34"
          fill="none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            willChange: "transform",
          }}
        >
          <ellipse
            cx="17"
            cy="17"
            rx="13"
            ry="13"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
          />
        </svg>

        {/* Coração pixelado vermelho (inner) - segue mouse diretamente */}
        <svg
          ref={innerHeartRef}
          className="cursor-inner-heart"
          width={24}
          height={24}
          viewBox="0 0 8 6"
          fill="none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            willChange: "transform",
          }}
        >
          {/* pixel heart 8x6 */}
          {/* linha 0 */}
          <rect x="1" y="0" width="1" height="1" fill="#ff3b30" />
          <rect x="2" y="0" width="1" height="1" fill="#ff3b30" />
          <rect x="4" y="0" width="1" height="1" fill="#ff3b30" />
          <rect x="5" y="0" width="1" height="1" fill="#ff3b30" />
          {/* linha 1 */}
          <rect x="0" y="1" width="1" height="1" fill="#ff3b30" />
          <rect x="1" y="1" width="1" height="1" fill="#ff3b30" />
          <rect x="2" y="1" width="1" height="1" fill="#ff3b30" />
          <rect x="3" y="1" width="1" height="1" fill="#ff3b30" />
          <rect x="4" y="1" width="1" height="1" fill="#ff3b30" />
          <rect x="5" y="1" width="1" height="1" fill="#ff3b30" />
          <rect x="6" y="1" width="1" height="1" fill="#ff3b30" />
          {/* linha 2 */}
          <rect x="0" y="2" width="1" height="1" fill="#ff3b30" />
          <rect x="1" y="2" width="1" height="1" fill="#ff3b30" />
          <rect x="2" y="2" width="1" height="1" fill="#ff3b30" />
          <rect x="3" y="2" width="1" height="1" fill="#ff3b30" />
          <rect x="4" y="2" width="1" height="1" fill="#ff3b30" />
          <rect x="5" y="2" width="1" height="1" fill="#ff3b30" />
          <rect x="6" y="2" width="1" height="1" fill="#ff3b30" />
          {/* linha 3 */}
          <rect x="1" y="3" width="1" height="1" fill="#ff3b30" />
          <rect x="2" y="3" width="1" height="1" fill="#ff3b30" />
          <rect x="3" y="3" width="1" height="1" fill="#ff3b30" />
          <rect x="4" y="3" width="1" height="1" fill="#ff3b30" />
          <rect x="5" y="3" width="1" height="1" fill="#ff3b30" />
          {/* linha 4 */}
          <rect x="2" y="4" width="1" height="1" fill="#ff3b30" />
          <rect x="3" y="4" width="1" height="1" fill="#ff3b30" />
          <rect x="4" y="4" width="1" height="1" fill="#ff3b30" />
          {/* linha 5 */}
          <rect x="3" y="5" width="1" height="1" fill="#ff3b30" />
        </svg>

        {/* Texto hover grande, montado por caracteres */}
        {hoverText && (
          <div
            ref={hoverTextRef}
            className="cursor-hover-text fixed pointer-events-none"
            style={{
              willChange: "transform",
            }}
          >
            <p>
              {hoverText.split("").map((char, i) => (
                <span
                  key={i}
                  className="char-anim"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </>
  );
}