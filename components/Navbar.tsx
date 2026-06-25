'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Servizi' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contatti' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('#home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2600)
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      clearTimeout(timer)
    }
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setActive(href)
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-family: var(--font-space-mono);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(180, 200, 255, 0.55);
          text-decoration: none;
          transition: color 0.25s ease;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #0066FF, #00A3FF);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover,
        .nav-link.active {
          color: #ffffff;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: rgba(130, 180, 255, 0.9);
        }

        .nav-cta {
          position: relative;
          font-family: var(--font-space-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: #ffffff;
          background: linear-gradient(135deg, #0055DD 0%, #0099EE 100%);
          border: 1px solid rgba(0, 150, 255, 0.4);
          padding: 0.45rem 1.3rem;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
          box-shadow: 0 0 16px rgba(0, 100, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.1);
          white-space: nowrap;
        }
        .nav-cta:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 6px 32px rgba(0, 102, 255, 0.55), inset 0 1px 0 rgba(255,255,255,0.15);
          border-color: rgba(0, 180, 255, 0.7);
        }
        .nav-cta:active {
          transform: translateY(0) scale(0.98);
        }

        .navbar-inner {
          transition:
            padding 0.4s cubic-bezier(0.16,1,0.3,1),
            height 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .navbar-inner.scrolled {
          padding-top: 0.55rem;
          padding-bottom: 0.55rem;
        }
        .navbar-inner.expanded {
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        .logo-wrap {
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .logo-wrap:hover {
          opacity: 0.85;
        }
        .nav-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 0.24rem;
          flex-direction: column;
          width: 2.35rem;
          height: 2.35rem;
          border: 1px solid rgba(0, 150, 255, 0.3);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          padding: 0;
        }
        .nav-menu-toggle span {
          width: 1rem;
          height: 1px;
          background: var(--white);
          display: block;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .nav-menu-toggle[aria-expanded='true'] span:nth-child(1) {
          transform: translateY(4px) rotate(45deg);
        }
        .nav-menu-toggle[aria-expanded='true'] span:nth-child(2) {
          opacity: 0;
        }
        .nav-menu-toggle[aria-expanded='true'] span:nth-child(3) {
          transform: translateY(-4px) rotate(-45deg);
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        @media (max-width: 900px) {
          .nav-links {
            display: none;
            position: absolute;
            top: calc(100% + 0.7rem);
            right: 5%;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.9rem;
            padding: 1rem 1.1rem;
            border-radius: 1rem;
            border: 1px solid rgba(0, 102, 255, 0.18);
            background: rgba(5, 7, 18, 0.97);
            box-shadow: 0 18px 40px rgba(0,0,0,0.35);
            min-width: min(220px, 78vw);
          }
          .nav-links.open {
            display: flex;
          }
          .nav-menu-toggle {
            display: inline-flex;
          }
          .nav-cta--desktop {
            display: none;
          }
        }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: scrolled
            ? 'rgba(5, 7, 18, 0.97)'
            : 'rgba(6, 9, 20, 0.72)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(0, 102, 255, 0.2)' : 'rgba(0, 102, 255, 0.08)'}`,
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), background 0.4s, border-color 0.4s, box-shadow 0.4s',
          boxShadow: scrolled ? '0 4px 48px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        <div
          className={`navbar-inner ${scrolled ? 'scrolled' : 'expanded'}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '0.55rem 5%' : '1rem 5%',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScroll(e, '#home')}
            className="logo-wrap"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <Image
              src="/logo.png"
              alt="Antonio Russo"
              width={120}
              height={40}
              style={{
                objectFit: 'contain',
                height: scrolled ? '28px' : '38px',
                width: 'auto',
                transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
              priority
            />
          </a>

          <button
            type="button"
            className="nav-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label="Apri menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Nav Links */}
          <ul className={`nav-links${mobileMenuOpen ? ' open' : ''}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`nav-link${active === link.href ? ' active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="nav-cta nav-cta--desktop"
          >
            Contattami →
          </a>
        </div>
      </nav>
    </>
  )
}