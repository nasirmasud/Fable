'use client'

import { ArrowRight, BookOpen, CheckCircle, Mail, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SuccessPage({ customerEmail, dashboardHref = "/dashboard/reader" }) {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setMounted(true)
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }))
    )
  }, [])

  return (
    <div className="success-root">
      <div className="glow glow-top" />
      <div className="glow glow-bottom" />

      {mounted && particles.map(p => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <main className="main">
        <div className="card">
          <div className="icon-wrap">
            <div className="icon-ring" />
            <div className="icon-inner">
              <BookOpen size={36} strokeWidth={1.5} className="book-icon" />
            </div>
            <CheckCircle size={20} className="check-badge" />
          </div>

          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" className="star" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>

          <p className="eyebrow">Purchase Confirmed</p>
          <h1 className="heading">
            Your story<br />
            <span className="heading-accent">awaits you.</span>
          </h1>

          <p className="body-text">
            Thanks for your purchase! A confirmation has been sent to{' '}
            <span className="email-highlight">{customerEmail}</span>.
            Your ebook is ready to read right now.
          </p>

          <div className="divider">
            <span className="divider-dot" />
            <span className="divider-line" />
            <Sparkles size={14} className="divider-sparkle" />
            <span className="divider-line" />
            <span className="divider-dot" />
          </div>

          <div className="info-row">
            <div className="info-item">
              <Mail size={16} className="info-icon" />
              <div>
                <p className="info-label">Confirmation sent to</p>
                <p className="info-value">{customerEmail}</p>
              </div>
            </div>
            <div className="info-item">
              <BookOpen size={16} className="info-icon" />
              <div>
                <p className="info-label">Access</p>
                <p className="info-value">Instant · Lifetime</p>
              </div>
            </div>
          </div>

          <div className="btn-group">
            <Link href={dashboardHref} className="btn-primary">
              Start Reading
              <ArrowRight size={16} />
            </Link>
            <Link href="/all-books" className="btn-ghost">
              Browse More Ebooks
            </Link>
          </div>

          <p className="support-text">
            Questions? Email us at{' '}
            <a href="mailto:support@fable.com" className="support-link">support@fable.com</a>
          </p>
        </div>
      </main>

      <style jsx>{`
        .success-root {
          min-height: 100vh;
          background: #0d0b1a;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .glow-top {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%);
          top: -200px; left: 50%; transform: translateX(-50%);
        }
        .glow-bottom {
          width: 500px; height: 400px;
          background: radial-gradient(circle, rgba(79,38,180,0.18) 0%, transparent 70%);
          bottom: -100px; right: -100px;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(167,139,250,0.6);
          animation: float linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes float {
          0%   { opacity: 0; transform: translateY(0) scale(0.8); }
          50%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
        }
        .nav {
          position: relative;
          z-index: 10;
          padding: 20px 32px;
          display: flex;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #e2d9f3;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .logo svg { color: #a78bfa; }
        .main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px 48px;
        }
        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 24px;
          padding: 48px 40px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          box-shadow:
            0 0 0 1px rgba(139,92,246,0.1),
            0 24px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          animation: cardIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .icon-wrap {
          position: relative;
          width: 80px; height: 80px;
          margin: 0 auto 20px;
          animation: iconIn 0.7s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes iconIn {
          from { opacity: 0; transform: scale(0.6) rotate(-10deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .icon-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(from 180deg, #7c3aed, #a78bfa, #c4b5fd, #7c3aed);
          animation: spin 4s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .icon-inner {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: #1a1530;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .book-icon { color: #a78bfa; }
        .check-badge {
          position: absolute;
          bottom: -2px; right: -2px;
          color: #4ade80;
          background: #0d0b1a;
          border-radius: 50%;
          animation: popIn 0.4s 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        .stars-row {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 12px;
        }
        .star {
          color: #f59e0b;
          animation: starPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes starPop {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        .eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #a78bfa;
          margin: 0 0 12px;
        }
        .heading {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          color: #f0eaff;
          margin: 0 0 16px;
        }
        .heading-accent {
          background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .body-text {
          font-size: 15px;
          line-height: 1.6;
          color: #9d8ec4;
          margin: 0 0 24px;
        }
        .email-highlight {
          color: #c4b5fd;
          font-weight: 500;
        }
        .divider {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 24px;
          justify-content: center;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent);
        }
        .divider-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(139,92,246,0.4);
        }
        .divider-sparkle { color: #a78bfa; }
        .info-row {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
        }
        .info-item {
          flex: 1;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(139,92,246,0.08);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 12px;
          padding: 14px;
          text-align: left;
        }
        .info-icon { color: #a78bfa; flex-shrink: 0; margin-top: 2px; }
        .info-label { font-size: 11px; color: #6b5e8a; margin: 0 0 2px; }
        .info-value { font-size: 13px; color: #d4c8f0; font-weight: 500; margin: 0; }
        .btn-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: #fff;
          border-radius: 12px;
          padding: 14px 24px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
          box-shadow: 0 6px 32px rgba(124,58,237,0.55);
          transform: translateY(-1px);
        }
        .btn-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(139,92,246,0.3);
          color: #a78bfa;
          border-radius: 12px;
          padding: 13px 24px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          background: rgba(139,92,246,0.1);
          border-color: rgba(139,92,246,0.5);
          color: #c4b5fd;
        }
        .support-text {
          font-size: 12px;
          color: #5c5175;
          margin: 0;
        }
        .support-link {
          color: #7c6fab;
          text-decoration: none;
          transition: color 0.15s;
        }
        .support-link:hover { color: #a78bfa; }
        @media (max-width: 480px) {
          .card { padding: 36px 24px; }
          .heading { font-size: 28px; }
          .info-row { flex-direction: column; }
        }
        @media (prefers-reduced-motion: reduce) {
          .particle, .icon-ring { animation: none; }
          .card, .icon-wrap, .check-badge, .star { animation: none; }
        }
      `}</style>
    </div>
  )
}