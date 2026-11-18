import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface CountdownTimerProps {
  targetDate?: string;
  variant?: 'card' | 'minimal';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  isWeddingDay: boolean;
}

function calculateTimeRemaining(targetTimestamp: number): TimeRemaining {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, isWeddingDay: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    isWeddingDay: false,
  };
}

export default function CountdownTimer({
  targetDate = '2026-12-05T00:00:00+05:30',
  variant = 'card',
}: CountdownTimerProps) {
  const prefersReducedMotion = useReducedMotion();
  const targetTimestamp = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetTimestamp)
  );

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(targetTimestamp));
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetTimestamp));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetTimestamp]);

  const pad = (value: number) => String(value).padStart(2, '0');

  const units = [
    { label: 'Days', shortLabel: 'Days', value: pad(timeLeft.days) },
    { label: 'Hours', shortLabel: 'Hours', value: pad(timeLeft.hours) },
    { label: 'Minutes', shortLabel: 'Min', value: pad(timeLeft.minutes) },
  ];

  if (variant === 'minimal') {
    return (
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-[230px] sm:max-w-[270px] mx-auto mt-3 sm:mt-4"
        aria-label="Countdown to 5th December 2026"
      >
        {timeLeft.isWeddingDay ? (
          <p className="font-serif italic text-sm sm:text-base text-[#6E1F30] font-medium">
            ✦ Celebrating Forever Today ✦
          </p>
        ) : (
          <div className="flex items-start justify-center gap-4 sm:gap-6">
            {units.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center min-w-[44px] sm:min-w-[52px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={unit.value}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0.5, y: 3 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="font-serif text-[1.25rem] sm:text-[1.75rem] text-[#4C322A] font-normal leading-none tabular-nums tracking-tight"
                  >
                    {unit.value}
                  </motion.span>
                </AnimatePresence>
                <span className="font-cinzel text-[7.5px] sm:text-[9px] tracking-[0.18em] uppercase text-[#7A6350] mt-1">
                  {unit.shortLabel}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mb-6 w-full max-w-[356px] mx-auto bg-[#FDF9F7]/95 border border-[#D3C5B0] p-[4px] rounded-2xl shadow-[0_8px_24px_rgba(47,80,79,0.07)]"
      aria-label="Countdown to 5th December 2026"
    >
      <div className="border border-[#D3C5B0]/65 rounded-xl px-4 py-4">
        {/* Refined Header with Wedding Date */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#8B7856]/75" />
          <span className="text-[#BD374E] text-[10px]" aria-hidden="true">✦</span>
          <span className="font-cinzel text-[10px] tracking-[0.22em] uppercase text-[#8B7856] font-semibold">
            5th December 2026
          </span>
          <span className="text-[#BD374E] text-[10px]" aria-hidden="true">✦</span>
          <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#8B7856]/75" />
        </div>

        {timeLeft.isWeddingDay ? (
          <p className="font-serif italic text-base sm:text-lg text-[#2F504F] font-semibold py-1.5">
            ✦ Celebrating Forever Today ✦
          </p>
        ) : (
          <div className="flex items-center justify-between px-1">
            {units.map((unit, index) => (
              <React.Fragment key={unit.label}>
                <div className="flex-1 flex flex-col items-center overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={unit.value}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0.45, y: 4 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="font-serif text-[1.85rem] sm:text-[2.1rem] text-[#2F504F] font-semibold leading-none tabular-nums tracking-tight"
                    >
                      {unit.value}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#322F2A]/70 mt-1.5">
                    {unit.label}
                  </span>
                </div>
                {index < units.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="w-px h-8 bg-gradient-to-b from-transparent via-[#D3C5B0] to-transparent"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
