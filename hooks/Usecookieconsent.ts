'use client'

import { useState, useEffect } from 'react'

type ConsentStatus = 'pending' | 'accepted' | 'declined'

const STORAGE_KEY = 'cookie_consent'

/**
 * Hook per leggere/modificare il consenso cookie.
 *
 * Uso:
 *   const { consent, accept, decline, reset } = useCookieConsent()
 *
 *   if (consent === 'accepted') {
 *     // inizializza analytics, etc.
 *   }
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>('pending')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null
    if (saved) setConsent(saved)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY)
    setConsent('pending')
  }

  return { consent, accept, decline, reset }
}