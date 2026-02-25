import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Anchor, Users, Wine, Waves, Thermometer, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const goNext = () => {
    setActiveImage((prev) => (prev + 1) % currentGallery.length);
  };

  const goPrev = () => {
    setActiveImage((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  return (
    <section id="yacht" className="relative py-20 lg:py-36 bg-card">
      <div className="container mx-auto px-5 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-24"
        >
          <span className="text-accent text-[10px] lg:text-xs tracking-[0.4em] uppercase block mb-5">
            Private Charter
          </span>
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-5 tracking-tight"
          >
            {yacht.name}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-5"
          />
          <p className="text-foreground/50 text-xs lg:text-sm tracking-[0.2em] uppercase">{yacht.length} Luxury Vessel</p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start mb-16 lg:mb-32">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden mb-3 lg:mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentGallery[activeImage]}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={currentGallery[activeImage]}
                  alt={`${yacht.name} - ${activeTab}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation arrows on mobile */}
              {currentGallery.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center bg-background/40 backdrop-blur-sm hover:bg-accent/20 transition-all duration-200 border border-white/10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center bg-background/40 backdrop-blur-sm hover:bg-accent/20 transition-all duration-200 border border-white/10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4 bg-background/50 backdrop-blur-sm px-3 py-1.5">
                <span className="text-foreground/60 text-xs tracking-wider">
                  <span className="text-accent">{String(activeImage + 1).padStart(2, '0')}</span>
                  <span className="mx-1.5">/</span>
                  <span>{String(currentGallery.length).padStart(2, '0')}</span>
                </span>
              </div>
            </div>

            {/* Gallery Tabs */}
            <div className="flex gap-1 mb-3 lg:mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`flex-1 py-2.5 min-h-[44px] text-[9px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background/50 text-foreground/40 hover:text-foreground/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Thumbnails - Horizontal scroll on mobile, grid on desktop */}
            <div className="flex lg:grid lg:grid-cols-5 gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0 snap-x snap-mandatory">
              {currentGallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-16 lg:w-auto lg:h-auto lg:aspect-[4/3] overflow-hidden transition-all duration-300 snap-start ${
                    i === activeImage
                      ? 'ring-1 ring-accent ring-offset-1 ring-offset-card opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-base lg:text-xl text-foreground/60 leading-relaxed mb-8 lg:mb-12">
              {yacht.description}
            </p>

            {/* Features with Icons */}
            <div className="grid grid-cols-1 gap-4 lg:gap-6 mb-8 lg:mb-12">
              {featureIcons.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="flex items-center gap-3 lg:gap-4 group"
                  >
                    <div className="flex-shrink-0 w-9 h-9 lg:w-10 lg:h-10 border border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                      <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <p className="text-foreground/70 text-sm tracking-wide">{feature.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Gold divider */}
            <div className="gold-line w-full mb-8 lg:mb-12" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
              {[
                { label: 'Length', value: '80ft' },
                { label: 'Guests', value: '12' },
                { label: 'Crew', value: '4' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-xl lg:text-3xl text-accent mb-1"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-foreground/30 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(201,169,97,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('reservation')}
              className="group w-full px-10 py-4 lg:py-5 bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              Charter This Vessel
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        </div>

        {/* Full-Width Lifestyle Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative h-[40vh] lg:h-[70vh] overflow-hidden -mx-5 lg:mx-0"
        >
          <img
            src="/media/images/yachts/yacht-salon-dining-night.jpeg"
            alt="Luxury Yacht Dining Experience"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <span className="text-accent text-[10px] lg:text-xs tracking-[0.4em] uppercase block mb-4 lg:mb-6">
                  Private Dining
                </span>
                <h3
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-2xl md:text-3xl lg:text-5xl text-foreground tracking-tight leading-tight"
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
