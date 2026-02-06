import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { Yacht } from './components/Yacht';
import { Experience } from './components/Experience';
import { Reservation } from './components/Reservation';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Premium Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto mb-8"
              >
                {/* Color logo provides layout dimensions */}
                <motion.img
                  src="/media/images/logo/logo-color.png"
                  alt="Palm Beach Exotic Rentals"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
                  className="h-24 lg:h-32 w-auto mx-auto"
                />
                {/* White logo overlays on top, fades out */}
                <motion.img
                  src="/media/images/logo/logo-white.png"
                  alt=""
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
                  className="h-24 lg:h-32 w-auto absolute top-0 left-1/2 -translate-x-1/2"
                />
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-foreground/40 tracking-[0.3em] text-xs uppercase"
              >
                Palm Beach, Florida
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Site */}
      <div className="min-h-screen bg-background text-foreground">
        <Navigation onNavigate={handleNavigate} />
        <main>
          <Hero onNavigate={handleNavigate} />
          <Collection />
          <Yacht onNavigate={handleNavigate} />
          <Experience />
          <Reservation />
        </main>
        <Footer />
      </div>
    </>
  );
}
