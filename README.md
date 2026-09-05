# AI Tools Store - Production Web Application

A modern, high-converting AI Tools Marketplace with 3D concentric revolving orb hero, multi-language support (English & Urdu), customer authentication, and a full-featured Administrator Management Console powered by Supabase.

---

## 🚀 Key Features

* **3D Concentric Orbit Hero**: 3 revolving concentric orbits with 12 rotating AI tool badges (Gemini, Replit, Lovable, n8n, Make.com, Zapier, CapCut, Notion, Antigravity, Kiro, ChatGPT, Midjourney) with vector brand logos, hover-to-pause, and interactive search.
* **Role-Based Security (Admin vs Member)**:
  * **Administrator**: Exclusive access via profile to the full Admin Panel (`#/admin`) with AI tools CRUD, registered members directory, analytics KPIs, and community settings.
  * **VIP Member**: Clean public marketplace experience without admin links; direct access to `#/admin` is blocked with security screen.
* **Supabase Authentication & PostgreSQL Trigger**: Automatic real-time profile creation, login time tracking (`last_sign_in_at`), and secure Row-Level Security (RLS).
* **Production Node.js Server**: Built-in Express server (`server.js`) optimized for **Hostinger Node.js Web Apps** with SPA fallback routing, asset caching, and security headers.

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
# Copy .env.example to .env and insert your Supabase credentials
cp .env.example .env

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build

# 5. Test production server locally
npm start
```

---

## 🌐 Hostinger Node.js Web App Deployment Guide

Follow these simple steps to deploy on Hostinger:

### Step 1: Create a New Node.js Web App in Hostinger hPanel
1. Log in to your Hostinger hPanel dashboard.
2. Go to **Websites** > **Add Website** or navigate to your domain's **Node.js** section.
3. Configure the application settings:
   * **Node.js Version**: Select `18.x` or `20.x` (recommended: 20.x LTS).
   * **Application Mode**: `Production`.
   * **Application Root**: `/public_html` (or your chosen subdirectory).
   * **Application Startup File**: `server.js`.

### Step 2: Set Environment Variables in Hostinger
In the Hostinger Node.js configuration, add the following Environment Variables:
* `VITE_SUPABASE_URL` = `https://rqemoitjanmxsmcmveso.supabase.co`
* `VITE_SUPABASE_ANON_KEY` = `your-supabase-anon-key`
* `VITE_DEFAULT_WHATSAPP_URL` = `https://chat.whatsapp.com/invite/aitools-store-vip`
* `NODE_ENV` = `production`

### Step 3: Install & Build on Hostinger
In Hostinger File Manager / Git deployment or SSH terminal:
```bash
npm install
npm run build
npm start
```

Your AI Tools Store will be live on your Hostinger domain!

---

## 📦 Supabase Database Setup
Before launch, run the SQL scripts located in the `supabase/` folder:
1. Open your [Supabase SQL Editor](https://supabase.com/dashboard).
2. Run `supabase/roles_and_admin_security.sql` to initialize database tables, roles, and triggers.
3. In Supabase **Authentication > Providers > Email**, ensure **"Confirm email"** is turned OFF for instant account activation.
