import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../App";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useContext(UserData)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        "http://localhost:3000/users"
      );

      const user = res.data.find(
        (u) =>
          u.email === loginData.email &&
          u.password === loginData.password
      );

      if (!user) {
        alert("Invalid Email or Password");
        return;
      }
      setLogin({status: true, user: user});

      // Store logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }

      if (user.role === "author") {
        navigate("/author/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "calc(100vh - 76px)",
        padding: "20px 0"
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">

            <h1 className="fw-bold display-5">
              Welcome to
              <span className="text-primary"> BLOGSphere</span>
            </h1>

            <p className="text-muted fs-5 mt-3">
              Login to explore interesting articles, share your
              thoughts, and connect with passionate writers.
            </p>

            <div className="mt-4">

              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-book fs-4 text-primary me-3"></i>
                <span>Explore amazing articles</span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-chat-dots fs-4 text-primary me-3"></i>
                <span>Share your thoughts through comments</span>
              </div>

              <div className="d-flex align-items-center">
                <i className="bi bi-people fs-4 text-primary me-3"></i>
                <span>Connect with the blogging community</span>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-5 offset-lg-1">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mt-3 mb-1">
                    Login
                  </h2>
                  <p className="text-muted mb-0">
                    Sign in to your account
                  </p>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </button>

                  <div className="text-center my-3">
                    <span className="text-muted">
                      or continue with
                    </span>
                  </div>

                  {/* SOCIAL ICONS */}
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-danger rounded-circle"
                      title="Google"
                    >
                      <i className="bi bi-google"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-circle"
                      title="Facebook"
                    >
                      <i className="bi bi-facebook"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-circle"
                      title="LinkedIn"
                    >
                      <i className="bi bi-linkedin"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-circle"
                      title="GitHub"
                    >
                      <i className="bi bi-github"></i>
                    </button>
                  </div>

                  <p className="text-center mt-4 mb-0">
                    Don't have an account?
                    <Link
                      to="/Register"
                      className="text-primary fw-semibold text-decoration-none ms-1"
                    >
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;