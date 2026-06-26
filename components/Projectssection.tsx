'use client'

import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    id: 'crm',
    index: '01',
    codename: 'AR // CRM',
    title: 'Tech Hause CRM',
    subtitle: 'Enterprise CRM System',
    description:
      'Piattaforma CRM enterprise per team IT con oltre 100 dipendenti. Gestione completa del ciclo cliente: lead, pipeline commerciale, progetti IT, ticketing e analytics avanzate — tutto in un unico sistema.',
    highlights: [
      'Pipeline commerciale con 7 fasi deal e multi-valuta',
      'AI Assistant Groq / Llama-3.3 con function calling sui dati CRM',
      'Backend Rust ad alte prestazioni con query parallele',
      'Auth completa: Google OAuth, Microsoft Entra ID, 2FA TOTP',
      'Report Recharts: vendite, team, progetti, ticketing',
      'RBAC con 8 ruoli, middleware JWT, internazionalizzazione IT/EN',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Rust / Axum', 'PostgreSQL', 'Prisma', 'NextAuth v5', 'Recharts', 'TanStack Query', 'Docker', 'Groq AI'],
    screenshots: [
      '/projects/crm/screenshot-1.jpg',
      '/projects/crm/screenshot-2.jpg',
      '/projects/crm/screenshot-3.jpg',
    ],
    accent: '#0066FF',
    accentAlt: '#00A3FF',
    accentRgb: '0,102,255',
    tag: 'Full-Stack · Enterprise',
    year: '2024',
    status: 'In Produzione',

    /* 👇 AGGIUNTO */
    github: 'https://github.com/Tonyx8808/crm-demo',
  },

  {
    id: 'workhub',
    index: '02',
    codename: 'AR // WORKHUB',
    title: 'WorkHub',
    subtitle: 'Internal Company Management',
    description:
      'Piattaforma full-stack per la gestione aziendale interna. Centralizza personale, turni, magazzino, ordini, ticketing, clienti ed eventi in un sistema unificato con ruoli Admin e User.',
    highlights: [
      'Calendario turni: Day/Week/Month + generazione 52 settimane',
      'Magazzino e ordini con aggiornamento stock atomico e low-stock',
      'Ticketing interno con storico, assegnazione e stato real-time',
      'Auth JWT con 2FA opzionale, bcrypt e recovery password',
      'RBAC Admin/User con middleware custom e route protette',
      'UI Light/Dark, i18n IT/EN, Redux Toolkit per stato globale',
    ],
    stack: ['React + Vite', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'JWT', 'react-big-calendar', 'Joi', 'date-fns'],
    screenshots: [
      '/projects/workhub/screenshot-1.jpg',
      '/projects/workhub/screenshot-2.jpg',
      '/projects/workhub/screenshot-3.jpg',
    ],
    accent: '#00C896',
    accentAlt: '#00A3FF',
    accentRgb: '0,200,150',
    tag: 'Full-Stack · SaaS',
    year: '2024',
    status: 'In Produzione',

    /* 👇 AGGIUNTO */
    github: 'https://github.com/VincT89/Workhub',
  },
]


export default function ProjectsSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const [inView, setInView]         = useState(false)
  const [activeShot, setActiveShot] = useState<Record<string, number>>({ crm: 0, workhub: 0 })
  const [hovered, setHovered]       = useState<string | null>(null)
  const [expanded, setExpanded]     = useState<string | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setActiveShot(prev => ({
        crm:     (prev.crm     + 1) % PROJECTS[0].screenshots.length,
        workhub: (prev.workhub + 1) % PROJECTS[1].screenshots.length,
      }))
    }, 3500)
    return () => clearInterval(id)
  }, [inView])

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 10vw, 8rem) 0',
        background: '#040710',
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* ─── Reset & base ─── */
        *, *::before, *::after { box-sizing: border-box; }

        /* ─── Noise overlay ─── */
        .ps-noise {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 256px;
          opacity: 0.35;
          mix-blend-mode: overlay;
          z-index: 0;
        }

        /* ─── Grid lines ─── */
        .ps-vline {
          pointer-events: none;
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(0,102,255,0.08) 15%,
            rgba(0,102,255,0.08) 85%,
            transparent 100%
          );
        }
        .ps-hline {
          pointer-events: none;
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right,
            transparent 0%,
            rgba(0,102,255,0.06) 20%,
            rgba(0,102,255,0.06) 80%,
            transparent 100%
          );
        }

        /* ─── Reveal ─── */
        .ps-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1),
                      transform 0.8s cubic-bezier(.22,1,.36,1);
          will-change: opacity, transform;
        }
        .ps-reveal.vis { opacity: 1; transform: none; }

        /* ─── Section label ─── */
        .ps-label {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }
        .ps-label-num {
          font-family: var(--font-space-mono);
          font-size: clamp(0.6rem, 1.5vw, 0.72rem);
          color: #0066FF;
          letter-spacing: 0.25em;
        }
        .ps-label-sep {
          width: 32px; height: 1px;
          background: rgba(0,102,255,0.35);
        }
        .ps-label-text {
          font-family: var(--font-space-mono);
          font-size: clamp(0.55rem, 1.3vw, 0.62rem);
          text-transform: uppercase;
          letter-spacing: 0.32em;
          color: rgba(255,255,255,0.3);
        }

        /* ─── Heading ─── */
        .ps-heading {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(1.8rem, 5vw, 3.2rem);
          line-height: 1;
          letter-spacing: -1.5px;
          color: rgba(255,255,255,0.92);
          margin: 0 0 clamp(3rem, 6vw, 5rem);
        }
        .ps-heading-grad {
          background: linear-gradient(125deg, #0066FF 0%, #00A3FF 50%, #00D4FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─── Card ─── */
        .ps-card {
          position: relative;
          border: 1px solid rgba(255,255,255,0.055);
          background: rgba(6,9,22,0.96);
          transition:
            border-color 0.45s ease,
            box-shadow 0.45s ease,
            transform 0.45s cubic-bezier(.22,1,.36,1);
          overflow: hidden;
          cursor: default;
        }
        @media (hover: hover) {
          .ps-card:hover {
            border-color: rgba(255,255,255,0.12);
            box-shadow:
              0 0 0 1px rgba(0,102,255,0.15),
              0 32px 80px -16px rgba(0,0,0,0.7),
              0 0 80px -20px rgba(0,102,255,0.12);
          }
        }

        /* Animated top-border on hover */
        .ps-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            var(--card-accent, #0066FF),
            transparent
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }
        @media (hover: hover) {
          .ps-card:hover::before { opacity: 1; }
        }

        /* Inner glow on hover */
        .ps-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 40% at 50% 0%,
            rgba(0,102,255,0.05) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }
        @media (hover: hover) {
          .ps-card:hover::after { opacity: 1; }
        }

        /* ─── Card layout: image full width on top, content below ─── */
        .ps-layout {
          display: flex;
          flex-direction: column;
        }

        /* ─── Screenshot panel ───
           Fixed aspect-ratio box so screenshots are never cropped:
           the whole image is shown (object-fit: contain) against a
           soft tinted backdrop instead of being cut at the edges. */
        .ps-shot-panel {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9.2;
          flex-shrink: 0;
          background:
            radial-gradient(ellipse 70% 90% at 50% 0%, var(--shot-bg-1, rgba(0,102,255,0.10)) 0%, transparent 60%),
            #050810;
        }

        .ps-shot-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          padding: clamp(0.5rem, 1.5vw, 1rem);
        }
        @media (hover: hover) {
          .ps-card:hover .ps-shot-img { transform: scale(1.015); }
        }

        /* ─── HUD corners ─── */
        .ps-corner {
          position: absolute;
          width: 12px; height: 12px;
          z-index: 4;
        }
        .ps-corner--tl { top: 10px; left: 10px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .ps-corner--tr { top: 10px; right: 10px; border-top: 1.5px solid; border-right: 1.5px solid; }
        .ps-corner--bl { bottom: 10px; left: 10px; border-bottom: 1.5px solid; border-left: 1.5px solid; }
        .ps-corner--br { bottom: 10px; right: 10px; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        /* ─── Scan line ─── */
        @keyframes ps-scan {
          0%   { top: 0%;   opacity: 0.7; }
          80%  { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        .ps-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          pointer-events: none;
          z-index: 5;
          animation: ps-scan 4s linear infinite;
        }

        /* ─── Dots ─── */
        .ps-dots {
          position: absolute;
          bottom: 14px; left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          gap: 6px;
        }
        .ps-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
          outline: none;
        }
        .ps-dot.on {
          border-color: transparent;
          transform: scale(1.25);
        }

        /* ─── Content panel ─── */
        .ps-content {
          position: relative;
          z-index: 1;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1.2rem, 2.5vw, 1.75rem);
          flex: 1;
        }

        /* ─── Codename bar ─── */
        .ps-codename {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .ps-codename-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          animation: ps-pulse 2s ease-in-out infinite;
        }
        @keyframes ps-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        .ps-codename-text {
          font-family: var(--font-space-mono);
          font-size: clamp(0.5rem, 1.2vw, 0.58rem);
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }

        /* ─── Title ─── */
        .ps-title {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          line-height: 0.95;
          letter-spacing: -1px;
          margin: 0;
          background: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ps-subtitle {
          font-family: var(--font-space-mono);
          font-size: clamp(0.55rem, 1.3vw, 0.62rem);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin: 0 0 0.4rem;
        }

        /* ─── Description ─── */
        .ps-desc {
          font-family: var(--font-space-mono);
          font-size: clamp(0.6rem, 1.4vw, 0.65rem);
          line-height: 1.9;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.38);
          margin: 0;
        }

        /* ─── Section divider ─── */
        .ps-divider {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.7rem;
        }
        .ps-divider-label {
          font-family: var(--font-space-mono);
          font-size: clamp(0.48rem, 1.1vw, 0.53rem);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.2);
          white-space: nowrap;
        }
        .ps-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.05);
        }

        /* ─── Highlights ─── */
        .ps-highlight-row {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.035);
          transition: background 0.2s ease;
        }
        .ps-highlight-row:last-child { border-bottom: none; }
        .ps-highlight-row:hover {
          background: rgba(255,255,255,0.02);
          margin: 0 -0.5rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        .ps-highlight-bullet {
          flex-shrink: 0;
          margin-top: 5px;
          width: 4px; height: 4px;
          border-radius: 50%;
        }
        .ps-highlight-text {
          font-family: var(--font-space-mono);
          font-size: clamp(0.56rem, 1.25vw, 0.6rem);
          line-height: 1.65;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.42);
        }

        /* ─── Stack badges ─── */
        .ps-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .ps-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-space-mono);
          font-size: clamp(0.5rem, 1.1vw, 0.56rem);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 3px 9px;
          background: rgba(255,255,255,0.025);
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .ps-badge:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(0,102,255,0.3);
          background: rgba(0,102,255,0.07);
        }
        .ps-badge-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ─── CTA row ─── */
        .ps-cta-row {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 0.25rem;
        }
        .ps-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-space-mono);
          font-size: clamp(0.52rem, 1.2vw, 0.6rem);
          text-transform: uppercase;
          letter-spacing: 0.26em;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.55rem 1.1rem;
          background: transparent;
          cursor: pointer;
          transition: all 0.22s ease;
          text-decoration: none;
          color: rgba(255,255,255,0.4);
        }
        .ps-cta:hover {
          color: rgba(255,255,255,0.95);
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.04);
        }
        .ps-cta--accent:hover {
          border-color: rgba(0,102,255,0.5);
          background: rgba(0,102,255,0.1);
        }
        .ps-cta-icon {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 6px currentColor;
        }

        /* ─── Ghost index ─── */
        .ps-ghost-index {
          font-family: var(--font-space-mono);
          font-size: clamp(5rem, 15vw, 10rem);
          font-weight: 400;
          line-height: 1;
          color: rgba(255,255,255,0.025);
          position: absolute;
          right: clamp(1rem, 3vw, 2rem);
          top: clamp(0.75rem, 2vw, 1.25rem);
          pointer-events: none;
          user-select: none;
          letter-spacing: -4px;
          z-index: 0;
        }

        /* ─── Status pill ─── */
        .ps-status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-space-mono);
          font-size: 0.52rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          padding: 3px 8px;
          border-radius: 2px;
        }
        .ps-status-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          animation: ps-pulse 1.5s ease-in-out infinite;
        }

        /* ─── Bottom progress bar ─── */
        .ps-progress {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          transition: background 0.5s ease;
          z-index: 1;
        }

        /* ─── Year tag ─── */
        .ps-year {
          font-family: var(--font-space-mono);
          font-size: clamp(0.48rem, 1vw, 0.53rem);
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        /* ─── Footer ─── */
        .ps-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: clamp(2.5rem, 5vw, 4rem);
        }
        .ps-footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ps-footer-line {
          height: 1px;
          width: 2.5rem;
          background: rgba(0,102,255,0.35);
        }
        .ps-footer-label {
          font-family: var(--font-space-mono);
          font-size: clamp(0.52rem, 1.2vw, 0.58rem);
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.2);
        }
        .ps-footer-right {
          font-family: var(--font-space-mono);
          font-size: clamp(0.5rem, 1.1vw, 0.56rem);
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.1);
        }

        /* ─── Responsive gap ─── */
        .ps-cards-list {
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vw, 2.5rem);
        }

        /* ─── HUD tag ─── */
        .ps-hud-tag {
          position: absolute;
          z-index: 4;
          font-family: var(--font-space-mono);
          font-size: clamp(0.45rem, 1vw, 0.52rem);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 2px 7px;
          border: 1px solid;
          white-space: nowrap;
        }

        /* ─── Mobile: collapse highlights beyond 3 ─── */
        @media (max-width: 599px) {
          .ps-highlight-row.ps-hidden-mobile {
            display: none;
          }
          .ps-show-more {
            display: flex;
          }
        }
        @media (min-width: 600px) {
          .ps-show-more { display: none !important; }
          .ps-highlight-row.ps-hidden-mobile { display: flex; }
        }
        .ps-show-more {
          font-family: var(--font-space-mono);
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.3);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem 0 0;
          display: none;
        }
      `}</style>

      {/* Noise texture */}
      <div className="ps-noise" />

      {/* Vertical grid lines */}
      {[15, 50, 85].map(l => (
        <div key={l} className="ps-vline" style={{ left: `${l}%` }} />
      ))}
      {/* Horizontal grid lines */}
      <div className="ps-hline" style={{ top: '0' }} />
      <div className="ps-hline" style={{ bottom: '0' }} />

      {/* Ambient background glow */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: '5%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw', height: '60vw',
        background: 'radial-gradient(ellipse at center, rgba(0,80,255,0.04) 0%, transparent 65%)',
        zIndex: 0,
      }} />
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        bottom: '10%', right: '-10%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(ellipse at center, rgba(0,200,150,0.025) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 5vw, 4rem)',
      }}>

        {/* ── Section header ── */}
        <div className={`ps-reveal${inView ? ' vis' : ''}`} style={{ transitionDelay: '0ms' }}>
          <div className="ps-label">
            <span className="ps-label-num">04</span>
            <span className="ps-label-text">Selected Work — Demo Projects</span>
          </div>
          <h2 className="ps-heading">
            Sistemi{' '}
            <span className="ps-heading-grad">Reali</span>
            <br />
            in Produzione
          </h2>
        </div>

        {/* ── Cards ── */}
        <div className="ps-cards-list">
          {PROJECTS.map((proj, pi) => {
            const shotIdx = activeShot[proj.id] ?? 0
            const isHov   = hovered === proj.id
            const isExp   = expanded === proj.id

            return (
              <div
                key={proj.id}
                className={`ps-card ps-reveal${inView ? ' vis' : ''}`}
                style={{
                  transitionDelay: `${pi * 100 + 80}ms`,
                  // @ts-ignore
                  '--card-accent': proj.accent,
                }}
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Ghost index */}
                <span className="ps-ghost-index">{proj.index}</span>

                {/* Scan line (only when hovered on desktop) */}
                {isHov && (
                  <div
                    className="ps-scanline"
                    style={{ background: `linear-gradient(90deg, transparent, ${proj.accent}55, transparent)` }}
                  />
                )}

                <div className="ps-layout">

                  {/* ── Screenshot panel (full width, full image visible) ── */}
                  <div
                    className="ps-shot-panel"
                    style={{ '--shot-bg-1': `${proj.accent}1a` } as React.CSSProperties}
                  >

                    {/* Images */}
                    {proj.screenshots.map((src, si) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={si}
                        src={src}
                        alt={`${proj.title} screenshot ${si + 1}`}
                        className="ps-shot-img"
                        style={{ opacity: si === shotIdx ? 1 : 0, zIndex: si === shotIdx ? 1 : 0 }}
                      />
                    ))}

                    {/* HUD corners */}
                    {(['tl','tr','bl','br'] as const).map(pos => (
                      <div
                        key={pos}
                        className={`ps-corner ps-corner--${pos}`}
                        style={{ borderColor: `${proj.accent}80` }}
                      />
                    ))}

                    {/* Codename HUD — top left */}
                    <div style={{
                      position: 'absolute', top: '1.1rem', left: '1.1rem', zIndex: 4,
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-space-mono)',
                        fontSize: 'clamp(0.45rem, 1vw, 0.52rem)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.28em',
                        color: proj.accent,
                        opacity: 0.9,
                      }}>{proj.codename}</span>
                    </div>

                    {/* Tag — top right */}
                    <div className="ps-hud-tag" style={{
                      top: '0.9rem', right: '0.9rem',
                      color: proj.accent,
                      borderColor: `${proj.accent}40`,
                      background: `${proj.accent}12`,
                    }}>{proj.tag}</div>

                    {/* Dots */}
                    <div className="ps-dots">
                      {proj.screenshots.map((_, si) => (
                        <button
                          key={si}
                          className={`ps-dot${si === shotIdx ? ' on' : ''}`}
                          style={si === shotIdx ? { background: proj.accent } : undefined}
                          onClick={() => setActiveShot(prev => ({ ...prev, [proj.id]: si }))}
                          aria-label={`Screenshot ${si + 1}`}
                        />
                      ))}
                    </div>

                    {/* Status pill — bottom left */}
                    <div className="ps-status" style={{
                      position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 4,
                      color: proj.accent,
                      background: `${proj.accent}15`,
                      border: `1px solid ${proj.accent}35`,
                    }}>
                      <span className="ps-status-dot" style={{ background: proj.accent }} />
                      {proj.status}
                    </div>
                  </div>

                  {/* ── Content panel ── */}
                  <div className="ps-content">

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="ps-codename" style={{ marginBottom: '0.45rem' }}>
                          <span className="ps-codename-dot" style={{ background: proj.accent, boxShadow: `0 0 6px ${proj.accent}` }} />
                          <span className="ps-codename-text" style={{ color: proj.accent }}>{proj.subtitle}</span>
                        </div>
                        <h3 className="ps-title">{proj.title}</h3>
                      </div>
                      <span className="ps-year">{proj.year}</span>
                    </div>

                    {/* Description */}
                    <p className="ps-desc">{proj.description}</p>

                    {/* Highlights */}
                    <div>
                      <div className="ps-divider">
                        <span className="ps-divider-label">Funzionalità</span>
                        <div className="ps-divider-line" />
                      </div>
                      {proj.highlights.map((h, hi) => (
                        <div
                          key={hi}
                          className={`ps-highlight-row${hi >= 3 && !isExp ? ' ps-hidden-mobile' : ''}`}
                        >
                          <span
                            className="ps-highlight-bullet"
                            style={{ background: proj.accent, boxShadow: `0 0 5px ${proj.accent}80` }}
                          />
                          <span className="ps-highlight-text">{h}</span>
                        </div>
                      ))}
                      <button
                        className="ps-show-more"
                        style={{ color: proj.accent }}
                        onClick={() => setExpanded(isExp ? null : proj.id)}
                      >
                        {isExp ? '↑ Mostra meno' : `+ ${proj.highlights.length - 3} funzionalità`}
                      </button>
                    </div>

                    {/* Stack */}
                    <div>
                      <div className="ps-divider">
                        <span className="ps-divider-label">Stack</span>
                        <div className="ps-divider-line" />
                      </div>
                      <div className="ps-badges">
                        {proj.stack.map(s => (
                          <span key={s} className="ps-badge">
                            <span className="ps-badge-dot" style={{ background: proj.accent }} />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="ps-cta-row">
                      <a
                        href="#"
                        className="ps-cta ps-cta--accent"
                        style={{ color: proj.accent, borderColor: `${proj.accent}40` }}
                      >
                        <span className="ps-cta-icon" style={{ color: proj.accent }} />
                        Live Demo
                      </a>
                    <a
                    href={proj.github}
                    target='_blank'
                    rel="noopener noreferrer"
                    className="ps-cta"
                    >
                    GitHub →
                     </a>
                
                    </div>
                  </div>
                </div>

                {/* Bottom progress line */}
                <div
                  className="ps-progress"
                  style={{
                    background: isHov
                      ? `linear-gradient(90deg, transparent 0%, ${proj.accent}90 30%, ${proj.accentAlt}90 70%, transparent 100%)`
                      : 'rgba(255,255,255,0.035)',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* ── Footer ── */}
        <div
          className={`ps-footer ps-reveal${inView ? ' vis' : ''}`}
          style={{ transitionDelay: '280ms' }}
        >
          <div className="ps-footer-left">
            <div className="ps-footer-line" />
            <span className="ps-footer-label">2 Progetti — Full-Stack Production</span>
          </div>
          <span className="ps-footer-right">AR // PORTFOLIO 2025</span>
        </div>

      </div>
    </section>
  )
}