import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import img1 from '@assets/1dir.jpg'
import img2 from '@assets/2dir.jpg'
import img4 from '@assets/4dir.jpg'
import img5 from '@assets/5dir.jpg'
import img8 from '@assets/8dir.jpg'
import img9 from '@assets/9dir.jpg'
import img10 from '@assets/10dir.jpg'
import img12 from '@assets/12dir.jpg'
import img13 from '@assets/13dir.jpg'
import img14 from '@assets/14dir.jpg'
import img15 from '@assets/15dir.jpg'
import img16 from '@assets/16dir.jpg'
import img17 from '@assets/17dir.jpg'
import img18 from '@assets/18dir.jpg'

// Row 1 — portrait + landscape mix, varied widths
const row1 = [
  { src: img8,  w: 210 },
  { src: img9,  w: 260 },
  { src: img10, w: 250 },
  { src: img12, w: 230 },
  { src: img13, w: 250 },
  { src: img1,  w: 220 },
  { src: img2,  w: 240 },
  { src: img4,  w: 230 },
]

// Row 2 — different order, varied widths
const row2 = [
  { src: img18, w: 220 },
  { src: img17, w: 310 },
  { src: img16, w: 230 },
  { src: img15, w: 330 },
  { src: img14, w: 230 },
  { src: img5,  w: 240 },
  { src: img13, w: 250 },
  { src: img9,  w: 260 },
]

const ROW_HEIGHT = 280
const GAP = 14

function MarqueeRow({ images, duration, rowHeight }) {
  // Duplicate for seamless loop
  const track = [...images, ...images]

  const totalWidth = images.reduce((acc, img) => acc + img.w + GAP, 0)

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: GAP,
          width: 'max-content',
          animation: `marqueeScroll ${duration}s linear infinite`,
        }}
      >
        {track.map((item, i) => (
          <div
            key={i}
            style={{
              flex: `0 0 ${item.w}px`,
              height: rowHeight,
              borderRadius: 18,
              overflow: 'hidden',
              background: '#ddd',
            }}
          >
            <img
              src={item.src}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      id="gallery"
      style={{ background: '#fff', padding: '100px 0 120px', overflow: 'hidden' }}
    >
      {/* Inject keyframe */}
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Title */}
      <div
        ref={titleRef}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', marginBottom: 56 }}
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

      {/* Row 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ marginBottom: GAP }}
      >
        <MarqueeRow images={row1} duration={28} rowHeight={ROW_HEIGHT} />
      </motion.div>

      {/* Row 2 — slightly faster for depth feel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <MarqueeRow images={row2} duration={22} rowHeight={ROW_HEIGHT} />
      </motion.div>
    </section>
  )
}
