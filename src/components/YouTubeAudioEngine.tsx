import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';

export interface YouTubeAudioEngineHandle {
  playImmediate: () => void;
  pauseImmediate: () => void;
}

interface YouTubeAudioEngineProps {
  videoId: string;
  startSeconds?: number;
  playing: boolean;
  muted: boolean;
  volume: number; // 0 to 1
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    elementId: string | HTMLElement,
    options: {
      videoId: string;
      width?: number | string;
      height?: number | string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (event: { target: YTPlayerInstance }) => void;
        onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoadPromise: Promise<YTNamespace> | null = null;

function loadYouTubeIframeAPI(): Promise<YTNamespace> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('No window'));
  }
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }
  if (apiLoadPromise) {
    return apiLoadPromise;
  }

  apiLoadPromise = new Promise<YTNamespace>((resolve) => {
    const existingReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (existingReady) existingReady();
      if (window.YT) {
        resolve(window.YT);
      }
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiLoadPromise;
}

const YouTubeAudioEngine = forwardRef<YouTubeAudioEngineHandle, YouTubeAudioEngineProps>(
  ({ videoId, startSeconds = 28, playing, muted, volume }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YTPlayerInstance | null>(null);
    const isReadyRef = useRef(false);
    const isPrebufferingRef = useRef(false);
    const hasPrebufferedRef = useRef(false);

    const playingRef = useRef(playing);
    const mutedRef = useRef(muted);
    const volumeRef = useRef(volume);

    playingRef.current = playing;
    mutedRef.current = muted;
    volumeRef.current = volume;

    const applyAudioSettings = (player: YTPlayerInstance) => {
      const volPct = Math.round(Math.max(0, Math.min(1, volumeRef.current)) * 100);
      if (mutedRef.current || volPct === 0) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(volPct);
      }
    };

    useImperativeHandle(ref, () => ({
      playImmediate: () => {
        playingRef.current = true;
        isPrebufferingRef.current = false;
        const player = playerRef.current;
        if (player && isReadyRef.current) {
          applyAudioSettings(player);
          player.playVideo();
        }
      },
      pauseImmediate: () => {
        playingRef.current = false;
        isPrebufferingRef.current = false;
        const player = playerRef.current;
        if (player && isReadyRef.current) {
          player.pauseVideo();
        }
      },
    }));

    useEffect(() => {
      let mounted = true;

      loadYouTubeIframeAPI().then((YT) => {
        if (!mounted || !containerRef.current) return;

        const targetEl = document.createElement('div');
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(targetEl);

        const player = new YT.Player(targetEl, {
          videoId,
          width: 240,
          height: 135,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: startSeconds,
            origin: window.location.origin,
          },
          events: {
            onReady: ({ target }) => {
              if (!mounted) return;
              isReadyRef.current = true;

              if (playingRef.current) {
                // User already clicked Open Invitation while player was initializing
                applyAudioSettings(target);
                target.seekTo(startSeconds, true);
                target.playVideo();
              } else if (!hasPrebufferedRef.current) {
                // Silently pre-buffer at startSeconds while gate is still closed
                // so clicking "Open Invitation" starts audio instantaneously
                isPrebufferingRef.current = true;
                target.mute();
                target.playVideo();
              }
            },
            onStateChange: ({ data, target }) => {
              if (!mounted) return;

              // Finish silent pre-buffer as soon as playback buffer at startSeconds is warm
              if (data === YT.PlayerState.PLAYING && isPrebufferingRef.current) {
                isPrebufferingRef.current = false;
                hasPrebufferedRef.current = true;

                if (playingRef.current) {
                  // Gate was clicked during pre-buffer; immediately unmute and keep playing
                  applyAudioSettings(target);
                } else {
                  target.pauseVideo();
                  target.seekTo(startSeconds, true);
                  applyAudioSettings(target);
                }
                return;
              }

              // Seamless loop back to startSeconds when track ends
              if (data === YT.PlayerState.ENDED && playingRef.current) {
                target.seekTo(startSeconds, true);
                target.playVideo();
              }
            },
          },
        });

        playerRef.current = player;
      });

      return () => {
        mounted = false;
        isReadyRef.current = false;
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch {
            // Ignore cleanup errors
          }
          playerRef.current = null;
        }
      };
    }, [videoId, startSeconds]);

    // Sync React playing state (for Navbar/Hero/AudioPlayer play/pause toggles)
    useEffect(() => {
      const player = playerRef.current;
      if (!player || !isReadyRef.current) return;

      if (playing) {
        isPrebufferingRef.current = false;
        applyAudioSettings(player);
        player.playVideo();
      } else if (!isPrebufferingRef.current) {
        player.pauseVideo();
      }
    }, [playing]);

    // Sync mute & volume changes smoothly
    useEffect(() => {
      const player = playerRef.current;
      if (!player || !isReadyRef.current || isPrebufferingRef.current) return;
      applyAudioSettings(player);
    }, [muted, volume]);

    return (
      <div
        aria-hidden="true"
        ref={containerRef}
        className="fixed -left-[9999px] top-0 w-[240px] h-[135px] opacity-[0.01] pointer-events-none overflow-hidden"
      />
    );
  }
);

YouTubeAudioEngine.displayName = 'YouTubeAudioEngine';

export default YouTubeAudioEngine;
