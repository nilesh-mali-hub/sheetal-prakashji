export interface PetalDensityConfig {
  baseCount?: number;
  maxCount?: number;
  maxPlaybackRate?: number;
}

const DEFAULT_CONFIG: Required<PetalDensityConfig> = {
  baseCount: 16,
  maxCount: 52,
  maxPlaybackRate: 2.8,
};

function spawnPetalElement(
  container: HTMLElement,
  intensityRatio: number,
  immediateEntry = false
): HTMLDivElement {
  const petal = document.createElement('div');
  const isChampagneAccent = intensityRatio > 0.35 && Math.random() < 0.3;

  petal.className = isChampagneAccent ? 'petal petal--gold' : 'petal';
  petal.style.left = `${Math.random() * 100}vw`;

  // Base fall duration; playbackRate adjusts apparent speed smoothly in real time
  const baseDuration = 9 + Math.random() * 7;
  petal.style.animationDuration = `${baseDuration}s`;
  petal.style.animationDelay = immediateEntry
    ? `${-(Math.random() * 2.5)}s`
    : `${-(Math.random() * baseDuration)}s`;

  const baseOpacity = 0.24 + Math.random() * 0.3 + intensityRatio * 0.24;
  petal.style.opacity = String(Math.min(0.82, baseOpacity));

  const size = 8 + Math.random() * 7 + intensityRatio * 3;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;

  container.appendChild(petal);
  return petal;
}

/**
 * Adjusts active floating petal count and animation speed smoothly
 * according to the user's current scroll speed (in px/s or normalized velocity).
 */
export function adjustPetalDensity(
  petals: HTMLDivElement[],
  container: HTMLElement,
  scrollSpeedPxPerSec: number,
  config: PetalDensityConfig = {}
): { targetCount: number; playbackRate: number; intensity: number } {
  const { baseCount, maxCount, maxPlaybackRate } = { ...DEFAULT_CONFIG, ...config };

  // Normalize scroll speed: 0 at rest, 1.0 at ~1800 px/s rapid scroll
  const intensity = Math.max(0, Math.min(1, scrollSpeedPxPerSec / 1800));
  const targetCount = Math.round(baseCount + (maxCount - baseCount) * intensity);
  const playbackRate = Number((1 + (maxPlaybackRate - 1) * intensity).toFixed(2));

  // Add celebratory burst petals when scrolling faster
  while (petals.length < targetCount) {
    const newPetal = spawnPetalElement(container, intensity, true);
    petals.push(newPetal);
  }

  // Smoothly trim excess petals only when decaying well below active pool
  while (petals.length > targetCount + 2) {
    const oldest = petals.shift();
    if (oldest) {
      oldest.remove();
    }
  }

  // Smoothly scale falling velocity via Web Animations API (avoids animation restart jumps)
  for (const petal of petals) {
    const animations = petal.getAnimations();
    for (const anim of animations) {
      anim.playbackRate = playbackRate;
    }
  }

  return { targetCount, playbackRate, intensity };
}

/**
 * Attaches a scroll-speed tracker that dynamically intensifies wedding petals
 * during fast scrolling and gently eases back to calm ambient petals at rest.
 */
export function createScrollReactivePetals(
  container: HTMLElement = document.body,
  config: PetalDensityConfig = {}
) {
  const { baseCount } = { ...DEFAULT_CONFIG, ...config };
  const petals: HTMLDivElement[] = [];

  for (let i = 0; i < baseCount; i++) {
    petals.push(spawnPetalElement(container, 0, false));
  }

  let smoothedSpeed = 0;
  let lastScrollY = window.scrollY;
  let lastTime = performance.now();
  let decayRaf = 0;

  const updateFromSpeed = (instantSpeed: number) => {
    // Exponential smoothing prevents jitter on trackpads/wheels
    smoothedSpeed = smoothedSpeed * 0.45 + instantSpeed * 0.55;
    adjustPetalDensity(petals, container, smoothedSpeed, config);
  };

  const onNativeScroll = () => {
    const now = performance.now();
    const dt = Math.max(16, now - lastTime);
    const dy = Math.abs(window.scrollY - lastScrollY);
    const speedPxPerSec = (dy / dt) * 1000;

    lastScrollY = window.scrollY;
    lastTime = now;

    updateFromSpeed(speedPxPerSec);
  };

  // Gradual decay loop so celebratory intensity lingers slightly after scroll stops
  const decayStep = () => {
    const timeSinceScroll = performance.now() - lastTime;
    if (timeSinceScroll > 120 && smoothedSpeed > 5) {
      smoothedSpeed *= 0.92;
      if (smoothedSpeed < 8) smoothedSpeed = 0;
      adjustPetalDensity(petals, container, smoothedSpeed, config);
    }
    decayRaf = requestAnimationFrame(decayStep);
  };

  window.addEventListener('scroll', onNativeScroll, { passive: true });
  decayRaf = requestAnimationFrame(decayStep);

  return {
    /** Optional hook for Lenis scroll velocity updates */
    onLenisVelocity: (velocity: number) => {
      const speedPxPerSec = Math.abs(velocity) * 60;
      lastTime = performance.now();
      lastScrollY = window.scrollY;
      updateFromSpeed(speedPxPerSec);
    },
    destroy: () => {
      window.removeEventListener('scroll', onNativeScroll);
      cancelAnimationFrame(decayRaf);
      while (petals.length > 0) {
        const p = petals.pop();
        p?.remove();
      }
    },
  };
}
