import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Anchor, Users, Wine, Waves, Thermometer, Sun } from 'lucide-react';
import { yacht } from '../data/fleet';

interface YachtProps {
  onNavigate: (section: string) => void;
}

type GalleryTab = 'exterior' | 'interior' | 'cabins' | 'amenities';

const featureIcons = [
  { icon: Sun, label: 'Master suite with panoramic ocean views' },
  { icon: Users, label: 'Professional crew and private chef' },
  { icon: Wine, label: 'Full-service bar and entertainment system' },
  { icon: Waves, label: 'Water sports equipment and toys' },
  { icon: Thermometer, label: 'Climate-controlled interior spaces' },
  { icon: Anchor, label: 'Multiple sun decks and lounging areas' },
];

export function Yacht({ onNavigate }: YachtProps) {
  const [activeTab, setActiveTab] = useState<GalleryTab>('exterior');
  const [activeImage, setActiveImage] = useState(0);

  const tabs: { key: GalleryTab; label: string }[] = [
    { key: 'exterior', label: 'Exterior' },
    { key: 'interior', label: 'Interior' },
    { key: 'cabins', label: 'Cabins' },
    { key: 'amenities', label: 'Amenities' },
  ];

  const currentGallery = yacht.gallery[activeTab];

  const handleTabChange = (tab: GalleryTab) => {
    setActiveTab(tab);
    setActiveImage(0);
  };

  return (
    <section id="yacht" className="relative py-24 lg:py-36 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-accent text-xs tracking-[0.4em] uppercase block mb-6">
            Private Charter
          </span>
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 tracking-tight"
          >
            {yacht.name}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"
          />
          <p className="text-foreground/50 text-sm tracking-[0.2em] uppercase">{yacht.length} Luxury Vessel</p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24 lg:mb-32">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentGallery[activeImage]}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  src={currentGallery[activeImage]}
                  alt={`${yacht.name} - ${activeTab}`}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-background/50 backdrop-blur-sm px-3 py-1.5">
                <span className="text-foreground/60 text-xs tracking-wider">
                  <span className="text-accent">{String(activeImage + 1).padStart(2, '0')}</span>
                  <span className="mx-1.5">/</span>
                  <span>{String(currentGallery.length).padStart(2, '0')}</span>
                </span>
              </div>
            </div>

            {/* Gallery Tabs */}
            <div className="flex gap-1 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`flex-1 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${
                    activeTab === tab.key
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background/50 text-foreground/40 hover:text-foreground/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {currentGallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-[4/3] overflow-hidden transition-all duration-500 ${
                    i === activeImage
                      ? 'ring-1 ring-accent opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-lg lg:text-xl text-foreground/60 leading-relaxed mb-12">
              {yacht.description}
            </p>

            {/* Features with Icons */}
            <div className="space-y-6 mb-12">
              {featureIcons.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 border border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors duration-500">
                      <Icon className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors duration-500" />
                    </div>
                    <p className="text-foreground/70 text-sm lg:text-base tracking-wide">{feature.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Gold divider */}
            <div className="gold-line w-full mb-12" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Length', value: '80ft' },
                { label: 'Guests', value: '12' },
                { label: 'Crew', value: '4' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-2xl lg:text-3xl text-accent mb-1"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-foreground/30 text-[10px] tracking-[0.2em] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(201,169,97,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('reservation')}
              className="group w-full px-10 py-5 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-500 inline-flex items-center justify-center gap-3"
            >
              Charter This Vessel
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>

        {/* Full-Width Lifestyle Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative h-[50vh] lg:h-[70vh] overflow-hidden"
        >
          <img
            src="/media/images/yachts/yacht-salon-dining-night.jpeg"
            alt="Luxury Yacht Dining Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-accent text-xs tracking-[0.4em] uppercase block mb-6">
                  Private Dining
                </span>
                <h3
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight leading-tight"
                >
                  Not just a yacht. A private escape in Palm Beach waters.
                </h3>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
