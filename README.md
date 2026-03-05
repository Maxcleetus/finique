# FINIQUE Corporate Product Showcase (MERN)

Production-ready corporate product showcase and lead generation platform for **FINIQUE** (premium uPVC windows and doors), with a standalone admin app.

## Tech Stack

- Frontend: React (Vite), React Router DOM, Tailwind CSS, Axios, Framer Motion, React Helmet Async
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Multer, Cloudinary, bcrypt, dotenv, CORS, Helmet, Compression

## Project Structure

- `backend/`
  - `config/`
  - `controllers/`
  - `models/`
  - `routes/`
  - `middleware/`
  - `utils/`
  - `server.js`
- `frontend/`
  - `src/components/`
  - `src/pages/`
  - `src/services/`
  - `src/layouts/`
  - `src/App.jsx`
  - `src/main.jsx`
- `admin-panel/`
  - `src/admin/`
  - `src/components/`
  - `src/services/`
  - `src/context/`
  - `src/App.jsx`
  - `src/main.jsx`

## Environment Setup

1. Backend env:
- Copy `backend/.env.example` to `backend/.env`
- Update MongoDB, JWT, Cloudinary, and CORS values

2. Frontend env:
- Copy `frontend/.env.example` to `frontend/.env`
- Set `VITE_API_BASE_URL`

3. Admin panel env:
- Copy `admin-panel/.env.example` to `admin-panel/.env`
- Set `VITE_API_BASE_URL`

## Installation

1. Install backend deps:
```bash
cd backend
npm install
```

2. Install frontend deps:
```bash
cd ../frontend
npm install
```

3. Install admin panel deps:
```bash
cd ../admin-panel
npm install
```

## Run in Development

1. Start backend:
```bash
cd backend
npm run dev
```

2. Start frontend (new terminal):
```bash
cd frontend
npm run dev
```

3. Start admin panel (new terminal):
```bash
cd admin-panel
npm run dev -- --port 5174
```

- Public frontend default: `http://localhost:5173`
- Admin panel default: `http://localhost:5174`
- Backend default: `http://localhost:5000`

## Media Storage for Large Assets

For large images/videos, do not keep files in git-tracked frontend folders. This project uploads media to Cloudinary and stores only URLs in MongoDB.

Import local files from `frontend/src/assets` into MongoDB project media:

```bash
cd backend
npm run import:project-media
```

Optional custom source path and project title:

```bash
cd backend
npm run import:project-media -- ../frontend/src/assets "Showroom Portfolio"
```

## Initialize Admin

After backend starts, create default admin:

```bash
curl -X POST http://localhost:5000/api/auth/seed
```

Then login from `http://localhost:5174/login` using:
- `DEFAULT_ADMIN_EMAIL`
- `DEFAULT_ADMIN_PASSWORD`

## API Overview

- Auth:
  - `POST /api/auth/login`
  - `POST /api/auth/seed`
- Products:
  - `GET /api/products`
  - `GET /api/products/featured`
  - `GET /api/products/:slug`
  - `POST /api/products` (admin)
  - `PUT /api/products/:id` (admin)
  - `DELETE /api/products/:id` (admin)
  - `DELETE /api/products/:id/media` (admin)
- Projects:
  - `GET /api/projects`
  - `POST /api/projects` (admin)
  - `PUT /api/projects/:id` (admin)
  - `DELETE /api/projects/:id` (admin)
  - `DELETE /api/projects/:id/media` (admin)
- Enquiries:
  - `POST /api/enquiries`
  - `GET /api/enquiries` (admin)
  - `PATCH /api/enquiries/:id/status` (admin)
- Dashboard:
  - `GET /api/dashboard/stats` (admin)

## Brand Assets Used

- Logo copied to: `frontend/public/assets/logo.png`
- Fonts copied to: `frontend/public/assets/fonts/`

## Production Notes

- Restrict `CORS_ORIGIN` to your domain(s)
- Use strong `JWT_SECRET`
- Set secure Cloudinary credentials
- Add process manager (PM2/systemd) and reverse proxy (Nginx)
- Use HTTPS in deployment
