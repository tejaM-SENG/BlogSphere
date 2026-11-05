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
| Home / Blog Listing | <img width="2840" height="1228" alt="image" src="https://github.com/user-attachments/assets/d8db1884-42a5-40a3-a44b-54afa20a583e" /><img width="2834" height="1146" alt="image" src="https://github.com/user-attachments/assets/7dc9f80c-6d0a-4e92-ab6e-332a84e59a1b" /><img width="2846" height="1276" alt="image" src="https://github.com/user-attachments/assets/15a44b92-6b79-489c-9613-3d152a7acc90" /><img width="2842" height="1278" alt="image" src="https://github.com/user-attachments/assets/4f12a5e9-85b3-447e-9002-50a9beadf920" /> |
| Admin Dashboard | <img width="2098" height="1244" alt="image" src="https://github.com/user-attachments/assets/ce416d5d-6e89-4ce3-8187-d58d846b4fff" /><img width="2338" height="1058" alt="image" src="https://github.com/user-attachments/assets/25393e69-15be-4d18-9888-f0a9fae11273" /> |
| Author Dashboard | <img width="1050" height="886" alt="image" src="https://github.com/user-attachments/assets/c85ea655-0345-454c-a5d1-5d2d74252cd2" /> |
| Create Blog | <img width="2842" height="1280" alt="image" src="https://github.com/user-attachments/assets/e1d03705-3809-452e-977f-38c8cac8e925" /><img width="2842" height="852" alt="image" src="https://github.com/user-attachments/assets/0802c1f7-509a-415e-8194-fec4327db39c" /> |
| Edit Blog | <img width="2842" height="1282" alt="image" src="https://github.com/user-attachments/assets/35fd80af-4933-46ac-8578-35212a404a1e" /><img width="2844" height="1054" alt="image" src="https://github.com/user-attachments/assets/eabe408e-06ee-490b-a382-00b6dae0394c" /> |
| Blog Details | <img width="2070" height="1274" alt="image" src="https://github.com/user-attachments/assets/7f4e604f-274c-49de-b949-cb3e10d39062" /><img width="2140" height="1282" alt="image" src="https://github.com/user-attachments/assets/3537c4c6-9725-4db7-9ea8-cfb51319e234" /><img width="2270" height="1272" alt="image" src="https://github.com/user-attachments/assets/76a6ba86-dc0d-4854-a85a-844af5db81e4" /> |
| User Management | <img width="2030" height="1226" alt="image" src="https://github.com/user-attachments/assets/3330c906-5cf0-438c-b483-2b56db05c0b2" /><img width="2136" height="1138" alt="image" src="https://github.com/user-attachments/assets/c4f4026b-2db0-4186-baaa-ec036b90690e" /> |

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
