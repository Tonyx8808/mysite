# Antonio Russo — Portfolio (Next.js + TypeScript)

## Stack
- **Next.js 14** (App Router, static export)
- **TypeScript**
- **Tailwind CSS**
- **Custom CSS** (vars, animations, scroll effects)

## Setup

```bash
npm install
npm run dev
```

## Assets richiesti
Metti questi file in `/public/`:
- `logo.png` — logo AR (usato in Navbar e Footer)
- `logo2.png` — avatar/illustration (usato in Chi Sono)

## Build statica
```bash
npm run build
```
Output in `/out/` — pronto per Netlify, Vercel o hosting statico.

## Struttura file

```
antonio-russo/
├── app/
│   ├── layout.tsx        # Root layout + Google Fonts
│   ├── page.tsx          # Page principale (compone tutto)
│   └── globals.css       # Design tokens, animazioni, utility classes
├── components/
│   ├── Navbar.tsx        # Navbar fixed + logo1
│   ├── Footer.tsx        # Footer + logo1
│   ├── Loader.tsx        # Loader animato con percentuale
│   ├── HeroSection.tsx   # Hero con titolo 3D, floating cards, parallax
│   ├── Marquee.tsx       # Ticker animato
│   ├── AboutSection.tsx  # Chi sono + logo2 come portrait
│   ├── ServicesSection.tsx # Accordion servizi
│   ├── SkillsSection.tsx # Orbit 3D + barre
│   ├── QuoteSection.tsx  # Citazione
│   └── ContactSection.tsx # Contatti + social
└── hooks/
    └── useScrollReveal.ts # Cursor, parallax, 3D scroll, counters, skill bars
```

## Features
- Scroll reveal 3D con `perspective` e `rotateX`
- Cursor custom con lag effect
- Parallax hero glow sul mouse
- Hero title tilt 3D
- Orbit 3D che si inclina sullo scroll
- Loader animato con easing
- Accordion servizi con animazione `grid-template-rows`
- Contatori animati con easing cubico
- Barre skill con IntersectionObserver
- Marquee ticker infinito
- Responsive mobile
# mysite
