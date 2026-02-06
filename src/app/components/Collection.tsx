import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vehicles, Vehicle, showcaseImages } from '../data/fleet';
import { VehicleDetail } from './VehicleDetail';
import { ArrowRight } from 'lucide-react';

export function Collection() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <>
      {/* VehicleDetail overlay with proper enter/exit animations */}
      <AnimatePresence>
        {selectedVehicle && (
          <VehicleDetail vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
        )}
      </AnimatePresence>

      <section id="collection" className="py-20 lg:py-36 bg-background">
        <div className="container mx-auto px-5 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14 lg:mb-24"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-accent text-[10px] lg:text-xs tracking-[0.4em] uppercase block mb-5"
            >
              Our Fleet
            </motion.span>
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-5 tracking-tight"
            >
              The Collection
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-5"
            />
            <p className="text-sm lg:text-base text-foreground/50 max-w-md mx-auto leading-relaxed px-4">
              Three extraordinary machines. Each one a masterpiece of engineering and design.
            </p>
          </motion.div>

          {/* Editorial Vehicle Cards */}
          <div className="space-y-8 lg:space-y-0">
            {vehicles.map((vehicle, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-pointer mb-8 lg:mb-16"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="aspect-[4/3] lg:aspect-[16/11]">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      {/* Mobile bottom gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent lg:hidden" />
                      {/* Desktop side gradient */}
                      <div className={`hidden lg:block absolute top-0 bottom-0 w-32 ${
                        isReversed
                          ? 'left-0 bg-gradient-to-r from-card to-transparent'
                          : 'right-0 bg-gradient-to-l from-card to-transparent'
                      }`} />
                      {/* Counter badge */}
                      <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                        <span
                          className="text-accent/40 text-5xl lg:text-7xl font-light"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col justify-center bg-card -mt-10 lg:mt-0 relative z-10 px-5 pt-8 pb-8 lg:px-14 lg:py-16 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}>
                      <div>
                        <div className="flex items-center gap-3 mb-3 lg:mb-4">
                          <span className="text-accent text-[10px] lg:text-xs tracking-[0.3em] uppercase">{vehicle.brand}</span>
                          <span className="h-[1px] w-5 bg-accent/30" />
                          <span className="text-foreground/30 text-[10px] lg:text-xs tracking-[0.15em]">{vehicle.year}</span>
                        </div>

                        <h3
                          style={{ fontFamily: 'var(--font-serif)' }}
                          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors duration-300"
                        >
                          {vehicle.name}
                        </h3>

                        <p className="text-accent/60 text-xs lg:text-sm tracking-[0.15em] italic mb-5 lg:mb-6">
                          {vehicle.tagline}
                        </p>

                        <p className="text-foreground/40 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-none">
                          {vehicle.description}
                        </p>

                        {/* Specs Row */}
                        <div className="flex gap-5 lg:gap-10 mb-6 lg:mb-8">
                          <div>
                            <p className="text-foreground/25 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase mb-1">Power</p>
                            <p className="text-foreground text-sm lg:text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                              {vehicle.specs.power}
                            </p>
                          </div>
                          <div className="w-[1px] bg-border" />
                          <div>
                            <p className="text-foreground/25 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase mb-1">0-60 mph</p>
                            <p className="text-foreground text-sm lg:text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                              {vehicle.specs.acceleration.replace('0-60 in ', '')}
                            </p>
                          </div>
                          <div className="w-[1px] bg-border" />
                          <div>
                            <p className="text-foreground/25 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase mb-1">Engine</p>
                            <p className="text-foreground text-sm lg:text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                              {vehicle.specs.engine.split(' ').slice(0, 2).join(' ')}
                            </p>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all duration-300">
                          <span className="text-xs lg:text-sm tracking-[0.15em] uppercase">Explore & Reserve</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Showcase Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 lg:mt-20 relative overflow-hidden -mx-5 lg:mx-0"
          >
            <div className="relative h-[40vh] lg:h-[70vh]">
              <img
                src={showcaseImages[0]}
                alt="Palm Beach Supercars Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6 max-w-2xl lg:max-w-3xl">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-accent text-[10px] lg:text-xs tracking-[0.4em] uppercase block mb-4 lg:mb-6"
                  >
                    The Ultimate Experience
                  </motion.span>
                  <h3
                    style={{ fontFamily: 'var(--font-serif)' }}
                    className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-foreground tracking-tight leading-tight mb-4"
                  >
                    Three Icons. One Coastline.
                  </h3>
                  <p className="text-foreground/40 text-xs lg:text-base max-w-md mx-auto leading-relaxed">
                    Maserati. McLaren. Porsche. The pinnacle of automotive excellence along Palm Beach's legendary coastline.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
