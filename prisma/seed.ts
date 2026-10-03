import { PrismaClient, Role, OrderStatus, DiscountType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Looply database seed...');

  // 1. Seed Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@looply.co.uk' },
    update: {},
    create: {
      email: 'admin@looply.co.uk',
      name: 'Eleanor Campbell',
      phone: '07700 900000',
      role: Role.ADMIN,
      twoFactorEnabled: true,
      twoFactorSecret: 'JBSWY3DPEHPK3PXP',
      identityVerified: true,
      postcode: 'SW1A 1AA',
      address: 'Looply Central Depot, Units 4-6 River Gardens, London',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'oliver.j@example.co.uk' },
    update: {},
    create: {
      email: 'oliver.j@example.co.uk',
      name: 'Oliver Jenkins',
      phone: '07700 900123',
      role: Role.CUSTOMER,
      twoFactorEnabled: true,
      twoFactorSecret: 'K4XW2Y3JPMQW4ZZZ',
      identityVerified: true,
      postcode: 'TW10 6QX',
      address: '42 Richmond Hill, Richmond',
    },
  });

  console.log('✅ Seeded users:', admin.email, customer.email);

  // 2. Seed Discount Codes
  await prisma.discountCode.upsert({
    where: { code: 'FIRST10' },
    update: {},
    create: {
      code: 'FIRST10',
      discountType: DiscountType.PERCENTAGE,
      value: 10.00,
      minOrder: 20.00,
      expiresAt: new Date('2026-12-31'),
      active: true,
      usageCount: 342,
    },
  });

  await prisma.discountCode.upsert({
    where: { code: 'SUMMERFEST' },
    update: {},
    create: {
      code: 'SUMMERFEST',
      discountType: DiscountType.FIXED,
      value: 15.00,
      minOrder: 50.00,
      expiresAt: new Date('2026-11-30'),
      active: true,
      usageCount: 129,
    },
  });

  console.log('✅ Seeded discount promo codes (FIRST10, SUMMERFEST)');

  // 3. Seed Hero Slides
  const existingSlides = await prisma.heroSlide.count();
  if (existingSlides === 0) {
    await prisma.heroSlide.createMany({
      data: [
        {
          badge: 'Seasonal Trend • Spring/Summer 2026',
          title: 'Transform your garden in 28 hours. Zero deposit.',
          subtitle: 'Rent commercial Kärcher washers, heavy-duty aerators, and patio cleaners delivered straight to your door with 2-hour slots.',
          ctaText: 'Browse Garden & Pressure Washers',
          ctaLink: '/#catalog',
          highlightTag: 'Save up to 85% vs buying new',
          bgGradient: 'from-emerald-950 via-forest to-emerald-900',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
          active: true,
        },
        {
          badge: 'Ultimate Weekend Vibe',
          title: 'Host an unforgettable party. Sound, lights & chocolate.',
          subtitle: 'Rent 800W JBL rigs, 5-tier chocolate fountains, and silent disco gear without freezing thousands in security deposits.',
          ctaText: 'Explore Party & Sound Gear',
          ctaLink: '/#catalog',
          highlightTag: 'Free door-to-door return collection',
          bgGradient: 'from-slate-900 via-emerald-950 to-charcoal',
          image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
          active: true,
        },
      ],
    });
    console.log('✅ Seeded hero slides');
  }

  // 4. Seed Products
  const productsCount = await prisma.product.count();
  if (productsCount === 0) {
    await prisma.product.createMany({
      data: [
        {
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
          ],
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
          gallery: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80'],
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
          tags: ['Patio', 'Driveway', 'Vehicle Cleaning', 'Top Rated'],
        },
        {
          name: 'JBL PartyBox 710 High-Power 800W Wireless Bluetooth PA Speaker',
          category: 'Parties',
          brand: 'JBL',
          tagline: '800 Watts of gut-punching JBL Original Pro Sound with synced dynamic light shows',
          description: 'Turn any hall, garden, or living room into an unforgettable concert. Features splashproof IPX4 build, guitar & mic inputs with karaoke EQ, and rugged transport wheels.',
          specifications: [
            '800W RMS output with dual 8" woofers & 2.75" tweeters',
            'Dynamic, customizable RGB strobe and wave lightshow',
            'Inputs: Bluetooth 5.1, USB, 3.5mm Aux, Mic & Guitar 6.35mm',
            'IPX4 splashproof rating with integrated carry handle & wheels',
          ],
          image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
          gallery: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'],
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
          tags: ['800W', 'Lightshow', 'Karaoke', 'Big Bass'],
        },
        {
          name: 'Epson EH-TW7100 4K PRO-UHD Home Cinema Projector + 120" Screen Kit',
          category: 'Audio/Visual',
          brand: 'Epson',
          tagline: '3,000 Lumens true 4K HDR home theatre projection with fast 120" pull-up stand screen',
          description: 'Transform your garden or living room into an epic private cinema. Featuring 3,000 lumens brightness for vibrant color even with ambient light, wide lens shift, and dual HDMI 2.0 ports.',
          specifications: [
            '4K PRO-UHD (3840 x 2160) resolution with HDR10',
            '3,000 lumens equal White and Colour Brightness',
            '100,000:1 dynamic contrast ratio',
            'Includes 120" tripod freestanding tensioned screen & 10m HDMI',
          ],
          image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
          gallery: ['https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80'],
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
          tags: ['4K Cinema', 'Projector', 'Outdoor Cinema', 'Screen Included'],
        },
      ],
    });
    console.log('✅ Seeded key products');
  }

  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
