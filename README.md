# Contact Manager (Full Stack)

This project converts the CLI contact book into a full-stack web app.

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
