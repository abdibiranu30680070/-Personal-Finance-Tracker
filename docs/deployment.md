# 🚀 Free Deployment Guide: Ethio Finance Tracker

To get your application online for free, I recommend the following "Gold Standard" combination of services. They are reliable, easy to set up, and have generous free tiers.

---

## 🏗️ The Hosting Stack

| Layer | Service | Why? |
| :--- | :--- | :--- |
| **Frontend (React)** | [Vercel](https://vercel.com) | Best for React. Automatic deployment from GitHub. |
| **Backend (Node.js)** | [Render](https://render.com) | Simple to use. No credit card required for the free tier. |
| **Database (Postgres)** | [Neon](https://neon.tech) | Professional, serverless Postgres with an amazing free tier. |

---

## 🛠️ Step-by-Step Instructions

### Step 1: Database Setup (Neon)
1. Sign up at [Neon.tech](https://neon.tech).
2. Create a new project called `financeethio-`.
3. Copy your **Connection String** (it looks like `postgres://user:password@host/dbname`).
4. Keep this safe; you will need it for the backend.

### Step 2: Backend Deployment (Render)
1. Sign up at [Render.com](https://render.com).
2. Click **New** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following:
    - **Environment**: `Node`
    - **Build Command**: `cd backend && npm install`
    - **Start Command**: `cd backend && node server.js`
5. Add **Environment Variables**:
    - `DATABASE_URL`: (Paste your Neon connection string here)
    - `JWT_SECRET`: (Create a random long string)
    - `PORT`: `10000`
6. Once deployed, copy your Render URL (e.g., `https://ethio-backend.onrender.com`).

### Step 3: Frontend Deployment (Vercel)
1. Sign up at [Vercel.com](https://vercel.com).
2. Select **Add New** -> **Project**.
3. Import your GitHub repository.
4. In the **Build & Development Settings**:
    - **Root Directory**: Select `frontend` (or leave as root if you prefer).
5. Add an **Environment Variable**:
    - `VITE_API_URL`: (Paste your Backend Render URL here)
6. Click **Deploy**.

---

## 💡 Important Tips for Free Tiers
- **Spin Up Time**: Free services on Render "sleep" after 15 minutes of inactivity. The first time you open the app after a while, it might take 30-45 seconds to wake up.
- **Environment Variables**: Never push your `.env` file to GitHub! Always add your secrets directly in the Vercel/Render dashboard as shown above.
- **HTTPS**: All these services provide free SSL (HTTPS) automatically.

---
*Good luck with your deployment! If you hit any errors, check the "Logs" tab in Vercel or Render.*
