# 🚀 GRS Project Deployment Guide

## 📋 Pehle Ye Karlo (Prerequisites)

### Required Tools:
- **Node.js** (version 16 ya upar)
- **MongoDB** (local ya cloud)
- **Git** 
- **Code Editor** (VS Code recommended)

## 🔧 Local Setup (Development)

### Step 1: Project Clone Karo
```bash
git clone <your-repo-url>
cd GRS
```

### Step 2: Dependencies Install Karo
```bash
# Root package install karo
npm install

# Server dependencies install karo
cd server && npm install

# Client dependencies install karo
cd ../client && npm install
```

### Step 3: Environment Files Banayo
```bash
# Server ke liye .env file banayo
cd server
cp .env.example .env

# Client ke liye .env file banayo  
cd ../client
cp .env.example .env
```

### Step 4: .env Files Configure Karo

**Server/.env** me ye add karo:
```env
MONGO_URI=mongodb://localhost:27017/grs_database
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

**Client/.env** me ye add karo:
```env
VITE_API_URL=http://localhost:5000
```

### Step 5: MongoDB Start Karo
```bash
# Local MongoDB start karo
mongod

# Ya MongoDB Compass use karo
```

### Step 6: Project Run Karo
```bash
# Root directory me aakar run karo
npm run dev
```

**Browser me check karo:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🌐 Vercel Par Deploy Karo

### Step 1: Build Process
```bash
# Client build karo
cd client
npm run build
```

### Step 2: Vercel.json File Banayo
Project root me `vercel.json` file banayo:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ],
  "env": {
    "MONGO_URI": "@mongo_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### Step 3: Vercel CLI Install Karo
```bash
npm i -g vercel
```

### Step 4: Vercel Par Deploy Karo
```bash
# Project root me run karo
vercel

# Pehle deploy karo toh account setup hoga
# Baad me production deploy karo
vercel --prod
```

### Step 5: Environment Variables Set Karo
Vercel dashboard me jaake:
1. Project select karo
2. Settings → Environment Variables
3. Ye variables add karo:
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Strong secret key
   - `NODE_ENV`: `production`

## 🟢 Render Par Deploy Karo

### Step 1: GitHub Repository Push Karo
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Render Account Banayo
1. [render.com](https://render.com) par jaao
2. GitHub se signup karo
3. Repository connect karo

### Step 3: Web Service Create Karo
**For Backend:**
1. "New +" → "Web Service"
2. GitHub repo select karo
3. Root directory: `server`
4. Runtime: `Node`
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Environment variables add karo

**For Frontend:**
1. "New +" → "Static Site"
2. GitHub repo select karo  
3. Root directory: `client`
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Environment variable: `VITE_API_URL` = backend URL

### Step 4: Environment Variables Configure Karo
Render dashboard me:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/grs_database
JWT_SECRET=your_strong_secret_key
PORT=5000
NODE_ENV=production
```

## 🐳 Docker Se Deploy Karo (Optional)

### Step 1: Dockerfile Banayo
**Server ke liye Dockerfile** (`server/Dockerfile`):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**Client ke liye Dockerfile** (`client/Dockerfile`):
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Docker Compose
`docker-compose.yml` banayo:
```yaml
version: '3.8'
services:
  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/grs_database
    depends_on:
      - mongo

  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - server

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Step 3: Docker Run Karo
```bash
docker-compose up -d
```

## 🚨 Common Issues & Solutions

### Issue 1: Build Fail Ho Raha Hai
**Solution:**
```bash
# Node modules delete karke reinstall karo
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: MongoDB Connection Error
**Solution:**
- MongoDB URI check karo
- Firewall settings check karo
- IP whitelist me current IP add karo

### Issue 3: CORS Error
**Solution:**
Server me CORS properly configure karo:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-domain.vercel.app'],
  credentials: true
}));
```

### Issue 4: Environment Variables Working Nahi
**Solution:**
- `.env` file naming check karo (dot se start hona chahiye)
- Variable names double check karo
- Production me environment variables manually set karo

## 📱 Mobile Responsiveness Check Karo

### Testing Tools:
1. **Chrome DevTools**: F12 → Mobile view
2. **Browser Stack**: Cross-device testing
3. **Real Devices**: Actual mobile me test karo

### Checklist:
- ✅ Navigation buttons properly visible
- ✅ Forms properly working
- ✅ Tables horizontally scrollable
- ✅ Images properly sized
- ✅ Text readable without zoom

## 🔄 Production Best Practices

### Security:
1. **JWT Secret** strong rakhna
2. **MongoDB URI** secure rakhna
3. **HTTPS** enable karo
4. **Rate limiting** implement karo

### Performance:
1. **Images** optimize karo
2. **Code splitting** use karo
3. **Caching** implement karo
4. **CDN** use karo for static assets

### Monitoring:
1. **Error tracking** setup karo
2. **Performance monitoring** karo
3. **Uptime monitoring** rakhna

## 🎯 Final Checklist

Before deployment:
- [ ] All dependencies installed
- [ ] Environment variables set
- [ ] MongoDB connection working
- [ ] Build process successful
- [ ] Responsive design tested
- [ ] API endpoints working
- [ ] Error handling implemented
- [ ] Security measures in place

## 🆘 Help Chahiye?

Agar koi issue aaye toh:
1. **Error logs** check karo
2. **Environment variables** verify karo
3. **Network connectivity** check karo
4. **Documentation** read karo
5. **Community forums** me ask karo

**Happy Deployment! 🎉**
