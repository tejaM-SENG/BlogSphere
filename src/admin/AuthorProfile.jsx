import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function AuthorProfile() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAuthor();
    fetchAuthorBlogs();
  }, [id]);

  // Get author details
  const fetchAuthor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users/${id}`
      );
      setAuthor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get author's blogs
  const fetchAuthorBlogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/blogs?authorId=${id}`
      );

      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get unique categories
  const categories = [
    ...new Set(
      blogs.map((blog) => blog.category)
    )
  ];

  if (!author) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading author...</h4>
      </div>
    );
  }

  return (
    <div className="container my-5">

      {/* Author Profile */}
      <div className="card shadow mb-5">
        <div className="card-body">
          <div className="row align-items-center">

            {/* Profile Icon */}
            <div className="col-md-3 text-center">
              <div
                className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: "120px",
                  height: "120px",
                  fontSize: "45px"
                }}
              >
                {author.name
                  ? author.name.charAt(0).toUpperCase()
                  : "A"}
              </div>
            </div>

            {/* Author Details */}
            <div className="col-md-5">
              <h2>{author.name}</h2>
              <p className="text-muted mb-2">
                <strong>Email:</strong> {author.email}
              </p>
              <p className="text-muted">
                <strong>Role:</strong> {author.role}
              </p>
            </div>

            {/* Statistics */}
            <div className="col-md-4">
              <div className="row text-center">
                <div className="col-6">
                  <h3>{blogs.length}</h3>
                  <p className="text-muted">
                    Blogs
                  </p>
                </div>
                <div className="col-6">
                  <h3>{categories.length}</h3>
                  <p className="text-muted">
                    Categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Blogs */}
      <h2 className="mb-4">
        {author.name}'s Blogs
      </h2>

      {blogs.length === 0 ? (
        <div className="alert alert-info">
          This author has not published any blogs yet.
        </div>
      ) : (
        <div className="row">

          {blogs.map((blog) => (
            <div
              className="col-md-4 mb-4"
              key={blog.id}
            >
              <div className="card h-100 shadow-sm">

                {/* Blog Image */}
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                  style={{
                    height: "200px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <span className="badge bg-primary align-self-start mb-2">
                    {blog.category}
                  </span>
                  <h5 className="card-title">
                    {blog.title}
                  </h5>
                  <p className="card-text text-muted">
                    {blog.description &&
                    blog.description.length > 100
                      ? blog.description.substring(0, 100) +
                        "..."
                      : blog.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="btn btn-primary"
                    >
                      View Blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorProfile;