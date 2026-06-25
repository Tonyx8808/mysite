'use client'

// ─────────────────────────────────────────────────────────────
//  SCROLL REVEAL
// ─────────────────────────────────────────────────────────────
export function initScrollReveal() {
  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll('.reveal-3d, .reveal-up')
  if (!elements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )

  elements.forEach((el) => observer.observe(el))
}

// ─────────────────────────────────────────────────────────────
//  PARALLAX GLOW
// ─────────────────────────────────────────────────────────────
export function initParallax() {
  if (typeof window === 'undefined') return

  const glows = document.querySelectorAll<HTMLElement>('.hero-glow')
  if (!glows.length) return

  const handler = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    glows.forEach((g, i) => {
      const factor = (i + 1) * 18
      g.style.transform = `translate(${x * factor}px, ${y * factor}px)`
    })
  }

  window.addEventListener('mousemove', handler, { passive: true })
}

// ─────────────────────────────────────────────────────────────
//  HERO TITLE TILT
// ─────────────────────────────────────────────────────────────
export function initHeroTilt() {
  if (typeof window === 'undefined') return

  const title = document.querySelector<HTMLElement>('.hero-title')
  if (!title) return

  const handler = (e: MouseEvent) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = (e.clientX - cx) / cx
    const dy = (e.clientY - cy) / cy
    title.style.transform = `perspective(1400px) rotateX(${dy * -4}deg) rotateY(${dx * 4}deg)`
  }

  document.addEventListener('mousemove', handler, { passive: true })
}

// ─────────────────────────────────────────────────────────────
//  CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────
export function initCustomCursor() {
  if (typeof window === 'undefined') return

  const cursor = document.getElementById('cursor')
  const dot = document.getElementById('cursor-dot')
  if (!cursor || !dot) return

  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0
  let rafId: number

  const moveHandler = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = mouseX + 'px'
    cursor.style.top = mouseY + 'px'
  }

  document.addEventListener('mousemove', moveHandler, { passive: true })

  const animateDot = () => {
    dotX += (mouseX - dotX) * 0.1
    dotY += (mouseY - dotY) * 0.1
    dot.style.left = dotX + 'px'
    dot.style.top = dotY + 'px'
    rafId = requestAnimationFrame(animateDot)
  }

  rafId = requestAnimationFrame(animateDot)
}

// ─────────────────────────────────────────────────────────────
//  SKILL BARS
// ─────────────────────────────────────────────────────────────
export function initSkillBars() {
  if (typeof window === 'undefined') return

  const el = document.querySelector('.skills-bars')
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll<HTMLElement>('.sbr-fill')
          bars.forEach((bar, i) => {
            const w = bar.dataset.w
            setTimeout(() => {
              if (w) bar.style.width = w + '%'
            }, i * 160)
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  observer.observe(el)
}

// ─────────────────────────────────────────────────────────────
//  COUNTERS
// ─────────────────────────────────────────────────────────────
export function initCounters() {
  if (typeof window === 'undefined') return

  const el = document.querySelector('.about-stats')
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll<HTMLElement>('.stat-num')

          nums.forEach((num) => {
            const target = parseInt(num.dataset.target || '0')
            const duration = 1600
            const start = Date.now()

            const tick = () => {
              const elapsed = Date.now() - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              num.textContent = Math.round(eased * target).toString()
              if (progress < 1) requestAnimationFrame(tick)
            }

            tick()
          })

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  observer.observe(el)
}

// ─────────────────────────────────────────────────────────────
//  ORBIT TILT
// ─────────────────────────────────────────────────────────────
export function initOrbitTilt() {
  if (typeof window === 'undefined') return

  const orbit = document.querySelector<HTMLElement>('.skills-orbit')
  if (!orbit) return

  const handler = () => {
    const rect = orbit.getBoundingClientRect()
    const relY = (rect.top + rect.height / 2) / window.innerHeight
    const offset = (relY - 0.5) * 28
    orbit.style.transform = `perspective(900px) rotateX(${offset}deg) rotateY(${offset * 0.35}deg)`
  }

  window.addEventListener('scroll', handler, { passive: true })
}
