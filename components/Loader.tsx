'use client'
import { useEffect, useState } from 'react'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [percent, setPercent] = useState(0)
  const [done, setDone] = useState(false)

  const messages = [
    'Caricamento font...',
    'Preparazione animazioni...',
    'Ottimizzazione 3D...',
    'Quasi pronto...',
    'Avvio esperienza...',
  ]

  useEffect(() => {
    const duration = 2300
    const start = Date.now()
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const tick = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      const val = easeInOut(t) * 100
      setPercent(Math.round(val))

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        setPercent(100)
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 850)
        }, 300)
      }
    }
    requestAnimationFrame(tick)
  }, [onDone])

  const msgIdx = Math.min(Math.floor((percent / 100) * (messages.length - 1)), messages.length - 1)

  return (
    <div
      id="loader"
      className={done ? 'done' : ''}
      style={{ pointerEvents: done ? 'none' : 'all' }}
    >
      <div className="loader-grid" />
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
        width: 'min(480px, 90vw)',
      }}>
        {/* Big AR */}
        <div style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(3.5rem, 9vw, 5.5rem)',
          fontWeight: 800,
          letterSpacing: '-3px',
          lineHeight: 1,
        }}>
          <span style={{ color: '#E8EDF8' }}>A</span>
          <span className="blue-text">R</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.45em',
          color: 'var(--chrome-dark)',
          textTransform: 'uppercase',
        }}>
          ANTONIO RUSSO
        </div>

        {/* Bar */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            flex: 1, height: '2px',
            background: 'rgba(0,102,255,0.12)',
            borderRadius: '1px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: percent + '%',
              background: 'linear-gradient(90deg, #0066FF, #00A3FF)',
              borderRadius: '1px',
              transition: 'width 0.08s linear',
              boxShadow: '0 0 12px rgba(0,163,255,0.6)',
            }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.78rem',
            color: 'var(--blue-neon)',
            minWidth: '38px',
            textAlign: 'right',
          }}>
            {percent}%
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: '0.72rem',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
        }}>
          {messages[msgIdx]}
        </div>
      </div>
    </div>
  )
}
