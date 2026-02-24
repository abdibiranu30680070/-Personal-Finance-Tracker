# 🏦 Ethio Finance Tracker

A specialized, premium full-stack financial management application tailored for the Ethiopian market. This project features a robust **React** frontend, a **Node.js/Express** backend, and a **PostgreSQL** database.

## 🚀 Live Application
- **Frontend URL**: [https://personal-finance-tracker-two-beta.vercel.app/](https://personal-finance-tracker-two-beta.vercel.app/)
- **Backend Health Check**: [https://personal-finance-tracker-5w6m.onrender.com/health](https://personal-finance-tracker-5w6m.onrender.com/health)

---

## 🏗️ Architecture Overview

The application follows a **Decoupled Monorepo Architecture** with a clear separation of concerns:

- **Frontend (Client)**: Built with **React** and **Vite**. Uses **Context API** for global state management and **Tailwind CSS** for a premium, responsive UI.
- **Backend (Server)**: A **Node.js/Express** REST API. It uses a **Service-Controller-Route** pattern for modularity.
- **Database (Storage)**: A **PostgreSQL** database managed with connection pooling for high performance.
- **Security**: Implements **JWT (JSON Web Tokens)** for authentication and **bcryptjs** for secure password hashing.

### 🗺️ System Flow
`User Interface (React) <--> API Bridge (Axios) <--> Express Server <--> PostgreSQL`

---

## 🛠️ Setup & Local Development

### 1. Prerequisites
- **Node.js** (v18+)
- **PostgreSQL**
- **Git**

### 2. Environment Setup
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=your_random_secret_string
```

### 3. How to Run Locally

#### Backend (Server)
```bash
cd backend
npm install
npm run dev
```
*Runs on `http://localhost:5000`*

#### Frontend (Client)
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

---

## 📊 Database Schema Description

The database blueprint is designed for data integrity and scalability:

- **`users`**: Stores user identity credentials, profile names, and profile pictures.
- **`transactions`**: Stores financial entries (Income/Expense), categorized and linked to users via `user_id`. Supports `ON DELETE CASCADE` to ensure data cleanliness.
- **`assets`**: Stores metadata for generated files or uploaded profile pictures.

*See `backend/schema.sql` for the full SQL DDL definitions.*

---

## 📡 API Documentation

Professional API testing is available via Postman.

- **Import File**: `docs/postman_collection.json`
- **Key Modules**:
    - **Authentication**: `POST /api/profile/login`, `POST /api/profile/register`
    - **Transactions**: `GET`, `POST`, `PUT`, `DELETE` at `/api/transactions`
    - **Summaries**: `GET /api/summary` for dashboard analytics.

---

## 📺 Walkthrough & Presentation

A detailed, file-by-file walkthrough for the code review is available here:
- **Presentation Guide**: [docs/walkthrough.md](docs/walkthrough.md)
- **Deployment Guide**: [docs/deployment.md](docs/deployment.md)

---
Official Project Submission — © 2026 Ethio Finance Team
