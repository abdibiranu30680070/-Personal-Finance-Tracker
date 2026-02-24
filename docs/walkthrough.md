# 🎓 Ethio Finance: Architectural Deep-Dive & Code Walkthrough

This document is a comprehensive, deep-dive guide into the **Personal Finance Tracker** codebase. It is designed to help you understand not just *what* each file is, but *how the code works* inside them.

---

## 🏗️ Part 1: Backend Infrastructure (The Foundation)

### 1. [server.js](file:///home/abdi/ethiotelecom/backend/server.js)
**Purpose:** The entry point of the entire backend application.
- **Code Logic:** 
    - It initializes **Express.js**, the framework that handles web requests.
    - It sets up **CORS** (Cross-Origin Resource Sharing) so your frontend can communicate with the backend.
    - It mounts the **API Routes**. For example, `app.use('/api/profile', profileRoutes)` tells the server that any request starting with `/api/profile` should be handled by the logic inside `profile.js`.
- **Key Connection:** It is the bridge between the internet and your internal business logic.

### 2. [db.js](file:///home/abdi/ethiotelecom/backend/db.js)
**Purpose:** Manages the connection pool for **PostgreSQL**.
- **Code Logic:** 
    - Instead of opening a new connection for every single request (which is slow), it creates a **Pool**. 
    - This pool keeps several connections open and "checks them out" to queries as needed.
- **Key Connection:** Every **Service** file imports this `db` object to run SQL queries.

### 3. [schema.sql](file:///home/abdi/ethiotelecom/backend/schema.sql)
**Purpose:** The blueprint for your data.
- **Code Logic:** Defines the three primary tables:
    - **`users`**: Stores identity, hashed passwords, and profile metadata.
    - **`transactions`**: Stores financial records, linked to a user via `user_id`.
    - **`assets`**: Stores generated reports or profile pictures.
- **Data Integrity:** It uses `ON DELETE CASCADE`. This means if a user is deleted, all their transactions are automatically removed, preventing "orphaned" data in your database.

---

## ⚙️ Part 2: Backend Logic Layer (The Services)

Services are where the "heavy lifting" happens. They contain the actual SQL logic.

### 4. [profileService.js](file:///home/abdi/ethiotelecom/backend/services/profileService.js)
- **What it does:** Handles User identity.
- **The Code:** 
    - It uses `bcryptjs` to hash passwords. When a user registers, the code never saves the real password; it saves a secure "hash".
    - It runs queries like `INSERT INTO users ... RETURNING *` to create and return new user data.
- **Connection:** This is called by the `profileController.js`.

### 5. [transactionService.js](file:///home/abdi/ethiotelecom/backend/services/transactionService.js)
- **What it does:** The core of the tracker.
- **The Code:** 
    - Includes functions for `getTransactions(userId)` which fetch data specifically for the logged-in user.
    - Includes `createTransaction(userId, data)` which maps the frontend form fields to the correct database columns.
- **Connection:** Ensures that a user can only see and edit *their own* data, never someone else's.

### 6. [summaryService.js](file:///home/abdi/ethiotelecom/backend/services/summaryService.js)
- **What it does:** Calculates financial analytics.
- **The Code:** 
    - It runs advanced SQL queries using `SUM(amount)`.
    - It groups totals by `category`. This is how the "Category Split" chart on the dashboard gets its data.
- **Connection:** Keeps the frontend fast because the backend does all the math.

---

## 🛣️ Part 3: Backend API Interface (Controllers & Routes)

### 7. [Controllers](file:///home/abdi/ethiotelecom/backend/controllers/)
- **Purpose:** These are the "Orchestrators". 
- **The Code:** They receive the raw `req` (request) from the frontend, extract the data, call a **Service**, and then send back an HTTP response (like `200 OK` or `401 Unauthorized`).
- **Logic Example:** `profileController.js` creates a **JWT Token** upon successful login, which is like a digital ID card for the user.

### 8. [Routes](file:///home/abdi/ethiotelecom/backend/routes/)
- **Purpose:** These define the "URLs" or map of your API.
- **The Code:** They link a URL (like `/login`) to a specific Controller function.
- **Connection:** They often use `authMiddleware.js` to verify a user is logged in before allowing them to access sensitive data like transactions.

---

## 🧠 Part 4: Frontend Core (The Brain)

### 9. [DataContext.jsx](file:///home/abdi/ethiotelecom/frontend/src/context/DataContext.jsx)
**Purpose:** The single source of truth for the entire frontend.
- **Code Logic:**
    - **Global State:** It holds the `user`, `transactions`, and `summary` objects.
    - **Persistence:** In the `handleAuth` function, the code saves the user data to `localStorage`. This ensures that if the user refreshes the page, they are *still* logged in.
    - **Auto-Sync:** I refactored this file so that whenever you add or delete a transaction, it automatically calls `fetchData()`, updating the Dashboard and List instantly without any "flicker".
- **Key Connection:** Every page (`Dashboard`, `Transactions`, `Profile`) uses this context to get and update data.

### 10. [api.js](file:///home/abdi/ethiotelecom/frontend/src/api.js)
**Purpose:** The communications bridge.
- **Code Logic:** 
    - It uses **Axios Interceptors**. This is a powerful feature where the code automatically grabs the security token from storage and adds it to the header of *every* request.
- **Key Connection:** You never have to manually manage security tokens inside your pages; `api.js` does it for you.

---

## 🖼️ Part 5: Feature Pages (User Experience)

### 11. [Welcome.jsx](file:///home/abdi/ethiotelecom/frontend/src/pages/Welcome.jsx)
- **Code Logic:** Manages the transition between "Login" and "Register". It uses state to toggle the form UI while keeping the layout consistent.
- **Design:** It is built with **Responsive Tailwind CSS**, ensuring it looks like a premium app on both your phone and a desktop computer.

### 12. [Dashboard.jsx](file:///home/abdi/ethiotelecom/frontend/src/pages/Dashboard.jsx)
- **Code Logic:** Transforms raw transaction data into visual charts using **Chart.js**.
- **The Map:** It takes the `summary.category_totals` array and maps it directly to the pie chart labels and colors.

### 13. [Transactions.jsx](file:///home/abdi/ethiotelecom/frontend/src/pages/Transactions.jsx)
- **Code Logic:** Handles **Filtering & Pagination**. 
- **Deep Dive:** Instead of sending a new request to the server every time you search, it performs efficient client-side filtering on the `transactions` array, making the search feel instant and "snappy".

---

## 🚀 Live Application
Your project is now live and accessible to the world!
**URL**: [https://personal-finance-tracker-two-beta.vercel.app/](https://personal-finance-tracker-two-beta.vercel.app/)

---

## 🚀 Final Presentation Summary
Your code is built with **Professional Standards**:
1. **Security**: Password hashing and JWT token protection.
2. **Speed**: Connection pooling on the backend and global state management on the frontend.
3. **User-Centric**: Fully responsive UI and real-time data synchronization.
