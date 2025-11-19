"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/gsapClient";

export default function CustomCursor() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<SVGSVGElement | null>(null);
  const hoverTextRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Verificar se é dispositivo touch
    setIsTouchDevice(
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
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
    let prevCursorX = cursorX;
    let prevCursorY = cursorY;
    let frameId: number | null = null;

    const updateCursor = () => {
      // Salvar posição anterior para calcular velocidade
      prevCursorX = cursorX;
      prevCursorY = cursorY;
      
      // Lerp para suavizar movimento
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;

      // Calcular velocidade (delta entre frames)
      const deltaX = cursorX - prevCursorX;
      const deltaY = cursorY - prevCursorY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Calcular ângulo de rotação para alinhar deformação com direção do movimento
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Calcular deformação baseada na velocidade
      // Quanto mais rápido, mais estica (máximo ~2x)
      const stretchFactor = Math.min(distance * 0.15, 1.0); // Ajuste o 0.15 para controlar sensibilidade
      const scaleX = 1 + stretchFactor;
      const scaleY = 1 - (stretchFactor * 0.3); // Achata um pouco no eixo Y para efeito de pílula

      // Aplicar transformações ao cursor com deformação elástica
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
          rotation: angle,
          scaleX: scaleX,
          scaleY: scaleY,
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

      // No hover, apenas aumentar o tamanho base (a deformação continua funcionando)
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          duration: 0.22,
          ease: "power2.out",
          overwrite: false, // Não sobrescrever scaleX/scaleY da deformação
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
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
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

  // Não renderizar em dispositivos touch
  if (!mounted || isTouchDevice) return null;

  return (
    <>
      <div
        ref={spotlightRef}
        className="cursor-spotlight fixed pointer-events-none z-[9998]"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.02) 60%, transparent 75%)",
          willChange: "transform, opacity",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={layerRef}
        className="cursor-layer fixed inset-0 pointer-events-none z-[9999]"
      >
        <svg
          ref={cursorRef}
          className="cursor-ball"
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            willChange: "transform",
          }}
        >
          <circle cx="10" cy="10" r="8" fill="white" />
        </svg>
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
                <span key={i} className="char-anim">
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
