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
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-12 h-16 lg:h-20 bg-gradient-to-b from-background/90 to-transparent">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          onClick={onClose}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-200 group min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-[10px] lg:text-xs tracking-[0.2em] uppercase hidden sm:inline">Back to Collection</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          onClick={onClose}
          className="p-2 hover:text-accent transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Hero Image Slider */}
      <div className="relative h-[45vh] md:h-[60vh] lg:h-[85vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={gallery[activeIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            src={gallery[activeIndex]}
            alt={`${vehicle.name} - ${activeIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

        {/* Image Navigation Arrows */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center bg-background/40 backdrop-blur-sm hover:bg-accent/20 transition-all duration-200 border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center bg-background/40 backdrop-blur-sm hover:bg-accent/20 transition-all duration-200 border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-6 right-4 lg:right-12">
          <span className="text-foreground/40 text-sm tracking-wider">
            <span className="text-accent">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(gallery.length).padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 lg:px-12 -mt-12 lg:-mt-32 relative z-10 pb-28 lg:pb-32">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          {/* Vehicle Header */}
          <div className="mb-8 lg:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-accent text-[10px] lg:text-xs tracking-[0.3em] uppercase">{vehicle.brand}</span>
              <span className="h-[1px] w-5 bg-accent/30" />
              <span className="text-foreground/40 text-[10px] lg:text-xs tracking-[0.2em]">{vehicle.year}</span>
            </div>
            <h1
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-foreground mb-3 tracking-tight leading-[1.1]"
            >
              {vehicle.name}
            </h1>
            <p className="text-accent/70 text-xs lg:text-sm tracking-[0.15em] italic">{vehicle.tagline}</p>
          </div>

          {/* Description */}
          <p className="text-base lg:text-xl text-foreground/50 leading-relaxed mb-10 lg:mb-20 max-w-3xl">
            {vehicle.description}
          </p>

          {/* Specs - Stacked on mobile, row on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-10 lg:mb-20 border border-border">
            {[
              { label: 'Engine', value: vehicle.specs.engine },
              { label: 'Power', value: vehicle.specs.power },
              { label: 'Acceleration', value: vehicle.specs.acceleration },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className={`p-5 lg:p-10 text-center ${
                  i < 2 ? 'border-b md:border-b-0 md:border-r border-border' : ''
                }`}
              >
                <p className="text-foreground/25 text-[9px] lg:text-xs tracking-[0.3em] uppercase mb-2">{spec.label}</p>
                <p
                  className="text-foreground text-base lg:text-2xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Gallery Thumbnails - Horizontal scroll on mobile */}
          <div className="mb-10 lg:mb-20">
            <p className="text-foreground/25 text-[9px] lg:text-[10px] tracking-[0.3em] uppercase mb-4 lg:mb-6">Gallery</p>
            <div className="flex lg:grid lg:grid-cols-7 gap-2 lg:gap-3 overflow-x-auto pb-2 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0 snap-x snap-mandatory">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-16 lg:w-auto lg:h-auto lg:aspect-[4/3] overflow-hidden transition-all duration-300 snap-start ${
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
            className="group w-full md:w-auto px-10 lg:px-12 py-4 lg:py-5 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-3"
          >
            Request This Vehicle
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating CTA - Desktop only */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="hidden lg:block fixed bottom-8 right-12 z-40"
      >
        <button
          onClick={scrollToReservation}
          className="px-8 py-4 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(201,169,97,0.25)]"
        >
          Reserve Now
        </button>
      </motion.div>
    </motion.div>
  );
}
