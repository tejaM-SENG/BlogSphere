import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageAuthors() {
  const [authors, setAuthors] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get(
        "http://localhost:3000/users"
      );
      const blogsRes = await axios.get(
        "http://localhost:3000/blogs"
      );
      const authorUsers = usersRes.data.filter(
        (user) => user.role === "author"
      );
      setAuthors(authorUsers);
      setBlogs(blogsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAuthor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this author?"
    );

    if (!confirmDelete) return;
    try {
      await axios.delete(
        `http://localhost:3000/users/${id}`
      );

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogCount = (authorId) => {
    return blogs.filter(
      (blog) => blog.authorId === authorId
    ).length;
  };

  return (
<div className="container my-5">

  {/* Page Header */}
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 className="fw-bold mb-1">
        <i className="bi bi-person-fill me-2 text-primary"></i>Manage Authors
      </h2>
      <p className="text-muted mb-0">
        View and manage all registered authors
      </p>
    </div>
    <span className="badge bg-primary rounded-pill px-3 py-2">
      {authors.length} Authors
    </span>
  </div>

  {/* Authors Table */}
  <div
    className="card border-0 shadow-sm overflow-hidden"
    style={{ borderRadius: "18px" }}
  >
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th className="px-4 py-3">
              Author
            </th>
            <th>
              Email
            </th>
            <th className="text-center">
              Published Blogs
            </th>
            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {authors.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-5"
              >
                <i
                  className="bi bi-people fs-1 text-muted"
                ></i>
                <h5 className="mt-3">
                  No authors found
                </h5>
                <p className="text-muted mb-0">
                  There are currently no registered authors.
                </p>
              </td>
            </tr>
          ) : (
            authors.map((author) => (
              <tr key={author.id}>
                {/* Author */}
                <td className="px-4">
                  <div className="d-flex align-items-center">
                    {/* Avatar */}
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        fontSize: "18px"
                      }}
                    >
                      {author.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    {/* Name */}
                    <div className="ms-3">
                      <h6 className="mb-1 fw-semibold">
                        {author.name}
                      </h6>
                      <small className="text-muted">
                        Author
                      </small>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td>
                  <span className="text-muted">
                    <i className="bi bi-envelope me-2"></i>
                    {author.email}
                  </span>
                </td>

                {/* Blog Count */}
                <td className="text-center">
                  <span className="badge bg-primary-subtle text-primary px-3 py-2">
                    <i className="bi bi-journal-text me-1"></i>
                    {getBlogCount(author.id)}
                    {" "}
                    {getBlogCount(author.id) === 1
                      ? "Blog"
                      : "Blogs"}
                  </span>
                </td>

                {/* Actions */}
                <td className="text-center">
                  <Link
                    to={`/admin/authors/${author.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    <i className="bi bi-eye me-1"></i>
                    View
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteAuthor(author.id)
                    }
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

export default ManageAuthors;