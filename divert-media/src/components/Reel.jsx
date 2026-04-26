import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import img17 from '@assets/17dir.jpg'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function Reel() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { isMobile } = useBreakpoint()
  const [isPlaying, setIsPlaying] = useState(false)

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
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {/* Video / Thumbnail */}
            {isPlaying ? (
              <video
                autoPlay
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              >
                <source src="" type="video/mp4" />
              </video>
            ) : (
              <>
                <img
                  src={img17}
                  alt="Showreel preview"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />

                {/* Play button overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.08)',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.18)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.08)' }}
                >
                  {/* Glassmorphic play circle */}
                  <div
                    style={{
                      width: isMobile ? 60 : 80,
                      height: isMobile ? 60 : 80,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    }}
                  >
                    <svg
                      width={isMobile ? 22 : 28}
                      height={isMobile ? 22 : 28}
                      viewBox="0 0 24 24"
                      fill="white"
                      style={{ marginLeft: 3 }}
                    >
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>
                </motion.div>
              </>
            )}
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
