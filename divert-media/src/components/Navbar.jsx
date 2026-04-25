import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import logo from '@assets/logo.svg'

const links = ['Home', 'About Us', 'Services', 'Gallery']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (label) => {
    const map = {
      'Home': 'home',
      'About Us': 'about-us',
      'Services': 'services',
      'Gallery': 'gallery',
    }
    const el = document.getElementById(map[label])
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 40px',
        height: 80,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        background: scrolled ? 'rgba(8,8,14,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Left — Logo + subtitle */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: 0 }}
      >
        <img src={logo} alt="Divert" style={{ height: 36, filter: 'invert(1)' }} />
        <span style={{
          fontSize: 9,
          letterSpacing: '0.28em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          paddingLeft: 2,
        }}>
          Media Production
        </span>
      </button>

      {/* Center — Nav links */}
      <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 15,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              letterSpacing: '0.01em',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Right — Contact Us button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.7)',
            borderRadius: 999,
            padding: '10px 20px 10px 24px',
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            transition: 'background 0.25s, border-color 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
            e.currentTarget.style.borderColor = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'
          }}
        >
          Contact Us
          <span style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}>
            →
          </span>
        </button>
      </div>
    </motion.nav>
  )
}
