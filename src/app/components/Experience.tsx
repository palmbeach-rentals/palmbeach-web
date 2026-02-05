import { motion } from 'motion/react';

export function Experience() {
  const values = [
    {
      title: 'Curated Excellence',
      description: 'Every vehicle and vessel in our fleet represents the pinnacle of its category. We maintain only what we would drive ourselves.'
    },
    {
      title: 'White-Glove Service',
      description: 'From the moment you inquire to the moment you return, experience concierge-level attention to every detail of your journey.'
    },
    {
      title: 'Absolute Discretion',
      description: 'Your privacy and security are paramount. We serve clients who value confidentiality as much as they value excellence.'
    }
  ];

  return (
    <section id="experience" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-28"
        >
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 tracking-tight"
          >
            More Than a Rental
          </h2>
          <p className="text-lg lg:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            We don't simply rent vehicles. We provide access to experiences that define Palm Beach luxury.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24 lg:mb-32">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 border border-accent flex items-center justify-center">
                <span className="text-2xl text-accent" style={{ fontFamily: 'var(--font-serif)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3
                style={{ fontFamily: 'var(--font-serif)' }}
                className="text-2xl lg:text-3xl text-foreground mb-4"
              >
                {value.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Full-Width Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative h-[50vh] lg:h-[70vh] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1758409312953-e6442275f734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBleG90aWMlMjBzdXBlcmNhciUyMGJsYWNrfGVufDF8fHx8MTc3MDMxMTU5OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="text-center px-6 max-w-4xl">
              <h3
                style={{ fontFamily: 'var(--font-serif)' }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight leading-tight"
              >
                A Concierge-Level Experience
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
