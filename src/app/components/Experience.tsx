import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Star, Eye } from 'lucide-react';

export function Experience() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start']
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const values = [
    {
      icon: Star,
      title: 'Curated Excellence',
      description: 'Every vehicle and vessel in our fleet represents the pinnacle of its category. We maintain only what we would drive ourselves.',
    },
    {
      icon: Shield,
      title: 'White-Glove Service',
      description: 'From the moment you inquire to the moment you return, experience concierge-level attention to every detail of your journey.',
    },
    {
      icon: Eye,
      title: 'Absolute Discretion',
      description: 'Your privacy and security are paramount. We serve clients who value confidentiality as much as they value excellence.',
    },
  ];

  const stats = [
    { value: '10+', label: 'Years of Excellence' },
    { value: '6', label: 'Exotic Vehicles' },
    { value: '500+', label: 'Satisfied Clients' },
    { value: '24/7', label: 'Concierge Support' },
  ];

  return (
    <section id="experience" className="py-24 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-28"
        >
          <span className="text-accent text-xs tracking-[0.4em] uppercase block mb-6">
            Why Choose Us
          </span>
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 tracking-tight"
          >
            More Than a Rental
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"
          />
          <p className="text-base lg:text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed">
            We don't simply rent vehicles. We provide access to experiences that define Palm Beach luxury.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-24 lg:mb-32 border border-border">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`p-10 lg:p-14 text-center group hover:bg-muted/30 transition-colors duration-700 ${
                  index < 2 ? 'md:border-r border-b md:border-b-0 border-border' : ''
                }`}
              >
                <div className="w-14 h-14 mx-auto mb-8 border border-accent/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-700">
                  <Icon className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors duration-700" />
                </div>
                <h3
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-2xl lg:text-3xl text-foreground mb-4 tracking-tight"
                >
                  {value.title}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed max-w-xs mx-auto">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-24 lg:mb-32"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p
                className="text-3xl lg:text-4xl xl:text-5xl text-accent mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {stat.value}
              </p>
              <p className="text-foreground/30 text-[10px] lg:text-xs tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Parallax Lifestyle Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          ref={imageRef}
          className="relative h-[50vh] lg:h-[70vh] overflow-hidden"
        >
          <motion.img
            style={{ y: imageY }}
            src="/media/images/cars/maserati-mc20-front-motion-coastal.jpg"
            alt="Palm Beach Luxury Experience"
            className="w-full h-[120%] object-cover absolute -top-[10%] left-0"
          />
          <div className="absolute inset-0 bg-background/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-accent text-xs tracking-[0.4em] uppercase block mb-6">
                  Palm Beach, Florida
                </span>
                <h3
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight leading-tight"
                >
                  Where the Road Meets the Extraordinary
                </h3>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
