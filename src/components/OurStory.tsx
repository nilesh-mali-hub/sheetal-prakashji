import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OurStory() {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="our-story" className="py-8 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8B7856]" />
          <span className="text-[#BD374E] text-xs">✦</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2F504F] font-normal">
            Our Story
          </h2>
          <span className="text-[#BD374E] text-xs">✦</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8B7856]" />
        </div>
      </div>

      {/* Grid: Arched Jharokha Crest on Left + Story Blurb & Button on Right */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center">
        {/* Left Column: Arched Monogram Crest Frame */}
        <div className="col-span-5 sm:col-span-6 flex justify-center relative">
          <div className="relative w-full max-w-[190px] sm:max-w-[210px] group">
            <div className="relative aspect-[4/4.2] rounded-t-full rounded-b-2xl overflow-hidden border border-[#8B7856] bg-[#FDF9F7] shadow-[0_10px_28px_rgba(47,80,79,0.09)] p-4 flex items-center justify-center ring-1 ring-inset ring-[#D3C5B0]/70">
              <img
                src="/assets/aistudio/image_d5322966.png"
                alt="Sheetal & Prakash Ji"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Poetic Blurb & Read Our Story Button */}
        <div className="col-span-7 sm:col-span-6 flex flex-col items-start text-left pl-1 sm:pl-2">
          <span className="font-cinzel text-[10px] tracking-[0.22em] uppercase text-[#8B7856] font-semibold mb-1.5">
            Forever Begins
          </span>
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#322F2A]/90 leading-relaxed mb-4 font-normal">
            Two hearts, one beautiful journey. A story of friendship, love and a lifetime together.
          </p>

          <button
            onClick={() => setShowStoryModal(true)}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full border border-[#8B7856] bg-[#FDF9F7] hover:bg-[#F3EAE3] text-[#2F504F] text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs hover:shadow transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group whitespace-nowrap shrink-0"
          >
            <span>Read Our Story</span>
            <ArrowRight size={13} className="text-[#BD374E] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Story Timeline Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStoryModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F3837]/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#FDF9F7] border-2 border-[#8B7856] rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 text-[#2F504F]/70 hover:text-[#2F504F] p-1.5 rounded-full hover:bg-[#F3EAE3] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <span className="font-cinzel text-xs tracking-[0.25em] text-[#8B7856] uppercase">Chapter by Chapter</span>
                <h3 className="font-serif text-3xl text-[#2F504F] mt-1 font-semibold">Our Journey</h3>
                <div className="w-16 h-px bg-[#8B7856]/60 mx-auto mt-2" />
              </div>

              <div className="space-y-6 text-[#322F2A]">
                <div className="border-l border-[#D3C5B0] pl-4 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#2F504F]" />
                  <span className="text-xs font-cinzel text-[#8B7856] tracking-wider uppercase font-semibold">The First Meeting</span>
                  <p className="text-sm mt-1 text-[#322F2A]/90">
                    A serene day when our families met. What started with timid greetings blossomed into comforting conversation and mutual respect.
                  </p>
                </div>

                <div className="border-l border-[#D3C5B0] pl-4 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#8B7856]" />
                  <span className="text-xs font-cinzel text-[#8B7856] tracking-wider uppercase font-semibold">The Realization</span>
                  <p className="text-sm mt-1 text-[#322F2A]/90">
                    Shared laughs, common values, and endless conversations made us realize that life is infinitely sweeter together.
                  </p>
                </div>

                <div className="border-l border-[#D3C5B0] pl-4 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#BD374E]" />
                  <span className="text-xs font-cinzel text-[#8B7856] tracking-wider uppercase font-semibold">The Roka &amp; Ring Ceremony</span>
                  <p className="text-sm mt-1 text-[#322F2A]/90">
                    With joyous hearts and elder blessings, we sealed our promise to walk together through every season of life.
                  </p>
                </div>

                <div className="border-l border-[#D3C5B0] pl-4 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#2F504F]" />
                  <span className="text-xs font-cinzel text-[#8B7856] tracking-wider uppercase font-semibold">The Big Day • 5th December 2026</span>
                  <p className="text-sm mt-1 text-[#322F2A]/90">
                    Taking the sacred Saat Phere around the holy fire to unite as one soul for a lifetime of love.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center pt-4 border-t border-[#D3C5B0]/60">
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="px-6 py-2.5 rounded-full bg-[#2F504F] text-[#FBF5F2] text-xs tracking-wider uppercase font-semibold hover:bg-[#1F3837] transition-colors cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
