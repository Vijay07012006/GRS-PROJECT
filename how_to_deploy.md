# 🚀 GRS Project Deployment Guide (Vercel + Render)

GRS (Grievance Redressal System) project ko **Frontend Vercel par** aur **Backend Render par** deploy karne ke liye ye steps follow karein. Isme `.env` configuration, production variables aur unki values kahan se milengi, sab detail me bataya gaya hai.

---

## 📋 Table of Contents
1. [Prerequisites & Account Setup](#1-prerequisites--account-setup)
2. [MongoDB Atlas Cloud Database Setup (For MONGO_URI)](#2-mongodb-atlas-cloud-database-setup-for-mongo_uri)
3. [JWT Secret Key Generation (For JWT_SECRET)](#3-jwt-secret-key-generation-for-jwt_secret)
4. [Backend Deployment on Render](#4-backend-deployment-on-render)
5. [Frontend Deployment on Vercel](#5-frontend-deployment-on-vercel)
6. [Final Environment Variables Checklist](#6-final-environment-variables-checklist)
7. [Post-Deployment Testing Checklist](#7-post-deployment-testing-checklist)

---

## 1. Prerequisites & Account Setup
Deploy karne se pehle in website par free account bana lein:
1. **GitHub**: [github.com](https://github.com/) (Apne project code ko push karne ke liye)
2. **MongoDB Atlas**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (Database ke liye)
3. **Render**: [render.com](https://render.com/) (Backend hosting ke liye)
4. **Vercel**: [vercel.com](https://vercel.com/) (Frontend hosting ke liye)

Apne poore project folder (GRS) ko Git repository banakar **GitHub par push** kar dein. 
*Note: Make sure `.gitignore` me `.env` files added hain taaki sensitive keys leak na ho.*

---

## 2. MongoDB Atlas Cloud Database Setup (For MONGO_URI)
Aapko database cloud par host karna hoga taaki Render backend server connects ho sake.

### Steps to get MONGO_URI:
1. **MongoDB Atlas** me login karein.
2. Ek naya **Project** aur fir ek free **Cluster (M0 Shared)** banayein.
3. Cluster banne ke baad, Left Sidebar me **Database Access** par click karein:
   - Ek naya database user banayein (e.g., username: `grs_user`, password: `strongpassword`).
   - Us user ko Read and Write access (Built-in Role: `Atlas admin` or `Read and write to any database`) dein.
4. Left Sidebar me **Network Access** par click karein:
   - Click **Add IP Address**.
   - Select **Allow Access From Anywhere** (IP: `0.0.0.0/0`) aur confirm karein. *(Render server dynamic IPs use karta hai, isliye zero IP access mandatory hai).*
5. Dashboard par jaakar **Clusters/Database** tab me **Connect** button par click karein:
   - Select **Drivers** (Node.js).
   - Jo Connection String milegi use copy karein.
   - Vo aisi dikhegi:
     `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`
   - Isme `<username>` ko apne database username (`grs_user`) se aur `<password>` ko database user ke password (`strongpassword`) se replace karein. URL ke end me `?` se pehle database name likhein (जैसे `grs_db`):
     `mongodb+srv://grs_user:strongpassword@cluster0.xxxx.mongodb.net/grs_db?retryWrites=true&w=majority`
   - **Ye aapki `MONGO_URI` value hai.**

---

## 3. JWT Secret Key Generation (For JWT_SECRET)
JWT Tokens secure signature ke liye ek solid random string chahiye hoti hai.

### Steps to get JWT_SECRET:
1. Apne terminal / command prompt me ye node command run karein:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Terminal output me aapko ek 64-character ki strong random string milegi (जैसे `9f8e7d6c5b4a3a2b1c2d3e4f5...`).
3. **Ye aapki `JWT_SECRET` value hai.**

---

## 4. Backend Deployment on Render
Backend ko Render par Web Service ke roop me deploy kiya jayega.

### Steps to Deploy:
1. **Render.com** me login karein aur Dashboard par **New +** → **Web Service** par click karein.
2. Apni GitHub Repository ko connect karein.
3. Deployment Settings define karein:
   - **Name**: `grs-backend` (Ya jo bhi aap chahein)
   - **Root Directory**: `server` 
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. **Environment Variables** section me jaakar ye variables define karein (Value feed karein):
   - `PORT`: `5000`
   - `MONGO_URI`: *(Step 2 se mili connection string)*
   - `JWT_SECRET`: *(Step 3 se mili key)*
   - `FRONTEND_URL`: `https://your-frontend.vercel.app` *(Pehle frontend deploy karein, fir uski url yahan render setting me update kar dena. Abhi ke liye blank chhod sakte hain ya temporary vercel project url daal sakte hain)*
5. **Create Web Service** par click karein.
6. Render aapke backend ko deploy karega. Deploy hone ke baad, top-left par aapko backend URL milegi (e.g., `https://grs-backend.onrender.com`).
7. **Ye URL aapki frontend ke liye `VITE_API_URL` value banegi.**

---

## 5. Frontend Deployment on Vercel
Vercel par frontend static-build deploy hoga.

### Steps to Deploy:
1. **Vercel.com** me login karein.
2. Click **Add New** → **Project**.
3. Apni GitHub Repository ko connect karein.
4. Deployment Settings specify karein:
   - **Framework Preset**: `Vite` (Vercel automatic detect kar lega)
   - **Root Directory**: `client` 
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables** collapse box ko expand karein aur ye variable add karein:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://grs-backend.onrender.com` *(Render se mili backend server ki full URL. Make sure end me `/` na ho)*
6. **Deploy** button par click karein.
7. Deploy hone ke baad Vercel aapko active domain dega (e.g., `https://grs-frontend.vercel.app`).
8. **Is frontend URL ko copy karein aur Render Dashboard me backend configuration me jaakar `FRONTEND_URL` environment variable ki value me paste kar ke save kar dein.** (CORS error se bachne ke liye ye zaroori hai).

---

## 6. Final Environment Variables Checklist

### 💻 Local Development Files (`.env`)
Aapke locally code check karne ke liye files me ye details honi chahiye:

**`server/.env` File:**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/grs_database
JWT_SECRET=your_local_dev_secret_key
FRONTEND_URL=http://localhost:5173
```

**`client/.env` File:**
```env
VITE_API_URL=http://localhost:5000
```

---

### 🌐 Cloud Production Settings (Vercel & Render Settings)

**Render Backend Variables Dashboard:**
| Key | Value Description | Example |
| :--- | :--- | :--- |
| `PORT` | Local runtime port | `5000` |
| `MONGO_URI` | MongoDB Atlas Cloud URL | `mongodb+srv://user:pass@cluster.mongodb.net/grs` |
| `JWT_SECRET` | 32-byte generated hex key | `4b7e8d...` |
| `FRONTEND_URL` | Deployed Vercel URL | `https://your-grs-app.vercel.app` |

**Vercel Frontend Variables Dashboard:**
| Key | Value Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Deployed Render Backend URL | `https://grs-backend.onrender.com` |

---

## 7. Post-Deployment Testing Checklist
Sari production keys fill hone aur deployment complete hone ke baad ek baar check list test karein:

1. **Student Registration**: Register screen par naya student account banakar dekhein. Database verify karein.
2. **Student Login**: Login screen par wahi email aur password enter karein. Redirection to `/student/dashboard` check karein.
3. **Raise Complaint (Category selection)**: Category drop-down check karein (agar Categories database me saved hain, toh drop-down populate hona chahiye. Agar category nahi hai, toh Admin Panel par pehle Colleges/Session feed karein).
4. **My Complaint Section**: Nayi complaint submit karein. Submit success message ke baad check karein ki wo **My Complaints** list me turant show ho rahi hai ya nahi.
5. **Forum Discussion**: Forum discussion posts create karein aur comments/replies daal kar validation check karein.
6. **Student Logout**: Check karein ki logout karne par dynamic activity record ho rahi hai aur session clear ho raha hai or user login page par redirect ho raha hai.
7. **Admin Dashboard**: `/admin-login` par check karein. Register/Login test karein (Database me pehle admin object create/seed karna padega). Check karein ki Admin Dashboard par student complaints response handle ho rahe hain.
