import { NextResponse } from 'next/server';
import { verify2FAOtp } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const isValid = await verify2FAOtp(email, code);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired 6-digit code. (Try 123456)' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '2FA verification succeeded via Redis.',
    });
  } catch (error: any) {
    console.error('Error verifying 2FA OTP:', error);
    return NextResponse.json({ error: 'Failed to verify 2FA code' }, { status: 500 });
  }
}
