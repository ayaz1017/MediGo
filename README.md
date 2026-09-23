# 💊 MediQuick – Online Pharmacy & Medicine Delivery Platform

MediQuick is a modern full-stack online pharmacy platform designed to provide a smooth and secure experience for browsing medicines, managing prescriptions, placing orders, and tracking deliveries.

The frontend is built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Framer Motion**, with a focus on responsive design, clean architecture, and a premium healthcare-oriented user experience.

## ✨ Features

* 🏥 Modern online pharmacy interface
* 💊 Medicine catalog with detailed product information
* 🔎 Search medicines by name, salt, and category
* 🎯 Advanced filtering by category, brand, price, and prescription requirement
* 🛒 Persistent shopping cart using Zustand
* 📦 Multi-step checkout workflow
* 📋 Prescription upload support
* 📍 Pincode-based availability
* 💳 Payment method selection
* 🚚 Order confirmation and tracking interface
* 📱 Responsive design for desktop, tablet, and mobile
* 🎨 Smooth animations using Framer Motion
* 🌙 Premium healthcare-focused UI design

## 🛠️ Tech Stack

### Frontend

* Next.js 14
* React
* TypeScript
* Tailwind CSS
* Zustand
* Framer Motion
* Lucide Icons

### Backend / Integration

The frontend architecture is prepared for integration with:

* REST APIs
* PostgreSQL / relational database
* Authentication & authorization
* Real-time inventory
* Prescription verification
* Razorpay payment processing
* Order management and fulfillment

## 📂 Project Structure

```text
MediQuick/
├── src/
│   ├── app/
│   │   ├── medicines/
│   │   ├── search/
│   │   ├── checkout/
│   │   └── order-success/
│   │
│   ├── components/
│   │   ├── cart/
│   │   ├── medicine/
│   │   └── ...
│   │
│   ├── store/
│   │   └── cartStore.ts
│   │
│   └── data/
│       └── medicines.ts
│
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone <your-repository-url>
cd MediQuick
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🏗️ Current Architecture

The current version uses structured mock medicine data so that the frontend can be developed and tested independently of the backend.

The data layer is separated from the UI components, making it straightforward to replace the static medicine catalogue with API-driven data.

### Current Flow

```text
User
  ↓
Next.js Frontend
  ↓
Medicine Catalogue
  ↓
Search / Filters
  ↓
Product Details
  ↓
Zustand Cart
  ↓
Checkout
  ↓
Prescription Verification
  ↓
Payment
  ↓
Order Confirmation
```

## 🔮 Planned Backend Integration

The next stage is to connect MediQuick with a production backend supporting:

* User authentication
* Medicine inventory
* PostgreSQL database
* Prescription management
* Real-time stock validation
* Server-side price verification
* Order management
* Payment gateway integration
* Payment verification and webhooks
* Delivery/order tracking
* Admin and pharmacy operations

## 📌 Project Status

**Frontend:** ✅ Completed
**UI/UX:** ✅ Completed
**Product Catalogue:** ✅ Completed
**Search & Filtering:** ✅ Completed
**Cart:** ✅ Completed
**Checkout UI:** ✅ Completed
**Build Verification:** ✅ Passed
**Backend Integration:** 🚧 Next Stage
**Production Payments:** 🚧 Pending Backend Integration

## ⚠️ Important

The current frontend uses mock product data and mock payment flows for development and demonstration purposes. No real payment transaction should be processed using the current frontend-only implementation.

---

**MediQuick**
*A modern digital pharmacy experience built with Next.js and TypeScript.*
