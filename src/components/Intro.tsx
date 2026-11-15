import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface IntroProps {
  opened: boolean;
  onOpen: () => void;
  onPlayMusic: () => void;
}

export default function Intro({ opened, onOpen, onPlayMusic }: IntroProps) {
  const [hidden, setHidden] = useState(false);

  // If the user clicks "Replay Royal Gate Opening", ensure Intro becomes visible again
  useEffect(() => {
    if (!opened) {
      setHidden(false);
    }
  }, [opened]);

  const handleClick = () => {
    if (opened) return;

    onPlayMusic();
    onOpen();

    try {
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8B7856', '#D3C5B0', '#2F504F', '#BD374E', '#FBF5F2']
      });
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setHidden(true);
    }, 2000);
  };

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Left Door */}
      <div
        onClick={handleClick}
        className="absolute top-0 left-0 w-1/2 h-full bg-left origin-left transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-auto shadow-[10px_0_30px_rgba(47,80,79,0.45)] cursor-pointer"
        style={{
          backgroundImage: `url('/assets/aistudio/royal_doors.png')`,
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          transform: opened ? 'rotateY(-110deg)' : 'rotateY(0deg)'
        }}
      />

      {/* Right Door */}
      <div
        onClick={handleClick}
        className="absolute top-0 right-0 w-1/2 h-full bg-right origin-right transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-auto shadow-[-10px_0_30px_rgba(47,80,79,0.45)] cursor-pointer"
        style={{
          backgroundImage: `url('/assets/aistudio/royal_doors.png')`,
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          transform: opened ? 'rotateY(110deg)' : 'rotateY(0deg)'
        }}
      />

      {/* Clean Subtle Split Line down the center */}
      <div
        className={`absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#2F504F]/35 -translate-x-1/2 transition-opacity duration-300 pointer-events-none ${
          opened ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Simple, Elegant "Open Invitation" Button harmonized with SP Logo Palette */}
      <div
        className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 transition-opacity duration-500 pointer-events-auto ${
          opened ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          onClick={handleClick}
          className="bg-[#2F504F] text-[#FBF5F2] font-cinzel tracking-[0.2em] uppercase text-xs sm:text-sm md:text-base px-8 md:px-12 py-3.5 md:py-4 rounded-full shadow-[0_12px_32px_rgba(31,56,55,0.45)] transition-all duration-300 hover:scale-105 hover:bg-[#1F3837] active:scale-95 cursor-pointer border-2 border-[#D3C5B0] whitespace-nowrap"
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}
