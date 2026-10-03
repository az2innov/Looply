import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PostcodeModal } from '@/components/modals/PostcodeModal';
import { TwoFactorModal } from '@/components/modals/TwoFactorModal';

export const metadata: Metadata = {
  title: 'Looply | Access Premium Gear • Zero Deposit • Free 2-Hour Delivery & Return',
  description: 'Rent commercial Kärcher pressure washers, 800W JBL party speakers, 4K cinema projectors, and Festool power tools with 100% zero deposit hold in London & M25.',
  keywords: 'tool hire london, rent party speakers, zero deposit rental uk, circular economy, karcher hire, projector rental london',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans antialiased selection:bg-lime selection:text-charcoal">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Global Modals & Drawers */}
        <CartDrawer />
        <PostcodeModal />
        <TwoFactorModal />
      </body>
    </html>
  );
}
