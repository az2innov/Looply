import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MOCK_ORDERS } from '@/data/mockData';
import { OrderStatus } from '@prisma/client';

export async function GET() {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      const orders = await prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ orders, source: 'database' });
    }
  } catch (err) {
    console.warn('Orders fetch falling back to memory/mock.');
  }

  return NextResponse.json({ orders: MOCK_ORDERS, source: 'mock' });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const orderNumber = `LP-${Math.floor(10000 + Math.random() * 90000)}`;

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      const created = await prisma.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          postcode: data.postcode,
          subtotal: data.subtotal,
          discount: data.discount || 0,
          totalAmount: data.totalAmount,
          depositAmount: 0.00, // Always 0.00
          status: OrderStatus.DISPATCHED,
          deliveryDate: data.deliveryDate,
          deliverySlot: data.deliverySlot,
          returnDate: data.returnDate,
          collectionSlot: data.collectionSlot || '14:00 - 16:00',
          driverAssigned: data.driverAssigned || 'Liam Henderson (EV Transit #2)',
          paymentMethod: data.paymentMethod || 'stripe',
          stripePaymentId: data.stripePaymentId,
        },
      });

      return NextResponse.json({ order: created, source: 'database' }, { status: 201 });
    }

    // In-memory simulation fallback
    const simulatedOrder = {
      ...data,
      id: `ord-${Date.now()}`,
      orderNumber,
      depositAmount: 0,
      status: 'Dispatched',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ order: simulatedOrder, source: 'mock' }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
