import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [author, setAuthor] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setAuthor({
      ...author,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !author.name ||
      !author.email ||
      !author.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      // Check whether email already exists
      const res = await axios.get(
        `http://localhost:3000/users?email=${author.email}`
      );

      if (res.data.length > 0) {
        alert("Email already registered.");
        return;
      }

      await axios.post(
        "http://localhost:3000/users",
        {
          ...author,
          role: "author"
        }
      );

      alert("Registration successful.");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "calc(100vh - 76px)",
        padding: "15px 0"
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="fw-bold display-5">
              Start Writing with
              <span className="text-primary"> BLOGSphere</span>
            </h1>
            <p className="text-muted fs-5 mt-3">
              Create your author account and share your
              knowledge with readers around the world.
            </p>
            <div className="mt-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-pencil-square fs-4 text-primary me-3"></i>
                <span>Publish your own articles</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-bar-chart fs-4 text-primary me-3"></i>
                <span>Manage and track your blogs</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-chat-heart fs-4 text-primary me-3"></i>
                <span>Interact with your readers</span>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-5 offset-lg-1">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-3">
                  <h2 className="fw-bold mt-2 mb-1">
                    Create Account
                  </h2>
                  <p className="text-muted mb-0">
                    Become a BlogSphere author
                  </p>
                </div>
                <form onSubmit={handleSubmit}>

                  {/* NAME */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={author.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
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
                        value={author.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-3">
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
                        placeholder="Create a password"
                        value={author.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Create Account
                  </button>

                  <p className="text-center mt-3 mb-0">
                    Already have an account?
                    <Link
                      to="/Login"
                      className="text-primary fw-semibold text-decoration-none ms-1"
                    >
                      Sign In
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

export default Register;