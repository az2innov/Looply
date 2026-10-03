# Guide de Déploiement & Plan de Test Local (From Scratch) - Looply

Ce guide vous accompagne pas-à-pas pour tester Looply en local sur n'importe quelle machine (avec Supabase, Upstash Redis et Stripe) et pour le déployer en production sur **Vercel**.

---

## 📋 Table des matières
1. [Stack Technique Confirmée](#1-stack-technique-confirmée)
2. [Comment Pusher le Code sur GitHub](#2-comment-pusher-le-code-sur-github)
3. [Configuration des Services Cloud Gratuits (Tier Développeur)](#3-configuration-des-services-cloud-gratuits)
4. [Test en Local From Scratch (Sur n'importe quelle machine)](#4-test-en-local-from-scratch)
5. [Scénarios de Validation des Fonctionnalités Clés](#5-scénarios-de-validation-des-fonctionnalités-clés)
6. [Déploiement en 1 Clic sur Vercel](#6-déploiement-en-1-clic-sur-vercel)

---

## 1. Stack Technique Confirmée

- **Frontend & API Routes** : Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Base de données relationnelle** : **Supabase** (PostgreSQL managé) via **Prisma ORM**
- **Cache & Rate Limiting** : **Upstash Redis** (Serverless Redis pour les codes 2FA OTP et le verrouillage des créneaux)
- **Paiements** : **Stripe** (£0 Deposit Hold + Paiement à l'usage) + PayPal + Apple Pay
- **Hébergement Production** : **Vercel** (Région `London, UK - lhr1`)

---

## 2. Comment Pusher le Code sur GitHub

Le dépôt local est déjà initialisé, indexé et commité sur la branche `main` avec l'origine pointant vers `https://github.com/az2innov/Looply.git`.

Pour envoyer le code sur GitHub :

```bash
# Option A : Via HTTPS (GitHub vous demandera votre Token d'accès personnel)
git push -u origin main

# Option B : Si vous utilisez une clé SSH
git remote set-url origin git@github.com:az2innov/Looply.git
git push -u origin main
```

---

## 3. Configuration des Services Cloud Gratuits

### A. Supabase (Base de Données PostgreSQL)
1. Rendez-vous sur [supabase.com](https://supabase.com) et créez un compte gratuit.
2. Créez un nouveau projet :
   - **Nom** : `looply-production`
   - **Région** : **Europe (London) `eu-west-2`** *(crucial pour la latence au UK)*
   - **Mot de passe base de données** : Choisissez un mot de passe sécurisé et notez-le.
3. Rendez-vous dans **Project Settings > Database** :
   - Copiez l'URL de connexion en mode **Transaction Pooler (Port 6543)** -> Ce sera votre `DATABASE_URL`.
   - Copiez l'URL de connexion en mode **Direct Connection (Port 5432)** -> Ce sera votre `DIRECT_URL`.
4. Rendez-vous dans **Project Settings > API** :
   - Copiez votre **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`).
   - Copiez votre clé **`anon` `public`** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`).

### B. Upstash Redis (Gestion des OTP 2FA & Verrouillage des Créneaux)
1. Rendez-vous sur [upstash.com](https://upstash.com) et créez un compte gratuit.
2. Créez une nouvelle base **Redis** :
   - **Nom** : `looply-redis`
   - **Région** : **eu-west-2 (London)**
3. Dans l'onglet **REST API**, copiez :
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### C. Stripe (Mode Test)
1. Rendez-vous sur [stripe.com](https://stripe.com) et connectez-vous au Dashboard en **Mode Test**.
2. Dans **Développeurs > Clés API** :
   - Copiez la **Clé secrète** (`STRIPE_SECRET_KEY` = `sk_test_...`).
   - Copiez la **Clé publiable** (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...`).

---

## 4. Test en Local From Scratch

Pour tester le projet sur une **autre machine** (ou cloner proprement) :

### Étape 1 : Cloner et installer les dépendances
```bash
git clone https://github.com/az2innov/Looply.git
cd Looply
npm install
```

### Étape 2 : Configurer les variables d'environnement
Créez le fichier `.env.local` à la racine :
```bash
cp .env.example .env.local
```
Ouvrez `.env.local` et collez vos identifiants réels (ou laissez les placeholders pour le mode démonstration instantané avec mock) :
```env
DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASS]@aws-0-eu-west-2.pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://[REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."

UPSTASH_REDIS_REST_URL="https://[INSTANCE].upstash.io"
UPSTASH_REDIS_REST_TOKEN="[TOKEN]"

STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

NEXTAUTH_SECRET="une-cle-secrete-32-caracteres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Étape 3 : Synchroniser & Seeder la Base de Données
Exécutez la synchronisation du schéma Prisma avec Supabase et insérez les 17 équipements de test :
```bash
# 1. Pousser le schéma Prisma sur Supabase
npm run db:push

# 2. Injecter les produits, utilisateurs et codes promos
npm run db:seed
```

*(Optionnel)* Pour inspecter visuellement vos tables Supabase dans votre navigateur :
```bash
npm run db:studio
```

### Étape 4 : Lancer le serveur local
```bash
npm run dev
```
Rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## 5. Scénarios de Validation des Fonctionnalités Clés

| Scénario de Test | Action à réaliser | Résultat attendu |
|---|---|---|
| **1. Vérification Code Postal UK** | Cliquez sur la pastille de code postal en haut et tapez `SW1A 1AA` ou `TW10 6QX`. | Affiche le badge vert *"Free 2-Hour Delivery & Collection straight to your door"*. |
| **2. Calculateur d'Économie Circulaire** | Faites défiler la page d'accueil jusqu'au comparateur. | Montre les économies de 80%+ par rapport à l'achat neuf et le zéro dépôt. |
| **3. Panier & Durée 28h Flex** | Sélectionnez un nettoyeur Kärcher ou un système JBL, modifiez la durée (1 jour / 28h, 2 jours). | Calcule le tarif de base + jours supplémentaires, affiche l'économie vs prix neuf RRP. |
| **4. Code Promo** | Dans le panier, appliquez le code `FIRST10` ou `SUMMERFEST`. | Déduction immédiate de 10% ou £15 sur le sous-total. |
| **5. Checkout & Paiement Stripe** | Choisissez un créneau (ex: 10:00 - 12:00), sélectionnez l'onglet Stripe Card (numéro prérempli `4242...`), cliquez sur *"Confirm & Book Rental"*. | Verrouillage du créneau, simulation du PaymentIntent à £0 de caution, pluie de confettis et confirmation avec numéro `LP-XXXXX` et chauffeur assigné. |
| **6. Sécurité 2FA & Redis** | Déconnectez-vous et connectez-vous avec `admin@looply.co.uk` (mot de passe `password123`). | L'écran modal de défi 2FA s'affiche demandant le code à 6 chiffres stocké dans Redis (utilisez `123456` ou le bouton d'auto-remplissage). |
| **7. Backoffice Admin (`/admin`)** | Rendez-vous sur `/admin`. | Tableau de bord avec statistiques en direct, gestion CRUD du catalogue, pipeline de livraison Kanban et générateur de bons de réduction. |

---

## 6. Déploiement en 1 Clic sur Vercel

1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **"Add New Project"** et sélectionnez le dépôt **`az2innov/Looply`**.
3. Dans **Settings > Functions**, sélectionnez la région **`London, UK (lhr1)`**.
4. Dans **Environment Variables**, ajoutez les mêmes variables que votre `.env.local` :
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXTAUTH_SECRET`
5. Cliquez sur **Deploy**. En moins de 90 secondes, Looply sera en ligne avec son certificat SSL mondial !
