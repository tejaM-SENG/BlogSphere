# BlogSphere – Full-Stack Blogging Platform

BlogSphere is a full-stack blogging platform developed using React.js, Python, Django REST Framework, and SQLite. The application provides a platform for managing blog content, user accounts, and comments through dedicated Admin and Author dashboards.

## 🚀 Live Demo

**Frontend:** https://blogsphere-g7b5.onrender.com/

**Backend API:** https://blogspheredb.onrender.com/api

**GitHub Repository:** https://github.com/tejaM-SENG/BlogSphere

## 📌 Project Overview

BlogSphere is designed to provide an organized blogging environment where authors can create, publish, update, and manage their blog posts, while administrators can oversee users and platform content.

The React frontend communicates with the Django REST Framework backend through REST APIs using Axios. SQLite is used to store application data, including users, blogs, and comments.

## ✨ Key Features

### 👨‍💼 Admin Features
- Admin dashboard for managing platform activities.
- View registered users and authors.
- View all published blog posts.
- Delete user accounts.
- Delete blog posts.
- Manage and monitor platform content.

### ✍️ Author Features
- Author authentication and login.
- Dedicated author dashboard.
- Create new blog posts.
- View published blog posts.
- Edit existing blog posts.
- Delete personal blog posts.
- Manage personal blog content.

### 💬 Blog & Comment Management
- Display available blog posts.
- View individual blog content.
- Manage blog comments.
- Connect blog posts with their respective authors.
- Store and retrieve blog information through REST APIs.

### 🔗 Frontend and Backend Integration
- React.js frontend integration with Django REST APIs.
- Axios for HTTP requests.
- Dynamic data retrieval from SQLite.
- Backend-driven user and blog management.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Programming Language | JavaScript |
| Backend | Python |
| Backend Framework | Django |
| API Framework | Django REST Framework |
| Database | SQLite3 |
| API Integration | Axios |
| UI Framework | Bootstrap |
| Version Control | Git & GitHub |
| Deployment | Render |

## 👥 User Roles

### 1. Administrator
- Access the admin dashboard.
- View registered users and authors.
- Monitor all blog posts.
- Delete inappropriate or unwanted blog posts.
- Manage registered user accounts.

### 2. Author
- Log in to the author dashboard.
- Create and publish blog posts.
- View personal blog posts.
- Update existing posts.
- Delete personal posts.
- Manage blog content.

## 🔐 Demo Login Credentials

Use the following demo accounts to explore the application.

| User Role | Username / Email | Password |
|---|---|---|
| Admin | demo@admin.com | demo@1234 |
| Author | demo@author.com | auth@1234 |


## 🏗️ Application Architecture

BlogSphere follows a client-server architecture.

```text
          USER
            |
            v
     REACT FRONTEND
       (Vite)
            |
            v
      AXIOS HTTP
       REQUESTS
            |
            v
    DJANGO REST API
            |
            v
       DJANGO ORM
            |
            v
       SQLite DB
            |
            v
     USERS / BLOGS
       / COMMENTS
```

## 📂 Project Structure

```text
BlogSphere/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── author/
│   │   ├── admin/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── blog/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tests.py
│   │   ├── apps.py
│   │   ├── admin.py
│   │   └── urls.py
│   │
│   ├── blogsphere/
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   └── urls.py
│   │
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
│
├── screenshots/
│
└── README.md
```

*Note: This is an illustrative structure. Adjust folder names to match your actual GitHub repository.*

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.10 or later (use a version supported by your dependencies).
- Node.js and npm.
- Git.

### 1. Clone the Repository

```bash
git clone https://github.com/tejaM-SENG/BlogSphere.git
```

```bash
cd BlogSphere
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Database Configuration

BlogSphere uses SQLite3 as its database. Django manages database operations through its built-in ORM.

The database file is:
```text
backend/
└── db.sqlite3
```

### 4. Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create an Administrator Account

```bash
python manage.py createsuperuser
```

### 6. Start the Django Backend

```bash
python manage.py runserver
```

The backend will run at:

http://127.0.0.1:8000/

### 7. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the backend API URL using the frontend environment configuration.

For example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Make sure this matches the API base URL used in your Axios configuration.

### 8. Start the React Development Server

```bash
npm run dev
```

The frontend will normally run at:

http://localhost:5173/

## 🔌 REST API Integration

BlogSphere uses Django REST Framework to expose backend functionality through APIs.

The application includes API resources for:

| API Resource | Functionality |
|---|---|
| Users | User account management |
| Blogs | Blog creation and management |
| Comments | Blog comment management |

The frontend uses Axios to communicate with these backend resources.

*Note: Refer to the backend URL configuration for the exact API endpoint paths and supported HTTP methods.*

## 🖥️ Application Screenshots

Add actual screenshots of your deployed application.

| Interface | Screenshot |
|---|---|
| Home / Blog Listing | <img width="2844" height="1120" alt="image" src="https://github.com/user-attachments/assets/3aa607c8-8500-45a5-9c73-59976529f312" /><img width="2834" height="1146" alt="image" src="https://github.com/user-attachments/assets/9861f71a-52a0-47c9-830f-5fdf5804923e" /><img width="2836" height="1146" alt="image" src="https://github.com/user-attachments/assets/fac149bf-a720-476f-8713-3066013f1f2c" /><img width="2840" height="1140" alt="image" src="https://github.com/user-attachments/assets/0e876b06-a490-4778-bbae-b886633e835b" /> |
| Admin Dashboard | <img width="2834" height="1272" alt="image" src="https://github.com/user-attachments/assets/7a70bf59-cc64-43d9-b096-59be0b83ed8f" /><img width="2836" height="1082" alt="image" src="https://github.com/user-attachments/assets/92d47a0a-b409-4c84-994a-53e6f0ee7d13" /><img width="2840" height="1146" alt="image" src="https://github.com/user-attachments/assets/695ef5aa-a564-4914-b3f6-098f8eb4d099" /> |
| Author Dashboard | <img width="2842" height="1276" alt="image" src="https://github.com/user-attachments/assets/43f0cdb7-7c34-4b8a-b79c-2ee5227be1b1" /><img width="2838" height="1144" alt="image" src="https://github.com/user-attachments/assets/722eaa93-7b22-4415-8ff7-32d58740d8b8" /> |
| Create Blog | <img width="1408" height="1280" alt="image" src="https://github.com/user-attachments/assets/d7836c86-ba26-4c5f-867a-fd2feae5ab8c" /> |
| Edit Blog | <img width="1488" height="1266" alt="image" src="https://github.com/user-attachments/assets/bcfe0fc0-388d-4c42-bc20-3522e6231594" /> |
| Blog Details | <img width="1514" height="1272" alt="image" src="https://github.com/user-attachments/assets/f1fefa95-2a7d-4572-9b34-d290363de09e" /><img width="1560" height="1142" alt="image" src="https://github.com/user-attachments/assets/77b66ca9-9ae3-43f6-ab62-e9e6ebffd3bf" /> |
| User Management | <img width="2278" height="1278" alt="image" src="https://github.com/user-attachments/assets/5cfa9008-1808-448c-8d0b-3305114ebfca" /><img width="2506" height="1280" alt="image" src="https://github.com/user-attachments/assets/aad662b7-ea4b-4dbe-9517-ac73782d930b" /> |

## ☁️ Deployment

BlogSphere is deployed using Render with separate frontend and backend services.

### Frontend Deployment
- Connect the frontend GitHub repository or frontend directory to Render.
- Install dependencies using `npm install`.
- Build the application using `npm run build`.
- Use `dist` as the build output directory.
- Configure the deployed backend API URL.

### Backend Deployment
- Configure the Python environment.
- Install dependencies using `requirements.txt`.
- Configure the Django WSGI application.
- Set up MySQL database connectivity.
- Configure environment variables.
- Apply database migrations.
- Configure static and media file handling.
- Deploy the backend service.

**Frontend URL:** https://blogsphere-g7b5.onrender.com/

**Backend URL:** https://blogspheredb.onrender.com/api

## 🎯 Project Objectives

- Develop a full-stack blogging platform using React and Django.
- Implement frontend and backend communication using REST APIs.
- Integrate React with Django REST Framework using Axios.
- Implement Admin and Author role-based functionality.
- Develop blog content management features.
- Integrate MySQL for persistent data storage.
- Build responsive user interfaces.
- Deploy frontend and backend applications using Render.

## 👨‍💻 Developer

**Teja Muddangula**

Python Full-Stack Developer

- GitHub: https://github.com/tejaM-SENG
- LinkedIn: https://linkedin.com/in/teja-muddangula-38a92a218

---

*Developed as a Full-Stack Web Development project using React.js, Python, Django REST Framework, and MySQL.*
