import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
// Simple in-memory rate limiter as a replacement for '@/lib/rateLimit'
const _rateLimitStore: Map<string, number[]> = new Map()

function rateLimit(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const arr = _rateLimitStore.get(ip) ?? []
  const windowStart = now - windowMs
  const filtered = arr.filter((t) => t > windowStart)
  filtered.push(now)
  _rateLimitStore.set(ip, filtered)
  return filtered.length <= max
}

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(str: string): string {
  return str.trim().slice(0, 2000)
}

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'

  if (!rateLimit(ip, 3, 60_000)) {
    return NextResponse.json(
      { error: 'Troppi tentativi. Riprova tra un minuto.' },
      { status: 429 }
    )
  }

  // 2. Parsing body
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 })
  }

  const { name, email, message, website, _loadedAt } = body as {
    name?: string
    email?: string
    message?: string
    website?: string
    _loadedAt?: number
  }

  // 3. Honeypot
  if (website) {
    return NextResponse.json({ ok: true })
  }

  // 4. Timestamp check
  if (!_loadedAt || Date.now() - _loadedAt < 1500) {
    return NextResponse.json({ ok: true })
  }

  // 5. Validazione
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Compila tutti i campi.' },
      { status: 400 }
    )
  }

  if (!isValidEmail(String(email))) {
    return NextResponse.json(
      { error: 'Indirizzo email non valido.' },
      { status: 400 }
    )
  }

  const safeName    = sanitize(String(name))
  const safeEmail   = sanitize(String(email))
  const safeMessage = sanitize(String(message))

  // 6. Invio con Resend
  if (!resend) {
    return NextResponse.json({ ok: true })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'antoniorusso1988@outlook.it',
      replyTo: safeEmail,
      subject: `Nuovo messaggio da ${safeName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:2rem">
          <h2 style="color:#0066ff;margin-bottom:1.5rem">Nuovo messaggio dal Portfolio</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0"/>
          <p style="white-space:pre-wrap;line-height:1.7">${safeMessage}</p>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { error: "Errore durante l'invio. Riprova più tardi." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] unexpected error:', err)
    return NextResponse.json(
      { error: 'Errore imprevisto. Riprova più tardi.' },
      { status: 500 }
    )
  }
}