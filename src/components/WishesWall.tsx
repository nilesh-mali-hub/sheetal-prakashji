import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquareHeart } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
  likes: number;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Mali Family',
    message: 'Congratulations Sheetal & Prakash Ji! May your union be blessed with eternal happiness, prosperity, and endless love.',
    date: '10 Nov 2026',
    likes: 12
  },
  {
    id: '2',
    name: 'Rahul & Priya',
    message: 'So thrilled to celebrate your special day! Can’t wait for Sangeet and the grand wedding on 5th December!',
    date: '11 Nov 2026',
    likes: 9
  },
  {
    id: '3',
    name: 'Sharma Parivaar',
    message: 'सदा सुखी रहो! Sheetal and Prakash Ji, wishing you both a lifetime of togetherness, laughter, and blessings.',
    date: '12 Nov 2026',
    likes: 15
  }
];

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_sheetal_prakash');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem('wedding_wishes_sheetal_prakash', JSON.stringify(wishes));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: 'Just now',
      likes: 1
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');
    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#2F504F', '#8B7856', '#D3C5B0', '#BD374E']
    });

    setTimeout(() => setSubmitted(false), 3500);
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap({ ...likedMap, [id]: true });
    setWishes(wishes.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w));
  };

  const renderFormattedWish = (text: string) => {
    const parts = text.split(/([\u0900-\u097F\s।॥]+)/g);
    return parts.map((part, idx) =>
      /[\u0900-\u097F]/.test(part) ? (
        <span key={idx} className="font-hindi not-italic font-medium text-[#2F504F]">
          {part}
        </span>
      ) : (
        <React.Fragment key={idx}>{part}</React.Fragment>
      )
    );
  };

  const quickWishes = [
    "सदा सुखी रहो 🌸",
    "Made for Each Other 💖",
    "Best Wishes Sheetal & Prakash Ji ✨",
    "Can't wait for 5th Dec! 💍"
  ];

  return (
    <section id="wishes" className="py-8 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-1.5 opacity-90">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#8B7856]" />
          <span className="text-[#BD374E] text-[10px]">✦</span>
          <span className="font-cinzel text-xs tracking-[0.25em] text-[#8B7856] uppercase font-semibold">
            Blessings
          </span>
          <span className="text-[#BD374E] text-[10px]">✦</span>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#8B7856]" />
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl text-[#2F504F] font-normal tracking-wide">
          Wishes Wall
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-[#322F2A]/80 mt-1">
          Shower your warm blessings upon Sheetal &amp; Prakash Ji ·{' '}
          <span className="tabular-nums text-[#8B7856] font-medium not-italic">
            {wishes.length} {wishes.length === 1 ? 'Blessing' : 'Blessings'}
          </span>
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#FDF9F7] border border-[#D3C5B0] rounded-2xl p-4 sm:p-6 shadow-[0_8px_24px_rgba(47,80,79,0.06)] mb-8">
        <div className="flex items-center gap-2 mb-3 text-[#2F504F]">
          <MessageSquareHeart size={18} className="text-[#BD374E]" />
          <h3 className="font-serif text-base sm:text-lg font-semibold">Leave a Message</h3>
        </div>

        {/* Quick Blessing Buttons */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {quickWishes.map((qw, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMessage((prev) => prev ? `${prev} ${qw}` : qw)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border border-[#D3C5B0] bg-[#FBF5F2] hover:bg-[#F3EAE3] text-[#2F504F] transition-all cursor-pointer ${
                /[\u0900-\u097F]/.test(qw) ? 'font-hindi font-medium' : ''
              }`}
            >
              {qw}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              required
              placeholder="Your Name / Family Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/80 focus:bg-white focus:outline-none focus:border-[#2F504F] text-xs sm:text-sm text-[#322F2A]"
            />
          </div>

          <div>
            <textarea
              required
              rows={3}
              placeholder="Your Blessings & Warm Wishes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/80 focus:bg-white focus:outline-none focus:border-[#2F504F] text-xs sm:text-sm text-[#322F2A]"
            />
          </div>

          <div className="flex items-center justify-between pt-1 gap-2">
            <span className="text-[11px] text-[#322F2A]/65 italic flex items-center gap-1">
              <Sparkles size={12} className="text-[#8B7856]" />
              Wishes are visible to the couple &amp; guests
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs font-semibold tracking-wide uppercase transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer shrink-0"
            >
              <span>Post Wish</span>
              <Send size={13} />
            </button>
          </div>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-[#2F504F] font-medium text-center pt-2"
            >
              🎉 Your warm blessings have been posted to the wall! Thank you!
            </motion.p>
          )}
        </form>
      </div>

      {/* Wishes Display Cards */}
      <div className="space-y-3">
        {wishes.map((w, idx) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.25) }}
            className="p-3.5 sm:p-4 rounded-2xl border border-[#D3C5B0] bg-[#FDF9F7] shadow-[0_4px_16px_rgba(47,80,79,0.04)] flex flex-col gap-1.5 hover:border-[#8B7856]/80 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#2F504F] text-[#FBF5F2] flex items-center justify-center font-serif text-xs font-bold">
                  {w.name.charAt(0).toUpperCase()}
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#2F504F]">{w.name}</h4>
              </div>
              <span className="text-[10px] text-[#322F2A]/60 tabular-nums">{w.date}</span>
            </div>

            <p className="font-serif italic text-xs sm:text-sm text-[#322F2A]/90 pl-8 leading-relaxed">
              &ldquo;{renderFormattedWish(w.message)}&rdquo;
            </p>

            <div className="flex justify-end items-center gap-1 pt-1">
              <button
                type="button"
                onClick={() => handleLike(w.id)}
                aria-label={`Send love to ${w.name}'s blessing`}
                className={`text-[11px] flex items-center gap-1 px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer tabular-nums ${
                  likedMap[w.id]
                    ? 'text-[#BD374E] bg-[#BD374E]/10 border border-[#BD374E]/35'
                    : 'text-[#322F2A]/75 hover:text-[#BD374E] border border-[#D3C5B0] bg-[#FBF5F2]'
                }`}
              >
                <Heart size={12} className={likedMap[w.id] ? "fill-[#BD374E] text-[#BD374E]" : ""} />
                <span>{w.likes}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
