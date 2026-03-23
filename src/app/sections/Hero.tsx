import { useRef, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ResponsiveImage } from '../shared/media/ResponsiveImage';
import { resolveAssetFallbackSrc } from '../shared/media/media-manifest';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // iOS Safari fallback: programmatically play the video after source injection.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // If autoplay fails (e.g. low-power mode), keep poster image visible.
      });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handlePause = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, prefersReducedMotion ? 0 : -80]);
  const posterSrc = resolveAssetFallbackSrc(
    'hero-poster',
    'hero',
    '/media/images/cars/supercars-trio-front-lineup-coastal-hero.jpg',
  );

  const headingWords = ['Palm', 'Beach', 'Exotic', 'Rentals'];

  return (
    <section id="hero" ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      {/* Background media with graceful degradation for mobile/data saver/reduced motion */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale, willChange: 'transform' }}>
        <ResponsiveImage
          assetKey="hero-poster"
          slot="hero"
          fallbackSrc={posterSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          aria-label="Luxury supercars driving along a coastal road in Palm Beach"
          className="absolute inset-0 w-full h-full object-cover [&::-webkit-media-controls]:!hidden [&::-webkit-media-controls-start-playback-button]:!hidden [&::-webkit-media-controls-panel]:!hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          width={1920}
          height={1080}
          poster={posterSrc}
        >
          <source src="/media/videos/coastal-supercars.webm" type="video/webm" />
          <source src="/media/videos/coastal-supercars.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative h-full flex items-center justify-center"
      >
        <div className="container mx-auto px-5 lg:px-12 text-center">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, delay: prefersReducedMotion ? 0 : 1.3 }}
            className="flex items-center justify-center gap-3 mb-6 lg:mb-8"
          >
            <span className="h-[1px] w-6 lg:w-8 bg-accent/60" />
            <span className="text-accent text-[10px] lg:text-xs tracking-[0.3em] lg:tracking-[0.4em] uppercase">Palm Beach, Florida</span>
            <span className="h-[1px] w-6 lg:w-8 bg-accent/60" />
          </motion.div>

          {/* Staggered Word Reveal Heading */}
          <div className="overflow-hidden mb-4 lg:mb-6">
            <h1
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-foreground tracking-tight leading-[1.1]"
            >
              {headingWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ y: prefersReducedMotion ? '0%' : '100%', opacity: prefersReducedMotion ? 1 : 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.15 : 0.5,
                    delay: prefersReducedMotion ? 0 : 1.5 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.25em] lg:mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Gold Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.6, delay: prefersReducedMotion ? 0 : 1.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-5 lg:mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, delay: prefersReducedMotion ? 0.02 : 2.1 }}
            className="text-sm md:text-base lg:text-xl text-foreground/60 mb-10 lg:mb-16 max-w-lg lg:max-w-2xl mx-auto leading-relaxed tracking-wide px-2"
          >
            A curated collection of rare automotive and yachting experiences for the discerning few.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, delay: prefersReducedMotion ? 0.04 : 2.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-6 px-2"
          >
            <motion.button
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03, boxShadow: '0 0 40px rgba(201,169,97,0.25)' }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              onClick={() => onNavigate('reservation')}
              className="w-full sm:w-auto px-10 lg:px-14 py-4 lg:py-5 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-300"
            >
              Request Availability
            </motion.button>
            <motion.button
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03, borderColor: 'rgba(201,169,97,0.6)' }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              onClick={() => onNavigate('collection')}
              className="w-full sm:w-auto px-10 lg:px-14 py-4 lg:py-5 border border-foreground/20 text-foreground/80 text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:text-accent"
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.8 }}
          className="absolute bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:gap-3"
        >
          <span className="text-foreground/30 text-[9px] lg:text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-6 lg:h-8 bg-gradient-to-b from-accent/60 to-transparent"
          />
        </motion.div>
      )}

      {/* Cinematic side lines */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '30%' }}
            transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-0 left-12 w-[1px] bg-gradient-to-b from-accent/20 to-transparent"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '30%' }}
            transition={{ duration: 1, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-0 right-12 w-[1px] bg-gradient-to-b from-accent/20 to-transparent"
          />
        </>
      )}
    </section>
  );
}
