import { useState } from 'react';
import { motion } from 'motion/react';
import { vehicles, Vehicle } from '../data/fleet';
import { VehicleDetail } from './VehicleDetail';

export function Collection() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  if (selectedVehicle) {
    return <VehicleDetail vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />;
  }

  return (
    <section id="collection" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight"
          >
            The Collection
          </h2>
          <p className="text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Seven exceptional vehicles. Each one a masterpiece of engineering and design.
          </p>
        </motion.div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-card mb-6">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center px-6">
                    <h3
                      style={{ fontFamily: 'var(--font-serif)' }}
                      className="text-3xl lg:text-4xl text-foreground mb-3"
                    >
                      {vehicle.name}
                    </h3>
                    <p className="text-accent text-lg tracking-widest">{vehicle.year}</p>
                    <p className="text-foreground/70 mt-4 text-sm tracking-wide">View Details</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div>
                <h3
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-2xl lg:text-3xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300"
                >
                  {vehicle.name}
                </h3>
                <p className="text-foreground/60 tracking-wide">{vehicle.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
