import React, { useMemo } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styles from './ParallaxHero.module.css';

const images = [
  '1ApplePencil.png',
  '1iPadScreen.png',
  '2Pencil2.png',
  '3StaedlerPen.png',
  '4iPhone.png',
  '5SketchedGrid.png', // grid paper (will be used as frame)
  '6PostItYellow-ang.png',
  '7PostitPink-ang.png',
  '8PostitBlue-ang.png',
  '9StaedlerPencil.png',
  '10GridPaper.png',
  '11magicmouse.png',
  '12Keyboard.png',
  '13Pencil.png',
  '14journalgrid.png',
  '15Coffee.png',
  '16journal2.png',
];

// Device-specific configs for entry/exit/parallax
const getAnimConfigs = (width) => {
  if (width < 600) {
    // Mobile
    return [
      { y: 0, x: -180, rotate: -18, delay: 0.05, duration: 1.1, scale: [0.8, 1] },
      { y: -120, x: 0, rotate: 12, delay: 0.1, duration: 1.1, scale: [0.7, 1] },
      { y: 0, x: 200, rotate: 15, delay: 0.15, duration: 1, scale: [0.75, 1] },
      { y: 120, x: 0, rotate: -10, delay: 0.18, duration: 1.1, scale: [0.7, 1] },
      { y: 80, x: -120, rotate: 10, delay: 0.22, duration: 1.1, scale: [0.75, 1] },
      { y: 0, x: 0, rotate: 0, delay: 0.05, duration: 1.2, scale: [1.1, 1.4] },
      { y: -100, x: -80, rotate: -12, delay: 0.12, duration: 1, scale: [0.6, 1] },
      { y: -110, x: 80, rotate: 16, delay: 0.16, duration: 1.1, scale: [0.6, 1] },
      { y: 100, x: 100, rotate: -14, delay: 0.19, duration: 1.05, scale: [0.6, 1] },
      { y: -60, x: -120, rotate: 8, delay: 0.13, duration: 1, scale: [0.7, 1] },
      { y: 120, x: 0, rotate: 0, delay: 0.2, duration: 1.1, scale: [1, 1.2] },
      { y: -60, x: 120, rotate: -8, delay: 0.11, duration: 1, scale: [0.7, 1] },
      { y: 0, x: 120, rotate: 10, delay: 0.14, duration: 1.1, scale: [0.75, 1] },
      { y: 80, x: -80, rotate: -10, delay: 0.17, duration: 1, scale: [0.7, 1] },
      { y: -120, x: 0, rotate: 6, delay: 0.21, duration: 1.1, scale: [0.7, 1] },
      { y: 100, x: -60, rotate: 12, delay: 0.23, duration: 1.05, scale: [0.7, 1] },
      { y: 100, x: 60, rotate: -10, delay: 0.24, duration: 1.05, scale: [0.7, 1] },
    ];
  } else if (width < 900) {
    // Tablet
    return [
      { y: 0, x: -300, rotate: -22, delay: 0.05, duration: 1.15, scale: [0.85, 1] },
      { y: -200, x: 0, rotate: 16, delay: 0.1, duration: 1.2, scale: [0.75, 1] },
      { y: 0, x: 320, rotate: 18, delay: 0.15, duration: 1.1, scale: [0.8, 1] },
      { y: 180, x: 0, rotate: -14, delay: 0.18, duration: 1.15, scale: [0.75, 1] },
      { y: 120, x: -200, rotate: 12, delay: 0.22, duration: 1.15, scale: [0.8, 1] },
      { y: 0, x: 0, rotate: 0, delay: 0.05, duration: 1.3, scale: [1.15, 1.5] },
      { y: -180, x: -120, rotate: -16, delay: 0.12, duration: 1.05, scale: [0.65, 1] },
      { y: -190, x: 120, rotate: 22, delay: 0.16, duration: 1.15, scale: [0.65, 1] },
      { y: 180, x: 180, rotate: -20, delay: 0.19, duration: 1.1, scale: [0.65, 1] },
      { y: -120, x: -200, rotate: 10, delay: 0.13, duration: 1.05, scale: [0.75, 1] },
      { y: 200, x: 0, rotate: 0, delay: 0.2, duration: 1.2, scale: [1.05, 1.3] },
      { y: -120, x: 200, rotate: -10, delay: 0.11, duration: 1.05, scale: [0.75, 1] },
      { y: 0, x: 200, rotate: 14, delay: 0.14, duration: 1.15, scale: [0.8, 1] },
      { y: 120, x: -120, rotate: -14, delay: 0.17, duration: 1.05, scale: [0.75, 1] },
      { y: -200, x: 0, rotate: 8, delay: 0.21, duration: 1.15, scale: [0.75, 1] },
      { y: 180, x: -100, rotate: 16, delay: 0.23, duration: 1.1, scale: [0.75, 1] },
      { y: 180, x: 100, rotate: -14, delay: 0.24, duration: 1.1, scale: [0.75, 1] },
    ];
  }
  // Desktop (default)
  return [
    { y: 0, x: -400, rotate: -30, delay: 0.05, duration: 1.2, scale: [0.9, 1] },
    { y: -350, x: 0, rotate: 20, delay: 0.1, duration: 1.3, scale: [0.8, 1] },
    { y: 0, x: 420, rotate: 25, delay: 0.15, duration: 1.1, scale: [0.85, 1] },
    { y: 320, x: 0, rotate: -18, delay: 0.18, duration: 1.2, scale: [0.8, 1] },
    { y: 250, x: -300, rotate: 15, delay: 0.22, duration: 1.25, scale: [0.85, 1] },
    { y: 0, x: 0, rotate: 0, delay: 0.05, duration: 1.4, scale: [1.2, 1.6] },
    { y: -300, x: -250, rotate: -22, delay: 0.12, duration: 1.1, scale: [0.7, 1] },
    { y: -320, x: 250, rotate: 30, delay: 0.16, duration: 1.2, scale: [0.7, 1] },
    { y: 300, x: 300, rotate: -28, delay: 0.19, duration: 1.15, scale: [0.7, 1] },
    { y: -200, x: -350, rotate: 12, delay: 0.13, duration: 1.1, scale: [0.8, 1] },
    { y: 400, x: 0, rotate: 0, delay: 0.2, duration: 1.3, scale: [1.1, 1.5] },
    { y: -200, x: 350, rotate: -15, delay: 0.11, duration: 1.1, scale: [0.8, 1] },
    { y: 0, x: 400, rotate: 18, delay: 0.14, duration: 1.2, scale: [0.85, 1] },
    { y: 250, x: -250, rotate: -20, delay: 0.17, duration: 1.1, scale: [0.8, 1] },
    { y: -350, x: 0, rotate: 10, delay: 0.21, duration: 1.2, scale: [0.8, 1] },
    { y: 300, x: -200, rotate: 25, delay: 0.23, duration: 1.15, scale: [0.8, 1] },
    { y: 300, x: 200, rotate: -18, delay: 0.24, duration: 1.15, scale: [0.8, 1] },
  ];
};

// Global scale factor for all animated elements (easy to tweak)
const ELEMENT_SCALE = 0.75;
const BLEED_MULTIPLIER = 2.2; // Increase for more dramatic off-canvas bleed

function GridPaperSVG({ width, height, orientation }) {
  // Grid settings
  const gridSize = 24; // px per square
  const borderColor = '#1a3555'; // dark blue border
  const gridColor = '#6ec1e4'; // light blue grid
  const borderWidth = 2.5;
  const gridWidth = 1;
  // 25px margin on left/right
  const svgW = Math.max(0, width - 50);
  const svgH = Math.max(0, height - 50);
  const cols = Math.floor(svgW / gridSize);
  const rows = Math.floor(svgH / gridSize);
  const gridW = cols * gridSize;
  const gridH = rows * gridSize;
  return (
    <svg
      width={gridW}
      height={gridH}
      viewBox={`0 0 ${gridW} ${gridH}`}
      style={{
        position: 'absolute',
        left: 25,
        right: 25,
        top: '50%',
        transform: `translateY(-50%) rotate(${orientation === 'portrait' ? 90 : 0}deg)`,
        zIndex: 1, // lowest layer
        background: '#fff',
        boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        borderRadius: 8,
        pointerEvents: 'none',
        display: 'block',
        margin: '0 auto',
      }}
      aria-hidden="true"
      focusable="false"
    >
      {/* Grid lines */}
      <g stroke={gridColor} strokeWidth={gridWidth}>
        {/* Vertical lines */}
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <line key={`v${i}`} x1={i * gridSize} y1={0} x2={i * gridSize} y2={gridH} />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * gridSize} x2={gridW} y2={i * gridSize} />
        ))}
      </g>
      {/* Border */}
      <rect
        x={0}
        y={0}
        width={gridW}
        height={gridH}
        fill="none"
        stroke={borderColor}
        strokeWidth={borderWidth}
        rx={8}
      />
    </svg>
  );
}

function useWindowWidthAndOrientation() {
  const [state, setState] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return { width: window.innerWidth, height: window.innerHeight, orientation: window.innerWidth < window.innerHeight ? 'portrait' : 'landscape' };
    }
    return { width: 1200, height: 800, orientation: 'landscape' };
  });
  React.useEffect(() => {
    const handleResize = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.innerWidth < window.innerHeight ? 'portrait' : 'landscape',
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return state;
}

export default function ParallaxHero() {
  const { width, height, orientation } = useWindowWidthAndOrientation();
  const animConfigs = useMemo(() => getAnimConfigs(width), [width]);
  const { scrollY } = useViewportScroll();
  const scrollRange = [0, 400];

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* SVG Grid Paper Frame, lowest z-index, 25px left/right margin, rotates in portrait */}
        <GridPaperSVG width={width} height={height} orientation={orientation} />
        {/* Animated Elements (z-index 2, above grid, below hero text, all scale 1:1) */}
        {images.map((img, i) => {
          if (i === 5) return null; // skip grid frame
          const cfg = animConfigs[i];
          // Bleed off canvas: increase x/y offsets for more dramatic entry/exit
          const y = useTransform(scrollY, scrollRange, [0, cfg.y * BLEED_MULTIPLIER]);
          const x = useTransform(scrollY, scrollRange, [0, cfg.x * BLEED_MULTIPLIER]);
          const rotate = useTransform(scrollY, scrollRange, [0, cfg.rotate]);
          const scale = useTransform(scrollY, scrollRange, [cfg.scale[1] * ELEMENT_SCALE, cfg.scale[0] * ELEMENT_SCALE]);
          return (
            <motion.img
              key={img}
              src={`/frontpage/${img}`}
              alt={img.replace('.png', '')}
              className={`${styles.heroImage} ${styles[`img${i}`]}`}
              style={{ y, x, rotate, scale, willChange: 'transform', zIndex: 2 }}
              initial={{
                y: cfg.y * BLEED_MULTIPLIER,
                x: cfg.x * BLEED_MULTIPLIER,
                rotate: cfg.rotate,
                scale: cfg.scale[0] * ELEMENT_SCALE,
                opacity: 0,
              }}
              animate={{
                y: 0,
                x: 0,
                rotate: 0,
                scale: cfg.scale[1] * ELEMENT_SCALE,
                opacity: 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 70,
                damping: 14,
                delay: cfg.delay,
                duration: cfg.duration,
                bounce: 0.45,
              }}
              loading="lazy"
            />
          );
        })}
        {/* Hero Message Centered Above Grid, semi-opaque but accessible (z-index 10) */}
        <div className={styles.heroMessage} style={{
          background: 'rgba(255,255,255,0.82)',
          color: '#111',
          textShadow: '0 2px 8px rgba(255,255,255,0.12), 0 1px 0 #fff',
          border: '1.5px solid rgba(0,0,0,0.07)',
          zIndex: 10,
        }}>
          <h1>Better Experiences. Real Results.</h1>
          <p>Quentin Little - User Experience Designer</p>
          <p>Where business needs and user needs align, every click is a step toward success.</p>
          <p>Explore hands-on case studies that show not just what was built—but why it mattered, for people and the bottom line.</p>
        </div>
      </div>
    </section>
  );
} 