import { NextResponse } from 'next/server';
import { store2FAOtp } from '@/lib/redis';
import { send2FAEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate random 6-digit OTP code (or 123456 fallback)
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in Upstash Redis with 5-minute expiry
    await store2FAOtp(email, code);

    // Send real email via Mailtrap SMTP
    let emailSent = false;
    let mailError = null;
    try {
      await send2FAEmail(email, code, name || email.split('@')[0]);
      emailSent = true;
    } catch (e: any) {
      console.warn('Mailtrap dispatch note:', e.message);
      mailError = e.message;
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? `A 6-digit verification code was sent to ${email} (via Mailtrap).`
        : `Verification code generated and cached in Redis.`,
      emailSent,
      demoCode: code, // Also available in response for test convenience
      mailError,
    });
  } catch (error: any) {
    console.error('Error generating 2FA OTP:', error);
    return NextResponse.json({ error: 'Failed to generate 2FA code' }, { status: 500 });
  }
}
