import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint'
import img1  from '@assets/1dir.jpg'
import img2  from '@assets/2dir.jpg'
import img4  from '@assets/4dir.jpg'
import img5  from '@assets/5dir.jpg'
import img8  from '@assets/8dir.jpg'
import img9  from '@assets/9dir.jpg'
import img10 from '@assets/10dir.jpg'
import img12 from '@assets/12dir.jpg'
import img13 from '@assets/13dir.jpg'
import img14 from '@assets/14dir.jpg'
import img15 from '@assets/15dir.jpg'
import img16 from '@assets/16dir.jpg'
import img17 from '@assets/17dir.jpg'
import img18 from '@assets/18dir.jpg'

const COL_GAP = 20
const IMG_GAP = 20
const CONTAINER_HEIGHT = 640

// Each column: width + two images with explicit heights
const columns = [
  { w: 250, images: [{ src: img16, h: 275 }, { src: img14, h: 205 }] },
  { w: 305, images: [{ src: img2,  h: 255 }, { src: img15, h: 355 }] },
  { w: 290, images: [{ src: img12, h: 265 }, { src: img13, h: 275 }] },
  { w: 295, images: [{ src: img1,  h: 315 }, { src: img5,  h: 225 }] },
  { w: 235, images: [{ src: img8,  h: 245 }, { src: img18, h: 215 }] },
  { w: 275, images: [{ src: img9,  h: 275 }, { src: img10, h: 235 }] },
  { w: 300, images: [{ src: img17, h: 245 }, { src: img4,  h: 325 }] },
]

const totalTrackWidth = columns.reduce((acc, c) => acc + c.w + COL_GAP, 0)

function MarqueeColumns({ scale }) {
  const track = [...columns, ...columns]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: COL_GAP,
          width: 'max-content',
          animation: `marqueeColumns 38s linear infinite`,
          alignItems: 'flex-start',
        }}
      >
        {track.map((col, ci) => (
          <div
            key={ci}
            style={{
              flex: `0 0 ${col.w * scale}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: IMG_GAP * scale,
            }}
          >
            {col.images.map((img, ii) => (
              <div
                key={ii}
                style={{
                  width: '100%',
                  height: img.h * scale,
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: '#e5e5e5',
                  flexShrink: 0,
                }}
              >
                <img
                  src={img.src}
                  alt={`Gallery ${ci}-${ii}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const { isMobile } = useBreakpoint()

  const scale = isMobile ? 0.52 : 1

  return (
    <section
      id="gallery"
      style={{
        background: '#fff',
        padding: isMobile ? '72px 0 80px' : '100px 0 120px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes marqueeColumns {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalTrackWidth}px); }
        }
      `}</style>

      {/* Title */}
      <div
        ref={titleRef}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 48px',
          marginBottom: isMobile ? 32 : 56,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            marginBottom: 14,
            fontWeight: 500,
          }}
        >
          Our Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 800,
            color: '#111',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
          }}
        >
          Gallery<span style={{ color: 'var(--blue)' }}>.</span>
        </motion.h2>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ height: CONTAINER_HEIGHT * scale, overflow: 'hidden' }}
      >
        <MarqueeColumns scale={scale} />
      </motion.div>
    </section>
  )
}
