import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CountdownTimerProps {
  targetDate?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isWeddingDay: boolean;
}

function calculateTimeRemaining(targetTimestamp: number): TimeRemaining {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isWeddingDay: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    isWeddingDay: false,
  };
}

export default function CountdownTimer({
  targetDate = '2026-12-05T00:00:00',
}: CountdownTimerProps) {
  const targetTimestamp = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetTimestamp)
  );

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(targetTimestamp));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const pad = (value: number) => String(value).padStart(2, '0');

  const units = [
    { label: 'Days', value: pad(timeLeft.days) },
    { label: 'Hours', value: pad(timeLeft.hours) },
    { label: 'Mins', value: pad(timeLeft.minutes) },
    { label: 'Secs', value: pad(timeLeft.seconds) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mb-5 w-full max-w-[356px] mx-auto bg-[#FDF9F7]/90 backdrop-blur-xs border border-[#D3C5B0] rounded-2xl px-4 py-3.5 shadow-[0_6px_22px_rgba(47,80,79,0.06)]"
      aria-label="Countdown to 5th December 2026"
    >
      {/* Minimal Header */}
      <div className="flex items-center justify-center gap-2 mb-2.5">
        <div className="w-7 h-px bg-gradient-to-r from-transparent to-[#8B7856]/75" />
        <span className="text-[#BD374E] text-[10px]">✦</span>
        <span className="font-cinzel text-[10px] tracking-[0.24em] uppercase text-[#8B7856] font-semibold">
          The Big Day In
        </span>
        <span className="text-[#BD374E] text-[10px]">✦</span>
        <div className="w-7 h-px bg-gradient-to-l from-transparent to-[#8B7856]/75" />
      </div>

      {timeLeft.isWeddingDay ? (
        <p className="font-serif italic text-base sm:text-lg text-[#2F504F] font-semibold py-1">
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
                    initial={{ opacity: 0.45, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="font-serif text-2xl sm:text-[1.75rem] text-[#2F504F] font-semibold leading-none tabular-nums tracking-tight"
                  >
                    {unit.value}
                  </motion.span>
                </AnimatePresence>
                <span className="font-cinzel text-[9px] tracking-[0.18em] uppercase text-[#322F2A]/65 mt-1.5">
                  {unit.label}
                </span>
              </div>
              {index < units.length - 1 && (
                <div
                  aria-hidden="true"
                  className="w-px h-7 bg-gradient-to-b from-transparent via-[#D3C5B0] to-transparent"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </motion.div>
  );
}
