"use client";

import { useCallback, useRef } from "react";
import confetti from "canvas-confetti";

// Cores que combinam com o site Capiau
const CONFETTI_COLORS = [
  "#5BBDB4", // turquesa principal
  "#000000", // preto
  "#ffffff", // branco
  "#4CA99F", // turquesa mais escuro
  "#7DCDC5", // turquesa mais claro
];

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  scalar?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
}

export function useConfetti() {
  const hasFireRef = useRef<{ [key: string]: boolean }>({});

  const fireConfetti = useCallback((options?: ConfettiOptions) => {
    const defaults: ConfettiOptions = {
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: CONFETTI_COLORS,
      scalar: 1.2,
      gravity: 1,
      drift: 0,
      ticks: 200,
    };

    const merged = { ...defaults, ...options };

    confetti({
      ...merged,
      disableForReducedMotion: true,
    });
  }, []);

  // Explosão central simples
  const fireCenterBurst = useCallback(() => {
    fireConfetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
    });
  }, [fireConfetti]);

  // Explosão dos lados (efeito celebração)
  const fireSideBurst = useCallback(() => {
    // Lado esquerdo
    fireConfetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.1, y: 0.6 },
      drift: 1,
    });

    // Lado direito
    fireConfetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.9, y: 0.6 },
      drift: -1,
    });
  }, [fireConfetti]);

  // Explosão final épica
  const fireFinale = useCallback(() => {
    const duration = 1500;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      fireConfetti({
        particleCount: 50,
        spread: 100,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
        scalar: 0.8 + Math.random() * 0.4,
      });
    }, 100);
  }, [fireConfetti]);

  // Função para disparar apenas uma vez (útil para Waypoints)
  const fireOnce = useCallback(
    (key: string, fireFn: () => void) => {
      if (!hasFireRef.current[key]) {
        hasFireRef.current[key] = true;
        fireFn();
      }
    },
    []
  );

  // Reset para permitir disparar novamente (útil quando scrollar para trás)
  const resetFired = useCallback((key: string) => {
    hasFireRef.current[key] = false;
  }, []);

  return {
    fireConfetti,
    fireCenterBurst,
    fireSideBurst,
    fireFinale,
    fireOnce,
    resetFired,
  };
}

