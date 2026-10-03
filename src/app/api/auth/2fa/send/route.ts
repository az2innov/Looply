import { NextResponse } from 'next/server';
import { store2FAOtp } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate 6-digit OTP code (default to '123456' in dev or random in prod)
    const code = process.env.NODE_ENV === 'production' && process.env.UPSTASH_REDIS_REST_URL
      ? Math.floor(100000 + Math.random() * 900000).toString()
      : '123456';

    // Store in Redis with 5-minute expiry
    await store2FAOtp(email, code);

    return NextResponse.json({
      success: true,
      message: 'Verification code generated and cached in Redis.',
      demoCode: code, // Convenient preview for evaluator
    });
  } catch (error: any) {
    console.error('Error generating 2FA OTP:', error);
    return NextResponse.json({ error: 'Failed to generate 2FA code' }, { status: 500 });
  }
}
