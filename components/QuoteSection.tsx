'use client'

export default function QuoteSection() {
  return (
    <section style={{
      background: 'var(--navy)',
      padding: 'clamp(48px, 8vw, 80px) clamp(1.25rem, 6%, 8%)',
      borderTop: '1px solid rgba(0,102,255,0.12)',
      borderBottom: '1px solid rgba(0,102,255,0.12)',
    }}>
      <style>{`
        @media (max-width: 480px) {
          .quote-section-line { height: 40px !important; }
          .quote-section-text { font-size: 1.15rem !important; letter-spacing: -0.2px !important; }
          .quote-section-author { font-size: 0.62rem !important; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .quote-section-line { height: 52px !important; }
          .quote-section-text { font-size: 1.35rem !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .quote-section-text { font-size: 1.75rem !important; }
        }
      `}</style>

      <div className="reveal-3d" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(1.25rem, 3vw, 2rem)',
        maxWidth: '820px',
        margin: '0 auto',
        padding: '0 clamp(0.5rem, 2vw, 1rem)',
      }}>

        {/* Linea decorativa top */}
        <div
          className="quote-section-line"
          style={{
            width: '1px',
            height: '64px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,102,255,0.6), transparent)',
            flexShrink: 0,
          }}
        />

        {/* Blockquote */}
        <blockquote
          className="blue-text quote-section-text"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(1.1rem, 3.5vw, 2.3rem)',
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.45,
            letterSpacing: '-0.5px',
            backgroundSize: '200% 100%',
            margin: 0,
            padding: '0 clamp(0.5rem, 2vw, 1rem)',
            wordBreak: 'break-word',
            hyphens: 'auto',
          }}
        >
          &ldquo;Creo siti che respirano,<br />
          scorrono e raccontano storie.&rdquo;
        </blockquote>

        {/* Firma */}
        <div
          className="quote-section-author"
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)',
            color: 'var(--chrome-dark)',
            letterSpacing: '0.2em',
            textAlign: 'center',
          }}
        >
          — Antonio Russo
        </div>

        {/* Linea decorativa bottom */}
        <div
          className="quote-section-line"
          style={{
            width: '1px',
            height: '64px',
            background: 'linear-gradient(to bottom, rgba(0,102,255,0.6), transparent)',
            flexShrink: 0,
          }}
        />

      </div>
    </section>
  )
}