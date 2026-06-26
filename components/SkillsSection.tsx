'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

type Category = 'FRONTEND' | 'BACKEND' | 'STRUMENTI'

interface Skill {
  label: string
  icon: string
  category: Category
  desc: string
  level: number
  tag: string
}

const SKILLS: Skill[] = [
  { label: 'HTML5',      icon: 'html.png',            category: 'FRONTEND', level: 95, tag: 'Fondamenta',      desc: 'Architettura semantica avanzata, accessibilità WCAG 2.1, microdata e structured data. Ogni DOM è costruito per essere leggibile da screen reader e crawler allo stesso modo.' },
  { label: 'CSS3',       icon: 'css3.png',            category: 'FRONTEND', level: 93, tag: 'Stile',           desc: 'Container queries, cascade layers, animazioni GPU-accelerate e sistemi di design token. CSS che scala senza specificity wars e si legge come prosa.' },
  { label: 'JavaScript', icon: 'javascript.png',      category: 'FRONTEND', level: 88, tag: 'Core',            desc: 'ES2024, pattern funzionali, Web APIs native e ottimizzazione delle performance. Nessuna dipendenza aggiunta se il browser lo fa già.' },
  { label: 'TypeScript', icon: 'typescript.png',      category: 'FRONTEND', level: 84, tag: 'Type Safety',     desc: 'Generics avanzati, utility types, discriminated unions e strict mode sempre attivo. Il tipo è documentazione: se compila, è corretto.' },
  { label: 'React',      icon: 'icons8-react-40.png', category: 'FRONTEND', level: 86, tag: 'UI Framework',    desc: 'Architetture component-driven con hooks custom, Suspense, Server Components e pattern di composizione. Next.js App Router è il mio ambiente naturale.' },
  { label: 'Tailwind',   icon: 'tailwindcss.png',     category: 'FRONTEND', level: 90, tag: 'Utility CSS',     desc: 'Design systems scalabili con token custom, varianti responsive e temi dinamici. Productivity x3 senza sacrificare la precisione pixel-perfect.' },
  { label: 'GSAP',       icon: 'gsap.png',            category: 'FRONTEND', level: 78, tag: 'Animazione',      desc: 'ScrollTrigger per storytelling on-scroll, timeline orchestrate e morphing SVG. Le animazioni che creo comunicano gerarchia, non distrazione.' },
  { label: 'Node.js',    icon: 'nodejs.png',          category: 'BACKEND',  level: 80, tag: 'Runtime',         desc: 'API REST e GraphQL con Express/Fastify, middleware pipeline, streaming e worker threads. Architetture event-driven che non bloccano mai il thread principale.' },
  { label: 'MongoDB',    icon: 'mongodb.png',         category: 'BACKEND',  level: 74, tag: 'Database',        desc: 'Modellazione document-oriented, aggregation pipeline complesse e indici geospaziali. Mongoose come ODM con validazione schema rigorosa.' },
  { label: 'Redux',      icon: 'redux.png',           category: 'BACKEND',  level: 76, tag: 'State',           desc: 'Redux Toolkit per state management prevedibile, RTK Query per data fetching e caching intelligente. Pattern slice-based che si leggono da soli.' },
  { label: 'Git',        icon: 'git.png',             category: 'STRUMENTI',level: 88, tag: 'Version Control', desc: 'Conventional commits, git flow, rebase interattivo e hook pre-commit. Una storia git pulita è rispetto per il team che leggerà il codice dopo di te.' },
  { label: 'GitHub',     icon: 'github.png',          category: 'STRUMENTI',level: 85, tag: 'Collaboration',   desc: 'Actions per CI/CD automatizzate, code review strutturate e gestione issue strategica. Open-source contributor con PR accettate su progetti attivi.' },
  { label: 'VS Code',    icon: 'vscode.png',          category: 'STRUMENTI',level: 90, tag: 'Editor',          desc: "L'editor scompare, resta solo il problema. Multi-cursor, debugging integrato, snippet custom e workspace settings sincronizzati." },
  { label: 'Vercel',     icon: 'vercel.png',          category: 'STRUMENTI',level: 82, tag: 'Deploy',          desc: 'Edge network globale, preview deployments per ogni PR e Analytics real-time. Push e in 30 secondi è live.' },
  { label: 'npm',        icon: 'npm.png',             category: 'STRUMENTI',level: 83, tag: 'Package Manager', desc: 'Gestione dipendenze con lockfile rigorosi, scripts personalizzati e workspace monorepo. Zero dipendenze superflue.' },
  { label: 'SEO',        icon: 'seo.png',             category: 'STRUMENTI',level: 79, tag: 'Visibilità',      desc: 'Core Web Vitals, structured data, sitemap dinamiche e meta ottimizzati. Il codice migliore è inutile se Google non riesce a indicizzarlo.' },
]

const CATEGORIES: Category[] = ['FRONTEND', 'BACKEND', 'STRUMENTI']



const CARD_FEATURES: Record<Category, { title: string; body: string }[]> = {
  FRONTEND:  [
    { title: 'Semantica & a11y', body: 'Struttura DOM pensata per screen reader, crawler e performance.' },
    { title: 'Animazioni GPU',   body: 'GSAP + CSS custom properties. Nessuna jank, mai.' },
  ],
  BACKEND: [
    { title: 'Event-driven',  body: 'Architetture non bloccanti con Node.js e worker threads.' },
    { title: 'Data modeling', body: 'Schema rigorosi con Mongoose e aggregation pipeline.' },
  ],
  STRUMENTI: [
    { title: 'CI/CD zero friction', body: 'GitHub Actions + Vercel: push e in 30s è live.' },
    { title: 'Git history pulita',  body: 'Conventional commits e rebase interattivo come standard.' },
  ],
}

const ORBIT_R = 210
const CX = 300
const CY = 300
const AUTO_INTERVAL = 2200

// Round to N decimals — same result on server and client
const r4 = (n: number) => Math.round(n * 1e4) / 1e4

function getPositioned(skills: Skill[]) {
  return skills.map((skill, i) => {
    const rad = ((i / skills.length) * 360 - 90) * (Math.PI / 180)
    return { ...skill, x: r4(CX + ORBIT_R * Math.cos(rad)), y: r4(CY + ORBIT_R * Math.sin(rad)) }
  })
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('FRONTEND')
  const [activeSkill, setActiveSkill]       = useState<Skill | null>(null)
  const [isHovering, setIsHovering]         = useState(false)
  const [cardVisible, setCardVisible]       = useState(false)
  const [barKey, setBarKey]                 = useState(0)
  const [mounted, setMounted]               = useState(false)

  const autoRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const indexRef = useRef(0)

  // Hydrate only on client
  useEffect(() => { setMounted(true) }, [])

  const visibleSkills = SKILLS.filter(s => s.category === activeCategory)
  
  const features      = CARD_FEATURES[activeCategory]
  const positioned    = getPositioned(visibleSkills)

  const showSkill = useCallback((skill: Skill) => {
    setCardVisible(false)
    setTimeout(() => {
      setActiveSkill(skill)
      setBarKey(k => k + 1)
      setCardVisible(true)
    }, 180)
  }, [])

  const startCycle = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      const skills = SKILLS.filter(s => s.category === activeCategory)
      indexRef.current = (indexRef.current + 1) % skills.length
      showSkill(skills[indexRef.current])
    }, AUTO_INTERVAL)
  }, [activeCategory, showSkill])

  useEffect(() => {
    indexRef.current = 0
    const skills = SKILLS.filter(s => s.category === activeCategory)
    showSkill(skills[0])
    if (!isHovering) startCycle()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  useEffect(() => {
    if (isHovering) {
      if (autoRef.current) clearInterval(autoRef.current)
    } else {
      startCycle()
    }
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [isHovering, startCycle])

  const handleNodeEnter = (skill: Skill, i: number) => {
    setIsHovering(true)
    indexRef.current = i
    showSkill(skill)
  }

  return (
    <section
      id="skills"
      suppressHydrationWarning
      style={{ background: 'var(--navy-light)', padding: '140px 8%', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
    >
      <style>{`
        #skills::before {
          content: '';
          position: absolute; top: 10%; left: 40%;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 65%);
          filter: blur(90px); pointer-events: none; transform: translateX(-30%);
        }
        .sk-pill {
          font-family: 'Space Mono', monospace;
          font-size: 0.64rem; letter-spacing: 0.18em;
          padding: 0.6rem 1.6rem; border-radius: 999px;
          border: 1px solid var(--border); background: transparent;
          color: var(--chrome-dark); cursor: pointer; text-align: left;
          transition: border-color 0.4s cubic-bezier(0.16,1,0.3,1),
                      color 0.4s cubic-bezier(0.16,1,0.3,1),
                      background 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .sk-pill:hover { border-color: var(--border-bright); color: var(--blue-bright); background: rgba(0,102,255,0.05); }
        .sk-pill.active { border-color: var(--blue-bright); color: var(--blue-bright); background: rgba(45,143,255,0.08); box-shadow: 0 0 24px rgba(0,102,255,0.14); }

        .sk-detail-card {
          border: 1px solid var(--border-bright); border-radius: 16px;
          background: var(--glass-bg); backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          padding: 1.6rem; min-height: 210px;
          position: relative; overflow: hidden;
          box-shadow: 0 0 40px rgba(0,102,255,0.08);
        }
        .sk-detail-card::before {
          content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }
        .sk-card-inner { transition: opacity 0.18s ease, transform 0.18s ease; }
        .sk-card-inner.hidden  { opacity: 0; transform: translateY(8px); }
        .sk-card-inner.visible { opacity: 1; transform: translateY(0); }

        @keyframes sk-accent-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .sk-accent-bar {
          height: 2px; border-radius: 2px; background: var(--blue-grad);
          box-shadow: 0 0 14px rgba(0,102,255,0.6); margin-bottom: 1.25rem;
          transform-origin: left; animation: sk-accent-grow 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes sk-bar-fill { from { width: 0; } }
        .sk-bar-fill {
          height: 100%; background: var(--blue-grad); border-radius: 2px;
          box-shadow: 0 0 12px rgba(0,102,255,0.5);
          animation: sk-bar-fill 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes sk-node-in {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.4) rotate(-10deg); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1) rotate(0deg); }
        }
        .sk-node {
          position: absolute; transform: translate(-50%,-50%);
          animation: sk-node-in 0.55s cubic-bezier(0.34,1.4,0.64,1) forwards;
          cursor: pointer; z-index: 2;
        }
        .sk-node-box {
          width: 62px; height: 62px; border-radius: 15px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(14px);
          transition: border-color 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow   0.35s cubic-bezier(0.16,1,0.3,1),
                      transform    0.4s  cubic-bezier(0.34,1.4,0.64,1),
                      background   0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .sk-node.active-node .sk-node-box,
        .sk-node:hover .sk-node-box {
          border-color: var(--blue-bright);
          box-shadow: 0 0 32px rgba(45,143,255,0.35), 0 0 10px rgba(45,143,255,0.18);
          transform: scale(1.2) translateY(-4px);
          background: #ffffff;
        }
        .sk-node-label {
          position: absolute; top: calc(100% + 9px); left: 50%;
          transform: translateX(-50%);
          font-family: 'Space Mono', monospace; font-size: 0.54rem;
          letter-spacing: 0.07em; color: var(--muted); white-space: nowrap;
          transition: color 0.3s, opacity 0.3s; opacity: 0.6;
        }
        .sk-node.active-node .sk-node-label,
        .sk-node:hover .sk-node-label { color: var(--chrome-light); opacity: 1; }

        @keyframes sk-halo-pulse {
          0%   { transform: translate(-50%,-50%) scale(0.8); opacity: 0.35; }
          100% { transform: translate(-50%,-50%) scale(1.6); opacity: 0; }
        }
        .sk-halo {
          position: absolute; top: 50%; left: 50%;
          width: 62px; height: 62px; border-radius: 50%;
          border: 1px solid var(--blue-bright); pointer-events: none;
          animation: sk-halo-pulse 1.6s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        @keyframes sk-line-dash { to { stroke-dashoffset: -20; } }
        .sk-line-active { animation: sk-line-dash 0.8s linear infinite; }

        @keyframes sk-spin-cw  { to { transform: rotate(360deg); } }
        @keyframes sk-spin-ccw { to { transform: rotate(-360deg); } }
        .sk-ring-outer {
          position: absolute; inset: -22px; border-radius: 50%;
          border: 1px dashed rgba(45,143,255,0.22);
          animation: sk-spin-cw 22s linear infinite; pointer-events: none;
        }
        .sk-ring-inner {
          position: absolute; inset: -9px; border-radius: 50%;
          border: 1px solid rgba(0,102,255,0.12);
          animation: sk-spin-ccw 13s linear infinite; pointer-events: none;
        }

        @keyframes sk-hex-pulse {
          0%,100% { filter: drop-shadow(0 0 6px rgba(0,102,255,0.4)); }
          50%     { filter: drop-shadow(0 0 18px rgba(45,143,255,0.8)); }
        }
        .sk-hex-svg { animation: sk-hex-pulse 3s ease-in-out infinite; }

        .sk-panel {
          background: var(--navy-card); border: 1px solid var(--border);
          border-radius: 24px; padding: 1.75rem;
          position: relative; overflow: hidden;
        }
        .sk-panel::before {
          content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
        }

        .sk-badge {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: 'Space Mono', monospace; font-size: 0.58rem; letter-spacing: 0.14em;
          color: var(--chrome-dark); background: var(--glass-bg);
          border: 1px solid var(--glass-border); border-radius: 999px; padding: 0.28rem 0.85rem;
        }
        @keyframes sk-live-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.7); } }
        .sk-live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--blue-bright); box-shadow: 0 0 6px rgba(45,143,255,0.8);
          animation: sk-live-dot 1.6s ease-in-out infinite; display: inline-block;
        }

        @media (max-width: 1100px) { .sk-main-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 700px)  { #skills { padding: 90px 5% !important; } }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="sk-main-grid reveal-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>

          {/* ══ LEFT ══ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '0.9rem' }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', color: 'var(--blue-bright)', letterSpacing: '0.3em' }}>03</span>
                <h2 className="chrome-text" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-1.5px', margin: 0 }}>
                  Tecnologie
                </h2>
              </div>
              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.06em', lineHeight: 1.75, maxWidth: '400px' }}>
                Stack scelto per costruire prodotti veloci, scalabili e mantenibili nel tempo.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {CATEGORIES.map(cat => (
                <button key={cat} className={`sk-pill${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => { setActiveCategory(cat); setIsHovering(false) }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Detail card — always populated via auto-cycle */}
            <div className="sk-detail-card">
              <div className={`sk-card-inner ${cardVisible ? 'visible' : 'hidden'}`}>
                {activeSkill && (
                  <>
                    <div className="sk-accent-bar"/>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem' }}>
                      <span style={{
                        fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.18em',
                        color: 'var(--blue-bright)', border: '1px solid var(--border-bright)',
                        borderRadius: '999px', padding: '0.2rem 0.75rem', background: 'rgba(45,143,255,0.07)',
                      }}>{activeSkill.tag}</span>
                    </div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.45rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.4px', marginBottom: '1rem' }}>
                      {activeSkill.label}
                    </div>
                    <div style={{ marginBottom: '1.1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.55rem', color: 'var(--chrome-dark)', letterSpacing: '0.14em' }}>LIVELLO</span>
                        <span className="blue-text" style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.55rem' }}>{activeSkill.level}%</span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div key={barKey} className="sk-bar-fill" style={{ width: `${activeSkill.level}%` }}/>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--chrome-dark)', lineHeight: 1.8, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                      {activeSkill.desc}
                    </p>
                  </>
                )}
              </div>
            </div>

        

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: 'var(--blue-grad)', color: '#fff', borderRadius: '999px',
                padding: '0.75rem 1.9rem', fontSize: '0.78rem', fontWeight: 500,
                fontFamily: "'Space Mono',monospace", letterSpacing: '0.06em',
                textDecoration: 'none', boxShadow: '0 0 28px rgba(0,102,255,0.25)',
              }}>
              Contattami
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ══ RIGHT: panel + orbit ══ */}
          <div className="sk-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)' }}>
                {activeCategory === 'FRONTEND' ? 'Frontend Stack' : activeCategory === 'BACKEND' ? 'Backend Stack' : 'Dev Tools'}
              </span>
              <span className="sk-badge">
                <span className="sk-live-dot"/>
                Stack attivo
              </span>
            </div>

            {/* Orbit — rendered only after mount to avoid SSR/client mismatch */}
            <div
              style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div style={{ position: 'absolute', inset: 0 }}>
                {mounted && (
                  <>
                    <svg viewBox="0 0 600 600" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <radialGradient id="sk-cg" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(0,102,255,0.1)"/>
                          <stop offset="100%" stopColor="transparent"/>
                        </radialGradient>
                        <linearGradient id="sk-lg" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2D8FFF" stopOpacity="0.9"/>
                          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.9"/>
                        </linearGradient>
                      </defs>

                      <circle cx={CX} cy={CY} r={90} fill="url(#sk-cg)"/>
                      {[55, 100, 150, 200].map((r, i) => (
                        <circle key={r} cx={CX} cy={CY} r={r} fill="none"
                          stroke="rgba(0,102,255,0.06)" strokeWidth={i === 3 ? 1 : 0.6}
                          strokeDasharray={i % 2 === 0 ? '3 7' : undefined}
                        />
                      ))}
                      <circle cx={CX} cy={CY} r={ORBIT_R} fill="none"
                        stroke="rgba(0,102,255,0.14)" strokeWidth={1.2} strokeDasharray="4 6"
                      />

                      {positioned.map(skill => {
                        const isActive = activeSkill?.label === skill.label
                        return (
                          <line key={skill.label}
                            x1={CX} y1={CY}
                            x2={skill.x} y2={skill.y}
                            stroke={isActive ? 'url(#sk-lg)' : 'rgba(0,102,255,0.08)'}
                            strokeWidth={isActive ? 1.6 : 0.6}
                            strokeDasharray={isActive ? '8 4' : '4 8'}
                            strokeDashoffset={0}
                            className={isActive ? 'sk-line-active' : ''}
                            style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
                          />
                        )
                      })}

                      {activeSkill && (() => {
                        const s = positioned.find(p => p.label === activeSkill.label)
                        if (!s) return null
                        return <circle cx={s.x} cy={s.y} r={38} fill="none" stroke="var(--blue-bright)" strokeWidth={1} strokeDasharray="3 4" opacity={0.5}/>
                      })()}
                    </svg>

                    {/* Center hex */}
                    <div style={{ position: 'absolute', left: `${(CX/600)*100}%`, top: `${(CY/600)*100}%`, transform: 'translate(-50%,-50%)', width: '80px', height: '80px', zIndex: 3 }}>
                      <div className="sk-ring-outer"/>
                      <div className="sk-ring-inner"/>
                      <svg className="sk-hex-svg" viewBox="0 0 80 80" width="80" height="80">
                        <defs>
                          <linearGradient id="sk-hg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2D8FFF" stopOpacity="0.95"/>
                            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.95"/>
                          </linearGradient>
                        </defs>
                        <polygon points="40,5 68,20 68,60 40,75 12,60 12,20" fill="var(--navy-card)" stroke="url(#sk-hg)" strokeWidth="1.5"/>
                        <text x="40" y="42" textAnchor="middle" dominantBaseline="middle" fill="#2D8FFF" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="1.5">&lt;/&gt;</text>
                      </svg>
                    </div>

                    {/* Skill nodes */}
                    {positioned.map((skill, i) => {
                      const isActive = activeSkill?.label === skill.label
                      return (
                        <div key={skill.label + activeCategory} className={`sk-node${isActive ? ' active-node' : ''}`}
                          style={{ left: `${(skill.x/600)*100}%`, top: `${(skill.y/600)*100}%`, animationDelay: `${i*0.045}s` }}
                          onMouseEnter={() => handleNodeEnter(skill, i)}
                        >
                          {isActive && <div className="sk-halo"/>}
                          <div className="sk-node-box" style={{
                            borderColor: isActive ? 'var(--blue-bright)' : 'rgba(255,255,255,0.15)',
                            boxShadow: isActive
                              ? '0 0 32px rgba(45,143,255,0.32), 0 4px 20px rgba(0,0,0,0.15)'
                              : '0 4px 20px rgba(0,0,0,0.25)',
                          }}>
                            <Image src={`/icon/${skill.icon}`} alt={skill.label} width={32} height={32} style={{ objectFit: 'contain' }}/>
                          </div>
                          <span className="sk-node-label">{skill.label}</span>
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1.75rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              {features.map(f => (
                <div key={f.title}>
                  <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.9rem', fontWeight: 700, color: 'var(--white)', margin: '0 0 0.35rem' }}>{f.title}</h4>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: 'var(--chrome-dark)', lineHeight: 1.65, margin: 0 }}>{f.body}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.4rem' }}>
              <a href="#projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: "'Space Mono',monospace", fontSize: '0.66rem', color: 'var(--chrome-dark)', letterSpacing: '0.06em', textDecoration: 'none' }}>
                Guarda i progetti
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}