import React, { useState } from 'react';
import { Volume2, Volume1, VolumeX, Play, Pause, Music, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AudioPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (newVol: number) => void;
  onVolumeDown: () => void;
  onVolumeUp: () => void;
}

export default function AudioPlayer({
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  onVolumeDown,
  onVolumeUp
}: AudioPlayerProps) {
  const [showControls, setShowControls] = useState(false);

  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Luxury Volume & Sound Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-3 bg-[#FDF9F7] border-2 border-[#8B7856] rounded-2xl p-4 shadow-2xl w-64 text-[#322F2A] backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex flex-col pb-2 mb-3 border-b border-[#D3C5B0]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#2F504F]">
                  <Music size={14} className="text-[#8B7856]" />
                  <span className="font-cinzel text-xs font-semibold tracking-wider uppercase">
                    Wedding Melody
                  </span>
                </div>
                <span className="text-[10px] text-[#8B7856] font-serif italic">
                  {isMuted ? 'Muted' : `${Math.round(effectiveVolume * 100)}%`}
                </span>
              </div>
              <p className="text-[10px] text-[#322F2A]/70 font-serif italic mt-0.5 truncate">
                Sheetal &amp; Prakash Ji · Celebration Theme
              </p>
            </div>

            {/* Play/Pause & Mute Primary Row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <button
                onClick={onTogglePlay}
                className="flex-1 py-1.5 px-3 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs font-medium flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                <span>{isPlaying ? 'Pause' : 'Play Music'}</span>
              </button>

              <button
                onClick={onToggleMute}
                className={`py-1.5 px-3 rounded-full border text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  isMuted 
                    ? 'bg-[#BD374E]/10 border-[#BD374E]/40 text-[#BD374E]' 
                    : 'bg-[#FBF5F2] border-[#D3C5B0] text-[#2F504F] hover:bg-[#F3EAE3]'
                }`}
                title={isMuted ? 'Unmute' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>

            {/* Volume Down / Slider / Volume Up Control */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[#322F2A]/75">
                <span className="font-serif italic">Volume Control</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={onVolumeDown}
                    disabled={effectiveVolume <= 0}
                    className="p-1 rounded-md hover:bg-[#F3EAE3] text-[#2F504F] disabled:opacity-30 cursor-pointer"
                    title="Volume Down (-15%)"
                  >
                    <Minus size={13} />
                  </button>
                  <button
                    onClick={onVolumeUp}
                    disabled={effectiveVolume >= 1}
                    className="p-1 rounded-md hover:bg-[#F3EAE3] text-[#2F504F] disabled:opacity-30 cursor-pointer"
                    title="Volume Up (+15%)"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleMute}
                  className="text-[#2F504F] hover:text-[#8B7856] transition-colors cursor-pointer"
                  title="Toggle Mute"
                >
                  {isMuted || effectiveVolume === 0 ? (
                    <VolumeX size={15} className="text-[#BD374E]" />
                  ) : effectiveVolume < 0.5 ? (
                    <Volume1 size={15} />
                  ) : (
                    <Volume2 size={15} />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={effectiveVolume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#F3EAE3] border border-[#D3C5B0] rounded-lg appearance-none cursor-pointer accent-[#2F504F]"
                />
              </div>

              {/* Quick Volume Preset Buttons */}
              <div className="grid grid-cols-4 gap-1 pt-1.5 text-[10px]">
                <button
                  onClick={() => onVolumeChange(0)}
                  className={`py-0.5 rounded border cursor-pointer ${effectiveVolume === 0 ? 'bg-[#2F504F] text-[#FBF5F2] border-[#2F504F]' : 'bg-[#FBF5F2] border-[#D3C5B0] text-[#322F2A]'}`}
                >
                  Mute
                </button>
                <button
                  onClick={() => onVolumeChange(0.25)}
                  className={`py-0.5 rounded border cursor-pointer ${Math.abs(effectiveVolume - 0.25) < 0.05 ? 'bg-[#2F504F] text-[#FBF5F2] border-[#2F504F]' : 'bg-[#FBF5F2] border-[#D3C5B0] text-[#322F2A]'}`}
                >
                  25%
                </button>
                <button
                  onClick={() => onVolumeChange(0.5)}
                  className={`py-0.5 rounded border cursor-pointer ${Math.abs(effectiveVolume - 0.5) < 0.05 ? 'bg-[#2F504F] text-[#FBF5F2] border-[#2F504F]' : 'bg-[#FBF5F2] border-[#D3C5B0] text-[#322F2A]'}`}
                >
                  50%
                </button>
                <button
                  onClick={() => onVolumeChange(0.85)}
                  className={`py-0.5 rounded border cursor-pointer ${effectiveVolume > 0.75 ? 'bg-[#2F504F] text-[#FBF5F2] border-[#2F504F]' : 'bg-[#FBF5F2] border-[#D3C5B0] text-[#322F2A]'}`}
                >
                  85%
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Audio Button */}
      <div className="flex items-center gap-2">
        
        {/* Toggle popup chevron / indicator */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-[#FDF9F7] hover:bg-[#F3EAE3] border border-[#8B7856] text-[#2F504F] px-2.5 py-1.5 rounded-full shadow-md text-[11px] font-cinzel font-semibold flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
          title="Audio Settings (Volume, Mute)"
        >
          {isMuted ? (
            <VolumeX size={13} className="text-[#BD374E]" />
          ) : (
            <Volume2 size={13} />
          )}
          <span>{isMuted ? 'Muted' : `${Math.round(effectiveVolume * 100)}%`}</span>
          <span className="text-[10px] text-[#8B7856]">{showControls ? '▼' : '▲'}</span>
        </button>

        {/* Big circular play/pause pulse button */}
        <button 
          onClick={onTogglePlay}
          className="relative w-12 h-12 rounded-full bg-[#2F504F] hover:bg-[#1F3837] border-2 border-[#8B7856] text-[#FBF5F2] flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 active:scale-95 transition-all"
          aria-label={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
          title={isPlaying ? "Click to Pause (or click volume for mute/down)" : "Click to Play Music"}
        >
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border-2 border-[#8B7856] animate-ping opacity-35 pointer-events-none"></span>
          )}

          <div className="flex items-end h-4 gap-[2px]">
            <span 
              className={`w-0.5 bg-[#D3C5B0] rounded-sm ${isPlaying && !isMuted ? 'animate-pulse' : ''}`} 
              style={{ height: isPlaying && !isMuted ? '8px' : '3px' }}
            ></span>
            <span 
              className={`w-0.5 bg-[#D3C5B0] rounded-sm ${isPlaying && !isMuted ? 'animate-pulse' : ''}`} 
              style={{ height: isPlaying && !isMuted ? '14px' : '3px', animationDelay: '0.15s' }}
            ></span>
            <span 
              className={`w-0.5 bg-[#D3C5B0] rounded-sm ${isPlaying && !isMuted ? 'animate-pulse' : ''}`} 
              style={{ height: isPlaying && !isMuted ? '10px' : '3px', animationDelay: '0.3s' }}
            ></span>
          </div>
        </button>
      </div>

      {/* Floating prompt when music hasn't started yet */}
      {!isPlaying && !showControls && (
        <div 
          onClick={() => {
            onTogglePlay();
            setShowControls(true);
          }}
          className="mt-2 bg-[#FDF9F7] border border-[#8B7856] px-3.5 py-1.5 rounded-full shadow-lg text-[11px] font-serif italic text-[#2F504F] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all animate-bounce"
        >
          <span>🎵</span>
          <span>Tap to play wedding music</span>
        </div>
      )}

    </div>
  );
}
