import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { yacht } from '../data/fleet';

interface YachtProps {
  onNavigate: (section: string) => void;
}

export function Yacht({ onNavigate }: YachtProps) {
  return (
    <section id="yacht" className="relative py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={yacht.image}
                alt={yacht.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <p className="text-accent text-sm lg:text-base tracking-widest mb-4">
              {yacht.length} LUXURY YACHT
            </p>
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 tracking-tight leading-tight"
            >
              {yacht.name}
            </h2>
            <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed mb-12">
              {yacht.description}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-12">
              {yacht.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-5 h-5 mt-1 border border-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <p className="text-foreground/80 text-base lg:text-lg">{feature}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('reservation')}
              className="group px-10 lg:px-12 py-4 lg:py-5 bg-accent text-accent-foreground text-base lg:text-lg tracking-wide transition-all duration-300 hover:bg-accent/90 inline-flex items-center gap-3"
            >
              Reserve Your Experience
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Additional Imagery Section */}
      <div className="container mx-auto px-6 lg:px-12 mt-24 lg:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] lg:h-[80vh] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1655286029136-95a47d455999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdheWFjaHQlMjBsdXh1cnklMjBvY2VhbnxlbnwxfHx8fDE3NzAzMTE2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Yacht Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-3xl">
              <h3
                style={{ fontFamily: 'var(--font-serif)' }}
                className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 tracking-tight"
              >
                Not just a yacht. A private escape in Palm Beach waters.
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
