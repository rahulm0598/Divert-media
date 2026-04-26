import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function WhatsAppFloat() {
  const [timerExpanded, setTimerExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef(null)

  const expanded = hovered || timerExpanded

  useEffect(() => {
    const cycle = () => {
      timerRef.current = setTimeout(() => {
        setTimerExpanded(true)
        timerRef.current = setTimeout(() => {
          setTimerExpanded(false)
          cycle()
        }, 2500)
      }, 3000)
    }

    cycle()
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <motion.a
      href="https://wa.me/919747518380"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={{
        position: 'fixed',
        bottom: 28,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        borderRadius: 999,
        background: expanded ? 'rgba(12,12,20,0.92)' : 'transparent',
        backdropFilter: expanded ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: expanded ? 'blur(12px)' : 'none',
        boxShadow: expanded ? '0 4px 28px rgba(0,0,0,0.35)' : '0 4px 16px rgba(0,0,0,0.2)',
        transition: 'background 0.5s, box-shadow 0.5s, backdrop-filter 0.5s',
        cursor: 'pointer',
      }}
    >
      {/* Sliding text */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: expanded ? 130 : 0,
          opacity: expanded ? 1 : 0,
          paddingLeft: expanded ? 16 : 0,
          paddingRight: expanded ? 6 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <span style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#25D366',
          display: 'inline-block',
          flexShrink: 0,
          boxShadow: '0 0 6px #25D366',
        }} />
        <span style={{
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'Neue Montreal, sans-serif',
          letterSpacing: '0.01em',
        }}>
          Contact us
        </span>
      </motion.div>

      {/* WhatsApp icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          margin: 3,
          boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
        }}
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.44.66 4.82 1.9 6.9L2 30l7.3-1.88A13.93 13.93 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4c-2.2 0-4.36-.6-6.24-1.72l-.44-.26-4.34 1.12 1.16-4.2-.3-.46A11.37 11.37 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6c3.06 0 5.93 1.18 8.1 3.32A11.37 11.37 0 0 1 27.4 16c0 6.3-5.1 11.4-11.4 11.4zm6.24-8.54c-.34-.18-2-.98-2.32-1.1-.32-.1-.54-.16-.78.18-.22.34-.88 1.1-1.08 1.32-.2.22-.4.24-.74.08-.34-.18-1.44-.52-2.74-1.66-1.02-.9-1.7-2-1.9-2.34-.2-.34-.02-.52.14-.68.16-.16.34-.4.52-.6.16-.2.22-.34.34-.56.1-.22.06-.42-.02-.6-.08-.16-.78-1.88-1.08-2.58-.28-.66-.58-.58-.78-.58h-.66c-.22 0-.58.08-.88.42-.3.34-1.14 1.12-1.14 2.72s1.16 3.16 1.32 3.38c.18.22 2.3 3.5 5.56 4.9.78.34 1.38.54 1.86.68.78.24 1.5.2 2.06.12.62-.1 1.92-.78 2.2-1.54.26-.76.26-1.4.18-1.54-.1-.14-.32-.22-.66-.38z"/>
        </svg>
      </motion.div>
    </motion.a>
  )
}
