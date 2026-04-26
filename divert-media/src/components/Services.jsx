import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import img2 from '@assets/2dir.jpg'
import img9 from '@assets/9dir.jpg'
import { useBreakpoint } from '../hooks/useBreakpoint'

const services = [
  { num: '01', title: 'Films', items: ['Corporate films', 'Documentary films', 'Feature Films'], desc: 'We provide complete film services, including pre-production planning, cinematography, direction, editing, and post-production, delivering high-quality visual storytelling for films, commercials, and digital platforms.', images: [img2, img9] },
  { num: '02', title: 'Content Creation', items: ['Social media content', 'Brand storytelling', 'Digital campaigns'], desc: 'Compelling content crafted for every platform — from short-form reels to long-form brand stories that engage and convert.', images: [] },
  { num: '03', title: 'Photography', items: ['Fashion & editorial', 'Product photography', 'Portrait sessions'], desc: 'High-end photography that captures mood, personality, and brand essence with a cinematic eye.', images: [] },
  { num: '04', title: 'Website Development', items: ['Brand websites', 'Portfolio sites', 'E-commerce'], desc: 'Pixel-perfect digital experiences — fast, beautiful, and built to convert.', images: [] },
]

function DiamondIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 0L14 7L7 14L0 7L7 0Z" fill="#2b4bff" />
    </svg>
  )
}

export default function Services() {
  const [open, setOpen] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { isMobile } = useBreakpoint()

  return (
    <section id="services" style={{ background: '#0a0a0f', padding: isMobile ? '80px 0' : '120px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        <div ref={ref} style={{ marginBottom: isMobile ? 48 : 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
          >
            <DiamondIcon />
            <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.04em' }}
          >
            What we do<span style={{ color: 'var(--blue)' }}>.</span>
          </motion.h2>
        </div>

        <div>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{ width: '100%', background: 'none', border: 'none', padding: isMobile ? '20px 0' : '28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 24 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500, letterSpacing: '0.04em', minWidth: 32 }}>[{s.num}]</span>
                  <span style={{ fontSize: 'clamp(18px, 3vw, 30px)', fontWeight: 700, color: open === i ? '#fff' : 'rgba(255,255,255,0.75)', letterSpacing: '-0.02em', transition: 'color 0.25s' }}>
                    {s.title}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: 24, color: open === i ? 'var(--blue)' : 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1, display: 'block', width: 32, height: 32, textAlign: 'center' }}
                >+</motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: isMobile ? 24 : 48,
                      paddingBottom: 32,
                      paddingLeft: isMobile ? 0 : 64,
                    }}>
                      <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: s.images.length ? 24 : 0 }}>
                          {s.items.map((item) => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                              <DiamondIcon />
                              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{item}</span>
                            </div>
                          ))}
                        </div>
                        {s.images.length > 0 && (
                          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                            {s.images.map((img, idx) => (
                              <div key={idx} style={{ width: isMobile ? 120 : 160, height: isMobile ? 80 : 110, borderRadius: 6, overflow: 'hidden', flex: '0 0 auto' }}>
                                <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: 400 }}>{s.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {i === services.length - 1 && <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
