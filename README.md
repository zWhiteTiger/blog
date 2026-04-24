# 📝 Blog App

A modern blog platform built with **Next.js (App Router)** and **shadcn/ui**, designed for performance, clean UI, and scalable architecture.

---

## 🚀 Live Demo

- 🌐 Production: https://blog.toramaru.cc
- ⚡ Preview (Vercel): https://blog-nine-chi-72.vercel.app

---

## 🧠 Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- NextAuth (Authentication)
- MongoDB (or your DB if applicable)

---

## ✨ Features

- 🔍 Smart blog search (quick search + full search)
- 📄 Blog listing with dynamic routing
- 🎯 Client-side interactions (search, dropdown, navigation)
- 🧩 Reusable UI components (shadcn/ui)
- 🔐 Authentication system (NextAuth)
- 📱 Responsive design (mobile-first)

---

## 🔎 Search System

The project supports two search modes:

### 🏠 Quick Search (Home Page)
- Directly redirects to `/blog?search=query`
- No data preloading (fast & lightweight)

### 📚 Full Search (Blog Page)
- Filters blog data
- Suggestion dropdown
- Exact match → redirects to blog detail page

---
## 🏗️ Project Structure

```bash
app/
├── page.tsx (Home - Quick Search)
├── blog/
│ ├── page.tsx (Blog listing)
│ ├── [slug]/ (Blog detail)
components/
├── element/
│ ├── searchButton.tsx
├── ui/ (shadcn components)
lib/
├── api/
├── db/
types/
```
---

## Enviroment

```.env

# ──────────────────────────────────────────────
# API Settings
# ──────────────────────────────────────────────

# Base URL of the API server
# Development : http://localhost:3000/api/
# Production  : https://yourdomain.com/api/
apiURL=http://localhost:3000/api/

# API version used as a path prefix (e.g. /api/v1/...)
# Increment to v2, v3 when introducing breaking changes
apiVersion=v1

# ──────────────────────────────────────────────
# Database — MongoDB
# ──────────────────────────────────────────────

# Mongodb connection string
# "mongodb+srv://user:password@server.domain/?retryWrites=true&w=majority"
MONGODB_URI=...

# ──────────────────────────────────────────────
# NextAuth Settings
# ──────────────────────────────────────────────

# Base URL of the application — used by NextAuth to build
# OAuth callback URLs and handle post-login redirects
# Development : http://localhost:3000
# Production  : https://yourdomain.com
NEXTAUTH_URL=http://localhost:3000

# Secret key used to sign and encrypt NextAuth JWT session tokens and cookies
# Minimum 32 characters — generate a new one with:
#   openssl rand -base64 32
NEXTAUTH_SECRET=...

# ──────────────────────────────────────────────
# Google OAuth 2.0
# ──────────────────────────────────────────────

# Client ID and Secret from Google Cloud Console
# Used for Google SSO authentication
#
# Setup:
#   1. Go to https://console.cloud.google.com/
#   2. Create an OAuth 2.0 Client ID (Web application)
#   3. Add Authorized redirect URIs:
#      Development : http://localhost:3000/api/v1/auth/callback/google
#      Production  : https://yourdomain.com/api/v1/auth/callback/google
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# ──────────────────────────────────────────────
# Cloudflare R2 buckets
# ──────────────────────────────────────────────

R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=...
R2_PUBLIC_URL=...

```

---

## 🧪 Development

```bash
# install dependencies
yarn install

# run dev server
yarn dev

# build production
yarn build

# start production
yarn start

```
