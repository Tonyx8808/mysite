import type { Metadata } from 'next'
import { Syne, Space_Mono, DM_Sans } from 'next/font/google'
// TypeScript may complain about importing CSS modules without declarations in this repo.
// Suppress the error for this global CSS side-effect import.
// @ts-ignore
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

// ── Font setup ───────────────────────────────────────────────────
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

// ── Dominio ──────────────────────────────────────────────────────
const SITE_URL = 'https://arussodev.it'

// ── Metadata SEO ─────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Antonio Russo — Front-End Designer & Developer',
    template: '%s | Antonio Russo',
  },
  description:
    'Front-End Designer & Developer basato a Napoli. Creo esperienze web premium con Next.js, TypeScript e Framer Motion. Disponibile per nuovi progetti.',

  keywords: [
    'front-end developer napoli',
    'web designer napoli',
    'next.js developer italia',
    'antonio russo portfolio',
    'framer motion developer',
    'typescript react developer',
    'ui designer freelance',
  ],

  authors: [{ name: 'Antonio Russo', url: SITE_URL }],
  creator: 'Antonio Russo',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: SITE_URL,
    siteName: 'Antonio Russo',
    title: 'Antonio Russo — Front-End Designer & Developer',
    description:
      'Esperienze web premium costruite con Next.js, TypeScript e Framer Motion. Basato a Napoli.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Antonio Russo — Front-End Designer & Developer',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ── Root Layout ──────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body>
        {/* JSON-LD esterno (compatibile CSP strict) */}
     <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Antonio Russo",
      "url": "https://arussodev.it",
      "jobTitle": "Front-End Designer & Developer",
      "description": "Front-End Designer e Developer basato a Napoli.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Napoli",
        "addressCountry": "IT"
      },
      "sameAs": [
        "https://linkedin.com/in/antonio-russo88",
        "https://github.com/Tonyx8808"
      ]
    })
  }}
/>

        {/* Background Spline globale */}
        <div className="global-spline-bg">
          <iframe
            src="https://my.spline.design/untitled-f680ea749fc30deeb5eff5a8b15b2f63"
            title="background"
            style={{ border: 'none' }}
          />
        </div>

        {children}

        <CookieBanner />
      </body>
    </html>
  )
}
