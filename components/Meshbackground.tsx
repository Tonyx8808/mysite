'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

const COLORS = [
  '0, 102, 255',
  '0, 163, 255',
  '45, 143, 255',
  '0, 68, 204',
  '0, 200, 255',
]

export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    let animId: number

    canvas.width = W
    canvas.height = H

    // Crea punti mesh
    const COUNT = Math.floor((W * H) / 28000)
    const points: Point[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    // Mouse tracking per parallax leggero
    let mx = W / 2
    let my = H / 2
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    const CONNECT_DIST = 160
    const MOUSE_DIST = 220

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      // Mesh gradient di sfondo
      const grad = ctx!.createRadialGradient(
        mx * 0.6, my * 0.6, 0,
        W / 2, H / 2, Math.max(W, H) * 0.85
      )
      grad.addColorStop(0, 'rgba(0,68,180,0.18)')
      grad.addColorStop(0.35, 'rgba(0,30,100,0.10)')
      grad.addColorStop(1, 'rgba(6,9,20,0)')
      ctx!.fillStyle = grad
      ctx!.fillRect(0, 0, W, H)

      // Secondo glow che segue il mouse
      const g2 = ctx!.createRadialGradient(mx, my, 0, mx, my, 400)
      g2.addColorStop(0, 'rgba(0,163,255,0.07)')
      g2.addColorStop(1, 'rgba(0,163,255,0)')
      ctx!.fillStyle = g2
      ctx!.fillRect(0, 0, W, H)

      // Aggiorna posizioni
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        // Lieve attrazione verso mouse
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          p.vx += dx * 0.00008
          p.vy += dy * 0.00008
        }

        // Clamp velocità
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.8) { p.vx *= 0.98; p.vy *= 0.98 }
      }

      // Connessioni tra punti vicini
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.35
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(${a.color},${alpha})`
            ctx!.lineWidth = 0.6
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // Punti
      for (const p of points) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${p.color},0.7)`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  )
}