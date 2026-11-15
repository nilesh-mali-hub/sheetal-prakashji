import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

export default function CycleLoveAnimation() {
  const [key, setKey] = useState(0); // For replaying animation
  const [hasStopped, setHasStopped] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [showLoveText, setShowLoveText] = useState(false);

  useEffect(() => {
    setHasStopped(false);
    setLookingUp(false);
    setShowLoveText(false);

    // Timeline logic
    const stopTimer = setTimeout(() => {
      setHasStopped(true);
    }, 3200);

    const lookTimer = setTimeout(() => {
      setLookingUp(true);
    }, 3600);

    const textTimer = setTimeout(() => {
      setShowLoveText(true);
    }, 3800);

    return () => {
      clearTimeout(stopTimer);
      clearTimeout(lookTimer);
      clearTimeout(textTimer);
    };
  }, [key]);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div key={key} className="w-full my-8 px-4 relative flex flex-col items-center justify-center overflow-hidden py-6 bg-gradient-to-b from-maroon-deep/40 via-maroon-deep/70 to-transparent rounded-2xl border border-gold/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      
      {/* Replay Button */}
      <button 
        onClick={handleReplay}
        className="absolute top-3 right-3 text-gold/70 hover:text-marigold-light flex items-center gap-1 text-xs tracking-wider uppercase font-cinzel bg-maroon/60 border border-gold/30 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
        title="Replay Cycle Animation"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Ride Again</span>
      </button>

      {/* UPSIDE TEXT: Sheetal & Prakash Ji Love Text */}
      <div className="min-h-[110px] flex flex-col items-center justify-center text-center relative z-10 mb-2">
        <AnimatePresence>
          {showLoveText ? (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-marigold-light text-xl sm:text-2xl"
                >
                  💖
                </motion.span>
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-marigold uppercase font-semibold">
                  Forever Love
                </span>
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                  className="text-marigold-light text-xl sm:text-2xl"
                >
                  💖
                </motion.span>
              </div>

              {/* Glowing Love Text Sheetal & Prakash Ji */}
              <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-bold text-gold-light tracking-wide text-shadow-[0_2px_18px_rgba(226,134,28,0.4)] flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
                <span>Sheetal</span>
                <motion.span 
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-rose-400 inline-block drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]"
                >
                  ❤️
                </motion.span>
                <span>Prakash Ji</span>
              </h2>

              <p className="font-hindi text-lg sm:text-xl text-marigold-light opacity-90 mt-1">
                "दो दिल, एक सुहाना सफर"
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-gold/60 text-xs sm:text-sm italic font-sans flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-marigold animate-spin" />
              <span>Watch the bicycle ride in...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Heart Particles from Cycle to Upside Text */}
        {lookingUp && (
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, x: (i - 3.5) * 18, scale: 0.4 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -70 - (i % 3) * 20],
                  x: (i - 3.5) * 22 + Math.sin(i) * 15,
                  scale: [0.4, 1.2, 0.6]
                }}
                transition={{
                  duration: 2.2 + (i % 2) * 0.5,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeOut"
                }}
                className="absolute text-rose-400 text-lg sm:text-2xl filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
              >
                {i % 2 === 0 ? '❤️' : '✨'}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ROAD & BICYCLE ANIMATION STAGE */}
      <div className="w-full max-w-[600px] h-[150px] sm:h-[180px] relative flex items-end justify-center overflow-hidden border-b border-gold/40">
        
        {/* Decorative path / ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="absolute bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-marigold/30 to-transparent" />

        {/* Road Lamp / Flower Arch at the Stop Center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-40">
          <div className="w-16 h-[80px] border-t-2 border-x-2 border-gold/40 rounded-t-full flex items-start justify-center pt-1">
            <span className="text-xs">🌸</span>
          </div>
        </div>

        {/* BICYCLE WITH PERSON MOVING AND STOPPING */}
        <motion.div
          initial={{ x: '-120vw' }}
          animate={{ x: '0vw' }}
          transition={{
            duration: 3.2,
            ease: [0.25, 0.1, 0.25, 1] // Custom smooth deceleration cubic-bezier
          }}
          className="absolute bottom-1 flex flex-col items-center z-10"
        >
          {/* Couple / Person on Cycle SVG Illustration */}
          <div className="relative w-[140px] sm:w-[170px] h-[110px] sm:h-[135px]">
            
            {/* Gazing / Looking Up Effect Line & Hearts when stopped */}
            {lookingUp && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
              >
                <span className="text-xs sm:text-sm bg-marigold-light text-maroon-deep font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap animate-bounce">
                  Look Up! Sheetal & Prakash Ji ❤️
                </span>
                <div className="w-0.5 h-3 bg-marigold-light/80"></div>
              </motion.div>
            )}

            <svg 
              viewBox="0 0 200 160" 
              className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              {/* Bicycle Frame */}
              <g stroke="#F3B23F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* Wheels */}
                {/* Rear Wheel */}
                <g className="origin-[50px_120px]">
                  <circle cx="50" cy="120" r="28" stroke="#E2861C" strokeWidth="3.5" fill="#3A1D0B" fillOpacity="0.4" />
                  <circle cx="50" cy="120" r="24" stroke="#F3B23F" strokeWidth="1" strokeDasharray="3 3" />
                  <motion.g
                    animate={{ rotate: hasStopped ? 0 : 1440 }}
                    transition={{ duration: 3.2, ease: "easeOut" }}
                    style={{ transformOrigin: '50px 120px' }}
                  >
                    <line x1="50" y1="92" x2="50" y2="148" stroke="#F3B23F" strokeWidth="1.5" />
                    <line x1="22" y1="120" x2="78" y2="120" stroke="#F3B23F" strokeWidth="1.5" />
                    <line x1="30" y1="100" x2="70" y2="140" stroke="#F3B23F" strokeWidth="1.5" />
                    <line x1="30" y1="140" x2="70" y2="100" stroke="#F3B23F" strokeWidth="1.5" />
                  </motion.g>
                </g>

                {/* Front Wheel */}
                <g className="origin-[150px_120px]">
                  <circle cx="150" cy="120" r="28" stroke="#E2861C" strokeWidth="3.5" fill="#3A1D0B" fillOpacity="0.4" />
                  <circle cx="150" cy="120" r="24" stroke="#F3B23F" strokeWidth="1" strokeDasharray="3 3" />
                  <motion.g
                    animate={{ rotate: hasStopped ? 0 : 1440 }}
                    transition={{ duration: 3.2, ease: "easeOut" }}
                    style={{ transformOrigin: '150px 120px' }}
                  >
                    <line x1="150" y1="92" x2="150" y2="148" stroke="#F3B23F" strokeWidth="1.5" />
                    <line x1="122" y1="120" x2="178" y2="120" stroke="#F3B23F" strokeWidth="1.5" />
                    <line x1="130" y1="100" x2="170" y2="140" stroke="#F3B23F" strokeWidth="1.5" />
                    <line x1="130" y1="140" x2="170" y2="100" stroke="#F3B23F" strokeWidth="1.5" />
                  </motion.g>
                </g>

                {/* Frame Tubes */}
                <path d="M 50 120 L 90 120 L 125 85 L 75 85 Z" stroke="#E2861C" strokeWidth="3.5" />
                <path d="M 90 120 L 140 75" stroke="#E2861C" strokeWidth="3.5" />
                <path d="M 140 75 L 150 120" stroke="#E2861C" strokeWidth="3.5" />
                {/* Handlebar */}
                <path d="M 135 65 L 145 75 L 130 75" stroke="#F3B23F" strokeWidth="3" />
                {/* Seat */}
                <path d="M 70 80 L 82 80" stroke="#C9A24B" strokeWidth="5" />

                {/* Front Basket with Flowers */}
                <rect x="145" y="65" width="22" height="18" rx="3" stroke="#F3B23F" fill="#6B131B" strokeWidth="1.5" />
              </g>

              {/* Flowers in Basket */}
              <text x="147" y="62" fontSize="14">🌸</text>
              <text x="156" y="60" fontSize="12">🌹</text>

              {/* Heart Balloons Tied to Back of Bicycle */}
              <g>
                <path d="M 45 95 Q 30 60 20 35" stroke="#F3B23F" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                <path d="M 45 95 Q 40 55 35 30" stroke="#F3B23F" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                
                {/* Floating balloons */}
                <motion.g
                  animate={{ y: [0, -4, 0], rotate: [-2, 3, -2] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <text x="8" y="32" fontSize="22" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))">🎈</text>
                  <text x="24" y="26" fontSize="24" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))">❤️</text>
                </motion.g>
              </g>

              {/* RIDER PERSON (Groom & Bride / Person riding) */}
              <motion.g
                animate={{
                  rotate: lookingUp ? -12 : 0,
                  y: lookingUp ? -2 : (hasStopped ? 0 : [0, -2, 0])
                }}
                transition={{
                  rotate: { duration: 0.6, ease: "backOut" },
                  y: { repeat: hasStopped ? 0 : Infinity, duration: 0.3 }
                }}
                style={{ transformOrigin: '90px 110px' }}
              >
                {/* Groom / Rider Body */}
                {/* Legs Pedaling */}
                <path d="M 78 82 L 85 102 L 95 118" stroke="#E2861C" strokeWidth="5" strokeLinecap="round" fill="none" />
                
                {/* Torso & Traditional Sherwani */}
                <path d="M 78 82 L 95 48" stroke="#F3B23F" strokeWidth="10" strokeLinecap="round" />
                {/* Royal Dupatta / Stole */}
                <path d="M 82 52 Q 70 65 65 85" stroke="#C9A24B" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Arms holding Handlebar */}
                <path d="M 92 52 L 125 62 L 138 72" stroke="#E2861C" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Head with Turban (Pagri) */}
                <g>
                  {/* Head / Face */}
                  <circle cx="102" cy="36" r="9" fill="#E9C36F" />
                  
                  {/* Turban (Pagri) */}
                  <path d="M 94 33 C 94 22, 110 22, 110 33 Z" fill="#6B131B" stroke="#F3B23F" strokeWidth="1.5" />
                  <circle cx="102" cy="25" r="3" fill="#F3B23F" />
                  
                  {/* Eyes looking UP when stopped */}
                  {lookingUp ? (
                    <g>
                      {/* Looking upward towards heaven/text */}
                      <circle cx="106" cy="34" r="1.5" fill="#3A1D0B" />
                      {/* Smile */}
                      <path d="M 103 38 Q 106 41 108 38" stroke="#3A1D0B" strokeWidth="1" fill="none" />
                    </g>
                  ) : (
                    <g>
                      <circle cx="105" cy="36" r="1.5" fill="#3A1D0B" />
                      <path d="M 103 39 Q 105 41 107 39" stroke="#3A1D0B" strokeWidth="1" fill="none" />
                    </g>
                  )}
                </g>

                {/* Bride Sitting on Back Rack / Side carrying Flowers */}
                <g>
                  {/* Lehenga / Red Saree */}
                  <path d="M 62 82 Q 52 105 48 115 L 75 115 Z" fill="#6B131B" stroke="#F3B23F" strokeWidth="1" />
                  {/* Bride Torso */}
                  <path d="M 64 80 L 60 56" stroke="#E2861C" strokeWidth="8" strokeLinecap="round" />
                  {/* Bride Chunari / Dupatta */}
                  <path d="M 60 56 Q 48 65 42 88" stroke="#F3B23F" strokeWidth="3" fill="none" />
                  {/* Bride Head */}
                  <circle cx="60" cy="48" r="8" fill="#E9C36F" />
                  <path d="M 54 46 C 54 38, 66 38, 66 46 Z" fill="#6B131B" stroke="#F3B23F" strokeWidth="1" />
                  {/* Holding Groom gently */}
                  <path d="M 60 62 L 78 64" stroke="#E9C36F" strokeWidth="3" strokeLinecap="round" />
                </g>
              </motion.g>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Decorative caption */}
      <div className="mt-3 text-center">
        <span className="text-xs text-gold/60 font-serif italic tracking-wide">
          ✨ The Journey of Togetherness • Sheetal & Prakash Ji ✨
        </span>
      </div>
    </div>
  );
}
