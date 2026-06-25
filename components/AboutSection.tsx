import Image from 'next/image'

const TAGS = ['Modularità creativa', 'Precisione visiva', 'Esperienza fluida', 'Sicurezza informatica']

export default function AboutSection() {
  return (
    <section id="about" style={{ background: 'var(--navy-light)', padding: '120px 8%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: minmax(260px, 320px) 1fr;
          gap: 6rem;
          align-items: center;
        }
        .about-portrait {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-portrait {
            order: -1;
          }
        }
        @media (max-width: 640px) {
          #about {
            padding: 80px 5% !important;
          }
          .about-portrait-size {
            width: 200px !important;
            height: 200px !important;
          }
          .about-portrait-inner {
            width: 200px !important;
            height: 200px !important;
          }
          .about-manifesto {
            padding: 1.2rem 1.4rem !important;
          }
        }
      `}</style>

      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: '20%', left: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(0,102,255,0.06)', filter: 'blur(120px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="reveal-up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem', color: 'var(--blue-bright)', letterSpacing: '0.25em' }}>01</span>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-1px' }}
            className="chrome-text">Chi Sono</h2>
        </div>

        {/* Grid */}
        <div className="about-grid">

          {/* Portrait */}
          <div className="about-portrait reveal-3d">
            <div className="about-portrait-size" style={{ position: 'relative', width: '280px', height: '280px' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="ring-pulse" style={{
                  position: 'absolute',
                  inset: `${-8 - i * 10}px`,
                  borderRadius: '50%',
                  border: `1px solid rgba(0,102,255,${0.4 - i * 0.1})`,
                  animationDelay: `${i * -1.5}s`,
                }} />
              ))}
              <div className="about-portrait-inner" style={{ position: 'relative', width: '280px', height: '280px' }}>
                <div className="luminous-ring" />
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50%', overflow: 'hidden',
                  border: '2px solid rgba(0,102,255,0.4)',
                  boxShadow: '0 0 50px rgba(0,102,255,0.3), 0 0 100px rgba(0,102,255,0.1)',
                  position: 'relative', zIndex: 2,
                }}>
                  <Image
                    src="/logo2.png"
                    alt="Antonio Russo"
                    width={280}
                    height={280}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
              </div>
              {/* Tag */}
              <div style={{
                position: 'absolute', bottom: '-20px', left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem',
                color: 'var(--blue-neon)',
                background: 'var(--navy-card)',
                border: '1px solid rgba(0,102,255,0.4)',
                padding: '0.32rem 1.1rem',
                borderRadius: '50px',
                whiteSpace: 'nowrap', zIndex: 2,
                letterSpacing: '0.1em',
                boxShadow: '0 0 14px rgba(0,102,255,0.2)',
              }}>
                Front-End Designer
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-up">
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.85rem)',
              fontWeight: 600,
              color: 'var(--white)',
              marginBottom: '1.4rem',
              lineHeight: 1.4,
              letterSpacing: '-0.5px',
            }}>
              Sono Antonio Russo — trasformo idee in esperienze digitali vive.
            </p>
            <p style={{
              fontSize: '1rem', color: 'var(--chrome-dark)',
              lineHeight: 1.85, marginBottom: '2rem',
            }}>
              Mi muovo tra design, sviluppo e animazione con un approccio artigianale: ogni progetto è un piccolo ecosistema che deve respirare, fluire e avere un ritmo suo. Lavoro con JavaScript, React, HTML, CSS e Tailwind, unendo estetica e funzionalità.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
              {TAGS.map((t) => (
                <span key={t} style={{
                  fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem',
                  color: 'var(--blue-bright)',
                  border: '1px solid rgba(0,102,255,0.3)',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  letterSpacing: '0.05em',
                  background: 'rgba(0,102,255,0.05)',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,102,255,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)'
                    e.currentTarget.style.color = 'var(--white)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,102,255,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(0,102,255,0.3)'
                    e.currentTarget.style.color = 'var(--blue-bright)'
                  }}
                >{t}</span>
              ))}
            </div>

            {/* Manifesto */}
            <div className="about-manifesto" style={{
              marginTop: '2.5rem',
              padding: '1.5rem 2rem',
              borderLeft: '2px solid rgba(0,102,255,0.5)',
              background: 'rgba(0,102,255,0.04)',
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
            }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--chrome-dark)', lineHeight: 1.8 }}>
                Non mi limito a <em style={{ fontStyle: 'italic', color: 'var(--chrome)' }}>costruire siti</em> — creo{' '}
                <strong style={{ fontWeight: 600, color: 'var(--white)' }}>sistemi che parlano</strong>.
                Ogni progetto parte da una domanda: <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>cosa deve far sentire l&apos;utente?</em>{' '}
                Da lì costruisco tutto il resto: struttura, ritmo, movimento, emozione.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}