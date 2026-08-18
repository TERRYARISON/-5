import StarMark from './StarMark';

interface PlaceholderCardProps {
  title: string;
  eyebrow?: string;
  className?: string;
  /** Aspect ratio utility class, e.g. "aspect-[4/5]". Defaults to 4/5. */
  aspect?: string;
}

/**
 * CSS placeholder for missing work imagery (design.md §5.6): deep ink
 * background, centered ✦ star in sakura, thin sakura border, serif title,
 * "IMAGE FORTHCOMING" eyebrow. Same hover physics as GlassCard.
 */
export default function PlaceholderCard({
  title,
  eyebrow = 'IMAGE FORTHCOMING',
  className,
  aspect = 'aspect-[4/5]',
}: PlaceholderCardProps) {
  return (
    <div
      className={`glass-card flex flex-col items-center justify-center gap-4 border-sakura/30 bg-ink/90 p-8 text-center ${aspect} ${className ?? ''}`}
    >
      <StarMark size={36} flat />
      <h3 className="card-title text-fog">{title}</h3>
      <p className="eyebrow text-ghost">{eyebrow}</p>
    </div>
  );
}
