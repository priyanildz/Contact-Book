<!-- # Contact Manager

A full-stack Contact Management System built to efficiently store, manage, and retrieve contact information through a modern web interface.

## Live Demo

https://contact-book-six.vercel.app/

## 🛠️ Tech Stack

### Frontend
- React / HTML / CSS / JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Atlas)

### Authentication
- JWT (JSON Web Tokens)

## Project Structure

```text
contact-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── contactModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── contactRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── AddContact.jsx
│   │   │   ├── AuthPanel.jsx
│   │   │   ├── ContactList.jsx
│   │   │   └── SearchContact.jsx
│   │   ├── main.jsx
│   │   └── styles.css
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
- Duplicate checks for name/phone/email are enforced per user. -->



<div align="center">

# <img src="https://img.icons8.com/fluency/48/contacts.png" width="40"/> Contact Manager

### Secure Contact Management • Multi-User Isolation • Production Ready

<p>
A scalable contact management web application that enables users to securely store, manage, and access their personal contacts with complete data isolation and authentication.
</p>

<br/>

<a href="YOUR_LIVE_LINK_HERE" target="_blank">
  <img src="https://img.shields.io/badge/Live%20Application-Open-1E88E5?style=for-the-badge&logo=google-chrome&logoColor=white" />
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white"/>
<img src="https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=for-the-badge"/>

</div>

---

## Overview

**Contact Manager** is a secure backend-driven web application that allows multiple users to manage their contacts independently.

Each user has complete data isolation, ensuring that contacts are private and accessible only to their respective owners. The application is built with authentication, validation, and scalable backend design in mind.

---

## Screenshots

<div align="center">

| Dashboard | Add Contact | Contact List |
|-----------|------------|--------------|
| <img src="assets/dashboard.png" width="300"/> | <img src="assets/add.png" width="300"/> | <img src="assets/list.png" width="300"/> |

</div>

---

## Key Features

- Secure user authentication (JWT-based login/signup)
- Multi-user data isolation (user-specific contacts)
- Create, read, update, and delete contacts
- Duplicate validation (name, phone, email per user)
- Structured backend API design
- Clean and minimal UI integration
- Error handling and validation support
- Scalable backend architecture

---

## Technology Stack

<div align="center">

| Category | Technology |
|----------|-----------|
| Backend | <img src="https://img.icons8.com/color/20/python.png"/> Python |
| Framework | <img src="https://img.icons8.com/ios-filled/20/000000/flask.png"/> Flask |
| Database | <img src="https://img.icons8.com/color/20/sql.png"/> SQLite |
| Authentication | <img src="https://img.icons8.com/ios-filled/20/key.png"/> JWT |
| ORM | <img src="https://img.icons8.com/ios-filled/20/database.png"/> SQLAlchemy |
| API Testing | <img src="https://img.icons8.com/color/20/api.png"/> REST APIs |

</div>

---

## Project Structure

```
14_contact_manager/
├── app.py
├── models.py
├── routes/
│   ├── auth.py
│   └── contacts.py
├── utils/
│   └── jwt_handler.py
├── requirements.txt
├── .env
├── .gitignore
└── assets/
    ├── dashboard.png
    ├── add.png
    └── list.png
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- pip installed

---

### Installation

```bash
git clone https://github.com/priyanildz/Contact-Book.git
cd Contact-Book
```

```bash
python -m venv venv
```

```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

```bash
pip install -r requirements.txt
```

---

### Environment Setup

Create `.env` file:

```env
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
```

---

### Run Application

```bash
python app.py
```

---

## Usage Flow

1. Register a new user  
2. Login with credentials  
3. Add contacts  
4. Manage contacts (edit/delete)  
5. Each user accesses only their own data  

---

## API Overview

### Authentication

```
POST /register
POST /login
```

### Contacts

```
GET /contacts
POST /contacts
PUT /contacts/<id>
DELETE /contacts/<id>
```

---

## Core Concepts Implemented

- JWT Authentication  
- RESTful API Design  
- Data Isolation per User  
- Backend Validation  
- Secure Routing  

---

## Deployment

### Run with Gunicorn

```bash
gunicorn app:app
```

---

## Contributing

1. Fork repository  
2. Create new branch  
3. Commit changes  
4. Push to GitHub  
5. Open pull request  

---

## License

This project is licensed under the MIT License.

---

<div align="center">

Developed by  
<strong>priyanildz</strong>

</div>