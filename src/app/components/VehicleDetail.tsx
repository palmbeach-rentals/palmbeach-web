import { motion } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { Vehicle } from '../data/fleet';

interface VehicleDetailProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function VehicleDetail({ vehicle, onClose }: VehicleDetailProps) {
  const scrollToReservation = () => {
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
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 lg:top-12 lg:right-12 z-50 p-3 bg-card/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Hero Image */}
      <div className="relative h-[60vh] lg:h-screen w-full">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 -mt-32 relative z-10 pb-24">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <p className="text-accent text-sm lg:text-base tracking-widest mb-4">
            {vehicle.year}
          </p>
          <h1
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-8 lg:mb-12 tracking-tight leading-tight"
          >
            {vehicle.name}
          </h1>

          <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed mb-12 lg:mb-16">
            {vehicle.description}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 lg:mb-20">
            <div className="border-t border-border pt-6">
              <p className="text-foreground/60 text-sm tracking-wider mb-2">ENGINE</p>
              <p className="text-foreground text-lg lg:text-xl">{vehicle.specs.engine}</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-foreground/60 text-sm tracking-wider mb-2">POWER</p>
              <p className="text-foreground text-lg lg:text-xl">{vehicle.specs.power}</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-foreground/60 text-sm tracking-wider mb-2">ACCELERATION</p>
              <p className="text-foreground text-lg lg:text-xl">{vehicle.specs.acceleration}</p>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToReservation}
            className="group px-10 lg:px-12 py-4 lg:py-5 bg-accent text-accent-foreground text-base lg:text-lg tracking-wide transition-all duration-300 hover:bg-accent/90 inline-flex items-center gap-3"
          >
            Request This Vehicle
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating CTA - Desktop */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden lg:block fixed bottom-8 right-12 z-40"
      >
        <button
          onClick={scrollToReservation}
          className="px-8 py-4 bg-accent text-accent-foreground tracking-wide transition-all duration-300 hover:bg-accent/90 hover:scale-105 shadow-2xl"
        >
          Request This Vehicle
        </button>
      </motion.div>
    </motion.div>
  );
}
