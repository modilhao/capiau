"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuração inicial
    const chars = "CAPIAU01#+-/*アカサタナハマヤラワ";
    const fontSize = 14;
    let columns = 0;
    let rows = 0;
    let grid: string[][] = [];
    let width = 0;
    let height = 0;

    // Função para escolher caractere aleatório
    const randomChar = (): string => {
      return chars[Math.floor(Math.random() * chars.length)];
    };

    // Função para criar/recriar a grade
    const createGrid = () => {
      grid = [];
      for (let y = 0; y < rows; y++) {
        const row: string[] = [];
        for (let x = 0; x < columns; x++) {
          row.push(randomChar());
        }
        grid.push(row);
      }
    };

    // Função para ajustar tamanho do canvas
    const resizeCanvas = () => {
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Recalcular colunas e linhas
      columns = Math.floor(width / fontSize);
      rows = Math.floor(height / fontSize);

      // Recriar a grade com as novas dimensões
      createGrid();
    };

    // Função de animação
    const animate = () => {
      // Desenhar retângulo semi-transparente para criar trail premium
      ctx.fillStyle = "rgba(0, 15, 0, 0.10)";
      ctx.fillRect(0, 0, width, height);

      // Configurar glow e cor neon premium
      ctx.shadowColor = "rgba(120, 255, 180, 0.3)";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "rgba(120, 255, 180, 0.95)";
      ctx.font = `${fontSize}px monospace`;

      // Loop duplo sobre linhas e colunas da grade
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const char = grid[y][x];
          const px = x * fontSize;
          const py = y * fontSize;

          // Desenhar caractere na posição fixa
          ctx.fillText(char, px, py);

          // Pequena chance de trocar o caractere (4% por frame)
          if (Math.random() < 0.04) {
            grid[y][x] = randomChar();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Inicializar
    resizeCanvas();
    animate();

    // Handler de resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
