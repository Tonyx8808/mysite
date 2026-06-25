'use client'
import { useState } from 'react'

const SKILLS = [
  {
    label: 'HTML5', icon: '⟨/⟩',
    level: 95, color: '#E34F26',
    desc: 'Markup semantico, accessibilità, strutture solide.',
    years: '7 anni',
  },
  {
    label: 'CSS3', icon: '✦',
    level: 95, color: '#1572B6',
    desc: 'Animazioni, layout avanzati, custom properties.',
    years: '7 anni',
  },
  {
    label: 'JavaScript', icon: '⚡',
    level: 88, color: '#F7DF1E',
    desc: 'ES2024, async/await, DOM manipulation, performance.',
    years: '6 anni',
  },
  {
    label: 'React', icon: '⚛',
    level: 82, color: '#61DAFB',
    desc: 'Hooks, context, componenti riutilizzabili, Next.js.',
    years: '5 anni',
  },
  {
    label: 'Tailwind', icon: '◈',
    level: 90, color: '#06B6D4',
    desc: 'Utility-first, design systems, custom themes.',
    years: '4 anni',
  },
  {
    label: 'GSAP', icon: '◈',
    level: 80, color: '#88CE02',
    desc: 'ScrollTrigger, timeline, morph, advanced easing.',
    years: '3 anni',
  },
  {
    label: 'Git', icon: '⬡',
    level: 85, color: '#F05032',
    desc: 'Workflow collaborativo, branching, CI/CD.',
    years: '6 anni',
  },
]

export default function SkillsSection() {
  const [active, setActive] = useState<number | null>(null)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  return (
    <section id="skills" style={{
      background: 'var(--navy-light)',
      padding: '120px 8%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="bg-grid" />

      {/* Decorative glow */}
      <div style={{
        position: 'absolute', top: '30%', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(0,102,255,0.06)', filter: 'blur(120px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="reveal-up" style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '5rem', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem', color: 'var(--blue-bright)', letterSpacing: '0.25em' }}>03</span>
            <h2 className="chrome-text" style={{
              fontFamily: 'var(--font-syne)', fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-1px',
            }}>Tecnologie</h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem',
            color: 'var(--muted)', letterSpacing: '0.05em',
          }}>
            {active !== null ? `— ${SKILLS[active].label}` : '— hover per dettagli'}
          </p>
        </div>

        {/* Main layout: grid left + detail panel right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '4rem',
          alignItems: 'start',
        }}>

         {/* Left: skill grid */}
<div>
  <div
    className="reveal-3d"
    style={{
      display: 'grid',
      width: '100%',
gridTemplateColumns: `repeat(${SKILLS.length}, 1fr)`,      gap: '1px',
      background: 'rgba(0,102,255,0.1)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}
  >
    {SKILLS.map((skill, i) => {
      const isActive = active === i

      return (
        <div
          key={skill.label}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{
            position: 'relative',
            padding: '2rem',
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            background: isActive
              ? 'rgba(0,102,255,0.08)'
              : 'var(--navy-card)',

            cursor: 'default',
            transition: 'background 0.3s',
            overflow: 'hidden',
          }}
        >
          {/* Color accent top bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: skill.color,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Glow blob */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: skill.color,
              filter: 'blur(35px)',
              opacity: isActive ? 0.18 : 0,
              transition: 'opacity 0.4s',
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <div
            style={{
              fontSize: '1.6rem',
              color: isActive ? skill.color : 'var(--chrome-dark)',
              marginBottom: '0.75rem',

              transform: isActive
                ? 'scale(1.25) translateY(-2px)'
                : 'scale(1)',

              transition:
                'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',

              display: 'inline-block',

              filter: isActive
                ? `drop-shadow(0 0 10px ${skill.color}88)`
                : 'none',

              lineHeight: 1,
            }}
          >
            {skill.icon}
          </div>

          {/* Label */}
          <div
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.08em',

              color: isActive
                ? 'var(--white)'
                : 'var(--chrome-dark)',

              transition: 'color 0.3s',

              marginBottom: '0.8rem',
            }}
          >
            {skill.label}
          </div>

          {/* Mini progress bar */}
          <div
            style={{
              height: '2px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '1px',
              overflow: 'hidden',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                height: '100%',
                width: isActive
                  ? `${skill.level}%`
                  : '0%',

                background: skill.color,

                borderRadius: '1px',

                transition:
                  'width 0.6s cubic-bezier(0.16,1,0.3,1)',

                boxShadow: `0 0 8px ${skill.color}88`,
              }}
            />
          </div>
        </div>
      )
    })}
  </div>

            {/* Bottom bar rows — full width */}
            <div className="reveal-up skills-bars" style={{
              marginTop: '3rem',
              display: 'flex', flexDirection: 'column', gap: '1.2rem',
            }}>
              {SKILLS.map(({ label, level, color }, i) => (
                <div
                  key={label}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '130px 1fr 46px',
                    alignItems: 'center',
                    gap: '1.2rem',
                    opacity: hoveredBar !== null && hoveredBar !== i ? 0.35 : 1,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem',
                    color: hoveredBar === i ? 'var(--white)' : 'var(--chrome-dark)',
                    letterSpacing: '0.05em', transition: 'color 0.3s',
                  }}>{label}</span>
                  <div style={{
                    height: '3px',
                    background: 'rgba(0,102,255,0.08)',
                    borderRadius: '2px', overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <div
                      className="sbr-fill"
                      data-w={level}
                      style={{
                        width: 0,
                        background: hoveredBar === i
                          ? `linear-gradient(90deg, ${color}, var(--blue-neon))`
                          : 'linear-gradient(90deg, #0066FF, #00A3FF)',
                        height: '3px',
                        transition: 'background 0.4s',
                      }}
                    />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem',
                    color: hoveredBar === i ? 'var(--blue-bright)' : 'var(--muted)',
                    textAlign: 'right', transition: 'color 0.3s',
                  }}>{level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: detail panel */}
          <div className="reveal-up" style={{ position: 'sticky', top: '120px' }}>
            <div style={{
              border: '1px solid rgba(0,102,255,0.2)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--navy-card)',
              minHeight: '280px',
            }}>
              {active !== null ? (
                <div style={{ padding: '2.5rem' }}>
                  {/* Color top stripe */}
                  <div style={{
                    height: '3px',
                    background: SKILLS[active].color,
                    marginBottom: '2rem',
                    borderRadius: '2px',
                    boxShadow: `0 0 16px ${SKILLS[active].color}88`,
                  }} />

                  {/* Big icon */}
                  <div style={{
                    fontSize: '3rem',
                    color: SKILLS[active].color,
                    filter: `drop-shadow(0 0 20px ${SKILLS[active].color}66)`,
                    marginBottom: '1rem',
                    lineHeight: 1,
                  }}>{SKILLS[active].icon}</div>

                  {/* Name */}
                  <h3 style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '1.6rem', fontWeight: 800,
                    color: 'var(--white)', letterSpacing: '-0.5px',
                    marginBottom: '0.5rem',
                  }}>{SKILLS[active].label}</h3>

                  <div style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '0.65rem', color: SKILLS[active].color,
                    letterSpacing: '0.15em', marginBottom: '1.2rem',
                  }}>{SKILLS[active].years}</div>

                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--chrome-dark)',
                    lineHeight: 1.75,
                    marginBottom: '1.8rem',
                  }}>{SKILLS[active].desc}</p>

                  {/* Level meter */}
                  <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>LIVELLO</span>
                    <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: SKILLS[active].color }}>{SKILLS[active].level}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${SKILLS[active].level}%`,
                      background: SKILLS[active].color,
                      borderRadius: '2px',
                      boxShadow: `0 0 12px ${SKILLS[active].color}`,
                      transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '2.5rem',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  minHeight: '280px', textAlign: 'center',
                  gap: '1rem',
                }}>
                  <div style={{
                    width: '48px', height: '48px',
                    border: '1px solid rgba(0,102,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', color: 'var(--muted)',
                  }}>◈</div>
                  <p style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '0.68rem', color: 'var(--muted)',
                    letterSpacing: '0.1em', lineHeight: 1.7,
                  }}>
                    Passa il cursore<br />su una tecnologia
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}