import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-xl lg:text-2xl tracking-wide text-foreground hover:text-accent transition-colors duration-300"
          >
            Palm Beach Exotics
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            <button
              onClick={() => onNavigate('collection')}
              className="text-sm lg:text-base text-foreground/80 hover:text-foreground transition-colors duration-300 tracking-wide"
            >
              Collection
            </button>
            <button
              onClick={() => onNavigate('yacht')}
              className="text-sm lg:text-base text-foreground/80 hover:text-foreground transition-colors duration-300 tracking-wide"
            >
              Yacht
            </button>
            <button
              onClick={() => onNavigate('experience')}
              className="text-sm lg:text-base text-foreground/80 hover:text-foreground transition-colors duration-300 tracking-wide"
            >
              Experience
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-sm lg:text-base text-foreground/80 hover:text-foreground transition-colors duration-300 tracking-wide"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onNavigate('reservation')}
            className="hidden md:block px-6 lg:px-8 py-2.5 lg:py-3 bg-accent text-accent-foreground text-sm lg:text-base tracking-wide transition-all duration-300 hover:bg-accent/90 hover:scale-105"
          >
            Request Availability
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => onNavigate('reservation')}
            className="md:hidden px-6 py-2.5 bg-accent text-accent-foreground text-sm tracking-wide"
          >
            Request
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
