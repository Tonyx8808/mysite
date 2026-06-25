const ITEMS = [
  'Front-End Design', 'React & JavaScript', 'UI/UX Design',
  'Motion & Animation', 'Web Performance', 'Architetture Pulite',
  'Front-End Design', 'React & JavaScript', 'UI/UX Design',
  'Motion & Animation', 'Web Performance', 'Architetture Pulite',
]

export default function Marquee() {
  return (
    <div style={{
      borderTop: '1px solid rgba(0,102,255,0.15)',
      borderBottom: '1px solid rgba(0,102,255,0.15)',
      background: 'var(--navy-light)',
      overflow: 'hidden',
      padding: '0.85rem 0',
    }}>
      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '3rem' }}>
            <span style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--chrome-dark)',
              textTransform: 'uppercase',
            }}>{item}</span>
            <span style={{
              color: 'var(--blue-bright)', fontSize: '0.65rem',
            }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
