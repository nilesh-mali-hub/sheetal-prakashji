import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion } from 'motion/react';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Events from './components/Events';
import Gallery from './components/Gallery';
import WishesWall from './components/WishesWall';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import ScrollProgressBar from './components/ScrollProgressBar';
import WeddingQuotes from './components/WeddingQuotes';
import EventMap from './components/EventMap';
import YouTubeAudioEngine, { YouTubeAudioEngineHandle } from './components/YouTubeAudioEngine';
import { createScrollReactivePetals } from './utils/petals';

const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
    className="relative"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isGateOpened, setIsGateOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);
  const audioEngineRef = useRef<YouTubeAudioEngineHandle>(null);

  useEffect(() => {
    const handleQuotaExceeded = () => setGmpQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Scroll-speed reactive rose, blush & champagne petals
    const petalController = createScrollReactivePetals(document.body, {
      baseCount: 16,
      maxCount: 52,
      maxPlaybackRate: 2.8,
    });

    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      petalController.onLenisVelocity(velocity);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      petalController.destroy();
    };
  }, []);

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (clamped === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const volumeDown = () => {
    handleVolumeChange(volume - 0.15);
  };

  const volumeUp = () => {
    handleVolumeChange(volume + 0.15);
  };

  const handleOpenGate = () => {
    audioEngineRef.current?.playImmediate();
    setIsGateOpened(true);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F3EAE3] text-[#322F2A] selection:bg-[#2F504F]/20 font-sans flex flex-col items-center">
      {gmpQuotaExceeded && (
        <div className="w-full bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Thin Top Invitation Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Ambient background texture */}
      <div className="bg-motif" />

      {/* Centered Royal Invitation Column matching the SP Logo watercolor ivory & brass palette */}
      <div className="w-full max-w-[540px] sm:max-w-[580px] bg-[#FBF5F2] shadow-[0_25px_70px_rgba(47,80,79,0.14)] border-x border-[#D3C5B0] relative min-h-screen flex flex-col overflow-x-hidden">
        {/* Sticky Navbar (appears smoothly when scrolled past top hero) */}
        <div
          className={`fixed top-0 max-w-[540px] sm:max-w-[580px] w-full z-40 transition-transform duration-500 ${
            scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <Navbar
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
            onToggleMusic={toggleMusic}
            onToggleMute={toggleMute}
            onVolumeDown={volumeDown}
            onVolumeUp={volumeUp}
            onOpenRSVP={() => setRsvpModalOpen(true)}
          />
        </div>

        {/* Main Content Flow */}
        <main className="relative z-10 flex-1">
          {/* Hero Section */}
          <SectionWrapper>
            <Hero
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              onToggleMusic={toggleMusic}
              onToggleMute={toggleMute}
              onVolumeDown={volumeDown}
              onVolumeUp={volumeUp}
              onOpenRSVP={() => setRsvpModalOpen(true)}
              onReopenGate={() => setIsGateOpened(false)}
            />
          </SectionWrapper>

          {/* Our Story Section */}
          <SectionWrapper>
            <OurStory />
          </SectionWrapper>

          {/* Poetic Rotating Wedding Quotes & Shayaris */}
          <SectionWrapper>
            <WeddingQuotes />
          </SectionWrapper>

          {/* Wedding Events Section */}
          <SectionWrapper>
            <Events />
          </SectionWrapper>

          {/* Gallery Section */}
          <SectionWrapper>
            <Gallery />
          </SectionWrapper>

          {/* Wishes Wall Section */}
          <SectionWrapper>
            <WishesWall />
          </SectionWrapper>

          {/* RSVP Section */}
          <SectionWrapper>
            <RSVP
              isOpen={rsvpModalOpen}
              onOpen={() => setRsvpModalOpen(true)}
              onClose={() => setRsvpModalOpen(false)}
            />
          </SectionWrapper>

          {/* Interactive Estate & Event Locations Map */}
          <SectionWrapper>
            <EventMap />
          </SectionWrapper>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Royal Palace 3D Opening Gate on Start / Open */}
      <Intro
        opened={isGateOpened}
        onOpen={() => setIsGateOpened(true)}
        onPlayMusic={handleOpenGate}
      />

      {/* Luxury Floating Audio Controller with Mute and Volume Control */}
      <AudioPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        onTogglePlay={toggleMusic}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
        onVolumeDown={volumeDown}
        onVolumeUp={volumeUp}
      />

      {/* Pre-buffered Background Music Engine (boeim-VkxN4 starting at 28s) */}
      <YouTubeAudioEngine
        ref={audioEngineRef}
        videoId="boeim-VkxN4"
        startSeconds={28}
        playing={isPlaying}
        muted={isMuted}
        volume={volume}
      />
    </div>
  );
}
