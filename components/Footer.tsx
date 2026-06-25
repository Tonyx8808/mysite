import Image from 'next/image'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Servizi' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contatti' },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/antonio-russo88/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Tonyx8808',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="footer-section" style={{
      background: 'var(--navy-light)',
      borderTop: '1px solid rgba(0,102,255,0.12)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle glow top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.5), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-60px', left: '50%',
        transform: 'translateX(-50%)',
        width: '400px', height: '120px',
        background: 'rgba(0,102,255,0.06)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Main row */}
      <div className="footer-grid" style={{
        padding: '3rem clamp(1rem, 4vw, 8%) 2.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'start',
        gap: '3rem',
      }}>

        {/* Left: logo + copyright */}
        <div>
          <Image
            src="/logo.png"
            alt="Antonio Russo"
            width={110}
            height={36}
            style={{ objectFit: 'contain', height: '34px', width: 'auto', marginBottom: '0.9rem' }}
          />
          <p style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.68rem',
            color: 'var(--muted)',
            letterSpacing: '0.05em',
            lineHeight: 1.7,
          }}>
            Antonio Russo © 2025<br />
            Front-End Designer & Developer
          </p>
          {/* Social */}
          <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.4rem' }}>
            {SOCIAL.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px',
                  border: '1px solid rgba(0,102,255,0.2)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--chrome-dark)',
                  transition: 'all 0.3s',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--blue-neon)'
                  e.currentTarget.style.borderColor = 'rgba(0,102,255,0.55)'
                  e.currentTarget.style.background = 'rgba(0,102,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,102,255,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--chrome-dark)'
                  e.currentTarget.style.borderColor = 'rgba(0,102,255,0.2)'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center: motto */}
        <div style={{ textAlign: 'center', paddingTop: '0.3rem' }}>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '-0.3px',
            lineHeight: 1.6,
            maxWidth: '280px',
            margin: '0 auto 1.2rem',
          }}
            className="chrome-text"
          >
            Creo siti che respirano,<br />scorrono e raccontano storie.
          </p>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--blue-bright)',
              border: '1px solid rgba(0,102,255,0.25)',
              padding: '0.5rem 1.4rem',
              borderRadius: '50px',
              transition: 'all 0.3s',
              display: 'inline-block',
              background: 'rgba(0,102,255,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,102,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(0,102,255,0.5)'
              e.currentTarget.style.color = 'var(--white)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,102,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(0,102,255,0.25)'
              e.currentTarget.style.color = 'var(--blue-bright)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Iniziamo →
          </a>
        </div>

        {/* Right: nav + contact */}
        <div className="footer-right" style={{ textAlign: 'right' }}>
          <nav style={{ marginBottom: '1.8rem' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', alignItems: 'flex-end' }}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleScroll(e, href)}
                    style={{
                      fontFamily: 'var(--font-space-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--muted)',
                      transition: 'color 0.25s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--blue-bright)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{ borderTop: '1px solid rgba(0,102,255,0.1)', paddingTop: '1.2rem' }}>
            <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>
              +39 324 590 7033
            </p>
            <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--chrome-dark)', marginTop: '0.3rem' }}>
              antoniorusso1988@outlook.it
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(0,102,255,0.08)',
        padding: '1rem clamp(1rem, 4vw, 8%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: '0.6rem',
          color: 'var(--muted)',
          letterSpacing: '0.08em',
        }}>
          DESIGNED & BUILT BY ANTONIO RUSSO
        </span>
        <span style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: '0.6rem',
          color: 'var(--muted)',
          letterSpacing: '0.08em',
        }}>
          NAPOLI, ITALIA — 2025
        </span>
      </div>
    </footer>
  )
}