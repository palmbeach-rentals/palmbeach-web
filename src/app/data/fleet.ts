export interface Vehicle {
  id: string;
  name: string;
  year: string;
  category: 'exotic' | 'luxury';
  description: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
  };
  image: string;
}

export interface Yacht {
  id: string;
  name: string;
  length: string;
  description: string;
  features: string[];
  image: string;
}

export const vehicles: Vehicle[] = [
  {
    id: 'lamborghini-aventador',
    name: 'Lamborghini Aventador SVJ',
    year: '2024',
    category: 'exotic',
    description: 'Raw power meets Italian artistry. The Aventador SVJ represents the pinnacle of naturally aspirated performance, delivering an visceral driving experience reserved for the truly discerning.',
    specs: {
      engine: 'V12 6.5L Naturally Aspirated',
      power: '770 HP',
      acceleration: '0-60 in 2.8s'
    },
    image: 'https://images.unsplash.com/photo-1695159859739-dc688c4b4851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW1ib3JnaGluaSUyMGF2ZW50YWRvciUyMG5pZ2h0fGVufDF8fHx8MTc3MDMxMTU5OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'ferrari-488',
    name: 'Ferrari 488 Pista',
    year: '2024',
    category: 'exotic',
    description: 'Track-focused engineering refined for the road. Every element of the 488 Pista exists in service of pure, unadulterated performance and emotional connection.',
    specs: {
      engine: 'V8 3.9L Twin-Turbo',
      power: '720 HP',
      acceleration: '0-60 in 2.7s'
    },
    image: 'https://images.unsplash.com/photo-1708063786153-19494dda1e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyYXJpJTIwNDg4JTIwZXhvdGljfGVufDF8fHx8MTc3MDMxMTYwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'mclaren-720s',
    name: 'McLaren 720S',
    year: '2024',
    category: 'exotic',
    description: 'British engineering excellence distilled into its purest form. The 720S delivers otherworldly performance with an elegance that defies its capabilities.',
    specs: {
      engine: 'V8 4.0L Twin-Turbo',
      power: '710 HP',
      acceleration: '0-60 in 2.7s'
    },
    image: 'https://images.unsplash.com/photo-1564594387948-9ecf6ab4f873?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtY2xhcmVuJTIwc3VwZXJjYXIlMjBsdXh1cnl8ZW58MXx8fHwxNzcwMzExNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'porsche-911-turbo-s',
    name: 'Porsche 911 Turbo S',
    year: '2024',
    category: 'exotic',
    description: 'The everyday supercar that redefines what\'s possible. Legendary handling dynamics meet explosive turbocharged power in perfect harmony.',
    specs: {
      engine: 'Flat-6 3.8L Twin-Turbo',
      power: '640 HP',
      acceleration: '0-60 in 2.6s'
    },
    image: 'https://images.unsplash.com/photo-1564694457220-0efef1a70d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JzY2hlJTIwOTExJTIwdHVyYm98ZW58MXx8fHwxNzcwMjE1MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'rolls-royce-phantom',
    name: 'Rolls-Royce Phantom',
    year: '2024',
    category: 'luxury',
    description: 'The pinnacle of automotive luxury. The Phantom represents an unparalleled statement of success, craftsmanship, and absolute refinement.',
    specs: {
      engine: 'V12 6.75L Twin-Turbo',
      power: '563 HP',
      acceleration: '0-60 in 5.1s'
    },
    image: 'https://images.unsplash.com/photo-1654021610606-bf229a2e27e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xscyUyMHJveWNlJTIwbHV4dXJ5JTIwY2FyfGVufDF8fHx8MTc3MDIxOTMxNHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'bentley-continental-gt',
    name: 'Bentley Continental GT',
    year: '2024',
    category: 'luxury',
    description: 'Grand touring redefined. The Continental GT blends breathtaking performance with handcrafted British luxury for transcontinental journeys in unmatched style.',
    specs: {
      engine: 'W12 6.0L Twin-Turbo',
      power: '650 HP',
      acceleration: '0-60 in 3.6s'
    },
    image: 'https://images.unsplash.com/photo-1725181937722-158dc0227ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW50bGV5JTIwY29udGluZW50YWwlMjBsdXh1cnl8ZW58MXx8fHwxNzcwMzExMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'aston-martin-dbs',
    name: 'Aston Martin DBS Superleggera',
    year: '2024',
    category: 'exotic',
    description: 'British elegance meets brutal performance. The DBS Superleggera is a grand tourer with the heart of a supercar, delivering sophistication without compromise.',
    specs: {
      engine: 'V12 5.2L Twin-Turbo',
      power: '715 HP',
      acceleration: '0-60 in 3.2s'
    },
    image: 'https://images.unsplash.com/photo-1693164364543-a2fde8ce2d3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3RvbiUyMG1hcnRpbiUyMHN1cGVyY2FyfGVufDF8fHx8MTc3MDMxMTYwMnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
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
  image: 'https://images.unsplash.com/photo-1580422666359-7160890d8c0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFuJTIwc3Vuc2V0fGVufDF8fHx8MTc3MDIwODQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
};
