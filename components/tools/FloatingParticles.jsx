'use client'

import { useMemo } from 'react'

// Deterministic PRNG so server and client render identical markup.
// Math.random() during render causes a hydration mismatch, and moving it into an
// effect trips react-hooks/set-state-in-effect.
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function FloatingParticles({
  count = 18,
  color = 'rgba(167,139,250,0.6)',
  density = 1,
  className = '',
}) {
  const particleCount = Math.round(count * density)

  const particles = useMemo(() => {
    const rand = mulberry32(particleCount * 2654435761)
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 4 + 2,
      delay: rand() * 3,
      duration: rand() * 3 + 2,
    }))
  }, [particleCount])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="fp-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            '--fp-color': color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <style jsx>{`
        .fp-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: floatUp linear infinite;

          /* Day mode: the incoming color is a light lavender that composites to
             ~1.35:1 on the near-white section backgrounds, so it is invisible.
             Use the brand purple instead, which lands near 3.4:1. */
          background: rgba(99, 68, 245, 0.75);
          box-shadow:
            0 0 0 1px rgba(99, 68, 245, 0.18),
            0 0 8px rgba(99, 68, 245, 0.35);
        }

        /* Dark mode keeps the per-usage color that callers pass in. */
        :global(.dark) .fp-particle {
          background: var(--fp-color, rgba(167, 139, 250, 0.6));
          box-shadow: 0 0 8px var(--fp-color, rgba(167, 139, 250, 0.5));
        }
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.2);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .fp-particle {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}