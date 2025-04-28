# Task Manager App

A full-stack Task Management application built with the MERN stack (MongoDB, Express.js, React, Node.js).

---


# Features:

- Sign Up / Login / Logout
- Token-based Authentication
- Create / Read / Update / Delete Tasks
- Set task priority (Low / Medium / High)
- Delete User (with cascade deletion of tasks)
- Responsive UI (desktop + mobile)
- Error handling and toast notifications

---

## Technologies used:

- **Frontend:** React, Redux Toolkit, React Router, Axios, Tailwind CSS, Toastify
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)

---


---

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGO=your_mongodb_connection_string
   JWT=your_jwt_secret
   ```

4. Run the backend server:
   ```bash
   npm start
   ```

---
  
### Frontend Setup

1. Navigate to Frontend folder:
   ```bash
   cd Frontend
   cd TaskManagement
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_BASE_URL=http://localhost:5000/api
   ```

4. Run the frontend app:
   ```bash
   npm run dev
   ```

---

## Technical Choices 

- **React + Redux Toolkit** for efficient state management (auth, tasks, etc.)
- **Axios** for all API calls with a pre-configured Axios instance
- **Tailwind CSS** for fast and responsive UI styling
- **Protected Routes** with JWT authentication for secure user access
- **MongoDB** for flexible document-based storage
- **Mongoose** for schema validation and database interactions
- **Express.js API structure** divided into routes, controllers, models, and middleware
- **Toastify** for real-time feedback and UX improvements

**Architecture:**
- User authentication (sign up / login / JWT verifyToken)
- CRUD operations for tasks
- Soft UX (modals, toasts, responsive design)
- State separated cleanly: user slice, task slice

---

## Database Schema

### User Model (`users` collection)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
}
```

### Task Model (`tasks` collection)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String ("completed" | default: "active"),
  priority: String ("low" | "medium" | "high"),
  userId: ObjectId (ref to user),
  createdAt: Date,
  updatedAt: Date
}
```

---

## How to Run Locally

```bash
# 1. Clone the repository
git clone link

# 2. Backend Setup
cd backend
npm install
npm run dev

# 3. Frontend Setup (in a new terminal)
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`  
Backend API runs at `http://localhost:5000/`


---


# Repository Link

> [**GitHub Repository**](https://github.com/Maithon921/Task-Management)

---

# Note

- **Security:** Passwords are hashed (using bcrypt) before saving into DB.
- **Error Handling:** Both client-side and server-side errors are gracefully handled.
- **Future Improvements:** Add pagination, search, and file uploads etc.

---

# Author

Built by [Maithonkambou Abonmai].  
Learning, improving, and building real-world full-stack applications.

---

# End of README

