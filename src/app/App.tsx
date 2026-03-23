import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navigation } from './layout/Navigation';
import { Hero } from './sections/Hero';
import { Collection } from './sections/Collection';
import { ResponsiveImage } from './shared/media/ResponsiveImage';

const Yacht = lazy(() => import('./sections/Yacht').then(m => ({ default: m.Yacht })));
const Experience = lazy(() => import('./sections/Experience').then(m => ({ default: m.Experience })));
const Reservation = lazy(() => import('./sections/Reservation').then(m => ({ default: m.Reservation })));
const Footer = lazy(() => import('./layout/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [renderSecondarySections, setRenderSecondarySections] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Keep cinematic loader, but never block rendering with arbitrary delays.
    const frame = window.requestAnimationFrame(() => setIsLoaded(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (renderSecondarySections) return;

    const enableSecondary = () => setRenderSecondarySections(true);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) {
        enableSecondary();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const collectionEl = document.getElementById('collection');
    let observer: IntersectionObserver | undefined;
    if (collectionEl) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            enableSecondary();
          }
        },
        { rootMargin: '300px 0px' },
      );
      observer.observe(collectionEl);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, [renderSecondarySections]);

  const handleNavigate = useCallback((section: string) => {
    if (
      !document.getElementById(section) &&
      (section === 'yacht' || section === 'experience' || section === 'reservation' || section === 'contact')
    ) {
      setRenderSecondarySections(true);
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      });
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Premium Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto mb-8"
              >
                {/* Color logo provides layout dimensions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, delay: prefersReducedMotion ? 0 : 0.05, ease: 'easeInOut' }}
                >
                  <ResponsiveImage
                    assetKey="logo-color"
                    slot="logo"
                    fallbackSrc="/media/images/logo/logo-color.png"
                    alt="Palm Beach Exotic Rentals"
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                    sizes="(min-width: 1024px) 360px, 240px"
                    className="h-24 lg:h-32 w-auto mx-auto"
                  />
                </motion.div>
                {/* White logo overlays on top, fades out */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, delay: prefersReducedMotion ? 0 : 0.05, ease: 'easeInOut' }}
                  className="absolute top-0 left-1/2 -translate-x-1/2"
                >
                  <ResponsiveImage
                    assetKey="logo-white"
                    slot="logo"
                    fallbackSrc="/media/images/logo/logo-white.png"
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    decoding="sync"
                    sizes="(min-width: 1024px) 360px, 240px"
                    className="h-24 lg:h-32 w-auto"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: prefersReducedMotion ? 0.12 : 0.35, delay: 0.02, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.2, delay: 0.04 }}
                className="text-foreground/40 tracking-[0.3em] text-xs uppercase"
              >
                Palm Beach, Florida
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Site */}
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation onNavigate={handleNavigate} sectionsReady={renderSecondarySections} />
        <main>
          <Hero onNavigate={handleNavigate} />
          <Collection />
          {renderSecondarySections ? (
            <Suspense>
              <Yacht onNavigate={handleNavigate} />
              <Experience />
              <Reservation />
            </Suspense>
          ) : (
            <>
              <div id="yacht" className="h-px w-full" aria-hidden="true" />
              <div id="experience" className="h-px w-full" aria-hidden="true" />
              <div id="reservation" className="h-px w-full" aria-hidden="true" />
            </>
          )}
        </main>
        {renderSecondarySections ? (
          <Suspense>
            <Footer />
          </Suspense>
        ) : (
          <div id="contact" className="h-px w-full" aria-hidden="true" />
        )}
      </div>
      <SpeedInsights />
    </>
  );
}
