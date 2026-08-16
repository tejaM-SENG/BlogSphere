import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AuthorDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, []);

  const fetchDashboardData = async () => {
    try {

      // Get Author Blogs
      const blogRes = await axios.get(
        `http://localhost:3000/blogs?authorId=${user.id}`
      );
      const authorBlogs = blogRes.data;

      setTotalBlogs(
        authorBlogs.length
      );

      // Latest 3 Blogs
        const latestBlogs = [...authorBlogs]
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 3);
      setBlogs(latestBlogs);

      // Categories
      const categories = [
        ...new Set(
          authorBlogs.map(
            blog => blog.category
          )
        )
      ];

      setTotalCategories(
        categories.length
      );

      // Comments
      const commentRes = await axios.get(
        "http://localhost:3000/comments"
      );

      const blogIds = authorBlogs.map(
        blog => String(blog.id)
      );

      const comments =
        commentRes.data.filter(
          comment =>
            blogIds.includes(
              String(comment.blogId)
            )
        );

      setTotalComments(
        comments.length
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return null;
  }

  return (

    <div className="container my-5">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">
          Welcome, {user.name}
        </h2>
        <p className="text-muted">
          Manage your articles and track your
          blog activity.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="row">

        {/* Blogs */}
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

        {/* Categories */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-tags fs-1 text-success"></i>
              <h1 className="mt-2">
                {totalCategories}
              </h1>
              <h5>
                Categories
              </h5>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-chat-left-text fs-1 text-warning"></i>
              <h1 className="mt-2">
                {totalComments}
              </h1>
              <h5>
                Comments
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-3 mb-5 text-center">
        <Link
          to="/author/add-blog"
          className="btn btn-primary me-3"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Blog
        </Link>
        <Link
          to="/author/blogs"
          className="btn btn-success"
        >
          <i className="bi bi-journal-text me-2"></i>
          View All Blogs
        </Link>
      </div>

      {/* MY RECENT BLOGS */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">
              My Recent Blogs
            </h3>
            <p className="text-muted mb-0">
              Your latest published articles
            </p>
          </div>
          <Link
            to="/author/blogs"
            className="btn btn-outline-primary"
          >
            View All
          </Link>
        </div>

        <div className="row">
          {blogs.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                You haven't published any blogs yet.
                <Link
                  to="/author/add-blog"
                  className="alert-link ms-2"
                >
                  Create your first blog
                </Link>
              </div>
            </div>
          ) : (
            blogs.map(blog => (
              <div
                className="col-md-4 mb-4"
                key={blog.id}
              >
                <div className="card shadow-sm h-100">
                  {/* Image */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="card-img-top"
                    style={{
                      height: "190px",
                      objectFit: "cover"
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    {/* Category */}
                    <div>
                      <span className="badge bg-primary">
                        {blog.category}
                      </span>
                    </div>
                    {/* Title */}
                    <h5 className="fw-bold mt-2">
                      {blog.title}
                    </h5>
                    {/* Description */}
                    <p className="text-muted">
                      {blog.description?.substring(
                        0,
                        90
                      )}
                      ...
                    </p>
                    {/* Date */}
                    <small className="text-muted mb-3">
                      <i className="bi bi-calendar3 me-1"></i>
                      {blog.createdAt
                        ? new Date(
                            blog.createdAt
                          ).toLocaleDateString()
                        : "No date"
                      }
                    </small>
                    {/* Buttons */}
                    <div className="mt-auto">
                      <Link
                        to={`/author/blog/${blog.id}`}
                        className="btn btn-primary btn-sm me-2"
                      ><i className="bi bi-eye"> </i>
                        View
                      </Link>
                      <Link
                        to={`/author/edit-blog/${blog.id}`}
                        className="btn btn-outline-secondary btn-sm"
                      ><i className="bi bi-pencil"> </i>
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default AuthorDashboard;