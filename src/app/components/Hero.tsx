import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1758409312953-e6442275f734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBleG90aWMlMjBzdXBlcmNhciUyMGJsYWNrfGVufDF8fHx8MTc3MDMxMTU5OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury Exotic Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground mb-6 lg:mb-8 tracking-tight leading-tight"
            >
              Palm Beach Exotic Rentals
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-10 lg:mb-14 max-w-3xl mx-auto leading-relaxed">
              A curated collection of rare automotive and yachting experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('reservation')}
                className="px-10 lg:px-12 py-4 lg:py-5 bg-accent text-accent-foreground text-base lg:text-lg tracking-wide transition-all duration-300 hover:bg-accent/90"
              >
                Request Availability
              </motion.button>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('collection')}
                className="px-10 lg:px-12 py-4 lg:py-5 border border-foreground/30 text-foreground text-base lg:text-lg tracking-wide transition-all duration-300 hover:border-accent hover:text-accent"
              >
                Explore the Collection
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
