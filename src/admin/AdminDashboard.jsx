import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const blogsRes = await axios.get(
        "http://localhost:3000/blogs"
      );
      const usersRes = await axios.get(
        "http://localhost:3000/users"
      );
      const commentsRes = await axios.get(
        "http://localhost:3000/comments"
      );

      // Blogs
      const allBlogs = blogsRes.data;

      setTotalBlogs(allBlogs.length);

      // Latest 3 blogs
      const latestBlogs = [...allBlogs]
        .sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(0, 3);

      setBlogs(latestBlogs);

      // Authors

      const allAuthors = usersRes.data.filter(
        user => user.role === "author"
      );

      setTotalAuthors(allAuthors.length);

      // Show first 3 authors
      setAuthors(
        allAuthors.slice(0, 3)
      );

      // Comments
      setTotalComments(
        commentsRes.data.length
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5">

      {/* DASHBOARD HEADER */}
      <h2 className="mb-4">
        Welcome Admin
      </h2>

      {/* STATISTICS */}
      <div className="row">
        {/* Total Blogs */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-journal-text fs-1 text-primary"></i>
              <h1 className="mt-2">
                {totalBlogs}
              </h1>
              <h5>
                Total Blogs
              </h5>
            </div>
          </div>
        </div>

        {/* Total Authors */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-people fs-1 text-success"></i>
              <h1 className="mt-2">
                {totalAuthors}
              </h1>
              <h5>
                Total Authors
              </h5>
            </div>
          </div>
        </div>

        {/* Total Comments */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-chat-left-text fs-1 text-warning"></i>
              <h1 className="mt-2">
                {totalComments}
              </h1>
              <h5>
                Total Comments
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN ACTION BUTTONS */}
      <div className="mt-3 mb-5 text-center">
        <Link
          to="/admin/blogs"
          className="btn btn-primary me-3"
        >
          <i className="bi bi-journal-text me-2"></i>
          Manage Blogs
        </Link>
        <Link
          to="/admin/authors"
          className="btn btn-success"
        >
          <i className="bi bi-people me-2"></i>
          Manage Authors
        </Link>
      </div>

      {/* RECENT AUTHORS */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">
              Recent Authors
            </h3>
            <p className="text-muted mb-0">
              Authors who are contributing to BlogSphere
            </p>
          </div>
          <Link
            to="/admin/authors"
            className="btn btn-outline-success"
          >
            View All
          </Link>
        </div>
        <div className="row">
          {authors.map(author => (
            <div
              className="col-md-4 mb-4"
              key={author.id}
            >
              <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                  {/* Author Image */}
                  {author.image ? (
                    <img
                      src={author.image}
                      alt={author.name}
                      className="rounded-circle mb-3"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "90px",
                        height: "90px",
                        fontSize: "35px"
                      }}
                    >
                      <i className="bi bi-person"></i>
                    </div>
                  )}
                  <h5 className="fw-bold">
                    {author.name}
                  </h5>
                  <p className="text-muted mb-3">
                    {author.email}
                  </p>
                  <Link
                    to={`/admin/authors/${author.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT BLOGS */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">
              Recent Blogs
            </h3>
            <p className="text-muted mb-0">
              Latest articles published on BlogSphere
            </p>
          </div>
          <Link
            to="/admin/blogs"
            className="btn btn-outline-primary"
          >
            View All
          </Link>
        </div>
        <div className="row">
          {blogs.map(blog => (
            <div
              className="col-md-4 mb-4"
              key={blog.id}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "cover"
                  }}
                />
                <div className="card-body">
                  <span className="badge bg-primary mb-2">
                    {blog.category}
                  </span>
                  <h5 className="fw-bold">
                    {blog.title}
                  </h5>
                  <p className="text-muted">
                    <i className="bi bi-person me-1"></i>
                    {blog.author}
                  </p>
                  <p className="small text-muted">
                    {blog.description?.substring(
                      0,
                      80
                    )}
                    ...
                  </p>
                  <Link
                    to={`/admin/blog/${blog.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;