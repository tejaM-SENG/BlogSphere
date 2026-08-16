import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyBlogs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter(
          (blog) => blog.category === category
        )
      );
    }
  }, [category, blogs]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/blogs?authorId=${user.id}`
      );

      setBlogs(res.data);
      setFilteredBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/blogs/${id}`
      );

      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5">

      {/* ================= HEADER ================= */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-journal-text"> </i>My Blogs
          </h2>
          <p className="text-muted mb-0">
            Manage and organize your published articles
          </p>
        </div>

        <Link
          to="/author/add-blog"
          className="btn btn-primary px-4 mt-3 mt-md-0"
          style={{
            borderRadius: "8px"
          }}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Blog
        </Link>
      </div>

      {/* ================= FILTER ================= */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: "12px"
        }}
      >
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Filter by Category
              </label>
              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                style={{
                  borderRadius: "8px"
                }}
              >
                <option value="All">
                  All Categories
                </option>
                <option value="React">
                  React
                </option>
                <option value="Java">
                  Java
                </option>
                <option value="Python">
                  Python
                </option>
                <option value="JavaScript">
                  JavaScript
                </option>
                <option value="Web Development">
                  Web Development
                </option>
                <option value="CSS">
                  CSS
                </option>
                <option value="Node.js">
                  Node.js
                </option>
                <option value="Database">
                  Database
                </option>
                <option value="DevOps">
                  DevOps
                </option>
                <option value="AI & Machine Learning">
                  AI & Machine Learning
                </option>
              </select>
            </div>

            <div className="col-md-8 mt-3 mt-md-0 text-md-end">
              <span className="text-muted">
                Showing{" "}
                <strong className="text-dark">
                  {filteredBlogs.length}
                </strong>{" "}
                {filteredBlogs.length === 1
                  ? "blog"
                  : "blogs"
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BLOG TABLE ================= */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "12px",
          overflow: "hidden"
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="px-4 py-3">
                  #
                </th>
                <th className="py-3">
                  Blog
                </th>
                <th className="py-3">
                  Category
                </th>
                <th className="py-3">
                  Published
                </th>
                <th className="py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-5"
                  >
                    <i
                      className="bi bi-journal-x text-muted"
                      style={{
                        fontSize: "40px"
                      }}
                    ></i>
                    <h5 className="mt-3">
                      No blogs found
                    </h5>
                    <p className="text-muted mb-0">
                      Try selecting another category.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog, index) => (
                  <tr key={blog.id}>
                    {/* Number */}
                    <td className="px-4 text-muted fw-semibold">
                      {index + 1}
                    </td>
                    {/* Blog */}
                    <td>
                      <div
                        className="d-flex align-items-center"
                        style={{
                          minWidth: "250px"
                        }}
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="rounded me-3"
                          style={{
                            width: "65px",
                            height: "50px",
                            objectFit: "cover"
                          }}
                        />
                        <div>
                          <h6 className="mb-1 fw-semibold">
                            {blog.title}
                          </h6>
                          <small className="text-muted">
                            {blog.tags?.slice(0, 2).map(
                              (tag, index) => (
                                <span key={index}>
                                  #{tag}{" "}
                                </span>
                              )
                            )}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span
                        className="badge bg-primary px-3 py-2"
                        style={{
                          borderRadius: "20px"
                        }}
                      >
                        {blog.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      <small className="text-muted">
                        <i className="bi bi-calendar3 me-1"></i>
                        {blog.createdAt
                          ? new Date(
                              blog.createdAt
                            ).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              }
                            )
                          : "Recently"
                        }
                      </small>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to={`/author/blog/${blog.id}`}
                          className="btn btn-info btn-sm"
                          title="View Blog"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View
                        </Link>

                        <Link
                          to={`/author/edit-blog/${blog.id}`}
                          className="btn btn-warning btn-sm"
                          title="Edit Blog"
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteBlog(blog.id)
                          }
                          title="Delete Blog"
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;