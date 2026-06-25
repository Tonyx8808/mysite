'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ConsentStatus = 'pending' | 'accepted' | 'declined'
const STORAGE_KEY = 'cookie_consent'

export default function CookieBanner() {
  const [status,      setStatus]      = useState<ConsentStatus>('pending')
  const [mounted,     setMounted]     = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null
    if (saved === 'accepted' || saved === 'declined') {
      setStatus(saved)
    } else {
      setTimeout(() => setMounted(true), 900)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setStatus('accepted')
    setMounted(false)
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setStatus('declined')
    setMounted(false)
  }

  if (status !== 'pending') return null

  return (
    <AnimatePresence>
      {mounted && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleDecline}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 9998,
            }}
            aria-hidden="true"
          />

          {/* Banner */}
          <motion.div
            key="banner"
            role="dialog"
            aria-labelledby="cookie-title"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              translateX: '-50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: 'min(92vw, 560px)',
              background: 'rgba(10, 16, 40, 0.75)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 80px rgba(0,102,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Top shine line */}
            <div style={{
              position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              borderRadius: '1px',
            }} />

            {/* Eyebrow */}
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.6rem',
              color: 'var(--blue-bright)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: '0.7rem',
            }}>Privacy & Cookie</span>

            {/* Titolo */}
            <h3
              id="cookie-title"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--white)',
                letterSpacing: '-0.3px',
                marginBottom: '0.6rem',
              }}
            >
              Questo sito usa i cookie 🍪
            </h3>

            {/* Descrizione */}
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              marginBottom: '0.6rem',
            }}>
              Utilizzo cookie tecnici necessari al funzionamento del sito.
              Nessun dato viene venduto o condiviso con terze parti.
            </p>

            {/* Toggle dettagli */}
            <motion.button
              onClick={() => setShowDetails(v => !v)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-space-mono)',
                fontSize: '0.62rem', color: 'rgba(0,163,255,0.7)',
                letterSpacing: '0.1em', padding: 0,
                marginBottom: '1.3rem',
                textDecoration: 'underline',
              }}
              whileHover={{ color: 'rgba(0,163,255,1)' }}
            >
              {showDetails ? 'Nascondi dettagli ↑' : 'Mostra dettagli ↓'}
            </motion.button>

            {/* Dettagli */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden', marginBottom: '1.3rem' }}
                >
                  <div style={{
                    background: 'rgba(0,102,255,0.06)',
                    border: '1px solid rgba(0,102,255,0.12)',
                    borderRadius: '12px',
                    padding: '1rem 1.2rem',
                  }}>
                    {[
                      { name: 'cookie_consent', desc: 'Salva la tua preferenza. Scade in 12 mesi.' },
                      { name: 'Nessun tracker', desc: 'Nessun Google Analytics, Facebook Pixel o profilazione.' },
                    ].map(({ name, desc }) => (
                      <div key={name} style={{ marginBottom: '0.6rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-space-mono)',
                          fontSize: '0.66rem', color: 'var(--blue-bright)',
                        }}>{name}</span>
                        <p style={{
                          fontFamily: 'var(--font-syne)',
                          fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)',
                          lineHeight: 1.5, marginTop: '0.15rem',
                        }}>{desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <motion.button
                onClick={handleAccept}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
                  color: '#fff', border: 'none',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700, fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,102,255,0.3)',
                  whiteSpace: 'nowrap',
                }}
                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,102,255,0.45)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Accetta tutto
              </motion.button>

              <motion.button
                onClick={handleDecline}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 600, fontSize: '0.88rem',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{
                  color: 'rgba(255,255,255,0.8)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.07)',
                  y: -2,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Solo necessari
              </motion.button>
            </div>

            {/* Note */}
            <p style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.58rem',
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.04em',
              marginTop: '1.1rem', lineHeight: 1.6,
            }}>
              Cliccando &quot;Solo necessari&quot; verranno usati solo i cookie tecnici indispensabili.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}