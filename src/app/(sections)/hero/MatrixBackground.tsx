"use client";

import { useEffect, useRef } from "react";

interface MatrixBackgroundProps {
  capiauProgress?: number; // 0 a 1, progresso da animação do CAPIAU
}

export default function MatrixBackground({ capiauProgress = 0 }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true); // Controla se a animação deve rodar

  // Atualizar ref quando prop mudar (sem re-executar useEffect)
  useEffect(() => {
    progressRef.current = capiauProgress;
  }, [capiauProgress]);

  // IntersectionObserver para pausar animação quando fora da viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 } // Pausa quando menos de 10% visível
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuração inicial
    const chars = "CAPIAU0123456789#+-/*$&アカサタナハマヤラワ";
    const fontSize = 17; // Tamanho fixo para formar CAPIAU dentro do matrix
    let columns = 0;
    let rows = 0;
    let grid: string[][] = [];
    let width = 0;
    let height = 0;
    
    // Palavra CAPIAU para formar no matrix
    const capiauWord = "CAPIAU";

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

    // Calcular posição central para CAPIAU
    const getCapiauPosition = () => {
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(columns / 2);
      const startCol = centerCol - Math.floor(capiauWord.length / 2);
      return { centerRow, startCol };
    };

    // Função de animação
    const animate = () => {
      // Pular animação se não estiver visível (economia de CPU)
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Desenhar retângulo semi-transparente para criar trail premium
      // Ajustado para combinar com background turquesa
      ctx.fillStyle = "rgba(91, 189, 180, 0.3)"; 
      ctx.fillRect(0, 0, width, height);

      // Configurar fonte (única configuração global necessária)
      ctx.font = `${fontSize}px monospace`;
      
      // Resetar shadow antes do loop (será configurado individualmente para cada caractere)
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Posição do CAPIAU
      const { centerRow, startCol } = getCapiauPosition();

      // Loop duplo sobre linhas e colunas da grade - PRIMEIRO PASS (Fundo e caracteres normais)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const px = x * fontSize;
          const py = y * fontSize;

          // Verificar se está na posição do CAPIAU
          const isInCapiauArea = 
            y === centerRow && 
            x >= startCol && 
            x < startCol + capiauWord.length;

          // Se for área do CAPIAU, só desenha no segundo pass
          if (isInCapiauArea && progressRef.current > 0) {
             // Lógica de atualização do grid continua aqui, mas desenho não
             // Calcular qual letra do CAPIAU deve aparecer
            const letterIndex = x - startCol;
            const targetLetter = capiauWord[letterIndex];
            const letterProgress = Math.max(0, Math.min(1, 
              (progressRef.current * capiauWord.length) - letterIndex
            ));

             // Atualizar grid se necessário (para manter consistência)
             if (letterProgress < 1 && Math.random() < 0.04) {
               grid[y][x] = randomChar();
             } else if (letterProgress >= 1) {
               grid[y][x] = targetLetter;
             }
             
             // Se ainda não começou a transição desta letra, desenha normal aqui
             if (letterProgress <= 0) {
                const char = grid[y][x];
                ctx.shadowColor = "rgba(239, 213, 13, 0.3)";
                ctx.shadowBlur = 3;
                const isDim = Math.random() < 0.35;
                // Opacidade ajustada para amarelo
                const baseAlpha = 0.5 + Math.random() * 0.3;
                ctx.fillStyle = isDim
                    ? `rgba(239, 213, 13, ${baseAlpha * 0.6})`
                    : `rgba(239, 213, 13, ${baseAlpha})`;
                ctx.fillText(char, px, py);
             }
             
             continue; 
          }

          // Área normal do matrix
          const char = grid[y][x];
          ctx.shadowColor = "rgba(239, 213, 13, 0.3)";
          ctx.shadowBlur = 3;
          const isDim = Math.random() < 0.35;
          // Opacidade ajustada para amarelo
          const baseAlpha = 0.5 + Math.random() * 0.3;
          ctx.fillStyle = isDim
            ? `rgba(239, 213, 13, ${baseAlpha * 0.6})`
            : `rgba(239, 213, 13, ${baseAlpha})`;
          
          ctx.fillText(char, px, py);

          if (Math.random() < 0.04) {
            grid[y][x] = randomChar();
          }
        }
      }

      // SEGUNDO PASS: Desenhar CAPIAU com destaque e isolamento
      if (progressRef.current > 0) {
        ctx.save(); // Salvar estado para não poluir o resto
        
        for (let i = 0; i < capiauWord.length; i++) {
            const x = startCol + i;
            const y = centerRow;
            const px = x * fontSize;
            const py = y * fontSize;
            
            const letterProgress = Math.max(0, Math.min(1, 
              (progressRef.current * capiauWord.length) - i
            ));

            if (letterProgress > 0) {
                let char = grid[y][x]; 
                
                if (letterProgress >= 1) {
                    // COMPLETAMENTE FORMADA
                    
                    // 1. Glow (Screen mode) - Desenhado separadamente "atrás"
                    ctx.save();
                    ctx.globalCompositeOperation = "screen";
                    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
                    ctx.shadowBlur = 40; // Glow muito forte e difuso
                    ctx.fillStyle = "rgba(0, 0, 0, 0.0)"; // Texto invisível, só a sombra/glow aparece
                    ctx.fillText(char, px, py);
                    ctx.restore();

                    // 2. Texto Sólido (Source Over) - Preto na frente
                    ctx.save();
                    ctx.globalCompositeOperation = "source-over";
                    ctx.font = `bold ${fontSize}px monospace`; // Fonte Bold para mais impacto e brilho
                    ctx.shadowColor = "transparent"; // Sem shadow no texto principal para não borrar
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = "#000000"; // Preto sólido
                    ctx.fillText(char, px, py);
                    ctx.restore();

                } else {
                    // TRANSIÇÃO
                    const transitionAlpha = 0.5 + (letterProgress * 0.5);
                    
                    // Usar bold também na transição para evitar "pulo" de peso
                    ctx.font = `bold ${fontSize}px monospace`; 
                    
                    ctx.shadowColor = `rgba(0, 0, 0, ${letterProgress * 0.8})`;
                    ctx.shadowBlur = 5 + (letterProgress * 15);
                    ctx.fillStyle = `rgba(0, 0, 0, ${transitionAlpha})`;
                    ctx.fillText(char, px, py);
                }
            }
        }
        ctx.restore(); // Restaurar estado
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
  }, []); // Executar apenas uma vez na montagem

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
