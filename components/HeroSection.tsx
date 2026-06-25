'use client'

import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 240
const framePath = (i: number) =>
  `/heroimg/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

const DIALOGUES = [
  {
    id: 'd1', show: 0.08, hide: 0.38,
    code: 'AR // WORK',
    quote: 'Il codice è architettura. Ogni riga ha un peso.',
    speaker: 'Antonio Russo — Front-End Designer',
    tag: 'Design System',
  },
  {
    id: 'd2', show: 0.35, hide: 0.65,
    code: 'AR // MOTION',
    quote: "L'interfaccia respira. L'utente sente la differenza.",
    speaker: 'Principio — Framer Motion',
    tag: 'Interaction',
  },
  {
    id: 'd3', show: 0.62, hide: 0.92,
    code: 'AR // STACK',
    quote: 'Next.js. TypeScript. Tailwind. Il minimo per fare il massimo.',
    speaker: 'Stack — 2024 / 2025',
    tag: 'Tech',
  },
]

export default function HeroScroll() {
  const wrapRef     = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLImageElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const bigTextRef  = useRef<HTMLDivElement>(null)
  const barRef      = useRef<HTMLDivElement>(null)
  const pctRef      = useRef<HTMLSpanElement>(null)

  const framesRef    = useRef<string[]>([])
  const loadedSet    = useRef<Set<number>>(new Set())
  const currentFrame = useRef(0)
  const rafRef       = useRef<number | null>(null)

  // Cache wrapper metrics so we don't thrash layout on every scroll tick
  const wrapTopRef    = useRef(0)
  const wrapHeightRef = useRef(0)

  const [loadPct, setLoadPct]           = useState(0)
  const [ready, setReady]               = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

  // ── Cache wrapper metrics (recalculate on resize / orientation change) ─────
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      // Use offsetTop instead of getBoundingClientRect to get the document-relative top
      // This avoids the sticky viewport contaminating the measurement
      let top = 0
      let el: HTMLElement | null = wrap
      while (el) { top += el.offsetTop; el = el.offsetParent as HTMLElement | null }
      wrapTopRef.current    = top
      wrapHeightRef.current = wrap.offsetHeight
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', () => setTimeout(measure, 300))
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', () => setTimeout(measure, 300))
    }
  }, [])

  // ── Preload frames ─────────────────────────────────────────────────────────
  useEffect(() => {
    let done = 0
    framesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => framePath(i + 1))
    framesRef.current.forEach((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = img.onerror = () => {
        loadedSet.current.add(i)
        done++
        setLoadPct(done / FRAME_COUNT)
        if (done === FRAME_COUNT) setReady(true)
      }
    })
  }, [])

  // ── Scroll → frame swap ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null

        // scrollY is always reliable — no layout reads needed here
        const scrollY  = window.scrollY
        const total    = wrapHeightRef.current - window.innerHeight
        const rawProg  = total <= 0 ? 0 : (scrollY - wrapTopRef.current) / total
        const prog     = Math.min(1, Math.max(0, rawProg))

        const idx = Math.min(FRAME_COUNT - 1, Math.floor(prog * FRAME_COUNT))
        if (idx !== currentFrame.current && imgRef.current) {
          currentFrame.current = idx
          imgRef.current.src   = framesRef.current[idx]
        }

        if (heroTextRef.current) {
          const op = Math.max(0, 1 - prog / 0.18)
          heroTextRef.current.style.opacity   = String(op)
          heroTextRef.current.style.transform = `translateY(${(1 - op) * 16}px)`
        }

        if (bigTextRef.current) {
          const op = Math.min(1, Math.max(0, (prog - 0.22) / 0.08))
          bigTextRef.current.style.opacity   = String(op)
          bigTextRef.current.style.transform = `translateY(${(1 - op) * 14}px)`
        }

        if (barRef.current) barRef.current.style.transform = `scaleX(${prog})`
        if (pctRef.current) pctRef.current.textContent = (prog * 100).toFixed(1) + '%'

        const next = new Set<string>()
        DIALOGUES.forEach(d => { if (prog >= d.show && prog <= d.hide) next.add(d.id) })
        setVisibleCards(next)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={wrapRef} id="home" style={{ height: '600vh', position: 'relative' }}>
      <style>{`
        /* ── Desktop dialogue cards ── */
        .hero-card-desktop { display: none; }
        @media (min-width: 768px) {
          .hero-card-desktop { display: block !important; }
        }

        /* ── HUD labels: nascondi su mobile stretto ── */
        .hero-hud-label { display: flex; }
        @media (max-width: 480px) {
          .hero-hud-label { display: none; }
        }

        /* ── Hero title ── */
        .hero-title {
          font-size: clamp(2.8rem, 14vw, 7rem);
          letter-spacing: -1px;
        }

        /* ── Big text ── */
        .hero-big-text-wrap {
          max-width: 90%;
          left: 1.5rem;
          bottom: 6rem;
        }
        .hero-big-title {
          font-size: clamp(1.8rem, 7vw, 4.5rem);
        }

        /* ── Progress bottom ── */
        .hero-progress-wrap { margin: 0 2.5rem; }
        @media (max-width: 480px) {
          .hero-progress-wrap { margin: 0 1.2rem; }
          .hero-bottom-text { font-size: 0.5rem !important; }
        }

        /* ── Hero bottom copy area ── */
        .hero-bottom-area { padding: 0 2.5rem 4.5rem; }
        @media (max-width: 480px) {
          .hero-bottom-area { padding: 0 1.2rem 3.5rem; }
        }

        /* ── Frame image: portrait-aware on mobile ── */
        .hero-frame-img {
          object-fit: cover;
          object-position: center center;
        }
        /* On narrow portrait viewports keep the subject visible */
        @media (max-width: 640px) and (orientation: portrait) {
          .hero-frame-img {
            object-position: 60% center;
          }
        }

        /* ── Mobile progress mini-cards (replace desktop dialogue cards) ── */
        .hero-mobile-tag {
          display: none;
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          flex-direction: column;
          gap: 0.5rem;
          max-width: calc(100vw - 2.4rem);
        }
        @media (max-width: 767px) {
          .hero-mobile-tag { display: flex; }
        }
        .hero-mobile-tag-inner {
          background: linear-gradient(135deg, rgba(5,8,16,0.95), rgba(0,20,50,0.92));
          border: 1px solid rgba(0,102,255,0.35);
          padding: 0.75rem 1rem;
          transition: opacity 400ms ease, transform 400ms ease;
        }
      `}</style>

      {/* STICKY VIEWPORT */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        overflow: 'hidden', background: '#050810',
      }}>

        {/* Frame image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={framePath(1)}
          alt="" aria-hidden
          className="hero-frame-img"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            display: 'block', pointerEvents: 'none', userSelect: 'none',
          }}
        />

        {/* Vignette */}
        <div style={{
          pointerEvents: 'none', position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.3) 25%, transparent 55%)',
        }} />

        {/* Fog laterali */}
        <div style={{
          pointerEvents: 'none', position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,8,16,0.7) 0%, transparent 20%, transparent 80%, rgba(5,8,16,0.7) 100%)',
        }} />

        {/* HUD corners */}
        <HudCorner pos="tl" />
        <HudCorner pos="tr" />
        <HudCorner pos="bl" />
        <HudCorner pos="br" />

        {/* Top left label */}
        <div className="hero-hud-label" style={{
          pointerEvents: 'none',
          position: 'absolute', left: '2.5rem', top: '5.5rem', zIndex: 10,
          alignItems: 'center', gap: '0.6rem',
        }}>
          <div style={{ height: '1px', width: '2rem', background: 'rgba(0,102,255,0.6)' }} />
          <span style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem',
            letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--muted)',
          }}>Portfolio — Front-End Designer</span>
        </div>

        {/* Top right readout */}
        <div className="hero-hud-label" style={{
          pointerEvents: 'none',
          position: 'absolute', right: '2.5rem', top: '5.5rem', zIndex: 10,
          alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--muted)' }}>Output</span>
          <span ref={pctRef} style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00A3FF' }}>0.0%</span>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#0066FF', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,102,255,0.9)' }} />
        </div>

        {/* Hero text — fades on scroll */}
        <div ref={heroTextRef} className="hero-bottom-area" style={{
          position: 'absolute', insetInline: 0, bottom: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.2rem',
          transition: 'opacity 60ms linear, transform 60ms linear',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
            fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem',
            color: 'var(--chrome)',
            border: '1px solid rgba(0,102,255,0.35)', padding: '0.35rem 1rem',
            borderRadius: '50px', background: 'rgba(0,102,255,0.06)', letterSpacing: '0.06em',
          }}>
            <span style={{
              width: '6px', height: '6px', background: '#00FF88', borderRadius: '50%',
              boxShadow: '0 0 8px rgba(0,255,136,0.8)', display: 'inline-block',
            }} />
            Disponibile per nuovi progetti
          </div>

          <h1 className="hero-title" style={{
            fontFamily: 'var(--font-syne)', fontWeight: 800,
            lineHeight: 0.92,
            color: 'var(--white)',
            textShadow: '0 2px 32px rgba(0,0,0,0.95)', margin: 0,
          }}>
            ANTONIO<br />
            <span style={{
              background: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 60%, #00FF88 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>RUSSO</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-space-mono)', fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
            textTransform: 'uppercase', letterSpacing: '0.18em', lineHeight: 1.75,
            color: 'var(--chrome-dark)', maxWidth: '42ch',
          }}>
            Front-End Designer & Developer.<br />Scroll per entrare nel lavoro.
          </p>
        </div>

        {/* Big text — appare a metà scroll */}
        <div ref={bigTextRef} className="hero-big-text-wrap" style={{
          pointerEvents: 'none',
          position: 'absolute', bottom: '5rem', zIndex: 10,
          display: 'flex', flexDirection: 'column', gap: '1rem',
          opacity: 0,
          transition: 'opacity 60ms linear, transform 60ms linear',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem',
            textTransform: 'uppercase', letterSpacing: '0.3em', color: '#0066FF',
          }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#0066FF', boxShadow: '0 0 8px rgba(0,102,255,0.9)' }} />
            Experience — Active
          </span>
          <h2 className="hero-big-title" style={{
            fontFamily: 'var(--font-syne)', fontWeight: 800,
            textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-1.5px',
            color: 'var(--white)', textShadow: '0 2px 32px rgba(0,0,0,0.95)', margin: 0,
          }}>
            Il Design<br />che{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0066FF, #00A3FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Respira</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem',
            textTransform: 'uppercase', letterSpacing: '0.22em',
            color: 'var(--muted)', maxWidth: '34ch',
          }}>
            Next.js · TypeScript · Tailwind · Framer Motion
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ pointerEvents: 'none', position: 'absolute', insetInline: 0, bottom: 0, zIndex: 10 }}>
          <div className="hero-progress-wrap" style={{ marginBottom: '0.75rem', height: '1px', background: 'rgba(255,255,255,0.06)' }}>
            <div ref={barRef} style={{
              height: '100%', transformOrigin: 'left', transform: 'scaleX(0)',
              transition: 'transform 60ms linear',
              background: 'linear-gradient(90deg, #0066FF, #00A3FF)',
              boxShadow: '0 0 8px 1px rgba(0,102,255,0.6)',
            }} />
          </div>
          <div className="hero-progress-wrap hero-bottom-text" style={{
            paddingBottom: '1rem',
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem',
            textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)',
          }}>
            <span>SEQ 001 / AR</span>
            <span>RUSSO // PORTFOLIO</span>
            <span>Scroll {'\u2193'}</span>
          </div>
        </div>

        {/* Dialogue cards — desktop only */}
        {DIALOGUES.map((d, i) => {
          const vis = visibleCards.has(d.id)
          const pos: React.CSSProperties =
            i === 0 ? { top: '22%', right: '2.5rem' } :
            i === 1 ? { top: '50%', right: '2.5rem' } :
                      { bottom: '6rem', right: '2.5rem' }
          return (
            <div
              key={d.id}
              className="hero-card-desktop"
              style={{
                position: 'absolute', ...pos, zIndex: 20,
                width: '400px', maxWidth: '42vw',
                transition: 'opacity 500ms ease, transform 500ms ease',
                opacity: vis ? 1 : 0,
                transform: i === 1
                  ? (vis ? 'translateY(-50%)' : 'translateY(calc(-50% + 20px))')
                  : (vis ? 'translateY(0)' : 'translateY(20px)'),
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, rgba(5,8,16,0.97), rgba(0,20,50,0.94))',
                border: '1px solid rgba(0,102,255,0.35)',
                boxShadow: '0 0 32px -8px rgba(0,102,255,0.35), 0 8px 40px rgba(0,0,0,0.7)',
                padding: '1.25rem 1.5rem',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  borderBottom: '1px solid rgba(0,102,255,0.2)',
                  paddingBottom: '0.75rem', marginBottom: '0.75rem',
                }}>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.28em', color: '#0066FF' }}>{d.code}</span>
                  <span style={{ marginLeft: 'auto', width: '6px', height: '6px', background: '#0066FF', boxShadow: '0 0 6px rgba(0,102,255,0.9)', display: 'inline-block' }} />
                </div>
                <blockquote style={{
                  margin: 0, fontFamily: 'var(--font-syne)', fontSize: '1rem',
                  fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.3,
                  color: 'var(--white)', textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                }}>&ldquo;{d.quote}&rdquo;</blockquote>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--chrome)' }}>{d.speaker}</span>
                  <span style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.58rem',
                    textTransform: 'uppercase', letterSpacing: '0.22em', color: '#00A3FF',
                    background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)',
                    padding: '2px 8px',
                  }}>{d.tag}</span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Mobile dialogue tags — centro schermo, versione compatta */}
        {DIALOGUES.map((d) => {
          const vis = visibleCards.has(d.id)
          return (
            <div key={`mob-${d.id}`} className="hero-mobile-tag" aria-hidden>
              <div
                className="hero-mobile-tag-inner"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'translateY(0)' : 'translateY(12px)',
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: '0.4rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.55rem',
                    textTransform: 'uppercase', letterSpacing: '0.28em', color: '#0066FF',
                  }}>{d.code}</span>
                  <span style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.52rem',
                    textTransform: 'uppercase', letterSpacing: '0.18em', color: '#00A3FF',
                    background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)',
                    padding: '1px 6px',
                  }}>{d.tag}</span>
                </div>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-syne)', fontSize: 'clamp(0.8rem, 3.5vw, 1rem)',
                  fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.25,
                  color: 'var(--white)',
                }}>{d.quote}</p>
              </div>
            </div>
          )
        })}

        {/* Loading overlay */}
        {!ready && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 50,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', background: '#050810',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
              fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem',
              color: 'var(--chrome)', border: '1px solid rgba(0,102,255,0.35)',
              padding: '0.35rem 1rem', borderRadius: '50px',
              background: 'rgba(0,102,255,0.06)', letterSpacing: '0.06em',
            }}>
              <span style={{ width: '6px', height: '6px', background: '#0066FF', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,102,255,0.9)', display: 'inline-block' }} />
              AR // PORTFOLIO INIT
            </div>
            <div style={{ width: '18rem', maxWidth: '80vw', height: '1px', background: 'rgba(255,255,255,0.06)' }}>
              <div style={{
                height: '100%', width: `${Math.round(loadPct * 100)}%`,
                transition: 'width 120ms ease-out',
                background: 'linear-gradient(90deg, #0066FF, #00A3FF)',
                boxShadow: '0 0 8px rgba(0,102,255,0.7)',
              }} />
            </div>
            <p style={{
              fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem',
              textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--muted)',
            }}>
              Loading Experience · {Math.round(loadPct * 100)}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function HudCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const s = 28
  const posStyle: React.CSSProperties = {
    pointerEvents: 'none', position: 'absolute', zIndex: 10,
    color: 'rgba(0,102,255,0.55)',
    ...(pos === 'tl' ? { left: '1.5rem', top: '5rem' }       : {}),
    ...(pos === 'tr' ? { right: '1.5rem', top: '5rem' }      : {}),
    ...(pos === 'bl' ? { left: '1.5rem', bottom: '3.5rem' }  : {}),
    ...(pos === 'br' ? { right: '1.5rem', bottom: '3.5rem' } : {}),
  }
  const paths: Record<string, string> = {
    tl: `M${s},0 L0,0 L0,${s}`,
    tr: `M0,0 L${s},0 L${s},${s}`,
    bl: `M0,0 L0,${s} L${s},${s}`,
    br: `M0,${s} L${s},${s} L${s},0`,
  }
  return (
    <div style={posStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
        <path d={paths[pos]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    </div>
  )
}