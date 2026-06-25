export default function QuoteSection() {
  return (
    <section style={{
      background: 'var(--navy)',
      padding: '80px 8%',
      borderTop: '1px solid rgba(0,102,255,0.12)',
      borderBottom: '1px solid rgba(0,102,255,0.12)',
    }}>
      <div className="reveal-3d" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem',
        maxWidth: '820px', margin: '0 auto',
      }}>
        <div style={{
          width: '1px', height: '64px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,102,255,0.6), transparent)',
        }} />
        <blockquote className="blue-text" style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(1.4rem, 3vw, 2.3rem)',
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1.4,
          letterSpacing: '-0.5px',
          backgroundSize: '200% 100%',
        }}>
          &ldquo;Creo siti che respirano,<br />scorrono e raccontano storie.&rdquo;
        </blockquote>
        <div style={{
          fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem',
          color: 'var(--chrome-dark)', letterSpacing: '0.2em',
        }}>— Antonio Russo</div>
        <div style={{
          width: '1px', height: '64px',
          background: 'linear-gradient(to bottom, rgba(0,102,255,0.6), transparent)',
        }} />
      </div>
    </section>
  )
}
