# Looply - Zero Deposit Rental & Subscription Web Application

> **"Access premium gear. Zero deposit. Free doorstep delivery & return."**  
> UK-localized rental e-commerce platform inspired by the circular economic model of whybuy.co.uk, featuring an enterprise backoffice, interactive 2-hour delivery slot engine, and Two-Factor Authentication (2FA).

---

## 🎨 1. Brand Identity & Design System

- **Brand Name**: Looply
- **Tagline**: *"Access premium gear. Zero deposit. Free doorstep delivery & return."*
- **Color Palette**:
  - **Primary**: Deep Emerald Forest (`#064E3B`, `#032B20`) & Fresh Mint (`#10B981`)
  - **High-Conversion Accent**: Electric Lime (`#D4FF00`) with dark typography
  - **Neutral Dark**: Slate Charcoal (`#0F172A`)
  - **Neutral Light**: Pure White (`#FFFFFF`) & Soft Cream Gray (`#F8FAFC`)
- **Visual Style**: Modern `rounded-3xl` cards, subtle drop shadows, PAT safety certificate badges, glassmorphism ribbons, and micro-interactions powered by Framer Motion.

---

## 🌟 2. Key Value Propositions (Prominently Highlighted)

1. **100% Zero Deposit / No Upfront Risk**:
   - Never freeze customer bank funds or hold £500+ deposits on credit cards.
   - Customers only pay for their exact rental days.
2. **Free 2-Hour Delivery & Collection**:
   - Cleaned, sanitized, and PAT tested equipment delivered in weatherproof reusable crates straight to the doorstep across London & the M25.
   - Collection is free and requires zero repackaging, labels, or post office queues.
3. **Circular Living: Save up to 80% vs Buying New**:
   - Eliminates household storage clutter and huge capital outlays for tools and event gear used twice a year.

---

## 🛠️ 3. Tech Stack & Architecture

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS + Lucide React Icons
- **State Management**: Zustand
  - `useCartStore.ts`: Rental duration calculation, 28h flex base price + daily rate, savings vs buy, £0 deposit guarantee, promo voucher engine
  - `useAuthStore.ts`: Authentication, 2FA TOTP/OTP challenge & verification flow, user settings
  - `usePostcodeStore.ts`: UK Postcode delivery zone verification modal (London & M25 2-hour slots vs nationwide)
  - `useAdminStore.ts`: Product catalog CRUD, Orders pipeline & driver slot assigner, Hero carousel manager, Discount voucher generator
- **Security**: Two-Factor Authentication (2FA) layer with simulated 6-digit TOTP code input & authenticator QR code setup.
- **Payments**: Checkout supporting Stripe Card input simulation, Apple Pay, and PayPal instant checkout tabs.

---

## 🚀 4. Application Routes & Key Features

| Route | Description |
|---|---|
| `/` | **Storefront**: Notification banner, Hero with dynamic seasonal carousel, instant UK postcode checker, 3 USPs bar, interactive catalog with 17+ products, 3-step timeline, Circular Savings comparison calculator, Trustpilot 4.9 reviews reel, UK FAQs. |
| `/product/[id]` | **Product Detail**: Multi-angle image gallery, detailed specifications, PAT testing certificate badge, interactive duration picker, bundle inclusions, and instant checkout trigger. |
| `/checkout` | **Checkout Flow**: Step 1: UK delivery address + 2-hour morning/afternoon slot selector. Step 2: Payment choices (Stripe, Apple Pay, PayPal), explicit £0 deposit hold reassurance, and animated confetti order confirmation. |
| `/auth/login` | **Sign In**: Login with demo quick-fill presets and automatic 2FA TOTP challenge screen. |
| `/auth/register` | **Registration**: New customer account creation with instant soft identity check. |
| `/account` | **Customer Portal**: Security settings (Enable/Disable 2FA, QR setup, secret key, recovery codes), active loan status, and past delivery history. |
| `/admin` | **Enterprise Backoffice**: Sidebar navigation with 6 modules: Analytics KPIs, Catalog CRUD, Orders dispatch pipeline & driver assigner, Carousel manager, User directory, and Discount voucher engine. |

---

## 🔑 5. Test Credentials & Quick Demo Presets

- **Admin Account**: `admin@looply.co.uk` / `password123` (2FA Enabled)
- **Customer Account**: `oliver.j@example.co.uk` / `password123` (2FA Enabled)
- **2FA Verification Code**: `123456` (or any 6-digit code in testing mode, with one-click "Auto-fill" button)
- **Valid UK Postcodes**: `SW1A 1AA`, `E1 6AN`, `TW10 6QX`, `NW1 4RY`, `CR0 1EA`, etc.
- **Promo Discount Codes**:
  - `FIRST10`: 10% off (min order £20)
  - `SUMMERFEST`: £15 off (min order £50)
  - `ZERODEPOSIT20`: 20% off (min order £80)

---

## 💻 6. Running the Project Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```
The application will be available at `http://localhost:3000`.
