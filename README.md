# Contact Manager

A full-stack Contact Management System built to efficiently store, manage, and retrieve contact information through a modern web interface.

## Live Demo

https://contact-book-six.vercel.app/

## Tech Stack

- Backend: Node.js + Express + MongoDB (Atlas)
- Frontend: React (Vite)

## Project Structure

```text
contact-manager/
├── backend/
│   ├── controllers/
│   │   └── contactController.js
│   ├── models/
│   │   └── contactModel.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddContact.jsx
│   │   │   ├── ContactList.jsx
│   │   │   └── SearchContact.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
```

## Features

- User registration and login (JWT authentication)
- Contacts are private per logged-in user
- Add contact with validation
- Search contacts by name, phone, or email
- Suggest contacts while searching
- List all contacts
- Edit contact
- Delete contact

## Setup

### 1. Configure backend environment

Update backend/.env:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_strong_secret_here
```

### 1.1 Configure frontend environment

Create frontend/.env with either option:

```env
VITE_API_ROOT=http://localhost:5000/api
```

or

```env
VITE_API_BASE_URL=http://localhost:5000/api/contacts
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Run backend

```bash
cd ../backend
npm run dev
```

### 5. Run frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173 and backend on http://localhost:5000.

## API Endpoints

- GET /api/contacts
- GET /api/contacts/:id
- GET /api/contacts/suggest?q=<text>
- POST /api/contacts
- PUT /api/contacts/:id
- DELETE /api/contacts/:id

## Authentication Endpoints

- POST /api/auth/register
- POST /api/auth/login

## Authorization

- All `/api/contacts` routes are protected.
- Send JWT token in request headers:

```http
Authorization: Bearer <your_token>
```

## Deployment Configuration

### Backend (Render)

- Root Directory: `contact-manager/backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret
PORT=5000
```

### Frontend (Vercel)

- Root Directory: `contact-manager/frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:

```env
VITE_API_ROOT=https://contact-book-vaii.onrender.com/api
```

You can also use:

```env
VITE_API_BASE_URL=https://contact-book-vaii.onrender.com/api/contacts
```

## Multi-User Data Isolation

- Every contact is saved with its owner (logged-in user).
- Users can only view and manage contacts they created.
- Duplicate checks for name/phone/email are enforced per user.
