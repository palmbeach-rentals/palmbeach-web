import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vehicles, Vehicle, showcaseImages } from '../data/fleet';
import { VehicleDetail } from './VehicleDetail';
import { ArrowRight } from 'lucide-react';

type BrandFilter = 'All' | 'Maserati' | 'McLaren' | 'Porsche';

export function Collection() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filter, setFilter] = useState<BrandFilter>('All');

  const filteredVehicles = filter === 'All'
    ? vehicles
    : vehicles.filter((v) => v.brand === filter);

  const brands: BrandFilter[] = ['All', 'Maserati', 'McLaren', 'Porsche'];

  if (selectedVehicle) {
    return <VehicleDetail vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />;
  }

  return (
    <section id="collection" className="py-24 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent text-xs tracking-[0.4em] uppercase block mb-6"
          >
            Our Fleet
          </motion.span>
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 tracking-tight"
          >
            The Collection
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"
          />
          <p className="text-base lg:text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            {vehicles.length} exceptional vehicles. Each one a masterpiece of engineering and design.
          </p>
        </motion.div>

        {/* Brand Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 lg:gap-4 mb-16 lg:mb-20"
        >
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setFilter(brand)}
              className={`px-5 lg:px-7 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-500 border ${
                filter === brand
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'border-border text-foreground/50 hover:text-foreground hover:border-accent/40'
              }`}
            >
              {brand}
            </button>
          ))}
        </motion.div>

        {/* Vehicle Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-pointer relative"
                onClick={() => setSelectedVehicle(vehicle)}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-card">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                  {/* Category Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 bg-background/60 backdrop-blur-sm text-foreground/70 text-[10px] tracking-[0.25em] uppercase border border-border/50">
                      {vehicle.category}
                    </span>
                  </div>

                  {/* Brand Badge */}
                  <div className="absolute top-5 right-5">
                    <span className="text-accent/70 text-[10px] tracking-[0.2em] uppercase">
                      {vehicle.brand}
                    </span>
                  </div>

                  {/* Bottom Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-accent text-xs tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          {vehicle.tagline}
                        </p>
                        <h3
                          style={{ fontFamily: 'var(--font-serif)' }}
                          className="text-2xl lg:text-3xl text-foreground tracking-tight group-hover:text-accent transition-colors duration-500"
                        >
                          {vehicle.name}
                        </h3>
                        <p className="text-foreground/40 text-sm mt-1">{vehicle.year}</p>
                      </div>
                      <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <div className="hidden lg:block text-right">
                          <p className="text-foreground/40 text-[10px] tracking-wider uppercase">Power</p>
                          <p className="text-foreground text-sm">{vehicle.specs.power}</p>
                        </div>
                        <div className="hidden lg:block text-right">
                          <p className="text-foreground/40 text-[10px] tracking-wider uppercase">0-60</p>
                          <p className="text-foreground text-sm">{vehicle.specs.acceleration.replace('0-60 in ', '')}</p>
                        </div>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                      <span className="text-accent text-xs tracking-[0.15em] uppercase">View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 lg:mt-28 relative overflow-hidden"
        >
          <div className="relative h-[50vh] lg:h-[70vh]">
            <img
              src={showcaseImages[0]}
              alt="Palm Beach Supercars Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6 max-w-3xl">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-accent text-xs tracking-[0.4em] uppercase block mb-6"
                >
                  The Ultimate Experience
                </motion.span>
                <h3
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight leading-tight mb-6"
                >
                  Three Icons. One Coastline.
                </h3>
                <p className="text-foreground/50 text-sm lg:text-base max-w-lg mx-auto leading-relaxed">
                  Maserati. McLaren. Porsche. Experience the pinnacle of automotive excellence along Palm Beach's legendary coastline.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
