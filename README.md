# Realtime Chat App

A full-stack realtime chat application built with React, Vite, Express, MongoDB, Socket.IO, JWT authentication, and Cloudinary image uploads.

## Features

- User signup, login, logout, and authentication check
- JWT authentication stored in cookies
- Realtime one-to-one messaging with Socket.IO
- Online user status
- Profile image upload through Cloudinary
- Image and text messages
- Responsive React frontend with Tailwind CSS and DaisyUI

## Tech Stack

### Frontend

- React
- Vite
- Zustand
- Axios
- Socket.IO Client
- Tailwind CSS
- DaisyUI
- Lucide React

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Token
- Bcrypt
- Cloudinary

## Project Structure

```text
Realtime-Chat-App-main/
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |-- lib/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- seeds/
|   |   `-- index.js
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- constants/
|   |   |-- lib/
|   |   |-- pages/
|   |   |-- store/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   `-- package.json
|-- package.json
`-- README.md
```

## Requirements

Install these before running the project:

- Node.js 18 or newer
- npm
- MongoDB database connection string
- Cloudinary account

You can use MongoDB Atlas for the database and Cloudinary for image uploads.

## Environment Variables

Create a file named `.env` inside the `backend` folder:

```env
PORT=5002
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Example backend env file location:

```text
backend/.env
```

Important:

- Keep `PORT=5002` for local development because the frontend is already configured to call `http://localhost:5002/api`.
- Do not commit `.env` to GitHub. It is already ignored by `.gitignore`.
- Use any long random string for `JWT_SECRET`.

## Install Dependencies

Open a terminal in the project root:

```bash
cd E:\JAVA\Realtime-Chat-App-main
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ..\frontend
npm install
```

## Run The App In Development

You need two terminals.

### Terminal 1: Start Backend

```bash
cd E:\JAVA\Realtime-Chat-App-main\backend
npm run dev
```

Backend runs on:

```text
http://localhost:5002
```

You should see messages like:

```text
server is running on PORT:5002
MONGODB connected: ...
```

### Terminal 2: Start Frontend

```bash
cd E:\JAVA\Realtime-Chat-App-main\frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Open this URL in your browser:

```text
http://localhost:5173
```

## How To Use

1. Open `http://localhost:5173`.
2. Create a new account from the signup page.
3. Open another browser, incognito window, or another device on the same app.
4. Create or log in with a second account.
5. Select a user from the sidebar.
6. Send text messages or image messages.
7. Online users will update in realtime.

## Build For Production

From the project root:

```bash
cd E:\JAVA\Realtime-Chat-App-main
npm run build
```

This command installs dependencies for both apps and builds the frontend.

## Run Production Build

Make sure `backend/.env` has:

```env
NODE_ENV=production
PORT=5002
```

Then run:

```bash
cd E:\JAVA\Realtime-Chat-App-main
npm start
```

Open:

```text
http://localhost:5002
```

In production mode, Express serves the built frontend from `frontend/dist`.

## API Routes

### Auth

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/check
PUT  /api/auth/update-profile
```

### Messages

```text
GET  /api/messages/users
GET  /api/messages/:id
POST /api/messages/send/:id
```

## Common Problems And Fixes

### Frontend opens but API does not work

Check that the backend is running on port `5002`.

```text
http://localhost:5002
```

Also check that `backend/.env` contains:

```env
PORT=5002
```

### MongoDB connection error

Check that:

- `MONGODB_URI` is correct.
- Your MongoDB Atlas IP access list allows your current IP.
- Your database username and password are correct.

### Image upload does not work

Check that these Cloudinary values are correct:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Login works but user becomes logged out after refresh

Check that:

- Backend is running.
- Frontend is opened from `http://localhost:5173`.
- Cookies are not blocked in your browser.
- `JWT_SECRET` is set in `backend/.env`.

### Port already in use

If port `5002` or `5173` is busy, stop the old server and run again. For this project, keeping backend on `5002` is recommended because the frontend uses that port in development.

## Useful Commands

Run backend development server:

```bash
cd backend
npm run dev
```

Run backend production server:

```bash
cd backend
npm start
```

Run frontend development server:

```bash
cd frontend
npm run dev
```

Build frontend:

```bash
cd frontend
npm run build
```

Preview frontend build:

```bash
cd frontend
npm run preview
```

Build complete project from root:

```bash
npm run build
```

Start complete project from root:

```bash
npm start
```

## Notes

- The frontend development server runs on Vite's default port `5173`.
- The backend CORS settings allow requests from `http://localhost:5173`.
- The backend should run on `5002` during development.
- Socket.IO also expects the frontend to run from `http://localhost:5173` during development.
