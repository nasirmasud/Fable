'use client'

import { useEffect, useState } from 'react'

export default function FloatingParticles({
  count = 18,
  color = 'rgba(167,139,250,0.6)',
  density = 1,
  className = '',
}) {
  const particleCount = Math.round(count * density)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }))
    )
  }, [particleCount])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="fp-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
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