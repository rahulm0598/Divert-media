import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import img17 from '@assets/17dir.jpg'
import reelVideo from '@assets/bulagari.mp4'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function Reel() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { isMobile } = useBreakpoint()
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  /* ── scroll-driven expansion ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  // Video box width: starts at 55% → expands to 92% as you scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.55, 1])
  const videoWidth = useTransform(scrollYProgress, [0, 1], ['55%', '92%'])
  const videoBorderRadius = useTransform(scrollYProgress, [0, 1], [40, 24])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])

  /* ── Diagonal stripe background pattern (CSS) ── */
  const stripesBg = {
    backgroundImage: `repeating-linear-gradient(
      -55deg,
      transparent,
      transparent 35px,
      rgba(200, 200, 220, 0.12) 35px,
      rgba(200, 200, 220, 0.12) 36px
    )`,
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#f0f0f4',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '72px 0 60px' : '100px 0 120px',
      }}
    >
      <style>{`
        @keyframes reelFill {
          0%   { background-position: -100% center; }
          100% { background-position: 200% center; }
        }
        video::-webkit-media-controls { display: none !important; }
        video::-webkit-media-controls-enclosure { display: none !important; }
        video::-webkit-media-controls-overlay-play-button { display: none !important; }
      `}</style>

      {/* Diagonal stripe overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          ...stripesBg,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* ── Heading "2026." ── */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: isMobile ? 'clamp(64px, 18vw, 120px)' : 'clamp(80px, 10vw, 160px)',
            fontWeight: 800,
            color: '#111',
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            margin: 0,
            marginBottom: isMobile ? 48 : 72,
          }}
        >
          2026<span style={{ color: 'var(--blue)', fontSize: '0.45em', verticalAlign: 'baseline', marginLeft: 2 }}>■</span>
        </motion.h2>

        {/* ── Animated Video Box ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            style={{
              width: isMobile ? '100%' : videoWidth,
              borderRadius: isMobile ? 20 : videoBorderRadius,
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '16 / 9',
              cursor: 'pointer',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
              opacity: isMobile ? 1 : videoOpacity,
              background: '#111',
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            onClick={togglePlay}
          >
            {/* Thumbnail shown when paused — no video element so no native UI */}
            {!isPlaying && (
              <img
                src={img17}
                alt="Reel thumbnail"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}

            {/* Video only mounted when playing */}
            {isPlaying && (
              <video
                ref={videoRef}
                autoPlay
                loop
                playsInline
                disablePictureInPicture
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                src={reelVideo}
              />
            )}

            {/* Custom play/pause button — always on top */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              <motion.button
                onClick={e => { e.stopPropagation(); togglePlay() }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.32)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  pointerEvents: 'auto',
                  width: isMobile ? 60 : 76,
                  height: isMobile ? 60 : 76,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                }}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                    <rect x="3" y="2" width="4" height="14" rx="1" fill="white" />
                    <rect x="11" y="2" width="4" height="14" rx="1" fill="white" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" style={{ marginLeft: 3 }}>
                    <path d="M4 2L15 9L4 16V2Z" fill="white" />
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 32,
          }}
        >
          <span
            style={{
              fontSize: isMobile ? 'clamp(48px, 14vw, 80px)' : 'clamp(56px, 7vw, 96px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              userSelect: 'none',
              background: 'linear-gradient(90deg, rgba(43,75,255,0.15) 0%, rgba(43,75,255,0.15) 25%, #2b4bff 50%, rgba(43,75,255,0.15) 75%, rgba(43,75,255,0.15) 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              animation: 'reelFill 2.8s linear infinite',
            }}
          >
            REEL
          </span>
        </motion.div>
      </div>
    </section>
  )
}
