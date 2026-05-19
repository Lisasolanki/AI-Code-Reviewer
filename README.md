# AI-Code-Reviewer
AI Code Reviewer is a full-stack SaaS app that analyzes code and GitHub repositories using AI. It detects bugs, performance issues, and best-practice violations, provides scores and summaries, supports authentication, stores history in MongoDB, and delivers feedback through a modern React interface.
# AI Code Reviewer — Project Description

## What This Project Does

AI Code Reviewer is a full-stack web application that helps developers analyze source code using Artificial Intelligence.

Users can:

* Write code directly inside the editor
* Analyze GitHub repositories
* Get AI-generated feedback
* Detect bugs and bad coding practices
* View performance improvement suggestions
* Track previous analysis history
* Create accounts using authentication
* Login securely and access protected features

The project works like an AI-powered assistant for developers that reviews code quality automatically.

---

# Main Features

## 1. AI Code Analysis

Users can paste code into the editor and click:

```text id="6yjlwm"
Analyze Code
```

The AI then:

* Reviews the code
* Gives a score
* Finds bugs
* Detects performance issues
* Suggests best practices
* Generates a summary

---

## 2. GitHub Repository Analysis

Users can enter a GitHub repository URL.

The backend:

* Fetches repository files using GitHub API
* Extracts code
* Sends it to AI
* Returns detailed analysis

---

## 3. Authentication System

Users can:

* Signup
* Login
* Store JWT token
* Access protected routes

Passwords are securely encrypted using bcrypt.

---

## 4. History Tracking

Every analysis is stored in MongoDB.

Users can later:

* View old analyses
* Reopen previous reports
* Track improvements

---

## 5. Monaco Code Editor

The project uses Monaco Editor (same editor used in VS Code).

Features:

* Syntax highlighting
* Dark theme
* Smooth coding experience

---

# Technologies Used

## Frontend Libraries

### React

Used to build frontend UI.

### Vite

Fast frontend development server.

### Axios

Used for API requests between frontend and backend.

### React Router

Used for page navigation.

### Monaco Editor

Used for professional code editing interface.

---

## Backend Libraries

### Node.js

Runs backend server.

### Express.js

Creates APIs and backend routes.

### Mongoose

Connects backend with MongoDB.

### jsonwebtoken

Creates login tokens.

### bcryptjs

Encrypts passwords securely.

### dotenv

Stores secret keys safely.

### cors

Allows frontend-backend communication.

---

## Database

### MongoDB Atlas

Stores:

* Users
* Analysis history
* Repository analysis data

---

## AI Service

### OpenRouter

Used for accessing AI models like GPT-4o-mini.

---

# Project Folder Structure

```text id="nyjlwm"
AI CODE REVIEWER
│
├── FRONTEND
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── BACKEND
│   ├── Config
│   ├── Controllers
│   ├── middleware
│   ├── models
│   ├── Routes
│   ├── Services
│   ├── .env
│   ├── server.js
│   └── package.json
```

---

# Important Libraries Required

## Frontend

Run inside FRONTEND:

```bash id="ujlwm1"
npm install react-router-dom axios @monaco-editor/react
```

---

## Backend

Run inside BACKEND:

```bash id="jlwm2"
npm install express mongoose cors dotenv bcryptjs jsonwebtoken axios nodemon
```

---

# How To Run The Project

# Step 1 — Start Backend

Open terminal inside:

```text id="jlwm3"
BACKEND
```

Run:

```bash id="jlwm4"
nodemon server.js
```

Expected:

```text id="jlwm5"
MongoDB Connected
Server running on port 5000
```

---

# Step 2 — Start Frontend

Open another terminal inside:

```text id="jlwm6"
FRONTEND
```

Run:

```bash id="jlwm7"
npm run dev
```

Expected:

```text id="jlwm8"
Local: http://localhost:5173
```

---

# Step 3 — Open Website

Open browser:

```text id="jlwm9"
http://localhost:5173
```

---

# How The Website Works

## User Flow

### 1. Signup

User creates account.

### 2. Login

JWT token is stored in localStorage.

### 3. Home Page

User can:

* Paste code
* Analyze repositories

### 4. AI Analysis

Backend sends code to AI API.

### 5. Output Panel

Shows:

* Score
* Bugs
* Performance issues
* Best practices
* Summary

### 6. History

Old analyses are stored and displayed.

---

# Why This Project Is Useful

* Helps beginners improve code quality
* Saves manual code review time
* Works like an AI coding assistant
* Useful for portfolio projects
* Demonstrates full-stack development skills
* Shows AI integration knowledge

---

# Difficulty Level

This project includes:

* Frontend Development
* Backend APIs
* Authentication
* Database Integration
* AI APIs
* GitHub API Integration
* Deployment


