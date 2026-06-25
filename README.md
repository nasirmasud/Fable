# 📚 Fable – E-book Sharing Platform

## Project Overview

---

## 🎯 Project Summary

**Fable** is a full-stack e-book digital marketplace that connects readers, writers, and administrators. The platform enables writers to publish and monetize original e-books, allows readers to discover and purchase content, and provides administrators with comprehensive management and analytics tools. Built with modern web technologies, it emphasizes user experience, security, and scalability.

**Live URL:** [https://fable-amber.vercel.app](https://fable-amber.vercel.app)

---

## 🏗️ Architecture Overview

### Tech Stack

#### Frontend (Client)

- **Framework:** Next.js 16 (React 19) with App Router
- **Styling:** Tailwind CSS 4 + PostCSS
- **UI Components:** shadcn/ui (Base UI + Radix UI primitives)
- **Authentication:** BetterAuth (Email/Password + Google OAuth)
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Payments:** Stripe (Client SDK)
- **Icons:** Lucide React + React Icons
- **Notifications:** Sonner (Toast library)
- **Carousel:** Swiper
- **Theme:** next-themes (Dark mode support)

#### Backend (Server)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** BetterAuth with MongoDB adapter
- **Payments:** Stripe (Server SDK)
- **CORS:** Enabled for cross-origin requests
- **Environment:** Dotenv for configuration

#### Deployment

- **Client:** Vercel
- **Server:** Node.js server (custom deployment)
- **Database:** MongoDB Atlas

---

## 📊 Database Schema

### Collections

#### 1. **users**

- User profiles (readers and writers)
- Managed by BetterAuth
- Fields: email, name, role (reader/writer), avatar, metadata

#### 2. **ebooks**

- E-book metadata and content
- Fields: title, description, author (writer), cover image, price, genre, status, content, upload date, view count

#### 3. **soldbooks**

- Purchase transactions and sales history
- Fields: book id, buyer id, seller id, price, purchase date, transaction status

#### 4. **bookmarks**

- User bookmarks/wishlist entries
- Fields: user id, book id, created date

---

## 🗂️ Project Structure

```
fable/
├── client/                          # Next.js Frontend Application
│   ├── app/
│   │   ├── page.js                  # Home page
│   │   ├── layout.js                # Root layout
│   │   ├── globals.css              # Global styles
│   │   ├── api/                     # API routes (Auth, Checkout)
│   │   ├── all-books/               # Public ebook catalog
│   │   ├── authors/                 # Author profile pages
│   │   ├── login/                   # Login & authentication
│   │   ├── signup/                  # User registration
│   │   ├── dashboard/               # Role-based dashboards
│   │   │   ├── admin/               # Admin overview & controls
│   │   │   ├── reader/              # Reader dashboard
│   │   │   └── writer/              # Writer dashboard
│   │   └── unauthorized/            # Access denied page
│   │
│   ├── components/
│   │   ├── pageContent/             # Full-page components
│   │   ├── tools/                   # Utility components
│   │   └── ui/                      # Reusable UI components (15+)
│   │
│   ├── lib/
│   │   ├── auth.js                  # BetterAuth configuration
│   │   ├── stripe.js                # Stripe integration
│   │   ├── actions/                 # Server actions
│   │   ├── api/                     # API integration layer
│   │   ├── core/                    # Core utilities
│   │   └── utils/                   # Helper utilities
│   │
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   └── README.md
│
└── server/                          # Express.js Backend
    ├── index.js                     # Main server file
    ├── package.json
    ├── vercel.json                  # Deployment config
    └── .env                         # Environment variables
```

---

## 🔄 Data Flow

### Authentication Flow

```
User Registration/Login
  → BetterAuth (Email/Google)
  → JWT Session Token (7-day expiration)
  → Role Selection (Reader/Writer)
  → Dashboard Access
```

### E-book Purchase Flow

```
Browse Catalog
  → View E-book Details
  → Click "Buy Now"
  → Stripe Checkout Session
  → Secure Payment Processing
  → Add to "Purchased" Collection
  → Content Unlock & Access
```

### Writer Publishing Flow

```
Writer Dashboard
  → Click "Add New E-book"
  → Fill Complete Metadata (Title, Price, Genre, Cover, Description)
  → Upload Content
  → Publish/Draft Toggle
  → Appears in Catalog (if published)
```

---

## 🔐 API Endpoints

### Backend API (Express Server)

#### Users

- `GET /api/users` – Fetch all users (admin)
- `DELETE /api/users/:id` – Remove a user account (admin)

#### E-books

- `GET /api/ebooks` – Fetch all published e-books
- `GET /api/ebooks/:id` – Get single e-book details
- `POST /api/ebooks` – Create new e-book (authenticated writer)
- `PUT /api/ebooks/:id` – Update e-book metadata (writer/admin)
- `DELETE /api/ebooks/:id` – Delete e-book (writer/admin)

#### Sales & Transactions

- `GET /api/soldbooks` – Fetch all sales (admin)
- `GET /api/soldbooks/writer/:id` – Get writer's sales history
- `POST /api/soldbooks` – Record new purchase

#### Bookmarks

- `GET /api/bookmarks/:userId` – Get user's bookmarks
- `POST /api/bookmarks` – Add bookmark
- `DELETE /api/bookmarks/:id` – Remove bookmark

### Frontend API Routes (Next.js)

- `POST /api/auth/[...all]` – BetterAuth endpoints (login, signup, logout)
- `POST /api/checkout_sessions` – Create Stripe checkout session

---

## 🛡️ Security Considerations

1. **Authentication:** BetterAuth manages secure JWT session tokens with 7-day expiration
2. **Protected Routes:** Role-based access control (Reader, Writer, Admin) with middleware guards
3. **CORS Configuration:** Strict CORS policy on backend for safe cross-origin requests
4. **Payment Security:** Stripe handles PCI compliance and secure payment processing
5. **Database Security:** MongoDB connections secured with environment variables and authentication
6. **Session Persistence:** No data loss on page reload; sessions stored securely
7. **Environment Management:** All sensitive keys stored in `.env` and `.env.local` files (never committed to git)

---

## 👥 User Roles & Permissions

| Feature                 | Reader | Writer | Admin |
| :---------------------- | :----: | :----: | :---: |
| Browse E-books          |   ✅   |   ✅   |  ✅   |
| Purchase E-books        |   ✅   |   ✅   |  ✅   |
| Create Bookmarks        |   ✅   |   ✅   |  ✅   |
| Publish E-books         |   ❌   |   ✅   |  ✅   |
| Manage Own E-books      |   ❌   |   ✅   |  ✅   |
| Manage All E-books      |   ❌   |   ❌   |  ✅   |
| Manage All Users        |   ❌   |   ❌   |  ✅   |
| View Own Analytics      |   ❌   |   ✅   |  ✅   |
| View Platform Analytics |   ❌   |   ❌   |  ✅   |

---

## 📈 Performance & Scalability

- **Pagination:** Efficient server-side pagination for handling large datasets
- **Skeleton Loaders:** Improves perceived performance during content loading
- **Image Optimization:** Next.js Image component for responsive, optimized images
- **Code Splitting:** Modular component architecture enabling automatic route-based code splitting
- **Caching Strategy:** Leverages Next.js built-in caching and HTTP caching headers
- **Database Indexing:** MongoDB collections indexed on frequently queried fields
- **CDN Delivery:** Vercel's edge network for ultra-fast static asset delivery globally

---

## 🔮 Future Enhancement Opportunities

- **User Reviews & Ratings:** Enable readers to review and rate purchased e-books
- **Search Optimization:** Full-text search with Elasticsearch for advanced filtering
- **Social Features:** Author follow system, community comments, and discussions
- **Content Features:** Series/Collections, table of contents, highlights, annotations, reading progress tracking
- **Payment Features:** Multiple payment gateways (PayPal, Apple Pay), subscription plans, promotional codes
- **Internationalization:** Multi-language support and currency conversion
- **Content Management:** WYSIWYG editor for e-book creation, DRM protection, version control
- **Mobile App:** Native iOS/Android apps for better reading experience

---
