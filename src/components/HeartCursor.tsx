import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface HeartBurst {
  id: number;
  x: number;
  y: number;
  driftX: number;
  rotate: number;
}

export default function HeartCursor() {
  const [bursts, setBursts] = useState<HeartBurst[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isFinePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    let nextId = 0;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const id = ++nextId;
      const driftX = (Math.random() - 0.5) * 24;
      const rotate = (Math.random() - 0.5) * 26;

      setBursts((prev) => [...prev.slice(-6), { id, x: e.clientX, y: e.clientY, driftX, rotate }]);

      window.setTimeout(() => {
        setBursts((prev) => prev.filter((item) => item.id !== id));
      }, 650);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || bursts.length === 0) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.svg
            key={burst.id}
            viewBox="0 0 24 24"
            initial={{ opacity: 0.9, scale: 0.55, x: burst.x - 9, y: burst.y - 9, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 1.25,
              x: burst.x - 9 + burst.driftX,
              y: burst.y - 38,
              rotate: burst.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: 'easeOut' }}
            className="absolute top-0 left-0 w-[18px] h-[18px] will-change-transform"
          >
            <path
              d="M12 20.5C12 20.5 4 15 4 9.5C4 6.8 6.1 4.8 8.6 4.8C10.2 4.8 11.4 5.6 12 6.8C12.6 5.6 13.8 4.8 15.4 4.8C17.9 4.8 20 6.8 20 9.5C20 15 12 20.5 12 20.5Z"
              fill="#BD374E"
              stroke="#FDF9F7"
              strokeWidth="1.2"
            />
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  );
}
