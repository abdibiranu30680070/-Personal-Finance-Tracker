# Ethio Telecom Finance Tracker

A specialized, premium full-stack financial management application tailored for the Ethiopian market. Built with React, Node.js, Express, and PostgreSQL, featuring Ethio Telecom branding and bilingual (English/Amharic) support.

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js**: v18 or higher
- **PostgreSQL**: v14 or higher (or Docker)
- **Git**

### 1. Database Initialization
This project uses PostgreSQL for data persistence.

**Option A: Docker (Recommended)**
```bash
docker-compose up -d
```
The database will automatically initialize with the schema found in `backend/schema.sql`.

**Option B: Manual Installation**
1. Create a database named `finance_tracker`.
2. Run the SQL script located at `backend/schema.sql` to create the tables.

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_NAME=finance_tracker
DB_PORT=5432
JWT_SECRET=your_super_secret_key
```

---

## 🛠 How to Run

### Backend (Server)
The backend handles authentication, validation, and data processing.
```bash
cd backend
npm install
npm run dev
```
*Port: `http://localhost:5000`*

### Frontend (Client)
The frontend provides a state-of-the-art UI with Ethio Telecom HSL color tokens.
```bash
cd frontend
npm install
npm run dev
```
*URL: `http://localhost:5173`*

---

## 🏗 Architecture Overview

The application follows a **Decoupled Full-Stack Architecture**:

### 1. The Engine (Backend)
- **server.js**: Entry point initializing Express and mounting specialized routes.
- **db.js**: Connection pooling using `pg` for high-performance SQL execution.
- **Middleware**: 
  - `authMiddleware.js`: JWT-based gatekeeping for secure routes.
  - `validationMiddleware.js`: Schema validation for data integrity.

### 2. The Face (Frontend)
- **Context API (DataContext.jsx)**: Centralized state management for global transaction data.
- **Component Design**: Premium styling using Tailwind CSS with custom Ethio Telecom HSL color palettes.
- **Micro-Animations**: Subtle UI responses for a high-end user experience.

### 3. Reporting System
- **jsPDF & AutoTable**: Client-side generation of high-quality financial reports.
- **Archive Logic**: Server-side archiving of official reports to the project root.

---

## 📡 API Documentation

### Authentication (`/api/profile`)
- `POST /api/profile/register`: Register a new user.
- `POST /api/profile/login`: Authenticate and receive a JWT.
- `GET /api/profile/me`: Get current logged-in user profile.

### Transactions (`/api/transactions`)
- `GET /api/transactions`: Retrieve all user-specific transactions.
- `POST /api/transactions`: Create a new income/expense record.
- `PUT /api/transactions/:id`: Modify an existing record.
- `DELETE /api/transactions/:id`: Remove a record.

### Intelligence (`/api/reports` / `/api/summary`)
- `GET /api/summary`: Get dashboard metrics (Daily/Weekly/Monthly totals).
- `POST /api/reports/save`: Archive a generated PDF report to the server's root folder.

---

## 🇪🇹 Branding Rationale
The UI is built using **Ethio Telecom's Brand Guidelines**:
- **Brilliant Orange**: Used for primary calls to action.
- **Sky Blue**: Used for filtering and informative headers.
- **Bilingual Interface**: Seamless integration of Amharic for accessibility in the local market.

---
Official Project Documentation — © 2026 Ethio Telecom
