import React, { useRef, useEffect, useState, useCallback, useId } from 'react';
import confetti from 'canvas-confetti';

interface ScratchCardProps {
  width: number;
  height: number;
  shape?: 'rectangle' | 'heart';
  children: React.ReactNode;
  onReveal?: () => void;
  resetKey?: number;
}

function traceHeartPath(ctx: CanvasRenderingContext2D, w: number, h: number, inset = 0) {
  const pw = w - inset * 2;
  const ph = h - inset * 2;
  const x = (nx: number) => inset + nx * pw;
  const y = (ny: number) => inset + ny * ph;

  ctx.beginPath();
  ctx.moveTo(x(0.5), y(0.24));
  ctx.bezierCurveTo(x(0.5), y(0.13), x(0.37), y(0.03), x(0.23), y(0.03));
  ctx.bezierCurveTo(x(0.08), y(0.03), x(0.01), y(0.17), x(0.01), y(0.34));
  ctx.bezierCurveTo(x(0.01), y(0.56), x(0.24), y(0.76), x(0.5), y(0.96));
  ctx.bezierCurveTo(x(0.76), y(0.76), x(0.99), y(0.56), x(0.99), y(0.34));
  ctx.bezierCurveTo(x(0.99), y(0.17), x(0.92), y(0.03), x(0.77), y(0.03));
  ctx.bezierCurveTo(x(0.63), y(0.03), x(0.5), y(0.13), x(0.5), y(0.24));
  ctx.closePath();
}

export default function ScratchCard({
  width,
  height,
  shape = 'heart',
  children,
  onReveal,
  resetKey = 0,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const isDrawingRef = useRef(false);
  const hasRevealedRef = useRef(false);
  const initialOpaqueCountRef = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const clipId = useId().replace(/:/g, '');

  const isHeart = shape === 'heart';

  const drawFoilSurface = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    ctx.save();
    if (isHeart) {
      traceHeartPath(ctx, width, height, 0);
      ctx.clip();
    }

    // 1. Royal Dusty-Rose & Rose-Gold Metallic Foil Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#F7DDE4');
    gradient.addColorStop(0.28, '#E092A7');
    gradient.addColorStop(0.52, '#F9E6EC');
    gradient.addColorStop(0.76, '#C45B77');
    gradient.addColorStop(1, '#E8A8BA');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Diagonal Brushed-Foil Sheen Lines
    ctx.save();
    ctx.strokeStyle = 'rgba(253, 249, 247, 0.24)';
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - height * 0.65, height);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Delicate Starburst / Micro Sparkle Dust
    for (let i = 0; i < 46; i++) {
      const sx = (((i * 73) % 97) / 97) * width;
      const sy = (((i * 41) % 89) / 89) * height;
      const radius = i % 3 === 0 ? 1.55 : 0.9;
      ctx.fillStyle =
        i % 2 === 0 ? 'rgba(253, 249, 247, 0.8)' : 'rgba(47, 80, 79, 0.16)';
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Engraved Double Heart or Rectangular Filigree Border
    if (isHeart) {
      ctx.save();
      traceHeartPath(ctx, width, height, 8);
      ctx.strokeStyle = 'rgba(139, 120, 86, 0.45)';
      ctx.lineWidth = 1.25;
      ctx.stroke();

      traceHeartPath(ctx, width, height, 11.5);
      ctx.strokeStyle = 'rgba(253, 249, 247, 0.78)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.strokeStyle = 'rgba(139, 120, 86, 0.42)';
      ctx.lineWidth = 1.25;
      ctx.strokeRect(7, 7, width - 14, height - 14);

      ctx.strokeStyle = 'rgba(253, 249, 247, 0.78)';
      ctx.lineWidth = 0.75;
      ctx.strokeRect(10, 10, width - 20, height - 20);
    }

    // 5. Faint Engraved "SP" Watermark behind prompt
    const centerY = isHeart ? height * 0.45 : height / 2;
    ctx.save();
    ctx.fillStyle = 'rgba(110, 26, 48, 0.09)';
    ctx.font = 'bold 48px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SP', width / 2, centerY + 2);
    ctx.restore();

    // 6. Crisp Foil-Engraved Prompt Typography
    ctx.fillStyle = '#2F504F';
    ctx.font = '600 9px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SHUBH MUHURAT • SAVE THE DATE', width / 2, centerY - 14);

    ctx.fillStyle = '#591829';
    ctx.font = 'italic 600 17px "Playfair Display", Georgia, serif';
    ctx.fillText('✨ Scratch to Reveal ✨', width / 2, centerY + 9);

    ctx.restore();

    // Measure initial opaque pixel count inside the foil shape for accurate % reveal
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let initialOpaque = 0;
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] >= 128) {
        initialOpaque++;
      }
    }
    initialOpaqueCountRef.current = Math.max(1, initialOpaque);
  }, [width, height, isHeart]);

  useEffect(() => {
    hasRevealedRef.current = false;
    setIsScratched(false);
    setHasStarted(false);
    lastPointRef.current = null;
    drawFoilSurface();
  }, [drawFoilSurface, resetKey]);

  const checkScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealedRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let remainingOpaque = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] >= 128) {
        remainingOpaque++;
      }
    }

    const totalInitial = Math.max(1, initialOpaqueCountRef.current);
    const percentScratched = ((totalInitial - remainingOpaque) / totalInitial) * 100;

    if (percentScratched > 40 && !hasRevealedRef.current) {
      hasRevealedRef.current = true;
      setIsScratched(true);
      onReveal?.();

      const rect = canvas.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 130,
        spread: 85,
        origin: { x, y },
        colors: ['#BD374E', '#F48FB1', '#FAD6E2', '#D3C5B0', '#FBF5F2'],
      });
    }
  };

  const scratchTo = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 36;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };
    checkScratched();
  };

  const getLocalCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isScratched) return;
    setHasStarted(true);
    isDrawingRef.current = true;
    lastPointRef.current = null;
    const { x, y } = getLocalCoords(e);
    scratchTo(x, y);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isScratched) return;
    const { x, y } = getLocalCoords(e);
    scratchTo(x, y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      className={`relative inline-block select-none ${
        isHeart
          ? 'drop-shadow-[0_12px_26px_rgba(189,55,78,0.28)]'
          : 'rounded-2xl overflow-hidden shadow-[0_10px_28px_rgba(189,55,78,0.2)] border border-[#BD374E]/50'
      }`}
      style={{ width, height }}
    >
      {/* Normalized Heart ClipPath Definition */}
      {isHeart && (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d="M 0.50 0.24 C 0.50 0.13 0.37 0.03 0.23 0.03 C 0.08 0.03 0.01 0.17 0.01 0.34 C 0.01 0.56 0.24 0.76 0.50 0.96 C 0.76 0.76 0.99 0.56 0.99 0.34 C 0.99 0.17 0.92 0.03 0.77 0.03 C 0.63 0.03 0.50 0.13 0.50 0.24 Z" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Clipped Content & Foil Wrapper */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={isHeart ? { clipPath: `url(#${clipId})` } : undefined}
      >
        {/* Revealed Content Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>

        {/* Interactive Scratch Foil Layer */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ width, height }}
          className={`absolute inset-0 z-10 touch-none cursor-crosshair transition-opacity duration-700 ${
            isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Subtle Foil Shimmer Sweep before first scratch */}
        {!hasStarted && !isScratched && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFF6F9]/55 to-transparent -skew-x-12 animate-[shimmerSweep_2.6s_ease-in-out_infinite]" />
          </div>
        )}
      </div>

      {/* Crisp Decorative Rose-Gold Heart Rim */}
      {isHeart && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
        >
          <path
            d="M 50 24 C 50 13 37 3 23 3 C 8 3 1 17 1 34 C 1 56 24 76 50 96 C 76 76 99 56 99 34 C 99 17 92 3 77 3 C 63 3 50 13 50 24 Z"
            fill="none"
            stroke="#8B7856"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
