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
    window.addEventListener('scroll', handleScroll);
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
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo - Crossfade between white and color */}
            <button
              onClick={() => handleNav('hero')}
              className="relative z-50 group"
              aria-label="Palm Beach Exotic Rentals"
            >
              <div className="relative h-12 lg:h-16 w-auto">
                {/* White logo */}
                <img
                  src="/media/images/logo/logo-white.png"
                  alt=""
                  className="h-12 lg:h-16 w-auto transition-all duration-500 group-hover:brightness-125"
                  style={{ opacity: scrolled ? 0 : 1, position: scrolled ? 'absolute' : 'relative', top: 0, left: 0 }}
                />
                {/* Color logo */}
                <img
                  src="/media/images/logo/logo-color.png"
                  alt="Palm Beach Exotic Rentals"
                  className="h-12 lg:h-16 w-auto transition-all duration-500 absolute top-0 left-0 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(201,169,97,0.3)]"
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
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
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
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  onClick={() => handleNav(link.section)}
                  className="text-2xl tracking-[0.2em] uppercase text-foreground/80 hover:text-accent transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: 0.25 }}
                className="mt-4"
              >
                <div className="gold-line w-16 mx-auto mb-8" />
                <button
                  onClick={() => handleNav('reservation')}
                  className="px-10 py-4 bg-accent text-accent-foreground text-sm tracking-[0.2em] uppercase"
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
