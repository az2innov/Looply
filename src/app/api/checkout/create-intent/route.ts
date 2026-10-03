import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { lockRentalSlot } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'gbp', items, deliveryDate, deliverySlot } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Attempt to lock delivery slot in Redis
    if (deliveryDate && deliverySlot) {
      const slotKey = `${deliveryDate}_${deliverySlot.replace(/\s+/g, '')}`;
      await lockRentalSlot(slotKey);
    }

    // In production with real Stripe API Key:
    if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert £ to pence
        currency,
        metadata: {
          depositAmount: '0.00', // Explicit £0 deposit metadata
          itemsCount: items?.length?.toString() || '1',
          deliveryDate: deliveryDate || '',
          deliverySlot: deliverySlot || '',
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        isSimulated: false,
      });
    }

    // Local / Demo simulated intent
    return NextResponse.json({
      clientSecret: `pi_mock_${Date.now()}_secret_test`,
      paymentIntentId: `pi_mock_${Date.now()}`,
      isSimulated: true,
      message: 'Simulated payment intent created (£0 deposit hold verified)',
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: error.message || 'Payment intent failed' }, { status: 500 });
  }
}
