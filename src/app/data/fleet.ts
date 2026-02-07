export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  year: string;
  brand: 'Maserati' | 'McLaren' | 'Porsche' | 'Chevrolet' | 'Cadillac';
  category: 'exotic' | 'luxury';
  description: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
  };
  image: string;
  gallery: string[];
}

export interface Yacht {
  id: string;
  name: string;
  length: string;
  description: string;
  features: string[];
  image: string;
  gallery: {
    exterior: string[];
    interior: string[];
    cabins: string[];
    amenities: string[];
  };
}

export const vehicles: Vehicle[] = [
  {
    id: 'maserati-mc20',
    name: 'Maserati MC20',
    tagline: 'Italian Sculpted Performance',
    year: '2025',
    brand: 'Maserati',
    category: 'exotic',
    description: 'Italian performance with sculpted elegance. The MC20 delivers a visceral, mid-engine experience wrapped in refined craftsmanship. Born from Maserati\'s racing DNA, its Nettuno V6 engine features innovative pre-chamber combustion technology derived directly from Formula 1. With its iconic butterfly doors and breathtaking silhouette, it commands attention on every Palm Beach road.',
    specs: {
      engine: 'V6 3.0L Twin-Turbo',
      power: '621 HP',
      acceleration: '0-60 in 2.9s'
    },
    image: '/media/images/cars/maserati-mc20-front-three-quarter-low.jpg',
    gallery: [
      '/media/images/cars/maserati-mc20-front-three-quarter-low.jpg',
      '/media/images/cars/maserati-mc20-front-motion-coastal.jpg',
      '/media/images/cars/maserati-mc20-front-three-quarter-doors-open.jpg',
      '/media/images/cars/maserati-mc20-front-symmetric-doors-open.jpg',
      '/media/images/cars/maserati-mc20-side-profile-doors-open.jpg',
      '/media/images/cars/maserati-mc20-interior-cabin-wide.jpg',
      '/media/images/cars/maserati-mc20-interior-steering-cluster.jpg',
      '/media/images/cars/maserati-mc20-front-grille-trident-detail.jpg',
      '/media/images/cars/maserati-mc20-headlight-detail.jpg',
      '/media/images/cars/maserati-mc20-rear-three-quarter-doors-open-daylight.jpg',
      '/media/images/cars/maserati-mc20-rear-side-profile-sun-flare.jpg',
      '/media/images/cars/maserati-mc20-side-profile-motion-blur-coastal.jpg',
      '/media/images/cars/maserati-mc20-front-lifestyle-people-coastal.jpg',
      '/media/images/cars/maserati-mc20-interior-door-sill-carbon-detail.jpg'
    ]
  },
  {
    id: 'mclaren-artura',
    name: 'McLaren Artura',
    tagline: 'The Future of Supercar',
    year: '2025',
    brand: 'McLaren',
    category: 'exotic',
    description: 'Lightweight, responsive, and unmistakably modern. The Artura pairs precision dynamics with a refined, futuristic cabin. As McLaren\'s first series-production hybrid supercar, it represents the next chapter in automotive evolution. Its twin-turbo V6 combined with an electric motor delivers instantaneous throttle response and relentless acceleration through the streets of Palm Beach.',
    specs: {
      engine: 'V6 3.0L Twin-Turbo Hybrid',
      power: '671 HP',
      acceleration: '0-60 in 3.0s'
    },
    image: '/media/images/cars/mclaren-artura-front-hero.jpg',
    gallery: [
      '/media/images/cars/mclaren-artura-front-hero.jpg',
      '/media/images/cars/mclaren-720s-front-three-quarter-motion-urban.jpg',
      '/media/images/cars/mclaren-artura-front-doors-open-wide.jpg',
      '/media/images/cars/mclaren-artura-front-three-quarter-doors-open-dynamic.jpg',
      '/media/images/cars/mclaren-artura-interior-cabin-wide.jpg',
      '/media/images/cars/mclaren-artura-interior-driver-cockpit.jpg',
      '/media/images/cars/mclaren-artura-interior-steering-detail.jpg',
      '/media/images/cars/mclaren-artura-headlight-aerodynamic-detail.jpg',
      '/media/images/cars/mclaren-720s-front-motion-urban.jpg',
      '/media/images/cars/mclaren-720s-side-profile-motion-blur-urban.jpg',
      '/media/images/cars/mclaren-720s-side-profile-motion-blur-coastal.jpg',
      '/media/images/cars/mclaren-720s-front-three-quarter-motion-nature.jpg',
      '/media/images/cars/mclaren-artura-front-doors-open.jpg',
      '/media/images/cars/mclaren-720s-front-side-motion-blur-urban.jpg'
    ]
  },
  {
    id: 'porsche-911-turbo-s',
    name: 'Porsche 911 Turbo S',
    tagline: 'Legendary. Redefined.',
    year: '2025',
    brand: 'Porsche',
    category: 'exotic',
    description: 'The everyday supercar that redefines what\'s possible. Legendary handling dynamics meet explosive turbocharged power in perfect harmony. The 911 Turbo S is the benchmark against which all others are measured. Its flat-six engine, rear-engine layout, and all-wheel-drive system deliver confidence-inspiring performance whether cruising Ocean Boulevard or pushing limits on the open road.',
    specs: {
      engine: 'Flat-6 3.8L Twin-Turbo',
      power: '640 HP',
      acceleration: '0-60 in 2.6s'
    },
    image: '/media/images/cars/porsche-911-turbo-s-front-three-quarter-motion-open-road.jpg',
    gallery: [
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter-motion-open-road.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter.jpg',
      '/media/images/cars/porsche-911-turbo-s-rear-three-quarter.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-profile.jpg',
      '/media/images/cars/porsche-911-turbo-s-interior-driver-cockpit.jpg',
      '/media/images/cars/porsche-911-turbo-s-interior-center-console.jpg',
      '/media/images/cars/porsche-911-turbo-s-interior-steering-detail.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-badge-detail.jpg',
      '/media/images/cars/porsche-911-turbo-s-rear-three-quarter-spoiler.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-close-motion.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-motion-blur.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter-top.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-three-quarter-lifestyle.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter-low.jpg'
    ]
  },
  {
    id: 'chevrolet-corvette-c8',
    name: 'Chevrolet Corvette C8',
    tagline: 'American Mid-Engine Legend',
    year: '2026',
    brand: 'Chevrolet',
    category: 'exotic',
    description: 'The mid-engine revolution that redefined American performance. The Corvette C8 delivers world-class supercar dynamics with unmistakable American muscle soul. Its naturally aspirated V8 sits behind the driver, delivering raw, visceral power through a lightning-fast dual-clutch transmission. From its aggressive stance to its driver-focused cockpit, every element is engineered to dominate both the track and the streets of Palm Beach.',
    specs: {
      engine: 'V8 6.2L',
      power: '495 HP',
      acceleration: '0-60 in 2.9s'
    },
    image: '/media/images/cars/corvette-c8-front-three-quarter-hero.jpg',
    gallery: [
      '/media/images/cars/corvette-c8-front-three-quarter-hero.jpg',
      '/media/images/cars/corvette-c8-front-motion-road.jpg',
      '/media/images/cars/corvette-c8-front-three-quarter-low.jpg',
      '/media/images/cars/corvette-c8-side-profile.jpg',
      '/media/images/cars/corvette-c8-rear-three-quarter.jpg',
      '/media/images/cars/corvette-c8-interior-cabin-wide.jpg',
      '/media/images/cars/corvette-c8-interior-steering-detail.jpg',
      '/media/images/cars/corvette-c8-headlight-detail.jpg',
      '/media/images/cars/corvette-c8-rear-spoiler-detail.jpg',
      '/media/images/cars/corvette-c8-front-grille-detail.jpg',
      '/media/images/cars/corvette-c8-side-motion-blur.jpg',
      '/media/images/cars/corvette-c8-front-three-quarter-top.jpg',
      '/media/images/cars/corvette-c8-rear-side-profile.jpg',
      '/media/images/cars/corvette-c8-front-lifestyle.jpg'
    ]
  },
  {
    id: 'cadillac-escalade-esv',
    name: 'Cadillac Escalade ESV',
    tagline: 'Commanding Presence. Absolute Luxury.',
    year: '2025',
    brand: 'Cadillac',
    category: 'luxury',
    description: 'The ultimate expression of American luxury on wheels. The Escalade ESV commands every road with its imposing presence and delivers an interior experience that rivals the finest private lounges. Its extended wheelbase provides unmatched passenger space, while the industry-leading 38-inch curved OLED display and Super Cruise hands-free driving technology define the future of luxury travel through Palm Beach and beyond.',
    specs: {
      engine: 'V8 6.2L',
      power: '420 HP',
      acceleration: '0-60 in 5.9s'
    },
    image: '/media/images/cars/escalade-esv-front-three-quarter-hero.jpg',
    gallery: [
      '/media/images/cars/escalade-esv-front-three-quarter-hero.jpg',
      '/media/images/cars/escalade-esv-front-grille-detail.jpg',
      '/media/images/cars/escalade-esv-side-profile.jpg',
      '/media/images/cars/escalade-esv-rear-badging.jpg',
      '/media/images/cars/escalade-esv-interior-led-screen.jpg',
      '/media/images/cars/escalade-esv-interior-seating.jpg',
      '/media/images/cars/escalade-esv-interior-steering-wheel.jpg',
      '/media/images/cars/escalade-esv-crest-badge-detail.jpg',
      '/media/images/cars/escalade-esv-headlight-detail.jpg',
      '/media/images/cars/escalade-esv-wheel-detail.jpg',
      '/media/images/cars/escalade-esv-interior-center-console.jpg',
      '/media/images/cars/escalade-esv-interior-door-sill.jpg',
      '/media/images/cars/escalade-esv-front-dominant.jpg',
      '/media/images/cars/escalade-esv-lifestyle-road.jpg'
    ]
  }
];

export const showcaseImages = [
  '/media/images/cars/supercars-trio-front-lineup-coastal-hero.jpg',
  '/media/images/cars/supercars-trio-side-profile-coastal-lineup.jpg',
  '/media/images/cars/supercars-trio-rear-three-quarter-coastal.jpg',
  '/media/images/cars/supercars-trio-lifestyle-people-coastal.jpg'
];

export const lifestyleImages = [
  '/media/images/cars/maserati-mc20-front-dominant-motion-lineup.jpg',
  '/media/images/cars/maserati-mc20-rear-three-quarter-motion-blur-urban.jpg',
  '/media/images/cars/porsche-911-turbo-s-front-dominant-lineup.jpg',
  '/media/images/cars/porsche-911-turbo-s-front-three-quarter-motion-residential.jpg',
  '/media/images/cars/mclaren-720s-side-profile-motion-blur-urban-close.jpg'
];

export const yacht: Yacht = {
  id: 'serenity-princess',
  name: 'Serenity Princess',
  length: '80ft',
  description: 'Not just a yacht. A private escape in Palm Beach waters. Experience the Atlantic like never before aboard this meticulously maintained luxury vessel, where every detail speaks to your refined taste.',
  features: [
    'Master suite with panoramic ocean views',
    'Professional crew and private chef',
    'Full-service bar and entertainment system',
    'Water sports equipment and toys',
    'Climate-controlled interior spaces',
    'Multiple sun decks and lounging areas'
  ],
  image: '/media/images/yachts/yacht-exterior-aerial-ocean.jpeg',
  gallery: {
    exterior: [
      '/media/images/yachts/yacht-exterior-aerial-ocean.jpeg',
      '/media/images/yachts/yacht-exterior-front-speed.jpeg',
      '/media/images/yachts/yacht-exterior-side-navigation.jpeg'
    ],
    interior: [
      '/media/images/yachts/yacht-salon-main-seating.jpeg',
      '/media/images/yachts/yacht-salon-indoor-outdoor-flow.jpeg',
      '/media/images/yachts/yacht-salon-galley-open-layout.jpeg',
      '/media/images/yachts/yacht-salon-dining-night.jpeg',
      '/media/images/yachts/yacht-galley-modern-bar.jpeg'
    ],
    cabins: [
      '/media/images/yachts/yacht-cabin-master-bed-wide.jpeg',
      '/media/images/yachts/yacht-cabin-master-front-view.jpeg',
      '/media/images/yachts/yacht-cabin-master-side-view.jpeg',
      '/media/images/yachts/yacht-cabin-guest-twin-beds.jpeg'
    ],
    amenities: [
      '/media/images/yachts/yacht-bathroom-full.jpeg',
      '/media/images/yachts/yacht-bathroom-shower-suite.jpeg'
    ]
  }
};
