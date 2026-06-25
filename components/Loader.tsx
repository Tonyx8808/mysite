'use client'
import { useEffect, useState } from 'react'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [percent, setPercent] = useState(0)
  const [done, setDone] = useState(false)

  const messages = [
    'Inizializzazione sistemi...',
    'Caricamento moduli visivi...',
    'Ottimizzazione pipeline...',
    'Rendering esperienza...',
    'Pronto all’avvio...',
  ]

  useEffect(() => {
    const duration = 2400
    const start = Date.now()
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const tick = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      const val = ease(t) * 100
      setPercent(Math.round(val))

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        setPercent(100)
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 900)
        }, 350)
      }
    }
    requestAnimationFrame(tick)
  }, [onDone])

  const msgIdx = Math.min(
    Math.floor((percent / 100) * (messages.length - 1)),
    messages.length - 1
  )

  return (
    <div
      id="loader"
      className={done ? 'done' : ''}
      style={{
        pointerEvents: done ? 'none' : 'all',
        backdropFilter: 'blur(12px)',
        background: 'rgba(0,0,0,0.45)',
        transition: 'opacity 0.6s ease',
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      {/* Orbita neon */}
  <div
  style={{
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.8rem',
    width: 'min(480px, 90vw)',
  }}
>

  {/* WRAPPER LOGO + ORBITA */}
  <div
    style={{
      position: 'relative',
      width: '220px',
      height: '220px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {/* Cerchio neon attorno ad AR */}
    <div className="orbit"></div>

    {/* Logo AR */}
    <div
      className="logo-3d"
      style={{
        fontFamily: 'var(--font-syne)',
        fontSize: 'clamp(3.8rem, 9vw, 6rem)',
        fontWeight: 800,
        letterSpacing: '-3px',
        lineHeight: 1,
        display: 'flex',
        gap: '0.2em',
        textShadow: '0 0 22px rgba(0,163,255,0.45)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <span style={{ color: '#E8EDF8' }}>A</span>
      <span
        style={{
          background: 'linear-gradient(90deg, #0066FF, #00A3FF)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(0,163,255,0.6))',
        }}
      >
        R
      </span>
    </div>
  </div>


        {/* Subtitle */}
        <div
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.48em',
            color: 'var(--chrome-dark)',
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          ANTONIO RUSSO
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '3px',
              background: 'rgba(0,102,255,0.15)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                width: percent + '%',
                background:
                  'linear-gradient(90deg, #0066FF, #00A3FF)',
                boxShadow: '0 0 18px rgba(0,163,255,0.7)',
                transition: 'width 0.09s linear',
              }}
            />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.82rem',
              color: 'var(--blue-neon)',
              minWidth: '40px',
              textAlign: 'right',
              textShadow: '0 0 8px rgba(0,163,255,0.6)',
            }}
          >
            {percent}%
          </span>
        </div>

        {/* Message */}
        <div
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            letterSpacing: '0.12em',
            opacity: 0.85,
          }}
        >
          {messages[msgIdx]}
        </div>
      </div>
    </div>
  )
}
