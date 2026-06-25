'use client'
import { useState } from 'react'

const SERVICES = [
  {
    num: '01', title: 'Siti Web Moderni', glyph: '⬡',
    tags: ['HTML/CSS', 'JavaScript', 'React'],
    body: 'Niente template, niente scorciatoie. Ogni sito nasce da zero — veloce, riconoscibile, vivo. Il tipo che la gente ricorda dopo averlo chiuso.',
  },
  {
    num: '02', title: 'UI/UX Design', glyph: '◐',
    tags: ['Figma', 'User Flow', 'Design System'],
    body: "Interfacce chiare, gerarchie visive precise, dettagli che l'utente sente senza vederli. Design che funziona prima ancora di stupire.",
  },
  {
    num: '03', title: 'Landing Page Animate', glyph: '◈',
    tags: ['GSAP', 'Storytelling', 'Conversion'],
    body: 'Ogni sezione ha un ritmo, ogni animazione ha uno scopo. Non landing page — esperienze che convertono.',
  },
  {
    num: '04', title: 'Motion Design', glyph: '⬢',
    tags: ['Framer Motion', 'Micro-UX', '3D'],
    body: 'Il movimento dice cose che le parole non riescono. Lo uso per guidare lo sguardo, dare peso alle azioni, far sentire il sito vivo.',
  },
  {
    num: '05', title: 'Restyling', glyph: '✦',
    tags: ['Audit UX', 'Refactoring', 'SEO'],
    body: 'Smonto tutto, tengo quello che vale, ricostruisco con identità coerente. Stesso sito, nuova vita.',
  },
  {
    num: '06', title: 'Architetture Pulite', glyph: '◯',
    tags: ['Clean Code', 'Scalabilità', 'Git'],
    body: 'Componenti leggibili, logica chiara, strutture che crescono con te. Il lavoro migliore è quello che dura.',
  },
]

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (hovered !== idx) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18
    setTilt({ x, y })
  }

  return (
    <section id="services" className="services-section" style={{
      background: 'var(--navy)',
      padding: '120px clamp(1rem, 4vw, 8%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="bg-grid" />

      {/* Big decorative background number */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-syne)',
        fontSize: 'clamp(200px, 30vw, 380px)',
        fontWeight: 800,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(0,102,255,0.05)',
        letterSpacing: '-20px',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        lineHeight: 1,
      }}>
        WORK
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="reveal-up services-header" style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '5rem',
          flexWrap: 'wrap', gap: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem',
              color: 'var(--blue-bright)', letterSpacing: '0.25em',
            }}>02</span>
            <h2 className="chrome-text" style={{
              fontFamily: 'var(--font-syne)', fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-1px',
            }}>Cosa Faccio</h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem',
            color: 'var(--muted)', letterSpacing: '0.05em',
            maxWidth: '320px', textAlign: 'right', lineHeight: 1.7,
          }}>
            Non vendo servizi.<br />Risolvo problemi reali.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '1.5px',
          background: 'rgba(0,102,255,0.1)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          {SERVICES.map((svc, i) => {
            const isHovered = hovered === i
            return (
              <div
                key={i}
                className="reveal-up service-card-wrap"
                style={{ transitionDelay: `${i * 0.07}s` }}
                onMouseEnter={() => { setHovered(i); setTilt({ x: 0, y: 0 }) }}
                onMouseLeave={() => { setHovered(null); setTilt({ x: 0, y: 0 }) }}
                onMouseMove={(e) => handleMouseMove(e, i)}
              >
                <div style={{
                  position: 'relative',
                  background: isHovered ? 'var(--navy-light)' : 'var(--navy-card)',
                  padding: '3rem 2.5rem',
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'background 0.4s ease',
                  transform: isHovered
                    ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(8px)`
                    : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                  transitionProperty: isHovered ? 'background, box-shadow' : 'background, transform, box-shadow',
                  transitionDuration: isHovered ? '0.15s, 0.4s' : '0.5s, 0.5s',
                  boxShadow: isHovered
                    ? 'inset 0 0 0 1px rgba(0,102,255,0.4), 0 0 60px rgba(0,102,255,0.12)'
                    : 'inset 0 0 0 1px transparent',
                  cursor: 'default',
                }}>

                  {/* Big ghost number */}
                  <div style={{
                    position: 'absolute',
                    top: '-0.5rem', right: '1.5rem',
                    fontFamily: 'var(--font-syne)',
                    fontSize: '6rem',
                    fontWeight: 800,
                    color: 'transparent',
                    WebkitTextStroke: isHovered ? '1px rgba(0,102,255,0.2)' : '1px rgba(255,255,255,0.04)',
                    lineHeight: 1,
                    transition: 'all 0.5s ease',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}>{svc.num}</div>

                  {/* Blue glow on hover */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-40px', right: '-40px',
                    width: '160px', height: '160px',
                    borderRadius: '50%',
                    background: 'rgba(0,102,255,0.15)',
                    filter: 'blur(50px)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    pointerEvents: 'none',
                  }} />

                  {/* Glyph */}
                  <div style={{
                    fontSize: '2rem',
                    color: isHovered ? 'var(--blue-neon)' : 'var(--blue-bright)',
                    marginBottom: '1.5rem',
                    transform: isHovered ? 'scale(1.2) rotate(15deg)' : 'scale(1) rotate(0deg)',
                    transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                    display: 'inline-block',
                    filter: isHovered ? 'drop-shadow(0 0 12px rgba(0,163,255,0.7))' : 'none',
                    lineHeight: 1,
                  }}>{svc.glyph}</div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
                    fontWeight: 700,
                    color: isHovered ? 'var(--white)' : 'var(--chrome)',
                    letterSpacing: '-0.4px',
                    marginBottom: '1rem',
                    transition: 'color 0.3s',
                    lineHeight: 1.25,
                  }}>{svc.title}</h3>

                  {/* Body text */}
                  <p style={{
                    fontSize: '0.85rem',
                    color: isHovered ? 'var(--chrome-dark)' : 'var(--muted)',
                    lineHeight: 1.75,
                    marginBottom: '1.8rem',
                    transition: 'color 0.4s',
                  }}>{svc.body}</p>

                  {/* Tags */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
                    marginTop: 'auto',
                    opacity: isHovered ? 1 : 0.4,
                    transition: 'opacity 0.4s',
                  }}>
                    {svc.tags.map((t) => (
                      <span key={t} style={{
                        fontFamily: 'var(--font-space-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.08em',
                        color: isHovered ? 'var(--blue-bright)' : 'var(--chrome-dark)',
                        border: `1px solid ${isHovered ? 'rgba(0,102,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        padding: '0.22rem 0.7rem',
                        borderRadius: '50px',
                        background: isHovered ? 'rgba(0,102,255,0.08)' : 'transparent',
                        transition: 'all 0.3s',
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Bottom arrow on hover */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1.8rem', right: '2rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    color: 'var(--blue-bright)',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translate(0, 0)' : 'translate(-8px, 8px)',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}>↗</div>

                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="reveal-up" style={{
          display: 'flex', justifyContent: 'center', marginTop: '4rem',
        }}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              color: 'var(--blue-bright)',
              border: '1px solid rgba(0,102,255,0.3)',
              padding: '0.9rem 2.4rem',
              borderRadius: '50px',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              background: 'rgba(0,102,255,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,102,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(0,102,255,0.6)'
              e.currentTarget.style.color = 'var(--white)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,102,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,102,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(0,102,255,0.3)'
              e.currentTarget.style.color = 'var(--blue-bright)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span>Parliamo del tuo progetto</span>
            <span style={{ fontSize: '1rem' }}>→</span>
          </a>
        </div>

      </div>
    </section>
  )
}