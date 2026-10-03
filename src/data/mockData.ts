import { Product, Order, User, DiscountCode, HeroSlide } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Cleaning
  {
    id: 'prod-1',
    name: 'Kärcher K5 Premium Smart Control Pressure Washer',
    category: 'Cleaning',
    brand: 'Kärcher',
    tagline: 'High-power 145 bar blast for patios, stone driveways & vehicles',
    description: 'The Kärcher K5 Premium Smart Control features Bluetooth connectivity to the Smart App for pressure advice, 3-in-1 multi-jet spray lance, and plug ‘n’ clean detergent system. Includes patio cleaner attachment.',
    specifications: [
      '145 Bar Max Pressure / 500 L/h flow',
      'Water-cooled 2100W motor',
      'T 5 T-Racer patio cleaner included',
      '10m high-pressure flex hose & reel',
      'Plug and Clean detergent dosing system'
    ],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=900&q=80',
    ],
    baseRentalPrice28h: 24.00,
    dailyRateAfter: 12.00,
    rrpBuying: 489.99,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 8,
    patTested: true,
    popular: true,
    featured: true,
    tags: ['Patio', 'Driveway', 'Vehicle Cleaning', 'Top Rated']
  },
  {
    id: 'prod-2',
    name: 'Kärcher SE 4001 Professional Carpet & Upholstery Extraction Cleaner',
    category: 'Cleaning',
    brand: 'Kärcher',
    tagline: 'Deep fiber deep-clean for sofas, mattresses, and stain-heavy carpets',
    description: 'Spray extraction vacuum cleaner designed for hygienic cleaning of textile surfaces. Water and cleaning agent are sprayed deep into carpet fibers and immediately vacuumed up alongside loosened dirt.',
    specifications: [
      '4-litre clean and dirty water dual tanks',
      'Includes specialized upholstery & carpet nozzles',
      'Fast-drying suction technology',
      'Removes stubborn pet odours and allergen build-up'
    ],
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80',
    ],
    baseRentalPrice28h: 19.50,
    dailyRateAfter: 9.50,
    rrpBuying: 249.99,
    rating: 4.8,
    reviewsCount: 98,
    inStock: true,
    stockCount: 6,
    patTested: true,
    popular: false,
    featured: false,
    tags: ['Carpet', 'Pet Hair', 'Upholstery']
  },
  {
    id: 'prod-3',
    name: 'Rug Doctor Pro Deep Commercial Carpet Cleaner',
    category: 'Cleaning',
    brand: 'Rug Doctor',
    tagline: 'Industrial vibrating brush power restores tired carpets like new',
    description: 'The heavyweight standard for professional carpet renewal. Features motorized bi-directional vibrating brushes and massive extraction power, revitalizing flattened pile.',
    specifications: [
      'Vibrating brush bar with 28 back-and-forth passes/sec',
      'Huge 11.4L recovery capacity',
      'Hand tool attachment for stairs & vehicle seats',
      'Commercial grade 1.9 HP motor'
    ],
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 29.00,
    dailyRateAfter: 14.00,
    rrpBuying: 699.00,
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    stockCount: 5,
    patTested: true,
    popular: true,
    featured: true,
    tags: ['Commercial', 'Heavy Duty', 'End of Tenancy']
  },
  {
    id: 'prod-4',
    name: 'Numatic Henry Xtra Eco Vacuum + Turbo Brush Head',
    category: 'Cleaning',
    brand: 'Numatic',
    tagline: 'The British icon with high-performance AiroBrush for pet hair',
    description: 'The beloved British classic equipped with the Xtra AiroBrush turbine floor tool, TriTex filtration system, and extra-long 10m high-durability rewind cord.',
    specifications: [
      '9-litre huge capacity drum',
      'Xtra AiroBrush turbo turbine nozzle',
      'Hepaflo high efficiency bags provided',
      'Tested to withstand tough domestic and site dust'
    ],
    image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 12.00,
    dailyRateAfter: 6.00,
    rrpBuying: 189.99,
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stockCount: 12,
    patTested: true,
    popular: false,
    featured: false,
    tags: ['British Classic', 'Vacuum', 'Renovation Clean']
  },

  // 2. DIY & Tools
  {
    id: 'prod-5',
    name: 'Bosch Professional 18V Brushless Combi & Impact Driver Twin Pack',
    category: 'DIY & Tools',
    brand: 'Bosch Professional',
    tagline: 'Heavy-duty cordless drilling and high-torque screw driving with 2x 5.0Ah batteries',
    description: 'The gold standard tradesman kit. Includes the GSB 18V-55 hammer combi drill and GDR 18V-200 impact driver in a rugged L-BOXX with fast charger and 5.0Ah ProCORE batteries.',
    specifications: [
      '200Nm max torque on Impact Driver',
      'Hammer function for masonry & brickwork up to 13mm',
      '2x 18V 5.0Ah lithium-ion battery packs',
      'Includes 35-piece premium screw & drill bit set'
    ],
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 18.00,
    dailyRateAfter: 9.00,
    rrpBuying: 349.99,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stockCount: 10,
    patTested: true,
    popular: true,
    featured: true,
    tags: ['Cordless', 'Batteries Included', 'Drilling', 'Renovation']
  },
  {
    id: 'prod-6',
    name: 'DeWalt DWE7485 210mm Compact Precision Table Saw',
    category: 'DIY & Tools',
    brand: 'DeWalt',
    tagline: 'Rack and pinion fence system for millimeter-accurate rip cuts in timber and sheet',
    description: 'Lightweight table saw with powerful 1850W motor, rack and pinion fence system, and front/rear fence lock for supreme cutting accuracy. Ideal for flooring, decking, and shelving builds.',
    specifications: [
      '1850 Watt high-torque motor',
      '622mm rip capacity right of blade',
      '65mm depth of cut at 90° / 45mm at 45°',
      'Dust extraction port connects to shop vacs'
    ],
    image: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 32.00,
    dailyRateAfter: 16.00,
    rrpBuying: 549.00,
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    stockCount: 4,
    patTested: true,
    popular: false,
    featured: false,
    tags: ['Woodworking', 'Precision', 'Joinery']
  },
  {
    id: 'prod-7',
    name: 'Festool TS 55 Plunge Cut Circular Saw + 1400mm Guide Rail Kit',
    category: 'DIY & Tools',
    brand: 'Festool',
    tagline: 'Splinter-free cuts on both sides with legendary German plunge rail engineering',
    description: 'The benchmark of plunge saws. Cut internal doors down, trim kitchen worktops, or break down full 8x4 plywood sheets with splinter-free edges on both sides.',
    specifications: [
      '1400mm anodised aluminium guide rail included',
      'FastFix saw blade changing mechanism',
      'Fine-scale bevel adjustment 0° to 45°',
      'Attachable splinter guard for tear-free finish'
    ],
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 35.00,
    dailyRateAfter: 18.00,
    rrpBuying: 689.00,
    rating: 5.0,
    reviewsCount: 73,
    inStock: true,
    stockCount: 3,
    patTested: true,
    popular: true,
    featured: false,
    tags: ['Cabinetry', 'Kitchen Fitting', 'Guide Rail']
  },
  {
    id: 'prod-8',
    name: 'Titan 1500W Heavy Duty SDS+ Rotary Demolition Hammer Drill',
    category: 'DIY & Tools',
    brand: 'Titan',
    tagline: 'Chisel away brickwork, stubborn floor tiles and drill deep core holes',
    description: '8 Joules of pure impact energy. Tackle concrete walls, tear up tile adhesives, and knock through masonry with SDS Plus chisel and drill bits provided.',
    specifications: [
      '1500W motor with 8.0J impact energy',
      '4 modes: Rotary, Hammer, Chisel lock, Free chisel',
      'Vibration damping rear handle',
      'Carrying case with pointed, flat chisels & masonry bits'
    ],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 20.00,
    dailyRateAfter: 10.00,
    rrpBuying: 179.99,
    rating: 4.7,
    reviewsCount: 52,
    inStock: true,
    stockCount: 7,
    patTested: true,
    popular: false,
    featured: false,
    tags: ['Demolition', 'Tile Removal', 'Masonry']
  },

  // 3. Parties & Events
  {
    id: 'prod-9',
    name: 'JBL PartyBox 710 High-Power 800W Wireless Bluetooth PA Speaker',
    category: 'Parties',
    brand: 'JBL',
    tagline: '800 Watts of gut-punching JBL Original Pro Sound with synced dynamic light shows',
    description: 'Turn any hall, garden, or living room into an unforgettable concert. Features splashproof IPX4 build, guitar & mic inputs with karaoke EQ, and rugged transport wheels.',
    specifications: [
      '800W RMS output with dual 8" woofers & 2.75" tweeters',
      'Dynamic, customizable RGB strobe and wave lightshow',
      'Inputs: Bluetooth 5.1, USB, 3.5mm Aux, Mic & Guitar 6.35mm',
      'IPX4 splashproof rating with integrated carry handle & wheels'
    ],
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 38.00,
    dailyRateAfter: 19.00,
    rrpBuying: 699.99,
    rating: 5.0,
    reviewsCount: 167,
    inStock: true,
    stockCount: 6,
    patTested: true,
    popular: true,
    featured: true,
    tags: ['800W', 'Lightshow', 'Karaoke', 'Big Bass']
  },
  {
    id: 'prod-10',
    name: 'Commercial Dual 5-Tier Chocolate Fondue Fountain Station',
    category: 'Parties',
    brand: 'Sephra Pro',
    tagline: 'Indulgent cascading Belgian chocolate centerpiece for weddings & celebrations',
    description: 'Food-grade 304 stainless steel fountain that melts and cascades up to 4kg of milk, dark, or white chocolate without oil addition. Quiet direct-drive motor ensures whisper-silent flow.',
    specifications: [
      '5-tier 80cm commercial tower structure',
      'Capacity: 2.5kg to 4.5kg melted chocolate',
      'Thermostatic temperature dial with separate melt/flow controls',
      'Includes 100 bamboo skewers and cleaning drip tray'
    ],
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 34.00,
    dailyRateAfter: 15.00,
    rrpBuying: 520.00,
    rating: 4.8,
    reviewsCount: 46,
    inStock: true,
    stockCount: 4,
    patTested: true,
    popular: true,
    featured: false,
    tags: ['Wedding', 'Dessert', 'Centerpiece']
  },
  {
    id: 'prod-11',
    name: 'Subcold 4-Tap Mobile Draught Beer Dispenser Cooler Bar',
    category: 'Parties',
    brand: 'Subcold UK',
    tagline: 'Pour ice-cold pints from standard 50L or 30L pub kegs at home',
    description: 'Complete flash-cooler mobile bar solution. Connect your favourite lager, IPA, cider, or Guinness kegs and pour brewery-fresh chilled pints in under 10 minutes from turn-on.',
    specifications: [
      'Built-in dry cooling compressor (serves 30L/hr chilled to 3°C)',
      'Dual tap chrome dispensing font with flow control',
      'Supplied with CO2 regulator & Sankey/A-type keg couplers',
      'Drip tray with drain tube'
    ],
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 48.00,
    dailyRateAfter: 24.00,
    rrpBuying: 1150.00,
    rating: 4.9,
    reviewsCount: 78,
    inStock: true,
    stockCount: 3,
    patTested: true,
    popular: false,
    featured: true,
    tags: ['Beer Tap', 'Garden Party', 'Pub At Home']
  },
  {
    id: 'prod-12',
    name: 'Vintage Cinema 8oz Commercial Popcorn Machine Cart',
    category: 'Parties',
    brand: 'Great Northern',
    tagline: 'Fresh cinema-style hot buttered popcorn in under 3 minutes',
    description: 'Carnival style red cart with glass warming cabinet and 850W non-stick stainless steel kettle. Makes approximately 2-3 gallons of popcorn per batch.',
    specifications: [
      '850 Watt kettle with stirring system',
      'Heated warming deck keeps popcorn warm and crunchy',
      'Includes stainless steel popcorn scoop & oil measuring cups',
      'Removable mobile 16" bicycle spoke wheels'
    ],
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 26.00,
    dailyRateAfter: 12.00,
    rrpBuying: 380.00,
    rating: 4.9,
    reviewsCount: 92,
    inStock: true,
    stockCount: 5,
    patTested: true,
    popular: false,
    featured: false,
    tags: ['Movie Night', 'Kids Party', 'Carnival']
  },

  // 4. Audio/Visual
  {
    id: 'prod-13',
    name: 'Epson EH-TW7100 4K PRO-UHD Home Cinema Projector + 120" Screen Kit',
    category: 'Audio/Visual',
    brand: 'Epson',
    tagline: '3,000 Lumens true 4K HDR home theatre projection with fast 120" pull-up stand screen',
    description: 'Transform your garden or living room into an epic private cinema. Featuring 3,000 lumens brightness for vibrant color even with ambient light, wide lens shift, and dual HDMI 2.0 ports.',
    specifications: [
      '4K PRO-UHD (3840 x 2160) resolution with HDR10',
      '3,000 lumens equal White and Colour Brightness',
      '100,000:1 dynamic contrast ratio',
      'Includes 120" tripod freestanding tensioned screen & 10m HDMI'
    ],
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 45.00,
    dailyRateAfter: 22.00,
    rrpBuying: 1499.00,
    rating: 4.9,
    reviewsCount: 120,
    inStock: true,
    stockCount: 5,
    patTested: true,
    popular: true,
    featured: true,
    tags: ['4K Cinema', 'Projector', 'Outdoor Cinema', 'Screen Included']
  },
  {
    id: 'prod-14',
    name: 'Blackmagic Pocket Cinema Camera 6K Pro Filmmaker Kit',
    category: 'Audio/Visual',
    brand: 'Blackmagic Design',
    tagline: 'Super 35 HDR sensor, built-in ND filters, and 6K RAW recording for commercial video',
    description: 'Cinematic powerhouse camera kit complete with Sigma 18-35mm f/1.8 Art lens, 2x 1TB high-speed Samsung T7 SSDs, 4x NP-F570 batteries, and dual mini XLR audio cables.',
    specifications: [
      'Super 35 HDR sensor with 13 stops dynamic range',
      'Motorized optical ND filters (2, 4 and 6 stops)',
      'EF lens mount with Sigma 18-35mm f/1.8 Art lens included',
      '6K resolution up to 60 fps / 120 fps windowed'
    ],
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 65.00,
    dailyRateAfter: 35.00,
    rrpBuying: 2650.00,
    rating: 5.0,
    reviewsCount: 41,
    inStock: true,
    stockCount: 2,
    patTested: true,
    popular: false,
    featured: false,
    tags: ['Film & Video', '6K RAW', 'Indie Filmmakers']
  },
  {
    id: 'prod-15',
    name: 'Sony Silent Disco 20-Headset Wireless 3-Channel Party System',
    category: 'Audio/Visual',
    brand: 'Looply Audio',
    tagline: 'Multi-channel wireless headphone party without noise complaints from neighbours',
    description: 'The ultimate London flat party secret weapon. 20 high-fidelity noise-isolating LED headphones that illuminate blue, red, or green based on the channel the dancer selects. 3 independent transmitters included.',
    specifications: [
      '20x LED illuminating foldable active headphones',
      '3x long-range UHF transmitters (up to 300 meters line-of-sight)',
      'Connect 3 devices simultaneously: DJ mixer, phone Spotify, laptop',
      '12-hour rechargeable headphone battery life'
    ],
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 42.00,
    dailyRateAfter: 20.00,
    rrpBuying: 890.00,
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    stockCount: 4,
    patTested: true,
    popular: true,
    featured: true,
    tags: ['Silent Disco', 'No Noise Complaints', 'Party Gear']
  },

  // 5. Bundles
  {
    id: 'prod-16',
    name: 'The Ultimate Backyard Starlight Cinema Bundle',
    category: 'Bundles',
    brand: 'Looply Curation',
    tagline: 'Everything for a 5-star outdoor cinema night: 4K Projector + 120" Screen + Popcorn Maker + JBL Sound',
    description: 'Our most popular weekend package! Combines the Epson 4K Home Cinema projector, 120" tension screen, JBL PartyBox sound system for movie theatre audio, and retro 8oz popcorn machine with kernels.',
    specifications: [
      'Epson EH-TW7100 4K HDR Projector (3,000 Lumens)',
      '120" Freestanding Weather-Resistant Screen',
      'JBL PartyBox Sound Rig with optical/aux hookup',
      'Vintage Popcorn Maker + 500g gourmet corn kernels',
      'All extension cables, weatherproof cables & HDMI leads included'
    ],
    bundleIncludes: [
      'Epson 4K Projector & 120" Screen',
      'JBL High-Power Sound Rig',
      'Cinema Popcorn Cart + Kernels',
      'All Heavy Duty Cabling'
    ],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 69.00,
    dailyRateAfter: 32.00,
    rrpBuying: 2490.00,
    rating: 5.0,
    reviewsCount: 198,
    inStock: true,
    stockCount: 4,
    patTested: true,
    popular: true,
    featured: true,
    tags: ['Super Bundle', 'Best Value', 'Weekend Cinema']
  },
  {
    id: 'prod-17',
    name: 'Total Garden Spring Makeover Trio Bundle',
    category: 'Bundles',
    brand: 'Looply Curation',
    tagline: 'Save 30% vs renting individually: Kärcher K5 + Petrol Hedge Trimmer + Cordless Lawn Strimmer',
    description: 'Transform your outdoor jungle in one single afternoon. Clear overgrown hedges, blast clean slippery moss on decking & flagstones, and edge lawn borders with professional tools.',
    specifications: [
      'Kärcher K5 Premium Pressure Washer + T5 Patio Cleaner',
      'Makita Cordless Long-Reach Hedge Trimmer',
      'Stihl Petrol Heavy Grass Strimmer & Brushcutter',
      'Includes safety goggles, heavy ear defenders & protective gloves'
    ],
    bundleIncludes: [
      'Kärcher K5 145 Bar Pressure Washer',
      'Makita Long-Reach Trimmer',
      'Stihl Power Strimmer',
      'PPE Safety Kit'
    ],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d69104a47?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592417817098-8f3d69104a47?auto=format&fit=crop&w=900&q=80'
    ],
    baseRentalPrice28h: 49.00,
    dailyRateAfter: 25.00,
    rrpBuying: 1199.00,
    rating: 4.8,
    reviewsCount: 76,
    inStock: true,
    stockCount: 3,
    patTested: true,
    popular: false,
    featured: true,
    tags: ['Garden', 'Spring Clean', 'Save 30%']
  }
];

export const MOCK_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'Seasonal Trend • Spring/Summer 2026',
    title: 'Transform your garden in 28 hours. Zero deposit.',
    subtitle: 'Rent commercial Kärcher washers, heavy-duty aerators, and patio cleaners delivered straight to your door with 2-hour slots.',
    ctaText: 'Browse Garden & Pressure Washers',
    ctaLink: '/#catalog',
    highlightTag: 'Save up to 85% vs buying new',
    bgGradient: 'from-emerald-950 via-forest to-emerald-900',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Deposit Required', value: '£0.00' },
      { label: 'Free Delivery', value: '2 Hours' },
      { label: 'Circular Score', value: '98%' }
    ],
    active: true
  },
  {
    id: 'slide-2',
    badge: 'Ultimate Weekend Vibe',
    title: 'Host an unforgettable party. Sound, lights & chocolate.',
    subtitle: 'Rent 800W JBL rigs, 5-tier chocolate fountains, and silent disco gear without freezing thousands in security deposits.',
    ctaText: 'Explore Party & Sound Gear',
    ctaLink: '/#catalog',
    highlightTag: 'Free door-to-door return collection',
    bgGradient: 'from-slate-900 via-emerald-950 to-charcoal',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Sound Output', value: '800 Watts' },
      { label: 'Doorstep Delivery', value: 'Included' },
      { label: 'Trustpilot Score', value: '4.9 / 5' }
    ],
    active: true
  },
  {
    id: 'slide-3',
    badge: 'Starlight Cinema Experience',
    title: 'Outdoor 4K Cinema Nights under the stars.',
    subtitle: '120-inch tension screen, 4K Pro projector and vintage popcorn machine. Delivered by 2pm, collected when you’re done.',
    ctaText: 'Rent Starlight Cinema Kit',
    ctaLink: '/#catalog',
    highlightTag: 'London & M25 Same Day Available',
    bgGradient: 'from-charcoal via-slate-900 to-forest-deep',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Screen Diagonal', value: '120 Inches' },
      { label: 'Resolution', value: 'True 4K' },
      { label: 'Zero Deposit', value: 'Guaranteed' }
    ],
    active: true
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'LP-88412',
    customerName: 'Oliver Jenkins',
    email: 'oliver.j@example.co.uk',
    phone: '07700 900123',
    address: '42 Richmond Hill, Richmond',
    postcode: 'TW10 6QX',
    items: [
      {
        productId: 'prod-1',
        productName: 'Kärcher K5 Premium Smart Control Pressure Washer',
        productImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
        rentalDays: 2,
        startDate: '2026-10-04',
        endDate: '2026-10-06',
        itemTotal: 36.00
      }
    ],
    subtotal: 36.00,
    discount: 0,
    totalAmount: 36.00,
    depositAmount: 0,
    status: 'Active Loan',
    deliveryDate: '2026-10-04',
    deliverySlot: '10:00 - 12:00',
    returnDate: '2026-10-06',
    driverAssigned: 'Dave Miller (Van #4)',
    paymentMethod: 'stripe',
    createdAt: '2026-10-02T14:32:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'LP-88415',
    customerName: 'Sophie Bennett',
    email: 'sophie.b@example.co.uk',
    phone: '07700 900456',
    address: '18 Clapham Common North Side',
    postcode: 'SW4 0QG',
    items: [
      {
        productId: 'prod-9',
        productName: 'JBL PartyBox 710 High-Power 800W PA Speaker',
        productImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80',
        rentalDays: 3,
        startDate: '2026-10-05',
        endDate: '2026-10-08',
        itemTotal: 76.00
      },
      {
        productId: 'prod-10',
        productName: 'Commercial Dual 5-Tier Chocolate Fountain Station',
        productImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&q=80',
        rentalDays: 3,
        startDate: '2026-10-05',
        endDate: '2026-10-08',
        itemTotal: 64.00
      }
    ],
    subtotal: 140.00,
    discount: 14.00,
    totalAmount: 126.00,
    depositAmount: 0,
    status: 'Dispatched',
    deliveryDate: '2026-10-05',
    deliverySlot: '14:00 - 16:00',
    returnDate: '2026-10-08',
    driverAssigned: 'Liam Henderson (EV Transit #2)',
    paymentMethod: 'apple_pay',
    createdAt: '2026-10-03T08:15:00Z'
  },
  {
    id: 'ord-1003',
    orderNumber: 'LP-88419',
    customerName: 'Marcus Sterling',
    email: 'marcus.s@example.co.uk',
    phone: '07700 900789',
    address: '88 Kensington High Street',
    postcode: 'W8 4SG',
    items: [
      {
        productId: 'prod-16',
        productName: 'The Ultimate Backyard Starlight Cinema Bundle',
        productImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80',
        rentalDays: 2,
        startDate: '2026-10-07',
        endDate: '2026-10-09',
        itemTotal: 101.00
      }
    ],
    subtotal: 101.00,
    discount: 0,
    totalAmount: 101.00,
    depositAmount: 0,
    status: 'Pending',
    deliveryDate: '2026-10-07',
    deliverySlot: '12:00 - 14:00',
    returnDate: '2026-10-09',
    driverAssigned: undefined,
    paymentMethod: 'paypal',
    createdAt: '2026-10-03T09:40:00Z'
  },
  {
    id: 'ord-1004',
    orderNumber: 'LP-88390',
    customerName: 'Emma Watson',
    email: 'emma.w@example.co.uk',
    phone: '07700 900321',
    address: '15 Highbury Grove, Islington',
    postcode: 'N5 2ER',
    items: [
      {
        productId: 'prod-3',
        productName: 'Rug Doctor Pro Deep Commercial Carpet Cleaner',
        productImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80',
        rentalDays: 1,
        startDate: '2026-10-01',
        endDate: '2026-10-02',
        itemTotal: 29.00
      }
    ],
    subtotal: 29.00,
    discount: 0,
    totalAmount: 29.00,
    depositAmount: 0,
    status: 'Completed',
    deliveryDate: '2026-10-01',
    deliverySlot: '08:00 - 10:00',
    returnDate: '2026-10-02',
    driverAssigned: 'Dave Miller (Van #4)',
    paymentMethod: 'stripe',
    createdAt: '2026-09-30T11:20:00Z'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Eleanor Campbell',
    email: 'admin@looply.co.uk',
    role: 'admin',
    twoFactorEnabled: true,
    twoFactorSecret: 'JBSWY3DPEHPK3PXP',
    identityVerified: true,
    activeRentalsCount: 0,
    phone: '07700 900000',
    postcode: 'SW1A 1AA',
    address: 'Looply Central Depot, London'
  },
  {
    id: 'usr-2',
    name: 'Oliver Jenkins',
    email: 'oliver.j@example.co.uk',
    role: 'customer',
    twoFactorEnabled: true,
    twoFactorSecret: 'K4XW2Y3JPMQW4ZZZ',
    identityVerified: true,
    activeRentalsCount: 1,
    phone: '07700 900123',
    postcode: 'TW10 6QX',
    address: '42 Richmond Hill, Richmond'
  },
  {
    id: 'usr-3',
    name: 'Sophie Bennett',
    email: 'sophie.b@example.co.uk',
    role: 'customer',
    twoFactorEnabled: false,
    identityVerified: true,
    activeRentalsCount: 1,
    phone: '07700 900456',
    postcode: 'SW4 0QG',
    address: '18 Clapham Common North Side'
  },
  {
    id: 'usr-4',
    name: 'Alexander Cross',
    email: 'alex.cross@example.co.uk',
    role: 'customer',
    twoFactorEnabled: false,
    identityVerified: false,
    activeRentalsCount: 0,
    phone: '07700 900999',
    postcode: 'E1 6AN',
    address: 'Flat 4, Shoreditch High St'
  }
];

export const MOCK_DISCOUNT_CODES: DiscountCode[] = [
  {
    id: 'disc-1',
    code: 'FIRST10',
    discountType: 'percentage',
    value: 10,
    minOrder: 20,
    expiresAt: '2026-12-31',
    active: true,
    usageCount: 342
  },
  {
    id: 'disc-2',
    code: 'SUMMERFEST',
    discountType: 'fixed',
    value: 15,
    minOrder: 50,
    expiresAt: '2026-11-30',
    active: true,
    usageCount: 129
  },
  {
    id: 'disc-3',
    code: 'ZERODEPOSIT20',
    discountType: 'percentage',
    value: 20,
    minOrder: 80,
    expiresAt: '2026-10-31',
    active: true,
    usageCount: 57
  }
];

// UK Postcodes list for London and Greater M25
export const MOCK_ELIGIBLE_PREFIXES: Record<string, { area: string; estimatedHours: number }> = {
  'SW': { area: 'South West London (Battersea, Wandsworth, Richmond)', estimatedHours: 2 },
  'W': { area: 'West London (Notting Hill, Kensington, Ealing)', estimatedHours: 2 },
  'WC': { area: 'Central London (West End, Holborn, Bloomsbury)', estimatedHours: 2 },
  'EC': { area: 'City of London & Shoreditch', estimatedHours: 2 },
  'E': { area: 'East London (Hackney, Stratford, Canary Wharf)', estimatedHours: 2 },
  'N': { area: 'North London (Islington, Camden, Highgate)', estimatedHours: 2 },
  'NW': { area: 'North West London (Hampstead, St Johns Wood)', estimatedHours: 2 },
  'SE': { area: 'South East London (Greenwich, Dulwich, Bermondsey)', estimatedHours: 2 },
  'TW': { area: 'Twickenham & Richmond upon Thames', estimatedHours: 2 },
  'KT': { area: 'Kingston upon Thames & Surrey border', estimatedHours: 2 },
  'CR': { area: 'Croydon & Sutton M25 corridor', estimatedHours: 2 },
  'BR': { area: 'Bromley & Beckenham', estimatedHours: 2 },
  'SM': { area: 'Sutton & Carshalton', estimatedHours: 2 },
  'UB': { area: 'Uxbridge & Hillingdon', estimatedHours: 2 },
  'HA': { area: 'Harrow & Brent', estimatedHours: 2 },
  'EN': { area: 'Enfield & Barnet', estimatedHours: 2 },
  'IG': { area: 'Ilford & Redbridge', estimatedHours: 2 },
  'RM': { area: 'Romford & Havering', estimatedHours: 2 },
  'DA': { area: 'Dartford & Bexley', estimatedHours: 2 },
  'WD': { area: 'Watford & Rickmansworth', estimatedHours: 3 }
};
