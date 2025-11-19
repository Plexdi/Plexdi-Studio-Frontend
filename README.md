# **Plexdi Studio — Frontend**

A modern, minimal, animation-driven portfolio, store, and commissions platform for **Plexdi Studio** — built with **Next.js, TypeScript, Tailwind CSS**, and a clean UI inspired by high-end design studios.

This repository contains the **frontend** of the Plexdi Studio website:

* Portfolio (banner showcase carousel)
* Store (digital design packs)
* Commissions page (frontend form → backend email API)
* About page
* Custom admin login
* Internal admin dashboard
* Responsive nav + smooth scroll animations
* Fully componentized & future-proof

---

## 🚀 **Tech Stack**

**Framework:**

* Next.js 14 (App Router)
* TypeScript
* React Server Components + Client Components

**Styling:**

* Tailwind CSS
* Custom animations (Framer-Motion inspired micro-interactions)

**UI Components:**

* Hand-crafted components
* ShadCN (optional, used lightly)
* Custom carousel for portfolio banners

**State & Utilities:**

* LocalStorage (admin token)
* React Hot Toast (UI messages)
* Fetch API for backend communication

---

## 🔧 **Features**

### ⭐ **Public Pages**

* **Landing page** with scrolling gallery animation

* **Portfolio page** with full-width animated carousel (1500×500 banners)

* **Shop page** (static product list until backend is connected)

* **Commissions page**

  * Form with validation
  * Sends data to backend API
  * Receives backend response & displays toast messages

* **About page** with sections for “About Me” and “About Plexdi Studio”

---

### 🔐 **Admin System**

The site includes a lightweight **token-based admin authentication** (no email/password):

* `/adminsLogin` → enter secret admin token
* Stores token in `localStorage`
* `/admins` panel is locked unless token matches
* No database auth needed yet (simple but secure for solo use)

### 📊 **Admin Dashboard**

Inside `/admins`:

* Overview metrics (Queued, In Progress, Completed)
* Full commissions table
* Status update controls
* Delete functionality
* Create commission (mock or real backend)
* Product list (future: editable)

---

## 🗂️ **Project Structure**

```
app/
 ├─ page.tsx                 # Home
 ├─ portfolio/               # Carousel showcase
 ├─ shop/                    # Product display
 ├─ commissions/             # Form + backend submission
 ├─ about/                   # About Me + Studio info
 ├─ adminsLogin/             # Admin login page
 └─ admins/                  # Admin dashboard

components/
 ├─ Navbar.tsx
 ├─ Footer.tsx
 ├─ ui/
 │   ├─ carousel.tsx         # Custom 3:1 banner carousel
 │   └─ ... other UI parts

public/
 └─ portfolio/banners/       # 1500x500 banner images

```

---

## 🔌 **Environment Variables**

Create a `.env.local` file:

```
NEXT_PUBLIC_ADMIN_TOKEN=your-secret-token-here
NEXT_PUBLIC_BACKEND_URL=https://your-backend.com
```

Used for:

* Protecting admin panel
* Sending commission requests

---

## ▶️ **Running the Project**

### **Install dependencies**

```bash
npm install
```

### **Start dev server**

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🌐 **Deployment**

The project is optimized for **Vercel**:

* Zero-config build
* Supports Next.js App Router natively
* Environment variables included through settings

---

## 🛠️ **Backend Integration**

The frontend communicates with your Go backend:

* `POST /commissions` → submits commission form
* `GET /commissions` → fetch admin list
* `PATCH /commissions/:id` → update status
* `DELETE /commissions/:id` → delete request

JSON responses are displayed to users via toast notifications.

---

## 📈 **Future Additions**

* Real payment integration (Stripe or PayPal SDK)
* Editable shop items from admin panel
* Designer assignment system
* More portfolio categories (emotes, logos, thumbnails)
* Automatic email notifications on status change

---

## ✨ **Author**

**Plexdi** —
Designer • Developer • Content creator
Focused on building clean visuals, minimal experiences, and scalable systems.
