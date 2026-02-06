import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Vehicle } from '../data/fleet';

interface VehicleDetailProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function VehicleDetail({ vehicle, onClose }: VehicleDetailProps) {
  const gallery = vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [vehicle.id]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  const scrollToReservation = () => {
    document.body.style.overflow = '';
    onClose();
    setTimeout(() => {
      document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-20 bg-gradient-to-b from-background/80 to-transparent">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={onClose}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-xs tracking-[0.2em] uppercase">Back to Collection</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={onClose}
          className="p-3 hover:text-accent transition-colors duration-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Hero Image Slider */}
      <div className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={gallery[activeIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            src={gallery[activeIndex]}
            alt={`${vehicle.name} - ${activeIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        {/* Image Navigation Arrows */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/30 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300 border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/30 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300 border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-8 right-6 lg:right-12">
          <span className="text-foreground/40 text-sm tracking-wider">
            <span className="text-accent">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(gallery.length).padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 -mt-20 lg:-mt-32 relative z-10 pb-32">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          {/* Vehicle Header */}
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-xs tracking-[0.3em] uppercase">{vehicle.brand}</span>
              <span className="h-[1px] w-6 bg-accent/30" />
              <span className="text-foreground/40 text-xs tracking-[0.2em]">{vehicle.year}</span>
            </div>
            <h1
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 tracking-tight leading-[1.1]"
            >
              {vehicle.name}
            </h1>
            <p className="text-accent/80 text-sm tracking-[0.15em] italic">{vehicle.tagline}</p>
          </div>

          {/* Description */}
          <p className="text-lg lg:text-xl text-foreground/60 leading-relaxed mb-16 lg:mb-20 max-w-3xl">
            {vehicle.description}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-0 mb-16 lg:mb-20 border border-border">
            {[
              { label: 'Engine', value: vehicle.specs.engine },
              { label: 'Power', value: vehicle.specs.power },
              { label: 'Acceleration', value: vehicle.specs.acceleration },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className={`p-6 lg:p-10 text-center ${i < 2 ? 'border-r border-border' : ''}`}
              >
                <p className="text-foreground/30 text-[10px] lg:text-xs tracking-[0.3em] uppercase mb-3">{spec.label}</p>
                <p
                  className="text-foreground text-lg lg:text-2xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Gallery Thumbnails */}
          <div className="mb-16 lg:mb-20">
            <p className="text-foreground/30 text-[10px] tracking-[0.3em] uppercase mb-6">Gallery</p>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 lg:gap-3">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative aspect-[4/3] overflow-hidden transition-all duration-500 ${
                    index === activeIndex
                      ? 'ring-1 ring-accent ring-offset-2 ring-offset-background opacity-100'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${vehicle.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(201,169,97,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToReservation}
            className="group px-12 py-5 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-500 inline-flex items-center gap-3"
          >
            Request This Vehicle
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating CTA - Desktop */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="hidden lg:block fixed bottom-8 right-12 z-40"
      >
        <button
          onClick={scrollToReservation}
          className="px-8 py-4 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(201,169,97,0.25)]"
        >
          Reserve Now
        </button>
      </motion.div>
    </motion.div>
  );
}
