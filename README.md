# ihdat E-Commerce Portal - Frontend Client

This is the premium minimalist e-commerce frontend for **ihdat**, built using **Next.js 15 (App Router)**, **Redux Toolkit**, **Framer Motion**, and **Tailwind CSS**.

---

## 🚀 Key Features

* **Capsule Collections Catalog**: Smooth, paginated loading (9 items initially, then 8 more per click) with custom topbar category filtering and price sorting.
* **Frictionless Checkout**: Cash on delivery checkouts utilizing Redux state management.
* **Public Tracking Portal**: Real-time order tracking using unique database Order IDs (`GET /api/orders/track/:id`).
* **Contact Inquiries**: A public contact form connected directly to administrative email triggers.
* **Interactive Admin Dashboard**: Full control over products (CRUD with WebP image uploads through ImageKit), orders, and user directories.
* **Clean Aesthetics**: Premium color palette, modern typography, glassmorphism elements, and responsive layout.

---

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router)
* **State Management**: Redux Toolkit (Thunks for async operations)
* **Styling**: Tailwind CSS & Lucide Icons
* **Animations**: Framer Motion
* **API Client**: Axios with automated authorization request interceptors

---

## ⚙️ Environment Configuration

Create a `.env.local` file inside the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the client-side store application.

---

## 📁 Key File Structure

* `/src/app/(shop)` - Customer-facing storefront routes (Catalog, Product Details, Contact Us, Order Tracking, Checkout).
* `/src/app/admin` - Administrative dashboard workspace (Product CRUD, Orders Operations, User Directories).
* `/src/store` - Redux Toolkit slices (Auth, Products, Orders, Cart, QuickView).
* `/src/utils/api.js` - Configuration client for server communications (includes admin JWT attaching interceptor).
* `/src/utils/apiEndpoints.js` - Centralized manifest mapping all API endpoint targets.
