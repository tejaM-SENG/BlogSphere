import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../App";

function Navbar() {
  const navigate = useNavigate();
  const [login, setLogin] = useContext(UserData)
  const user = login.user;

  const handleLogout = () => {
    setLogin({status:false, user: null});
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand me-5" to="/">
          <h2>BLOG<span className='text-danger'>Sphere</span></h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">

          {/* Left Side */}
          <ul className="navbar-nav me-auto">

            {/* Guest */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" to="/BlogPage">
                    Blogs
                  </Link>
                </li>
              </>
            )}

            {/* Author */}
            {user?.role === "author" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/author/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/BlogPage">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/author/blogs"
                  >
                    My Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/author/add-blog"
                  >
                    Add Blog
                  </Link>
                </li>
              </>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/BlogPage">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin/blogs"
                  >
                    Manage Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin/authors"
                  >
                    Manage Authors
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link login fw-bold bg-white text-black px-3"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link register fw-bold bg-danger text-white px-3"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;