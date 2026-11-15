import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.0005,
  });

  const scaleX = prefersReducedMotion ? scrollYProgress : smoothProgress;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] z-[45] pointer-events-none bg-[#D3C5B0]/30 backdrop-blur-[1px]"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#2F504F] via-[#8B7856] to-[#BD374E] shadow-[0_0_8px_rgba(139,120,86,0.45)]"
      />
    </div>
  );
}
