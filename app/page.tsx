'use client'

import { useState, useEffect, useCallback } from 'react'

import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Marquee from '@/components/Marquee'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import SkillsSection from '@/components/SkillsSection'
import QuoteSection from '@/components/QuoteSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

import {
  initScrollReveal,
  initParallax,
  initHeroTilt,
  initCustomCursor,
  initSkillBars,
  initCounters,
  initOrbitTilt,
} from '@/hooks/effects'



export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderDone = useCallback(() => {
    setLoaded(true)
  }, [])

  // Init hooks SOLO dopo che il loader è completato
  useEffect(() => {
  if (!loaded) return

  initCustomCursor()
  initScrollReveal()
  initParallax()
  initHeroTilt()
  initSkillBars()
  initCounters()
  initOrbitTilt()
}, [loaded])


  return (
    <>
      {/* Cursor */}
      <div id="cursor" />
      <div id="cursor-dot" />

      {/* Loader */}
      <Loader onDone={handleLoaderDone} />

      {/* Main content */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navbar />

        <main>
          <HeroSection />
          <Marquee />
          <AboutSection />
          <ServicesSection />
          <SkillsSection />
          <QuoteSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}
