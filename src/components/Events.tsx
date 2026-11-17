import React from 'react';
import { CalendarPlus, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { downloadWeddingIcs } from '../utils/calendar';

interface WeddingEvent {
  title: string;
  date: string;
  emoji: string;
  description: string;
}

export default function Events() {
  const events: WeddingEvent[] = [
    {
      title: "Haldi",
      date: "03 Dec 2026",
      emoji: "🌸",
      description: "Turmeric rituals, auspicious yellow blooms & joyful blessings."
    },
    {
      title: "Mehendi",
      date: "03 Dec 2026",
      emoji: "🌿",
      description: "Intricate bridal henna, folk rhythms & celebratory melodies."
    },
    {
      title: "Sangeet",
      date: "03 Dec 2026",
      emoji: "🎵",
      description: "An evening of glittering dance, beats, musical glamour & feast."
    },
    {
      title: "Bindoli",
      date: "04 Dec 2026",
      emoji: "🥁",
      description: "Royal nighttime procession, joyous dhol beats & festive grandeur."
    },
    {
      title: "The Wedding",
      date: "05 Dec 2026",
      emoji: "💍",
      description: "Sacred Saat Phere around the holy fire & eternal vows."
    }
  ];

  const handleAddToCalendar = () => {
    downloadWeddingIcs();
  };

  const shareMessage = `✨💍 *Shubh Vivah Invitation* 💍✨\n\n🙏 *॥ श्री गणेशाय नमः ॥*\n\n🌸 Together with our families, we joyfully invite you to celebrate the wedding of\n💐 *Sheetal & Prakash Ji* 💐\n\n🗓️ *Celebration Dates:*\n🌸 Haldi, 🌿 Mehendi & 🎵 Sangeet — *03 Dec 2026*\n🥁 Bindoli — *04 Dec 2026*\n💍 The Wedding (शुभ विवाह) — *05 Dec 2026*\n\n📍 *Location:*\nhttps://maps.app.goo.gl/xci1FQXozgPz2u698\n\n💌 *Open Your Digital Invitation:*\n🌐 https://sheetal-prakashji.vercel.app/\n\n🪔 Your presence and blessings mean the world to us! ❤️🎉`;

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <section
      id="events"
      className="relative w-full py-12 sm:py-14 px-4 sm:px-6 bg-gradient-to-b from-[#F4EAE2] via-[#FAF4EF] to-[#F4EAE2] text-center overflow-hidden border-y border-[#D3C5B0]"
    >
      {/* Subtle Watercolor Rose & Teal Ambient Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-45 z-0">
        <div className="absolute top-10 left-[10%] w-24 h-24 rounded-full bg-[#D6B0A5]/30 blur-2xl" />
        <div className="absolute top-1/3 right-[8%] w-28 h-28 rounded-full bg-[#BD374E]/10 blur-2xl" />
        <div className="absolute bottom-16 left-[12%] w-24 h-24 rounded-full bg-[#2F504F]/10 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-9">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#8B7856]" />
            <span className="text-[#BD374E] text-[10px]">✦</span>
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase text-[#8B7856] font-semibold">
              Event Details
            </span>
            <span className="text-[#BD374E] text-[10px]">✦</span>
            <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#8B7856]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2F504F] font-normal tracking-wide m-0">
            Join Us in Celebration
          </h2>
        </div>

        {/* 5 Stacked Royal Event Cards matching SP Logo Ivory / Antique Brass / Deep Teal Palette */}
        <div className="flex flex-col gap-3.5 sm:gap-4 text-left">
          {events.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative overflow-hidden rounded-2xl bg-[#FDF9F7] border border-[#D3C5B0] p-4 sm:p-5 flex items-center gap-4 sm:gap-5 group hover:border-[#8B7856] shadow-[0_6px_20px_rgba(47,80,79,0.05)] hover:shadow-[0_10px_28px_rgba(47,80,79,0.1)] transition-all duration-300"
            >
              {/* Soft Antique Gold Shimmer Beam on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D3C5B0]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {/* Left Circular Brass-Rimmed Icon Badge */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 border border-[#8B7856]/75 bg-[#FBF5F2] text-2xl sm:text-3xl group-hover:scale-105 transition-transform duration-300 ring-1 ring-[#D3C5B0] ring-offset-2 ring-offset-[#FDF9F7] shadow-xs">
                <span className="select-none">{evt.emoji}</span>
              </div>

              {/* Right Event Info: Title, Date & Ceremony Note (No Times) */}
              <div className="flex-1 min-w-0">
                <h3 className="m-0 mb-0.5 text-xl sm:text-2xl text-[#2F504F] font-serif font-semibold tracking-wide">
                  {evt.title}
                </h3>

                <p className="m-0 text-[#8B7856] text-xs sm:text-sm font-cinzel tracking-wider uppercase font-semibold">
                  {evt.date}
                </p>

                <p className="m-0 mt-1 text-xs sm:text-sm font-serif italic text-[#322F2A]/75 leading-snug">
                  {evt.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Calendar & Share CTA Buttons */}
        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <button
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FDF9F7] hover:bg-[#F3EAE3] border border-[#8B7856] text-[#2F504F] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs cursor-pointer group"
          >
            <CalendarPlus size={16} className="text-[#8B7856] group-hover:rotate-6 transition-transform" />
            <span>Add to Calendar</span>
          </button>

          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2F504F] hover:bg-[#1F3837] border border-[#D3C5B0]/50 text-[#FBF5F2] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer group whitespace-nowrap"
          >
            <Share2 size={16} className="text-[#D3C5B0] group-hover:scale-110 transition-transform" />
            <span>💌 Share Invitation ✨</span>
          </a>
        </div>
      </div>
    </section>
  );
}
