import type { Metadata } from 'next'
import { Syne, Space_Mono, DM_Sans } from 'next/font/google'
// @ts-ignore
import './globals.css'
import MeshBackground from '@/components/Meshbackground'
import CookieBanner from '@/components/CookieBanner'

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

export const metadata: Metadata = {
  title: 'Antonio Russo — Front-End Designer',
  description: 'Front-End Designer & Developer. Trasformo idee in esperienze digitali che respirano.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}>
      <body>
        
        {/* Background Spline globale */}
        <div className="global-spline-bg">
          <iframe
            src="https://my.spline.design/untitled-f680ea749fc30deeb5eff5a8b15b2f63"
            frameBorder="0"
          />
        </div>

        {children}

        <CookieBanner />
      </body>
    </html>
  )
}
