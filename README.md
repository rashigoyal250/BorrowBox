# BorrowBox – Campus Borrowing Marketplace 🎒🤝

**BorrowBox** is a modern peer-to-peer campus marketplace designed specifically for college students. Students can discover items listed by fellow classmates (scientific calculators, lab coats, textbooks, electronics, tools, umbrellas, sports gear, etc.) and request to borrow them in minutes instead of purchasing single-use gear.

Inspired by clean, fresh grocery marketplace aesthetics, BorrowBox brings a mint-green palette, soft pastel accents, product-style cards, and a student borrowing workflow with zero shopping carts or checkout hurdles.

---

## 🌟 Key Features

### 1. Fresh Marketplace Visual Identity
- **Color Palette:** Fresh mint green (`#059669`, `#10B981`), soft pastel backgrounds (`#e8f8f0`, `#f0fdf4`), and dark green accents.
- **Hero Banner:** *"Borrow What You Need. Share What You Have."* with live student meetup tickers and trust badges.
- **Category Tiles:** 8 soft pastel tiles (Electronics, Books & Notes, Lab Essentials, Stationery, Clothing & Accessories, Sports & Fitness, Everyday Essentials, Tools & Equipment).
- **Product Cards:** Modern e-commerce cards featuring condition pills, Free/Daily rate badges, verified lender avatars, campus location labels, heart wishlist button, and prominent **"View & Borrow"** buttons.

### 2. Dedicated Marketplace ("Explore Items")
- Full text search across item titles, categories, and descriptions.
- Multi-dimensional filters: Category, Campus Location, Price (All / Free / Paid), Condition (Brand New, Like New, Good, Fair), and Availability.
- Sort by Most Popular, Recently Added, Price Low-High, and Price High-Low.
- Grid / List view toggle.
- Real-time active filter chips with one-click reset.

### 3. Borrowing Request Flow
- Clicking **"View & Borrow"** opens the comprehensive Item Details page.
- Image gallery with thumbnail switcher.
- Duration selector with dynamic expected return date and cost calculation.
- Primary **"Send Borrow Request"** button opens a confirmation modal summarizing the meetup details.
- On confirmation, a toast notification appears and the request is added to **My Activity → Items I'm Borrowing** with `Pending` status.
- Items currently borrowed by others cannot be requested.

### 4. "List an Item" Flow
- Clean listing modal with live card preview.
- Presets for campus items (calculators, lab coats, books, tools, sports gear) + URL input + local file upload with preview.
- Free vs Paid toggle (supports ₹0 community lending or sample daily rate).
- Campus zone & exact hostel room selection.
- Max duration settings and student lending guidelines.
- Instant LocalStorage persistence and immediate visibility across marketplace.

### 5. My Activity Dashboard
- **Items I'm Borrowing:** Details, lender info, status (`Pending`, `Approved`, `Borrowed`, `Returned`, `Rejected`, `Overdue`), expected return date, total cost, and working **"Return Item"** action.
- **Items I'm Lending:** User's listed items, incoming requests, borrower info, requested duration, **Approve** and **Reject** buttons, and **Mark as Returned** action.
- Interactive Recharts bar visualization tracking monthly campus sharing volume.

### 6. Wishlist
- Save gear with heart icons.
- Quick removal and **"View & Borrow"** navigation.
- Persists in LocalStorage.

### 7. Student Profile & Campus Impact
- University Student ID card styling for *Aanya Sharma* (Computer Science, 3rd Year).
- Verified student badge, college email, and hostel room.
- Metrics for items listed, items borrowed, completed deals, and peer ratings.
- Campus Karma Points and CO₂ carbon offset tracker.
- Full listing management with **Edit** and **Delete** actions.
- "Reset Demo Data" helper button to restore default sample items.

### 8. Campus Location Discovery
- Filter and explore items by campus zones: *Hostels (Blocks A-D)*, *Academic Blocks*, *Central Library*, *Sports Complex*, and *Student Activity Center (SAC)*.

---

## 🛠️ Technology Stack

- **React 18** (Functional components, custom hooks, React Context API)
- **Vite 6** (Blazing-fast build tool)
- **JavaScript (ES Modules)**
- **Tailwind CSS v4** (`@tailwindcss/vite` with custom mint/emerald palette)
- **Lucide React** (Clean icons)
- **Recharts** (Campus sharing volume visualization)
- **LocalStorage API** (Client-side state persistence)

---

## 🚀 Running Locally

1. Install dependencies (already installed):
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build and preview production build:
   ```bash
   npm run build
   npm run preview
   ```

