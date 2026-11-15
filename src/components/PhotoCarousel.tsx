import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Expand, Pause, Play } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  PanInfo,
} from 'motion/react';

export interface CarouselPhoto {
  src: string;
  caption: string;
  roleLabel: string;
  positionClass?: string;
}

interface PhotoCarouselProps {
  photos: CarouselPhoto[];
  onSelectPhoto?: (index: number) => void;
  autoPlayInterval?: number;
}

const SWIPE_CONFIDENCE_THRESHOLD = 8500;
const SWIPE_OFFSET_THRESHOLD = 50;

function getSwipePower(offset: number, velocity: number): number {
  return Math.abs(offset) * velocity;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.35,
    scale: 0.96,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0.35,
    scale: 0.96,
  }),
};

export default function PhotoCarousel({
  photos,
  onSelectPhoto,
  autoPlayInterval = 2800,
}: PhotoCarouselProps) {
  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const carouselStageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: carouselStageRef,
    offset: ['start end', 'end start'],
  });
  const mainImageY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const thumbEvenY = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const thumbOddY = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const total = photos.length;

  const paginate = useCallback(
    (newDirection: number) => {
      if (total <= 1) return;
      setSlide(([prevIndex]) => {
        const nextIndex = (prevIndex + newDirection + total) % total;
        return [nextIndex, newDirection];
      });
    },
    [total]
  );

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex || targetIndex < 0 || targetIndex >= total) return;
      const dir = targetIndex > activeIndex ? 1 : -1;
      setSlide([targetIndex, dir]);
    },
    [activeIndex, total]
  );

  useEffect(() => {
    if (!isAutoPlaying || isInteracting || prefersReducedMotion || total <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isInteracting, prefersReducedMotion, total, autoPlayInterval, paginate]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsInteracting(false);
    const swipe = getSwipePower(info.offset.x, info.velocity.x);

    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD || info.offset.x < -SWIPE_OFFSET_THRESHOLD) {
      paginate(1);
    } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD || info.offset.x > SWIPE_OFFSET_THRESHOLD) {
      paginate(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      paginate(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      paginate(1);
    }
  };

  if (total === 0) return null;

  const currentPhoto = photos[activeIndex];
  const paddedIndex = String(activeIndex + 1).padStart(2, '0');
  const paddedTotal = String(total).padStart(2, '0');

  return (
    <div
      ref={carouselStageRef}
      className="w-full max-w-md mx-auto select-none outline-none"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bride and Groom Photo Carousel"
      onKeyDown={handleKeyDown}
    >
      {/* Main Royal Framed Swipeable Stage */}
      <div className="relative rounded-3xl border-2 border-[#8B7856] bg-[#FDF9F7] p-1.5 shadow-[0_14px_38px_rgba(47,80,79,0.13)]">
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#F3EAE3] touch-pan-y">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentPhoto.src}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : {
                      x: { type: 'spring', stiffness: 290, damping: 32 },
                      opacity: { duration: 0.25 },
                      scale: { duration: 0.3 },
                    }
              }
              drag={total > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.28}
              onDragStart={() => setIsInteracting(true)}
              onDragEnd={handleDragEnd}
              onTap={() => onSelectPhoto?.(activeIndex)}
              whileDrag={{ cursor: 'grabbing' }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
              <motion.div
                style={prefersReducedMotion ? undefined : { y: mainImageY, scale: 1.09 }}
                className="w-full h-full pointer-events-none will-change-transform"
              >
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${
                    currentPhoto.positionClass || 'object-top'
                  } pointer-events-none select-none`}
                />
              </motion.div>

              {/* Subtle Measured Scrim Overlay for Caption Legibility */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1F3837]/90 via-[#1F3837]/40 to-transparent pt-16 pb-4 px-4 text-left pointer-events-none">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#D3C5B0] block truncate">
                      {currentPhoto.roleLabel}
                    </span>
                    <p className="font-serif italic text-[#FBF5F2] text-base sm:text-lg leading-snug truncate mt-0.5">
                      {currentPhoto.caption}
                    </p>
                  </div>
                  <span className="font-cinzel text-xs text-[#D3C5B0] tabular-nums shrink-0">
                    {paddedIndex} / {paddedTotal}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Expand to Fullscreen Lightbox Button */}
          {onSelectPhoto && (
            <button
              type="button"
              onClick={() => onSelectPhoto(activeIndex)}
              aria-label={`View ${currentPhoto.caption} fullscreen`}
              title="View Fullscreen"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[#1F3837]/65 hover:bg-[#1F3837]/90 border border-[#D3C5B0]/55 text-[#FBF5F2] flex items-center justify-center backdrop-blur-xs transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Expand size={16} />
            </button>
          )}

          {/* Auto-play Toggle Button */}
          {total > 1 && !prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full bg-[#1F3837]/65 hover:bg-[#1F3837]/90 border border-[#D3C5B0]/55 text-[#FBF5F2] flex items-center justify-center backdrop-blur-xs transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isAutoPlaying ? <Pause size={15} /> : <Play size={15} className="translate-x-0.5" />}
            </button>
          )}

          {/* Left / Right Navigation Arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#FDF9F7]/85 hover:bg-[#FDF9F7] border border-[#8B7856] text-[#2F504F] flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#FDF9F7]/85 hover:bg-[#FDF9F7] border border-[#8B7856] text-[#2F504F] flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          {/* Auto-Scroll Progress Hairline */}
          {isAutoPlaying && !isInteracting && !prefersReducedMotion && total > 1 && (
            <motion.div
              key={`progress-${activeIndex}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
              className="absolute bottom-0 inset-x-0 h-[3px] z-20 origin-left bg-gradient-to-r from-[#D3C5B0] via-[#8B7856] to-[#BD374E] pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* Auto-Scroll & Swipe Hint + Indicator Dots */}
      <div className="mt-3.5 flex items-center justify-between px-1">
        <span className="font-serif italic text-xs text-[#322F2A]/65">
          {isAutoPlaying ? 'Auto-scrolling · Swipe anytime' : 'Paused · Swipe to browse'}
        </span>

        {/* Interactive Dot Indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose photo slide">
          {photos.map((photo, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show photo ${idx + 1}: ${photo.caption}`}
                onClick={() => goToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-6 bg-[#2F504F]'
                    : 'w-2 bg-[#D3C5B0] hover:bg-[#8B7856]'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Synchronized Thumbnail Strip */}
      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-2.5">
        {photos.map((photo, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => goToIndex(idx)}
              aria-label={`Jump to ${photo.caption}`}
              className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer bg-[#FDF9F7] p-0.5 ${
                isActive
                  ? 'border-[#2F504F] ring-2 ring-[#8B7856]/70 shadow-sm scale-[1.02]'
                  : 'border-[#D3C5B0] opacity-70 hover:opacity-100 hover:border-[#8B7856]'
              }`}
            >
              <div className="w-full h-full rounded-[10px] overflow-hidden">
                <motion.div
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { y: idx % 2 === 0 ? thumbEvenY : thumbOddY, scale: 1.12 }
                  }
                  className="w-full h-full pointer-events-none will-change-transform"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${
                      photo.positionClass || 'object-top'
                    }`}
                  />
                </motion.div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
