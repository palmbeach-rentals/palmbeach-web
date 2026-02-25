import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ['hero', 'collection', 'yacht', 'experience', 'reservation', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open (iOS Safari compatible)
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const savedY = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, savedY);
    }
    return () => {
      const savedY = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, savedY);
    };
  }, [mobileOpen]);

  const handleNav = (section: string) => {
    setMobileOpen(false);
    onNavigate(section);
  };

  const navLinks = [
    { label: 'Collection', section: 'collection' },
    { label: 'Yacht', section: 'yacht' },
    { label: 'Experience', section: 'experience' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border'
            : 'bg-gradient-to-b from-background/50 to-transparent'
        }`}
      >
        <div className="container mx-auto px-5 lg:px-12" style={{ paddingLeft: 'max(1.25rem, env(safe-area-inset-left))', paddingRight: 'max(1.25rem, env(safe-area-inset-right))' }}>
          <div className="flex items-center justify-between h-20 lg:h-24" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
            {/* Logo - Fixed container with opacity-only crossfade (no position change = no layout shift) */}
            <button
              onClick={() => handleNav('hero')}
              className="relative z-50 group flex-shrink-0"
              aria-label="Palm Beach Exotic Rentals"
            >
              <div className="relative">
                {/* Color logo is always in-flow (position: relative), provides stable container width */}
                <img
                  src="/media/images/logo/logo-color.png"
                  alt="Palm Beach Exotic Rentals"
                  decoding="async"
                  className="h-14 lg:h-20 w-auto transition-opacity duration-500 group-hover:drop-shadow-[0_0_12px_rgba(201,169,97,0.35)]"
                  style={{ opacity: scrolled ? 0 : 1 }}
                />
                {/* White logo absolutely positioned on top - only opacity changes, never position */}
                <img
                  src="/media/images/logo/logo-white.png"
                  alt=""
                  decoding="async"
                  className="absolute top-0 left-0 h-14 lg:h-20 w-auto transition-opacity duration-500 group-hover:brightness-125"
                  style={{ opacity: scrolled ? 1 : 0 }}
                />
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-10 lg:gap-14">
              {navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => handleNav(link.section)}
                  className="relative text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300 py-2 group"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300 ${
                      activeSection === link.section ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav('reservation')}
              className="hidden md:block px-8 py-3 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(201,169,97,0.2)]"
            >
              Reserve
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 w-11 h-11 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-[1px] w-full bg-foreground origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                  className="block h-[1px] w-full bg-foreground"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-[1px] w-full bg-foreground origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Gold accent line at bottom when scrolled */}
        <motion.div
          initial={false}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-center"
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-7">
              {/* Logo in mobile menu */}
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src="/media/images/logo/logo-color.png"
                alt="Palm Beach Exotic Rentals"
                decoding="async"
                className="h-20 w-auto mb-4"
              />
              <div className="gold-line w-12 mb-4" />

              {navLinks.map((link, i) => (
                <motion.button
                  key={link.section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNav(link.section)}
                  className={`text-2xl tracking-[0.2em] uppercase transition-colors duration-300 min-h-[44px] flex items-center ${
                    activeSection === link.section ? 'text-accent' : 'text-foreground/80 hover:text-accent'
                  }`}
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: 0.35 }}
                className="mt-4 w-full px-10"
              >
                <button
                  onClick={() => handleNav('reservation')}
                  className="w-full px-10 py-4 bg-accent text-accent-foreground text-sm tracking-[0.2em] uppercase min-h-[48px]"
                >
                  Reserve Now
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
