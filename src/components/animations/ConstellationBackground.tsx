'use client';

import { useEffect, useRef } from 'react';

interface ConstellationBackgroundProps {
  sectionRef?: React.RefObject<HTMLElement | null>;
}

export function ConstellationBackground({ sectionRef }: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    originalX: number;
    originalY: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef?.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
      
      const nodeCount = Math.floor((canvas.width * canvas.height) / 40000);
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        originalX: 0,
        originalY: 0,
      }));
      
      nodesRef.current.forEach(node => {
        node.originalX = node.x;
        node.originalY = node.y;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      nodes.forEach((node, i) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 1;
          node.vx += dx * force * 0.003;
          node.vy += dy * force * 0.003;
        }

        const returnForce = 0.08;
        node.vx += (node.originalX - node.x) * returnForce;
        node.vy += (node.originalY - node.y) * returnForce;

        node.vx *= 0.95;
        node.vy *= 0.95;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.offsetWidth) {
          node.x = Math.max(0, Math.min(canvas.offsetWidth, node.x));
          node.vx *= -0.5;
        }
        if (node.y < 0 || node.y > canvas.offsetHeight) {
          node.y = Math.max(0, Math.min(canvas.offsetHeight, node.y));
          node.vy *= -0.5;
        }

        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.25;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });

      nodes.forEach(node => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        const nodeOpacity = distance < maxDistance ? 
          0.6 + (1 - distance / maxDistance) * 0.3 : 0.4;
        
        ctx.fillStyle = `rgba(139, 92, 246, ${nodeOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (distance < maxDistance) {
          const glowOpacity = (1 - distance / maxDistance) * 0.3;
          const glowSize = 2 + (1 - distance / maxDistance) * 2;
          
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 8;
          ctx.fillStyle = `rgba(139, 92, 246, ${glowOpacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
