'use client';

/**
 * FrameLoader — minimal centered loading counter.
 * Shows loading progress in Cindie Mono, white, centered on black.
 */
interface FrameLoaderProps {
  loaded: number;
  total: number;
}

export function FrameLoader({ loaded, total }: FrameLoaderProps) {
  const pct = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#000' }}
    >
      <p
        className="font-cindie text-white text-sm uppercase"
        style={{ letterSpacing: '0.2em', fontWeight: 400 }}
      >
        Loading… {pct}%
      </p>
    </div>
  );
}
