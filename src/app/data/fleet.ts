export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  year: string;
  brand: 'Maserati' | 'McLaren' | 'Porsche';
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
    description: 'Italian performance with sculpted elegance. The MC20 delivers a visceral, mid-engine experience wrapped in refined craftsmanship. Born from Maserati\'s racing DNA, its Nettuno V6 engine is a masterpiece of engineering innovation.',
    specs: {
      engine: 'V6 3.0L Twin-Turbo',
      power: '621 HP',
      acceleration: '0-60 in 2.9s'
    },
    image: '/media/images/cars/maserati-mc20-front-three-quarter-low.jpg',
    gallery: [
      '/media/images/cars/maserati-mc20-front-three-quarter-low.jpg',
      '/media/images/cars/maserati-mc20-front-motion-coastal.jpg',
      '/media/images/cars/maserati-mc20-front-grille-trident-detail.jpg',
      '/media/images/cars/maserati-mc20-interior-cabin-wide.jpg',
      '/media/images/cars/maserati-mc20-interior-steering-cluster.jpg',
      '/media/images/cars/maserati-mc20-rear-three-quarter-doors-open-daylight.jpg',
      '/media/images/cars/maserati-mc20-front-closed.jpg',
      '/media/images/cars/maserati-mc20-headlight-detail.jpg',
      '/media/images/cars/maserati-mc20-logo-detail.jpg',
      '/media/images/cars/maserati-mc20-rear-side-profile-sun-flare.jpg',
      '/media/images/cars/maserati-mc20-front-trident-air-intake-detail.jpg',
      '/media/images/cars/maserati-mc20-side-profile-motion-blur.jpg'
    ]
  },
  {
    id: 'maserati-mc20-cielo',
    name: 'Maserati MC20 Cielo',
    tagline: 'Open-Air Drama',
    year: '2025',
    brand: 'Maserati',
    category: 'exotic',
    description: 'Open-air drama with supercar pace. The Cielo offers a breathtaking cockpit and effortless coastal presence. With its retractable glass roof, it transforms from coupe to convertible in seconds, making every Palm Beach drive a spectacle.',
    specs: {
      engine: 'V6 3.0L Twin-Turbo',
      power: '621 HP',
      acceleration: '0-60 in 2.9s'
    },
    image: '/media/images/cars/maserati-mc20-front-three-quarter-doors-open.jpg',
    gallery: [
      '/media/images/cars/maserati-mc20-front-three-quarter-doors-open.jpg',
      '/media/images/cars/maserati-mc20-front-symmetric-doors-open.jpg',
      '/media/images/cars/maserati-mc20-side-profile-doors-open.jpg',
      '/media/images/cars/maserati-mc20-interior-cabin-wide.jpg',
      '/media/images/cars/maserati-mc20-interior-door-sill-carbon-detail.jpg',
      '/media/images/cars/maserati-mc20-front-three-quarter-doors-open-lifestyle.jpg',
      '/media/images/cars/maserati-mc20-front-doors-open.jpg',
      '/media/images/cars/maserati-mc20-front-symmetric-doors-open-alt.jpg',
      '/media/images/cars/maserati-mc20-side-three-quarter-doors-open.jpg',
      '/media/images/cars/maserati-mc20-rear-three-quarter-doors-open-centered.jpg',
      '/media/images/cars/maserati-mc20-lifestyle-front-three-quarter.jpg',
      '/media/images/cars/maserati-mc20-front-lifestyle-people-coastal.jpg'
    ]
  },
  {
    id: 'mclaren-720s',
    name: 'McLaren 720S',
    tagline: 'British Engineering Perfection',
    year: '2025',
    brand: 'McLaren',
    category: 'exotic',
    description: 'British engineering excellence distilled into its purest form. The 720S delivers otherworldly performance with an elegance that defies its capabilities. Its carbon fiber MonoCage II chassis and twin-turbo V8 create a driving experience beyond comparison.',
    specs: {
      engine: 'V8 4.0L Twin-Turbo',
      power: '710 HP',
      acceleration: '0-60 in 2.7s'
    },
    image: '/media/images/cars/mclaren-720s-front-three-quarter-motion-urban.jpg',
    gallery: [
      '/media/images/cars/mclaren-720s-front-three-quarter-motion-urban.jpg',
      '/media/images/cars/mclaren-720s-front-motion-urban.jpg',
      '/media/images/cars/mclaren-720s-front-side-motion-blur-urban.jpg',
      '/media/images/cars/mclaren-720s-front-three-quarter-motion-nature.jpg',
      '/media/images/cars/mclaren-720s-side-profile-motion-blur-urban.jpg',
      '/media/images/cars/mclaren-720s-side-profile-motion-blur-coastal.jpg',
      '/media/images/cars/mclaren-720s-side-profile-motion-blur-urban-close.jpg'
    ]
  },
  {
    id: 'mclaren-artura',
    name: 'McLaren Artura',
    tagline: 'The Future of Supercar',
    year: '2025',
    brand: 'McLaren',
    category: 'exotic',
    description: 'Lightweight, responsive, and unmistakably modern. The Artura pairs precision dynamics with a refined, futuristic cabin. As McLaren\'s first series-production hybrid, it represents the next chapter in supercar evolution.',
    specs: {
      engine: 'V6 3.0L Twin-Turbo Hybrid',
      power: '671 HP',
      acceleration: '0-60 in 3.0s'
    },
    image: '/media/images/cars/mclaren-artura-front-hero.jpg',
    gallery: [
      '/media/images/cars/mclaren-artura-front-hero.jpg',
      '/media/images/cars/mclaren-artura-front-doors-open.jpg',
      '/media/images/cars/mclaren-artura-front-doors-open-wide.jpg',
      '/media/images/cars/mclaren-artura-interior-cabin-wide.jpg',
      '/media/images/cars/mclaren-artura-interior-driver-cockpit.jpg',
      '/media/images/cars/mclaren-artura-headlight-aerodynamic-detail.jpg',
      '/media/images/cars/mclaren-artura-front-three-quarter-doors-open.jpg',
      '/media/images/cars/mclaren-artura-front-three-quarter-doors-open-dynamic.jpg',
      '/media/images/cars/mclaren-artura-interior-steering-detail.jpg'
    ]
  },
  {
    id: 'porsche-911-turbo-s',
    name: 'Porsche 911 Turbo S',
    tagline: 'Legendary. Redefined.',
    year: '2025',
    brand: 'Porsche',
    category: 'exotic',
    description: 'The everyday supercar that redefines what\'s possible. Legendary handling dynamics meet explosive turbocharged power in perfect harmony. The 911 Turbo S is the benchmark against which all others are measured.',
    specs: {
      engine: 'Flat-6 3.8L Twin-Turbo',
      power: '640 HP',
      acceleration: '0-60 in 2.6s'
    },
    image: '/media/images/cars/porsche-911-turbo-s-front-three-quarter-motion-open-road.jpg',
    gallery: [
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter-motion-open-road.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-dominant-motion-lineup.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-profile.jpg',
      '/media/images/cars/porsche-911-turbo-s-interior-driver-cockpit.jpg',
      '/media/images/cars/porsche-911-turbo-s-interior-center-console.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-badge-detail.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter-low.jpg',
      '/media/images/cars/porsche-911-turbo-s-interior-steering-detail.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-close-motion.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-profile-motion-blur.jpg'
    ]
  },
  {
    id: 'porsche-911-turbo-s-cabriolet',
    name: 'Porsche 911 Turbo S Cabriolet',
    tagline: 'Velocity Meets the Ocean Breeze',
    year: '2025',
    brand: 'Porsche',
    category: 'luxury',
    description: 'Open-top exhilaration with supercar velocity. A Palm Beach favorite for ocean-air cruising. Feel the Atlantic wind as 640 horsepower propels you down A1A in unmatched style.',
    specs: {
      engine: 'Flat-6 3.8L Twin-Turbo',
      power: '640 HP',
      acceleration: '0-60 in 2.7s'
    },
    image: '/media/images/cars/porsche-911-turbo-s-rear-three-quarter.jpg',
    gallery: [
      '/media/images/cars/porsche-911-turbo-s-rear-three-quarter.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-three-quarter-lifestyle.jpg',
      '/media/images/cars/porsche-911-turbo-s-rear-three-quarter-spoiler.jpg',
      '/media/images/cars/porsche-911-turbo-s-rear-three-quarter-side.jpg',
      '/media/images/cars/porsche-911-turbo-s-front-three-quarter-top.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-motion-blur.jpg',
      '/media/images/cars/porsche-911-turbo-s-lifestyle-collection.jpg',
      '/media/images/cars/porsche-911-turbo-s-side-profile-motion-blur-expanded.jpg'
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
  '/media/images/cars/maserati-mc20-front-motion-coastal.jpg',
  '/media/images/cars/maserati-mc20-front-dominant-motion-lineup.jpg',
  '/media/images/cars/maserati-mc20-rear-three-quarter-motion-blur-urban.jpg',
  '/media/images/cars/maserati-mc20-side-profile-motion-blur-coastal.jpg',
  '/media/images/cars/porsche-911-turbo-s-front-dominant-lineup.jpg',
  '/media/images/cars/porsche-911-turbo-s-front-three-quarter-motion-residential.jpg',
  '/media/images/cars/porsche-911-turbo-s-front-side-motion-blur.jpg'
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
