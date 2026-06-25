'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SOCIAL = [
  { label: 'GitHub',    href: 'https://github.com/Tonyx8808' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/antonio-russo88/' },
  { label: 'Instagram', href: 'https://www.instagram.com/toant_08/' },
]

type Status = 'idle' | 'sending' | 'ok' | 'error'

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '20px',
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function ContactSection() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const [errMsg,  setErrMsg]  = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const loadedAt = useRef<number>(Date.now())

  async function handleSubmit() {
    if (status === 'sending') return
    setStatus('sending')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, message,
          website: '',
          _loadedAt: loadedAt.current,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setErrMsg(data.error ?? 'Errore imprevisto.')
        setStatus('error')
        return
      }
      setStatus('ok')
      setName(''); setEmail(''); setMessage('')
    } catch {
      setErrMsg('Errore di rete.')
      setStatus('error')
    }
  }

  const inputWrap = (id: string): React.CSSProperties => ({
    position: 'relative',
    borderRadius: '12px',
    background: focused === id ? 'rgba(0,102,255,0.08)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === id ? 'rgba(0,163,255,0.5)' : 'rgba(255,255,255,0.07)'}`,
    transition: 'all 0.3s',
    boxShadow: focused === id ? '0 0 0 3px rgba(0,102,255,0.12), 0 0 30px rgba(0,102,255,0.08)' : 'none',
  })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.9rem 1.1rem',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--white)',
    fontFamily: 'var(--font-syne)',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-space-mono)',
    fontSize: '0.62rem',
    color: 'var(--blue-bright)',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section
      id="contact"
      className="contact-section"
      style={{ padding: '120px 8%', position: 'relative', overflow: 'hidden' }}
    >
      {/* Glow ambientale */}
      <div style={{
        position: 'absolute', bottom: '-150px', right: '-150px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,163,255,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem',
            color: 'var(--blue-bright)', letterSpacing: '0.25em',
          }}>04</span>
          <h2 className="chrome-text" style={{
            fontFamily: 'var(--font-syne)', fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-1px',
          }}>Iniziamo</h2>
        </motion.div>

        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}>

          {/* ── Left ─────────────────────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <p style={{
              fontSize: '1.1rem', color: 'var(--chrome-dark)',
              lineHeight: 1.85, marginBottom: '2.5rem',
            }}>
              Hai un progetto, un&apos;idea o vuoi semplicemente chiedermi qualcosa?
              Sono sempre felice di ascoltare e costruire qualcosa di bello insieme.
            </p>

            <div style={{
              fontFamily: 'var(--font-space-mono)', fontSize: '0.75rem',
              color: 'var(--blue-bright)', letterSpacing: '0.12em',
              marginBottom: '2.5rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#00FF88', boxShadow: '0 0 8px rgba(0,255,136,0.8)',
                display: 'inline-block', flexShrink: 0,
              }} />
              Rispondo entro 24h lavorative
            </div>

            {/* Email card glass */}
            <motion.a
              href="mailto:antoniorusso1988@outlook.it"
              style={{
                display: 'flex', flexDirection: 'column', gap: '0.4rem',
                padding: '1.6rem',
                ...glass,
                marginBottom: '1.2rem',
                position: 'relative', overflow: 'hidden',
              }}
              whileHover={{ y: -4, boxShadow: '0 16px 50px rgba(0,102,255,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              }} />
              <span style={{
                fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem',
                color: 'var(--chrome-dark)', letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>Scrivimi</span>
              <span style={{
                fontFamily: 'var(--font-syne)', fontSize: '1rem',
                fontWeight: 600, color: 'var(--white)',
              }}>antoniorusso1988@outlook.it</span>
              <span style={{
                position: 'absolute', top: '1.3rem', right: '1.3rem',
                fontSize: '1.2rem', color: 'var(--blue-bright)',
              }}>↗</span>
            </motion.a>

            {/* Social */}
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              {SOCIAL.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem',
                    color: 'var(--chrome-dark)', letterSpacing: '0.08em',
                    padding: '0.5rem 1.1rem',
                    ...glass,
                    borderRadius: '8px',
                  }}
                  whileHover={{ color: 'var(--white)', background: 'rgba(0,102,255,0.12)', y: -2 }}
                  transition={{ duration: 0.2 }}
                >{label}</motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              {status === 'ok' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    ...glass,
                    padding: 'clamp(1.8rem, 3vw, 3.5rem) clamp(1.25rem, 2.5vw, 2rem)',
                    textAlign: 'center',
                    border: '1px solid rgba(0,255,136,0.2)',
                    background: 'rgba(0,255,136,0.03)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: 'rgba(0,255,136,0.1)',
                      border: '1px solid rgba(0,255,136,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', margin: '0 auto 1.2rem',
                    }}
                  >✓</motion.div>
                  <p style={{
                    fontFamily: 'var(--font-syne)', fontSize: '1.1rem',
                    color: 'var(--white)', fontWeight: 700, marginBottom: '0.5rem',
                  }}>Messaggio inviato!</p>
                  <p style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem',
                    color: 'var(--chrome-dark)', letterSpacing: '0.06em',
                  }}>Ti rispondo entro 24h lavorative.</p>
                  <motion.button
                    onClick={() => setStatus('idle')}
                    style={{
                      marginTop: '1.5rem',
                      fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem',
                      color: 'var(--blue-bright)', background: 'none',
                      border: 'none', cursor: 'pointer', letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                    whileHover={{ x: 4 }}
                  >Invia un altro →</motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    ...glass,
                    padding: 'clamp(1.4rem, 3vw, 2.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.3rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                  }} />

                  {/* Honeypot */}
                  <input
                    type="text" name="website" autoComplete="off"
                    tabIndex={-1} aria-hidden="true"
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  />

                  {/* Nome */}
                  <div>
                    <label style={labelStyle}>Nome</label>
                    <div style={inputWrap('name')}>
                      <input
                        type="text" value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Antonio Russo"
                        style={inputStyle} maxLength={100} autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email</label>
                    <div style={inputWrap('email')}>
                      <input
                        type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="tua@email.com"
                        style={inputStyle} maxLength={200} autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Messaggio */}
                  <div>
                    <label style={labelStyle}>Messaggio</label>
                    <div style={inputWrap('message')}>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        placeholder="Raccontami del tuo progetto…"
                        rows={5}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                        maxLength={2000}
                      />
                    </div>
                  </div>

                  {/* Errore */}
                  <AnimatePresence>
                    {status === 'error' && errMsg && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem',
                          color: '#ff6b6b', letterSpacing: '0.05em',
                        }}
                      >{errMsg}</motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    style={{
                      padding: '0.95rem 2rem',
                      background: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
                      color: '#fff', border: 'none',
                      borderRadius: '10px',
                      fontFamily: 'var(--font-syne)', fontWeight: 700,
                      fontSize: '0.9rem', letterSpacing: '0.04em',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      alignSelf: 'flex-start',
                      boxShadow: '0 4px 24px rgba(0,102,255,0.3)',
                      opacity: status === 'sending' ? 0.7 : 1,
                    }}
                    whileHover={status !== 'sending' ? {
                      y: -3,
                      boxShadow: '0 10px 40px rgba(0,102,255,0.45)',
                    } : {}}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    {status === 'sending' ? 'Invio in corso…' : 'Invia messaggio →'}
                  </motion.button>

                  <p style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.18)', letterSpacing: '0.05em', lineHeight: 1.6,
                  }}>
                    I tuoi dati vengono utilizzati esclusivamente per risponderti
                    e non vengono condivisi con terze parti.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}