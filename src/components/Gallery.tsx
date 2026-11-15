import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import PhotoCarousel, { CarouselPhoto } from './PhotoCarousel';

const GALLERY_IMAGES: CarouselPhoto[] = [
  {
    src: "/assets/aistudio/image_f6325716.png",
    caption: "Sheetal — The Bride",
    roleLabel: "Haldi & Sangeet Portrait",
    positionClass: "object-[50%_25%]",
  },
  {
    src: "/assets/aistudio/image_d2743fd9.png",
    caption: "Prakash Ji — The Groom",
    roleLabel: "Pre-Wedding Portrait",
    positionClass: "object-top",
  },
  {
    src: "/assets/aistudio/image_afdea1fa.png",
    caption: "Sheetal — The Bride",
    roleLabel: "Ceremonial Portrait",
    positionClass: "object-top",
  },
  {
    src: "/assets/aistudio/image_bafb0dfc.png",
    caption: "Prakash Ji — The Groom",
    roleLabel: "Tilak & Garland Portrait",
    positionClass: "object-[50%_22%]",
  },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_IMAGES.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showPrev, showNext]);

  const handleLightboxDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -50 || info.velocity.x < -300) {
      showNext();
    } else if (info.offset.x > 50 || info.velocity.x > 300) {
      showPrev();
    }
  };

  const currentPhoto = selectedIndex !== null ? GALLERY_IMAGES[selectedIndex] : null;

  return (
    <section id="gallery" className="py-8 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-7">
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8B7856]" />
          <span className="text-[#BD374E] text-xs">✦</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2F504F] font-normal">
            Gallery
          </h2>
          <span className="text-[#BD374E] text-xs">✦</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8B7856]" />
        </div>
        <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#8B7856] font-semibold">
          Bride &amp; Groom · Celebrations
        </p>
      </div>

      {/* Touch-Swipeable Royal Photo Carousel */}
      <PhotoCarousel
        photos={GALLERY_IMAGES}
        onSelectPhoto={(index) => setSelectedIndex(index)}
      />

      {/* Fullscreen Touch-Swipeable Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1F3837]/92 backdrop-blur-xs p-4"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close photo viewer"
              className="absolute top-5 right-5 text-[#FBF5F2]/85 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-50"
            >
              <X size={28} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center gap-2 sm:gap-5 max-w-3xl w-full"
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FDF9F7]/15 hover:bg-[#FDF9F7]/25 border border-[#D3C5B0]/50 text-[#FBF5F2] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft size={22} />
              </button>

              <motion.div
                key={currentPhoto.src}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.22 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleLightboxDragEnd}
                className="cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="max-w-[75vw] sm:max-w-[68vw] max-h-[76vh] object-contain rounded-xl border-2 border-[#8B7856] shadow-2xl select-none"
                />
              </motion.div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FDF9F7]/15 hover:bg-[#FDF9F7]/25 border border-[#D3C5B0]/50 text-[#FBF5F2] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-4 flex items-center gap-2 text-center"
            >
              <span className="font-serif italic text-[#FBF5F2] text-sm sm:text-base">
                {currentPhoto.caption}
              </span>
              <span className="text-[#D3C5B0]/70" aria-hidden="true">·</span>
              <span className="font-cinzel text-xs text-[#D3C5B0] tabular-nums">
                {selectedIndex + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
