import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import logo from '@assets/logo.svg'
import { useBreakpoint } from '../hooks/useBreakpoint'

const links = ['Home', 'About Us', 'Services', 'Gallery']

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isMobile } = useBreakpoint()

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(' ', '-'))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={ref} style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 3, background: 'var(--blue)', transformOrigin: 'left' }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '56px 20px 40px' : '80px 48px 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: isMobile ? 20 : 40, marginBottom: isMobile ? 48 : 72 }}
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 400, letterSpacing: '0.04em', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >
              {link}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <img src={logo} alt="Divert" style={{ width: 'min(600px, 80vw)', filter: 'invert(1)', opacity: 0.9 }} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ fontSize: 11, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 400 }}
          >
            Media Production
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: isMobile ? 48 : 72,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'center',
            gap: isMobile ? 8 : 0,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>© 2026 Divert Media Production. All rights reserved.</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>Bangalore, India</p>
        </motion.div>
      </div>
    </footer>
  )
}
