import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;

    if (category !== "All") {
      result = result.filter(
        (blog) => blog.category === category
      );
    }

    if (author !== "All") {
      result = result.filter(
        (blog) => blog.author === author
      );
    }

    if (search !== "") {
      result = result.filter((blog) =>
        blog.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredBlogs(result);
  }, [blogs, category, author, search]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/blogs"
      );

      setBlogs(res.data);
      setFilteredBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this blog?"
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

  const categories = [
    ...new Set(blogs.map((blog) => blog.category))
  ];

  const authors = [
    ...new Set(blogs.map((blog) => blog.author))
  ];

  return (
<div className="container my-5">

  {/* Page Header */}
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 className="fw-bold mb-1"><i className="bi bi-journal-text me-2 text-primary"></i>
        Manage Blogs
      </h2>
      <p className="text-muted mb-0">
        View and manage all published blogs
      </p>
    </div>
    <span className="badge bg-primary rounded-pill px-3 py-2">
      {filteredBlogs.length} Blogs
    </span>
  </div>

<div className="container my-5">
  <div className="card border-0 shadow-sm p-4">
    <div className="row g-3 align-items-end">
      {/* Search */}
      <div className="col-lg-5">
        <label className="form-label fw-semibold">
          Search Articles
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by blog title..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setSearch("")}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="col-lg-3">
        <label className="form-label fw-semibold">
          Category
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <i className="bi bi-grid"></i>
          </span>
          <select
            className="form-select"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>
            {categories.map(
              (cat, index) => (
                <option
                  key={index}
                  value={cat}
                >
                  {cat}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Author */}
      <div className="col-lg-3">
        <label className="form-label fw-semibold">
          Author
        </label>

        <div className="input-group">

          <span className="input-group-text bg-white">
            <i className="bi bi-person"></i>
          </span>

          <select
            className="form-select"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
          >

            <option value="All">
              All Authors
            </option>

            {authors.map(
              (auth, index) => (

                <option
                  key={index}
                  value={auth}
                >
                  {auth}
                </option>

              )
            )}

          </select>
        </div>
      </div>

      {/* Reset */}
      <div className="col-lg-1">

        <button
          type="button"
          className="btn btn-outline-danger w-100"
          title="Clear filters"
          onClick={() => {
            setSearch("");
            setCategory("All");
            setAuthor("All");
          }}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  </div>
</div>


{/* ACTIVE FILTER */}

{(category !== "All" ||
  author !== "All" ||
  search !== "") && (

  <div className="container mb-4">
    <div className="d-flex flex-wrap align-items-center gap-2">
      <span className="text-muted fw-semibold">
        Active Filters:
      </span>

      {/* Search */}
      {search !== "" && (
        <span className="badge rounded-pill bg-dark px-3 py-2">
          <i className="bi bi-search me-1"></i>
          {search}
          <button
            type="button"
            className="btn btn-sm text-white p-0 ms-2"
            onClick={() => setSearch("")}
          >
            <i className="bi bi-x"></i>
          </button>
        </span>

      )}

      {/* Category */}
      {category !== "All" && (
        <span className="badge rounded-pill bg-primary px-3 py-2">
          <i className="bi bi-grid me-1"></i>
          {category}

          <button
            type="button"
            className="btn btn-sm text-white p-0 ms-2"
            onClick={() =>
              setCategory("All")
            }
          >
            <i className="bi bi-x"></i>
          </button>
        </span>
      )}

      {/* Author */}
      {author !== "All" && (
        <span className="badge rounded-pill bg-success px-3 py-2">
          <i className="bi bi-person me-1"></i>
          {author}
          <button
            type="button"
            className="btn btn-sm text-white p-0 ms-2"
            onClick={() =>
              setAuthor("All")
            }
          >
            <i className="bi bi-x"></i>
          </button>
        </span>
      )}
    </div>
  </div>
)}

  {/* Blogs Table */}
  <div
    className="card border-0 shadow-sm overflow-hidden"
    style={{ borderRadius: "18px" }}
  >
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th className="px-4 py-3">
              Blog
            </th>
            <th>
              Author
            </th>
            <th>
              Category
            </th>
            <th>
              Published
            </th>
            <th className="text-center">
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
                  className="bi bi-journal-x fs-1 text-muted"
                ></i>
                <h5 className="mt-3">
                  No blogs found
                </h5>
                <p className="text-muted mb-0">
                  Try changing your search or filters.
                </p>
              </td>
            </tr>
          ) : (
            filteredBlogs.map((blog) => (
              <tr key={blog.id}>
                {/* Blog */}
                <td className="px-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="rounded"
                      style={{
                        width: "65px",
                        height: "50px",
                        objectFit: "cover"
                      }}
                    />
                    <div className="ms-3">
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
                {/* Author */}
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "38px",
                        height: "38px"
                      }}
                    >
                      <i className="bi bi-person"></i>
                    </div>
                    <span className="ms-2">
                      {blog.author}
                    </span>
                  </div>
                </td>
                {/* Category */}
                <td>
                  <span className="badge bg-primary-subtle text-primary px-3 py-2">
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
                        ).toLocaleDateString()
                      : "N/A"}
                  </small>
                </td>

                {/* Actions */}
                <td className="text-center">
                  <Link
                    to={`/admin/blog/${blog.id}`}
                    className="btn btn-primary btn-sm me-2"
                    title="View Blog"
                  >
                    <i className="bi bi-eye me-1"></i>
                    View
                  </Link>
                  <button
                    className="btn btn-danger btn-sm mt-1"
                    onClick={() =>
                      deleteBlog(blog.id)
                    }
                    title="Delete Blog"
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
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

export default ManageBlogs;