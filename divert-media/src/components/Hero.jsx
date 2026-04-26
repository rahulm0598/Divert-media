import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint'
import video from '@assets/bulagari 2.mp4'
import logo from '@assets/logo.svg'

export default function Hero() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const { isMobile } = useBreakpoint()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <section
      id="home"
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#08080e',
      }}
    >
      {/* Parallax video */}
      <motion.div style={{ y, position: 'absolute', inset: '-15% 0', zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Gradient overlays — keep video visible, darken edges */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,14,0.25) 0%, rgba(8,8,14,0.1) 40%, rgba(8,8,14,0.55) 80%, rgba(8,8,14,0.95) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(8,8,14,0.4) 0%, transparent 50%, rgba(8,8,14,0.2) 100%)',
        }} />
      </motion.div>

      {/* Play / Pause button — center */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <motion.button
          onClick={togglePlay}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            pointerEvents: 'auto',
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            fontSize: 20,
            transition: 'background 0.25s',
          }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.28)' }}
          whileTap={{ scale: 0.95 }}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="2" width="4" height="14" rx="1" fill="white" />
              <rect x="11" y="2" width="4" height="14" rx="1" fill="white" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 2L15 9L4 16V2Z" fill="white" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Bottom-left — large Divert logo watermark */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: -20,
          left: isMobile ? 16 : 40,
          zIndex: 2,
          opacity,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={logo}
          alt="Divert"
          style={{
            width: isMobile ? 'min(260px, 70vw)' : 'min(480px, 55vw)',
            filter: 'invert(1)',
            opacity: 0.92,
            display: 'block',
          }}
        />
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: 32,
          right: 48,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.4)', transformOrigin: 'left' }}
        />
      </motion.div>
    </section>
  )
}
