import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import img1 from '@assets/1dir.jpg'
import img2 from '@assets/2dir.jpg'
import img4 from '@assets/4dir.jpg'
import img5 from '@assets/5dir.jpg'
import img9 from '@assets/9dir.jpg'
import img8 from '@assets/8dir.jpg'
import homeVideo from '@assets/home page video.mp4'
import { useBreakpoint } from '../hooks/useBreakpoint'

const bullets = [
  'Design a brand worth remembering',
  'Story-driven web experiences that convert',
  'Pitch decks for 9-figure raises, literally',
  'Dedicated product designers',
  'Output focused design sprints',
]

const stripImages = [img1, img2, img9, img4, img5]
const CENTER_IDX = 2

function TriangleIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M0 0L14 8L0 16V0Z" fill="#2b4bff" />
    </svg>
  )
}

export default function About() {
  const [rowHovered, setRowHovered] = useState(false)
  const [mobileTapped, setMobileTapped] = useState(false)
  const { isMobile } = useBreakpoint()

  const handleTouch = () => {
    setMobileTapped(prev => !prev)
  }

  const contentRef = useRef(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-80px' })

  const stripRef = useRef(null)
  const stripInView = useInView(stripRef, { once: true, margin: '-60px' })

  return (
    <section id="about-us" style={{ background: '#fff', paddingTop: isMobile ? 72 : 100 }}>
      <div ref={contentRef} style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* ABOUT label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 32 : 56 }}
        >
          <TriangleIcon />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111' }}>About</span>
        </motion.div>

        {/* Heading + image row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: isMobile ? 28 : 48,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 20 : 0,
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(44px, 7vw, 96px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#111', margin: 0 }}
          >
            Who we are<span style={{ color: '#2b4bff' }}>.</span>
          </motion.h2>
          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            src={img8}
            alt="Divert Media"
            style={{
              width: isMobile ? '100%' : 320,
              height: isMobile ? 200 : 200,
              objectFit: 'cover',
              borderRadius: 12,
              flexShrink: 0,
            }}
          />
        </div>

        <div style={{ borderTop: '1px solid #e5e5e5', marginBottom: isMobile ? 36 : 64 }} />

        {/* Large two-tone intro */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: isMobile ? 'clamp(22px, 5vw, 32px)' : 'clamp(28px, 3vw, 40px)', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: isMobile ? 40 : 72 }}
        >
          <span style={{ color: '#111' }}>We're not here to play it safe.</span>
          <span style={{ color: '#aaa' }}> We're a design studio driven by curiosity, craft, and conviction.</span>
        </motion.p>

        <div style={{ borderTop: '1px solid #e5e5e5', marginBottom: isMobile ? 40 : 80 }} />

        {/* Two-column → single column on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80,
          marginBottom: isMobile ? 60 : 100,
        }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.85, color: '#222', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            We are a group of artists driven by passion to visualize stories on screen. Based in
            Bangalore and united by a shared love of storytelling and making movies, Divert Media
            blends technical precision with artistic vision in our stories. With over six years of
            experience in corporate and commercial spaces, we have dedicated ourselves to mastering
            not just photography but the craft of making films. From high-profile corporate events and
            modelling portfolios to product campaigns and weddings, we approach every project with a
            deep understanding of narrative, emotion, and detail, ensuring that each frame reflects
            authenticity, professionalism and impact. At our core, we are storytellers committed to
            transforming real moments into memorable and powerful visual experiences that leave a
            lasting impression.
          </motion.p>

          <div>
            {bullets.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
                animate={contentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: isMobile ? '16px 0' : '22px 0' }}>
                  <motion.div variants={{ hover: { x: 5, scale: 1.1 } }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                    <TriangleIcon />
                  </motion.div>
                  <motion.span
                    variants={{ hover: { color: '#2b4bff', x: 3 } }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: isMobile ? 15 : 17, fontWeight: 600, color: '#111', letterSpacing: '-0.02em', lineHeight: 1.4 }}
                  >
                    {text}
                  </motion.span>
                </div>
                <div style={{ height: 1, background: '#e5e5e5' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image strip */}
      <motion.div
        ref={stripRef}
        initial={{ opacity: 0, y: 40 }}
        animate={stripInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', clipPath: isMobile ? 'inset(0)' : 'inset(-80px 0)' }}
      >
        <div
          onMouseEnter={() => !isMobile && setRowHovered(true)}
          onMouseLeave={() => !isMobile && setRowHovered(false)}
          onTouchStart={isMobile ? handleTouch : undefined}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? 8 : 12,
            height: isMobile ? 260 : 470,
            perspective: isMobile ? 'none' : '1400px',
            perspectiveOrigin: 'center center',
            cursor: isMobile ? 'pointer' : 'default',
          }}
        >
          {stripImages.map((src, i) => {
            const isCenter = i === CENTER_IDX
            const active = isMobile ? mobileTapped : rowHovered
            const isSide = !isCenter && active

            const cardWidth = isMobile
              ? isCenter && mobileTapped ? '72%' : isCenter ? '52%' : 'calc(12% - 4px)'
              : isCenter && rowHovered
                ? '48%'
                : 'calc(20% - 10px)'

            return (
              <div
                key={i}
                style={{
                  width: cardWidth,
                  flexShrink: 0,
                  flexGrow: 0,
                  height: '100%',
                  position: 'relative',
                  transition: 'width 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    borderRadius: isMobile ? 10 : 14,
                    background: '#111',
                    transformStyle: 'preserve-3d',
                    transform: active
                      ? isCenter
                        ? isMobile ? 'scale(1.03)' : 'translateZ(120px)'
                        : 'scale(1.05)'
                      : 'translateZ(0) scale(1)',
                    transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.7s ease',
                    boxShadow: active
                      ? isCenter ? '0 30px 80px rgba(0,0,0,0.5)' : '0 16px 40px rgba(0,0,0,0.35)'
                      : '0 4px 16px rgba(0,0,0,0.1)',
                  }}
                >
                  {isCenter ? (
                    <video
                      src={homeVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`Work ${i + 1}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isSide ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0)',
                    transition: 'background 0.8s ease',
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
