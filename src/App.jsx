import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import './App.css';

import { createContext, useState, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Navbar = lazy(() => import("./pages/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Footer = lazy(() => import("./pages/Footer"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const NoPage = lazy(() => import("./pages/NoPage"));

const AuthorDashboard = lazy(() => import("./author/AuthorDashboard"));
const AddBlog = lazy(() => import("./author/AddBlog"));
const EditBlog = lazy(() => import("./author/EditBlog"));
const MyBlogs = lazy(() => import("./author/MyBlogs"));

const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const ManageAuthors = lazy(() => import("./admin/ManageAuthors"));
const ManageBlogs = lazy(() => import("./admin/ManageBlogs"));
const AuthorProfile = lazy(() => import("./admin/AuthorProfile"));

const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

export const UserData = createContext();

function App() {

  const [login, setLogin] = useState({
    status: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user"))
  });

  return (
    <UserData.Provider value={[login, setLogin]}>
      <Navbar />
      <Suspense fallback={<h1 className='p-5'><span className='spinner-border'></span>...Loading</h1>}>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/BlogPage" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* ================= AUTHOR ROUTES ================= */}
        <Route path="/author/dashboard"
          element={
            <ProtectedRoute role="author">
              <AuthorDashboard />
            </ProtectedRoute>} />
        <Route path="/author/add-blog"
          element={
            <ProtectedRoute role="author">
              <AddBlog />
            </ProtectedRoute>} />
        <Route path="/author/edit-blog/:id"
          element={
            <ProtectedRoute role="author">
              <EditBlog />
            </ProtectedRoute>}/>
        <Route path="/author/blogs"
          element={
            <ProtectedRoute role="author">
              <MyBlogs />
            </ProtectedRoute>}/>
        <Route path="/author/blog/:id"
          element={
            <ProtectedRoute role="author">
              <BlogDetails />
            </ProtectedRoute>}/>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>}/>
        <Route path="/admin/blogs"
          element={
            <ProtectedRoute role="admin">
              <ManageBlogs />
            </ProtectedRoute>}/>
        <Route path="/admin/authors"
          element={
            <ProtectedRoute role="admin">
              <ManageAuthors />
            </ProtectedRoute> }/>
        <Route path="/admin/authors/:id"
          element={
            <ProtectedRoute role="admin">
              <AuthorProfile />
            </ProtectedRoute> } />
       <Route path="/admin/blog/:id"
          element={
            <ProtectedRoute role="admin">
              <BlogDetails />
            </ProtectedRoute>} />

        {/* ================= 404 ================= */}
        <Route path="*" element={<NoPage />} />
      </Routes>
      </Suspense>
      <Footer />
    </UserData.Provider>
  );
}

export default App;