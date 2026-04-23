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
