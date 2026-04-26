import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactButton({ mobile = false, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    if (mobile) return
    const { clientX, clientY } = e
    const { left, top, width, height } = btnRef.current.getBoundingClientRect()
    
    // Calculate center of button
    const centerX = left + width / 2
    const centerY = top + height / 2

    // Distance from cursor to center
    const dx = clientX - centerX
    const dy = clientY - centerY

    // Apply magnetic force (max 15px movement)
    const strength = 0.35
    setPosition({ x: dx * strength, y: dy * strength })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  const handleClick = (e) => {
    setIsClicked(true)
    
    // Trigger the burst and redirect after a short delay
    setTimeout(() => {
      setIsClicked(false)
      if (onClick) {
        onClick()
      } else {
        window.open('https://wa.me/919747518380', '_blank')
      }
    }, 600)
  }

  const springConfig = { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }

  return (
    <div 
      style={{ 
        position: 'relative', 
        display: 'inline-block',
        zIndex: 10,
        marginTop: mobile ? 48 : 0,
        alignSelf: mobile ? 'flex-start' : 'auto'
      }}
    >
      <motion.button
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={{ 
          x: position.x, 
          y: position.y,
          scale: isClicked ? 0.92 : (isHovered ? 1.05 : 1)
        }}
        transition={springConfig}
        style={{
          position: 'relative',
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          gap: mobile ? 10 : 8,
          background: mobile ? 'var(--blue)' : 'rgba(255,255,255,0.06)',
          border: mobile ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
          borderRadius: 999,
          padding: mobile ? '14px 28px' : '8px 8px 8px 24px',
          cursor: 'pointer',
          fontSize: mobile ? 15 : 14,
          fontFamily: 'Neue Montreal, sans-serif',
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '0.02em',
          outline: 'none',
          boxShadow: isHovered && !mobile ? '0 0 25px rgba(43,75,255,0.4), 0 0 50px rgba(43,75,255,0.2)' : 'none',
          transition: 'background 0.3s, border-color 0.3s, box-shadow 0.5s',
        }}
      >
        {/* Shimmer Effect */}
        <AnimatePresence>
          {isHovered && !mobile && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                zIndex: 1,
                pointerEvents: 'none',
                borderRadius: 999
              }}
            />
          )}
        </AnimatePresence>

        <motion.span 
          animate={{ x: position.x * 0.4, y: position.y * 0.4 }}
          transition={springConfig}
          style={{ position: 'relative', zIndex: 2 }}
        >
          Contact Us
        </motion.span>
        
        <motion.div
          animate={{ 
            x: (isHovered ? 4 : 0) + (position.x * 0.6), 
            y: position.y * 0.6 
          }}
          transition={{ ...springConfig, stiffness: 200 }}
          style={{ 
            position: 'relative', 
            zIndex: 2, 
            width: mobile ? 22 : 30, 
            height: mobile ? 22 : 30, 
            borderRadius: '50%', 
            background: mobile ? 'rgba(255,255,255,0.2)' : 'var(--blue)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: mobile ? 14 : 16,
            flexShrink: 0
          }}
        >
          →
        </motion.div>

        {/* Burst Animation Overlay - Multi-layered for premium feel */}
        <AnimatePresence>
          {isClicked && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: 60, height: 60,
                  background: 'rgba(255,255,255,0.8)',
                  borderRadius: '50%',
                  x: '-50%', y: '-50%',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: 60, height: 60,
                  border: '2px solid var(--blue)',
                  borderRadius: '50%',
                  x: '-50%', y: '-50%',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Persistent Glow for award-winning feel */}
      {!mobile && (
        <div 
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', height: '40%',
            background: 'var(--blue)',
            filter: 'blur(30px)',
            opacity: isHovered ? 0.4 : 0.1,
            zIndex: -1,
            pointerEvents: 'none',
            transition: 'opacity 0.6s ease'
          }}
        />
      )}
    </div>
  )
}
