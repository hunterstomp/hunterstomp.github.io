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
      { y: 0, x: -180, rotate: -18, delay: 0.05, duration: 1.1, scale: [1, 1] },
      { y: -120, x: 0, rotate: 12, delay: 0.1, duration: 1.1, scale: [1, 1] },
      { y: 0, x: 200, rotate: 15, delay: 0.15, duration: 1, scale: [1, 1] },
      { y: 120, x: 0, rotate: -10, delay: 0.18, duration: 1.1, scale: [1, 1] },
      { y: 80, x: -120, rotate: 10, delay: 0.22, duration: 1.1, scale: [1, 1] },
      { y: 0, x: 0, rotate: 0, delay: 0.05, duration: 1.2, scale: [1, 1] },
      { y: -100, x: -80, rotate: -12, delay: 0.12, duration: 1, scale: [1, 1] },
      { y: -110, x: 80, rotate: 16, delay: 0.16, duration: 1.1, scale: [1, 1] },
      { y: 100, x: 100, rotate: -14, delay: 0.19, duration: 1.05, scale: [1, 1] },
      { y: -60, x: -120, rotate: 8, delay: 0.13, duration: 1, scale: [1, 1] },
      { y: 120, x: 0, rotate: 0, delay: 0.2, duration: 1.1, scale: [1, 1] },
      { y: -60, x: 120, rotate: -8, delay: 0.11, duration: 1, scale: [1, 1] },
      { y: 0, x: 120, rotate: 10, delay: 0.14, duration: 1.1, scale: [1, 1] },
      { y: 80, x: -80, rotate: -10, delay: 0.17, duration: 1, scale: [1, 1] },
      { y: -120, x: 0, rotate: 6, delay: 0.21, duration: 1.1, scale: [1, 1] },
      { y: 100, x: -60, rotate: 12, delay: 0.23, duration: 1.05, scale: [1, 1] },
      { y: 100, x: 60, rotate: -10, delay: 0.24, duration: 1.05, scale: [1, 1] },
    ];
  } else if (width < 900) {
    // Tablet
    return [
      { y: 0, x: -300, rotate: -22, delay: 0.05, duration: 1.15, scale: [1, 1] },
      { y: -200, x: 0, rotate: 16, delay: 0.1, duration: 1.2, scale: [1, 1] },
      { y: 0, x: 320, rotate: 18, delay: 0.15, duration: 1.1, scale: [1, 1] },
      { y: 180, x: 0, rotate: -14, delay: 0.18, duration: 1.15, scale: [1, 1] },
      { y: 120, x: -200, rotate: 12, delay: 0.22, duration: 1.15, scale: [1, 1] },
      { y: 0, x: 0, rotate: 0, delay: 0.05, duration: 1.3, scale: [1, 1] },
      { y: -180, x: -120, rotate: -16, delay: 0.12, duration: 1.05, scale: [1, 1] },
      { y: -190, x: 120, rotate: 22, delay: 0.16, duration: 1.15, scale: [1, 1] },
      { y: 180, x: 180, rotate: -20, delay: 0.19, duration: 1.1, scale: [1, 1] },
      { y: -120, x: -200, rotate: 10, delay: 0.13, duration: 1.05, scale: [1, 1] },
      { y: 200, x: 0, rotate: 0, delay: 0.2, duration: 1.2, scale: [1, 1] },
      { y: -120, x: 200, rotate: -10, delay: 0.11, duration: 1.05, scale: [1, 1] },
      { y: 0, x: 200, rotate: 14, delay: 0.14, duration: 1.15, scale: [1, 1] },
      { y: 120, x: -120, rotate: -14, delay: 0.17, duration: 1.05, scale: [1, 1] },
      { y: -200, x: 0, rotate: 8, delay: 0.21, duration: 1.15, scale: [1, 1] },
      { y: 180, x: -100, rotate: 16, delay: 0.23, duration: 1.1, scale: [1, 1] },
      { y: 180, x: 100, rotate: -14, delay: 0.24, duration: 1.1, scale: [1, 1] },
    ];
  }
  // Desktop (default)
  return [
    { y: 0, x: -400, rotate: -30, delay: 0.05, duration: 1.2, scale: [1, 1] },
    { y: -350, x: 0, rotate: 20, delay: 0.1, duration: 1.3, scale: [1, 1] },
    { y: 0, x: 420, rotate: 25, delay: 0.15, duration: 1.1, scale: [1, 1] },
    { y: 320, x: 0, rotate: -18, delay: 0.18, duration: 1.2, scale: [1, 1] },
    { y: 250, x: -300, rotate: 15, delay: 0.22, duration: 1.25, scale: [1, 1] },
    { y: 0, x: 0, rotate: 0, delay: 0.05, duration: 1.4, scale: [1, 1] },
    { y: -300, x: -250, rotate: -22, delay: 0.12, duration: 1.1, scale: [1, 1] },
    { y: -320, x: 250, rotate: 30, delay: 0.16, duration: 1.2, scale: [1, 1] },
    { y: 300, x: 300, rotate: -28, delay: 0.19, duration: 1.15, scale: [1, 1] },
    { y: -200, x: -350, rotate: 12, delay: 0.13, duration: 1.1, scale: [1, 1] },
    { y: 400, x: 0, rotate: 0, delay: 0.2, duration: 1.3, scale: [1, 1] },
    { y: -200, x: 350, rotate: -15, delay: 0.11, duration: 1.1, scale: [1, 1] },
    { y: 0, x: 400, rotate: 18, delay: 0.14, duration: 1.2, scale: [1, 1] },
    { y: 250, x: -250, rotate: -20, delay: 0.17, duration: 1.1, scale: [1, 1] },
    { y: -350, x: 0, rotate: 10, delay: 0.21, duration: 1.2, scale: [1, 1] },
    { y: 300, x: -200, rotate: 25, delay: 0.23, duration: 1.15, scale: [1, 1] },
    { y: 300, x: 200, rotate: -18, delay: 0.24, duration: 1.15, scale: [1, 1] },
  ];
};

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
  // Parallax range: 0 to 400px scroll
  const scrollRange = [0, 400];

  // For exit: as you scroll down, elements move OUT toward their entry direction; scroll up, they move IN to final position
  // So, at scrollY=0, elements are in final position; at scrollY=400, they're back at their entry (offscreen) position

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Grid Paper as Frame, always centered, 25px padding, rotates in portrait */}
        <motion.img
          src={`/frontpage/5SketchedGrid.png`}
          alt="Grid Paper Frame"
          className={`${styles.heroImage} ${styles.gridFrame}`}
          initial={{ scale: animConfigs[5].scale[1], opacity: 0, rotate: orientation === 'portrait' ? 90 : 0 }}
          animate={{ scale: animConfigs[5].scale[1], opacity: 1, rotate: orientation === 'portrait' ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: animConfigs[5].delay, duration: animConfigs[5].duration }}
          style={{
            zIndex: 2,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${orientation === 'portrait' ? 90 : 0}deg)`,
            width: `calc(100vw - 50px)`,
            height: `auto`,
            maxWidth: `calc(100vw - 50px)`,
            maxHeight: `calc(100vh - 50px)`,
            minWidth: 0,
            minHeight: 0,
            padding: 0,
            boxSizing: 'border-box',
          }}
          loading="lazy"
        />
        {/* Hero Message Centered Above Grid, semi-opaque but accessible */}
        <div className={styles.heroMessage} style={{
          background: 'rgba(255,255,255,0.82)',
          color: '#111',
          textShadow: '0 2px 8px rgba(255,255,255,0.12), 0 1px 0 #fff',
          border: '1.5px solid rgba(0,0,0,0.07)',
        }}>
          <h1>Better Experiences. Real Results.</h1>
          <p>Where business needs and user needs align, every click is a step toward success.</p>
        </div>
        {/* Animated Elements */}
        {images.map((img, i) => {
          if (i === 5) return null; // skip grid frame
          const cfg = animConfigs[i];
          // Exit transforms: at scrollY=0, elements are in final position; at scrollY=400, they're back at entry (offscreen)
          const y = useTransform(scrollY, scrollRange, [0, cfg.y]);
          const x = useTransform(scrollY, scrollRange, [0, cfg.x]);
          const rotate = useTransform(scrollY, scrollRange, [0, cfg.rotate]);
          const scale = useTransform(scrollY, scrollRange, [cfg.scale[1], cfg.scale[0]]);
          return (
            <motion.img
              key={img}
              src={`/frontpage/${img}`}
              alt={img.replace('.png', '')}
              className={`${styles.heroImage} ${styles[`img${i}`]}`}
              style={{ y, x, rotate, scale, willChange: 'transform', zIndex: 3 + i }}
              initial={{
                y: cfg.y,
                x: cfg.x,
                rotate: cfg.rotate,
                scale: cfg.scale[0],
                opacity: 0,
              }}
              animate={{
                y: 0,
                x: 0,
                rotate: 0,
                scale: cfg.scale[1],
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
      </div>
    </section>
  );
} 