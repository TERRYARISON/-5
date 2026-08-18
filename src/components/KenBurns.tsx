interface KenBurnsProps {
  src: string;
  alt?: string;
  /** Optional ambient motion video layered over the still (falls back to the still on error). */
  video?: string;
  /** CSS object-position, e.g. "65% 30%". */
  position?: string;
  /** Extra classes for the outer (absolute inset-0) frame. */
  className?: string;
  /** Set false to skip the vignette + bottom fade overlays. */
  vignette?: boolean;
}

/**
 * Ken Burns living image (design.md §5.2): slow 18s scale 1.0 → 1.16 with a
 * drift toward the upper-left, alternating infinitely. When `video` is given,
 * an autoplay/muted/looped ambient clip is layered over the still for a true
 * living-portrait effect; the still remains underneath as poster + fallback.
 * The parent must be positioned (relative/absolute) and sized.
 */
import { useEffect, useRef } from 'react';

export default function KenBurns({
  src,
  alt = '',
  video,
  position = '50% 50%',
  className,
  vignette = true,
}: KenBurnsProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Some browsers defer autoplay — nudge playback explicitly on mount and on
    // visibility return so the living portrait never freezes on frame 0.
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    document.addEventListener('visibilitychange', tryPlay);
    return () => document.removeEventListener('visibilitychange', tryPlay);
  }, [video]);

  return (
    <div className={`kenburns-frame ${className ?? ''}`} aria-hidden={alt === ''}>
      <img src={src} alt={alt} className="kenburns-img" style={{ objectPosition: position }} draggable={false} />
      {video && (
        <video
          ref={videoRef}
          className="kenburns-img kenburns-video"
          style={{ objectPosition: position }}
          src={video}
          poster={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => {
            // Missing/unplayable clip — reveal the animated still underneath.
            (e.currentTarget as HTMLVideoElement).style.opacity = '0';
          }}
        />
      )}
      {vignette && <div className="kenburns-vignette" />}
    </div>
  );
}

