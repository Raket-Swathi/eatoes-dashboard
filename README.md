# Eatoes Restaurant Admin Dashboard

This project is my submission for the **Eatoes Intern – Restaurant Admin Dashboard** assessment.

It’s a full-stack MERN app where a restaurant owner can:

- Manage menu items (CRUD + availability).
- View and update customer orders.
- See a small analytics widget for top-selling items.

I tried to keep the code clean, simple, and close to real-world usage.

---

## 1. What this app does

### Menu Management

- Add, edit, and delete menu items.
- Each item has:
  - Name, description, category, price.
  - Ingredients, preparation time, image URL.
  - Availability (in stock / out of stock).
- Filter menu by:
  - Category (Appetizer, Main Course, Dessert, Beverage).
  - Availability (Available / Unavailable).
- Search:
  - Debounced input (300ms) so it doesn’t spam the backend.
  - Searches by name and ingredients.
  - Handles empty search and weird/special characters gracefully.
- Availability toggle:
  - UI updates instantly (optimistic UI).
  - If the backend fails, the UI rolls back and shows an error.

### Orders Dashboard

- Shows a list of orders with:
  - Order number, customer name, table number.
  - Current status with a badge.
  - Created and updated timestamps.
  - Items in the order and the total price.
- Filter orders by status.
- Pagination for multiple pages of orders.
- Update order status from a dropdown.

### Analytics – Top 5 Selling Items (Optional Challenge)

- Uses a MongoDB aggregation pipeline to find the top 5 selling menu items.
- Pipeline uses:
  - `$unwind` on `items`.
  - `$group` to sum quantities.
  - `$lookup` to join with `MenuItem`.
  - `$sort` and `$limit`.  
- On the frontend, it shows up as a “Top 5 Selling Items” card on the menu page.

---

## 2. Tech stack

**Frontend**

- React 18
- React Router
- Context API
- Custom hooks:
  - `useDebounce`
  - `useFetch`
- Plain CSS (no UI framework)

**Backend**

- Node.js
- Express.js
- Mongoose (MongoDB)
- express-validator
- cors, dotenv

**Database**

- MongoDB Atlas (M0 free tier)

**Deployment**

- Backend: Render (Web Service)
- Frontend: Netlify

---

## 3. Folder structure

```text
eatoes-dashboard/
├── server/
│   ├── config/           # db.js (MongoDB connection)
│   ├── controllers/      # menu, orders, analytics logic
│   ├── models/           # MenuItem, Order schemas
│   ├── routes/           # API routes
│   ├── scripts/          # seed.js (sample data)
│   ├── .env              # local only (ignored in git)
│   ├── .env.example      # sample env file for reviewers
│   └── server.js         # Express app entry
└── client/
    ├── src/
    │   ├── api.js        # Axios instance (uses REACT_APP_API_URL)
    │   ├── components/   # Navbar, MenuCard, OrderCard, AddMenuItemModal, TopSellers, StatusBadge etc.
    │   ├── context/      # MenuContext (global menu items state)
    │   ├── hooks/        # useDebounce, useFetch
    │   ├── pages/        # MenuManagement, OrdersDashboard
    │   ├── App.js        # Routes
    │   └── index.js
    ├── public/
    │   └── _redirects    # SPA routing for Netlify
    ├── .env
    └── .env.example
```
---
## 4. How to run it locally

### Prerequisites

- Node.js 18+
- npm
- A MongoDB Atlas cluster (or any MongoDB URI)
- Git

### Step 1: Clone the repo

```bash
git clone https://github.com/<your-username>/eatoes-dashboard.git
cd eatoes-dashboard
```
### Step 2: Backend setup (server)
```
cd server
npm install
```
### Create a .env file in the server folder (use .env.example as a reference):
```
MONGODB_URI=your-mongodb-atlas-connection-string
PORT=5000
NODE_ENV=development
```
```
npm run seed
npm run dev
```
Backend will be available at http://localhost:5000.
### Step 3: Frontend setup (client)
```
cd ../client
npm install
```
Create a .env file in client (use .env.example):
```
REACT_APP_API_URL=http://localhost:5000/api
```
- Start the frontend: npm start
- Frontend will be available at:  http://localhost:3000.
- Frontend (client/.env)
- REACT_APP_API_URL=http://localhost:5000/api
- For production (Netlify + Render), REACT_APP_API_URL should point to the Render backend, 
  for example: REACT_APP_API_URL=https://your-backend.onrender.com/api
  
## 6. API overview

### Menu APIs

- `GET /api/menu`  
  Get all menu items. Supports these query params:
  - `category`
  - `availability` (`true` / `false`)
  - `minPrice`
  - `maxPrice`

- `GET /api/menu/search?q=...`  
  Search by name or ingredients. Search is debounced on the frontend and uses a text index + regex on the backend. It also handles empty search and special characters safely.

- `GET /api/menu/:id`  
  Get one menu item.

- `POST /api/menu`  
  Create a new menu item. Validated with `express-validator`.

- `PUT /api/menu/:id`  
  Update an existing menu item (also validated).

- `DELETE /api/menu/:id`  
  Delete a menu item.

- `PATCH /api/menu/:id/availability`  
  Toggle availability for a menu item. This is what the optimistic UI calls when you click the availability button.

### Order APIs

- `GET /api/orders?status=Pending&page=1&limit=5`  
  Get orders with pagination and an optional status filter.

- `GET /api/orders/:id`  
  Get a single order with populated menu item details.

- `POST /api/orders`  
  Create a new order.

- `PATCH /api/orders/:id/status`  
  Update the order status from the dashboard.

### Analytics API

- `GET /api/analytics/top-items`  
  Returns the top 5 selling menu items based on all orders.
---
## 7. Deployment (what I used)

### Backend – Render

- Connected the GitHub repo.
- Root directory: `server`.
- Build command: `npm install`.
- Start command: `node server.js`.
- Environment variables on Render:
  - `MONGODB_URI`
  - `NODE_ENV=production`

Render gives a URL like:

```text
https://your-backend.onrender.com
```
### Frontend – Netlify
- Connected the same GitHub repo.
- Base directory: client.
- Build command: npm run build.
- Publish directory: client/build.
- Environment variables on Netlify:
- REACT_APP_API_URL=https://your-backend.onrender.com/api
---

### 8. Challenges faced


## 1. MongoDB Schema & Unique Index Issues

While seeding the database, I encountered duplicate key errors due to a unique orderNumber field receiving null values. This required redesigning the schema to auto-generate the order number reliably and aligning the seed logic with the schema constraints.



## 2. ES Module vs CommonJS Conflicts in Node.js

The backend initially failed due to mixed module systems (require vs import). Resolving this involved converting the entire backend to ES Modules and ensuring models were not recompiled multiple times.



## 3. Frontend Not Rendering Data Despite Successful APIs

Even when APIs returned valid JSON, the Menu and Orders pages initially rendered empty. The issue was caused by frontend and backend filters being applied incorrectly when “All” options were selected.

## 4. Handling Relational Data & Null References in Orders

The Orders dashboard crashed due to missing populated menu item references. Fixing this required proper use of Mongoose populate() and defensive UI rendering to avoid null-access errors.

## 5. Implementing Efficient Search with Debouncing

Search functionality initially triggered excessive API calls and UI flickering. Implementing a debounced search mechanism significantly improved performance and user experience.

### 6. Top 5 sellers aggregation 

I used MongoDB aggregation (`$unwind`, `$group`, `$lookup`, `$sort`, `$limit`) and then displayed the result in a small widget on the menu page.

---
## 9. Live links

You can fill these in after deployment:

- Frontend (Netlify): `https://your-frontend.netlify.app`
- Backend (Render): `https://your-backend.onrender.com`
---
## 10. Screenshots

### Menu Management

![Menu Management](./screenshots/menu-page.png)

### Orders Dashboard

![Orders Dashboard](./screenshots/orders-page.png)

### Top 5 Selling Items Widget

![Top 5 Sellers](./screenshots/top-sellers.png)

