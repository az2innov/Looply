import nodemailer from 'nodemailer';

const host = process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io';
const port = parseInt(process.env.EMAIL_PORT || '2525', 10);
const secure = process.env.EMAIL_SECURE === 'true';
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const from = process.env.EMAIL_FROM || 'Looply Security <noreply@looply.co.uk>';

export const mailer = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: user && pass ? { user, pass } : undefined,
});

export async function send2FAEmail(toEmail: string, code: string, recipientName = 'User') {
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Looply Security Verification</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #0F172A; }
      .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(6, 78, 59, 0.08); }
      .header { background: #064E3B; padding: 28px 24px; text-align: center; color: #ffffff; }
      .logo { font-size: 28px; font-weight: 900; letter-spacing: -0.5px; }
      .logo span { color: #D4FF00; }
      .badge { display: inline-block; background: rgba(212, 255, 0, 0.2); color: #D4FF00; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; margin-top: 8px; border: 1px solid rgba(212, 255, 0, 0.3); }
      .body { padding: 32px 28px; }
      .greeting { font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 8px; }
      .intro { font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
      .code-card { background: #F1F5F9; border: 2px dashed #064E3B; border-radius: 16px; padding: 20px; text-align: center; margin: 24px 0; }
      .code-label { font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; color: #064E3B; margin-bottom: 6px; }
      .code-number { font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #064E3B; font-family: monospace; }
      .validity { font-size: 11px; color: #64748B; margin-top: 6px; }
      .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 24px; text-align: center; font-size: 11px; color: #94A3B8; }
      .footer a { color: #064E3B; text-decoration: none; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">Looply<span>.</span></div>
        <div class="badge">Security & 2FA Layer</div>
      </div>
      <div class="body">
        <div class="greeting">Hello ${recipientName},</div>
        <p class="intro">
          A sign-in or sensitive administrative action was initiated for your Looply account (<strong>${toEmail}</strong>). Please use the following 6-digit authentication code:
        </p>
        
        <div class="code-card">
          <div class="code-label">Verification Code (TOTP)</div>
          <div class="code-number">${code}</div>
          <div class="validity">⏱ Valid for 5 minutes • Do not share this code</div>
        </div>

        <p class="intro" style="font-size: 12px; color: #64748B;">
          If you did not request this verification, please ensure your account credentials are secure or contact our London depot immediately.
        </p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} Looply Rentals Ltd. London & M25 Depot.<br>
        100% Zero Deposit • 2-Hour Doorstep Delivery • PAT Safety Certified
      </div>
    </div>
  </body>
  </html>
  `;

  return await mailer.sendMail({
    from,
    to: toEmail,
    subject: `🔐 Your Looply 2FA Security Code: ${code}`,
    text: `Your Looply 2FA security code is: ${code}. Valid for 5 minutes.`,
    html: htmlContent,
  });
}
