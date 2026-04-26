import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import img17 from '@assets/17dir.jpg'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function Reel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { isMobile } = useBreakpoint()

  return (
    <section style={{ background: '#fff', padding: isMobile ? '72px 0 80px' : '100px 0 120px', borderTop: '1px solid #e5e5e5' }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 48px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 60,
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: isMobile ? 'clamp(56px, 16vw, 96px)' : 'clamp(64px, 8vw, 120px)', fontWeight: 800, color: '#111', lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 24 }}
          >
            2026<span style={{ color: 'var(--blue)' }}>.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ fontSize: 15, color: '#666', lineHeight: 1.75, maxWidth: 340, marginBottom: 36 }}
          >
            Our work is best experienced in motion.<br />
            Don't forget to put on your headphones.
          </motion.p>

          <motion.a
            href="#"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, border: '1.5px solid #111', padding: '14px 28px', color: '#111', textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.25s, color 0.25s', borderRadius: 2 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111' }}
          >
            <span>▶</span> Watch Reel
          </motion.a>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 16 }}>
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: isMobile ? '100%' : '60%', borderRadius: 4, overflow: 'hidden', aspectRatio: '4/3' }}
          >
            <img src={img17} alt="Reel preview" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: isMobile ? 'clamp(48px, 14vw, 80px)' : 'clamp(56px, 7vw, 96px)', fontWeight: 900, color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            REEL
          </motion.span>
        </div>
      </div>
    </section>
  )
}
