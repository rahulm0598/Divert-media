import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@assets/logo.svg'
import { useBreakpoint } from '../hooks/useBreakpoint'
import ContactButton from './ContactButton'

const links = ['Home', 'About Us', 'Services', 'Gallery']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (label) => {
    const map = { 'Home': 'home', 'About Us': 'about-us', 'Services': 'services', 'Gallery': 'gallery' }
    const el = document.getElementById(map[label])
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: isMobile ? '0 20px' : '0 40px',
          height: isMobile ? 64 : 80,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr auto' : '1fr auto 1fr',
          alignItems: 'center',
          background: scrolled || menuOpen ? 'rgba(8,8,14,0.95)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(18px)' : 'none',
          borderBottom: scrolled && !menuOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: 0, zIndex: 101 }}
        >
          <img src={logo} alt="Divert" style={{ height: isMobile ? 38 : 52, filter: 'invert(1)' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontFamily: 'Neue Montreal, sans-serif', fontWeight: 400, paddingLeft: 2 }}>
            Media Production
          </span>
        </button>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontFamily: 'Neue Montreal, sans-serif', fontWeight: 400, letterSpacing: '0.01em', cursor: 'pointer', padding: '4px 0', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
              >
                {link}
              </button>
            ))}
          </div>
        )}

        {/* Desktop contact button / Mobile hamburger */}
        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 8, zIndex: 101 }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.25 }}
              style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.25 }}
              style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
          </button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ContactButton />
          </div>
        )}
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,14,0.98)', zIndex: 99, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px' }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                onClick={() => { scrollTo(link); setMenuOpen(false) }}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: 36, fontWeight: 700, textAlign: 'left', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', letterSpacing: '-0.02em', fontFamily: 'Neue Montreal, sans-serif' }}
              >
                {link}
              </motion.button>
            ))}
            <ContactButton 
              mobile 
              onClick={() => {
                setMenuOpen(false)
                window.open('https://wa.me/919747518380', '_blank')
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
