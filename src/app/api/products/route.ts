import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_PRODUCTS } from '@/data/mockData';

export async function GET() {
  try {
    // If database connection is configured, fetch from Supabase
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      const dbProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbProducts.length > 0) {
        return NextResponse.json({ products: dbProducts, source: 'database' });
      }
    }
  } catch (err) {
    console.warn('Database query skipped or unconfigured, falling back to mock catalog.');
  }

  // Graceful fallback to initial mock dataset
  return NextResponse.json({ products: INITIAL_PRODUCTS, source: 'mock' });
}
