import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CommentCard from "../components/CommentCard";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Get logged-in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  // Fetch Blog
  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/blogs/${id}`
      );

      setBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/comments?blogId=${id}`
      );

      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Comment
  const handleComment = async (e) => {
    e.preventDefault();

    // Check login
    if (!user) {
      alert("Please login to add a comment.");
      return;
    }

    // Check empty comment
    if (text.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/comments",
        {
          blogId: id,
          user: user.name,
          userId: user.id,
          comment: text
        }
      );

      // Clear textarea
      setText("");

      // Refresh comments
      fetchComments();

      alert("Comment added successfully.");

    } catch (error) {
      console.log(error);
      alert("Failed to add comment.");
    }
  };

  // Loading
  if (!blog.id) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
      <div className="container my-5">

        {/* ================= BLOG HEADER ================= */}
        <div className="mb-4">

          {/* Category */}
          <div className="mb-3">
            <span
              className="badge bg-primary px-3 py-2"
              style={{ borderRadius: "20px" }}
            >
              <i className="bi bi-grid me-1"></i>
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="fw-bold display-5 mb-3"
            style={{ lineHeight: "1.2" }}
          >
            {blog.title}
          </h1>

          {/* Author / Date / Reading Time */}
          <div className="d-flex flex-wrap align-items-center gap-3 text-muted mb-4">

            {/* Author */}
            <span>
              <i className="bi bi-person-circle me-1"></i>
              <strong className="text-dark">
                {blog.author}
              </strong>
            </span>

            <span>
              •
            </span>

            {/* Date */}
            <span>
              <i className="bi bi-calendar3 me-1"></i>
              {blog.createdAt
                ? new Date(
                    blog.createdAt
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                : "Recently"
              }
            </span>

            <span>
              •
            </span>

            {/* Comments */}
            <span>
              <i className="bi bi-chat-left-text me-1"></i>
              {comments.length} Comments
            </span>
          </div>
        </div>

        {/* ================= BLOG IMAGE ================= */}
        <div
          className="mb-5 overflow-hidden"
          style={{
            borderRadius: "18px"
          }}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="img-fluid w-100"
            style={{
              height: "500px",
              objectFit: "cover"
            }}
          />
        </div>

        {/* ================= ARTICLE CONTENT ================= */}
        <div className="row">

          {/* Main Article */}
          <div className="col-lg-8">
            <article>
              <p
                className="fs-5 text-secondary" 
                style={{
                  lineHeight: "1.9",
                  textAlign: "justify"
                }}
              >
                {blog.description}
              </p>
            </article>

            {/* ================= TAGS ================= */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-5 mb-5">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-tags me-2"></i>
                  Tags
                </h5>

                <div className="d-flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark border px-3 py-2"
                      style={{
                        borderRadius: "20px",
                        fontSize: "14px"
                      }}
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm sticky-top"
              style={{
                top: "20px",
                borderRadius: "15px"
              }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  About this Article
                </h5>
                <div className="mb-3">
                  <small className="text-muted">
                    Category
                  </small>
                  <div className="fw-semibold">
                    {blog.category}
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">
                    Author
                  </small>
                  <div className="fw-semibold">
                    <i className="bi bi-person-circle me-1"></i>
                    {blog.author}
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">
                    Published
                  </small>
                  <div className="fw-semibold">
                    {blog.createdAt
                      ? new Date(
                          blog.createdAt
                        ).toLocaleDateString()
                      : "Recently"
                    }
                  </div>
                </div>

                <div>
                  <small className="text-muted">
                    Comments
                  </small>
                  <div className="fw-semibold">
                    <i className="bi bi-chat-left-text me-1"></i>
                    {comments.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {/* ================= COMMENTS ================= */}
        <div className="row">
          <div className="col-lg-12">
            <h3 className="fw-bold mb-4">
              <i className="bi bi-chat-left-text me-2"></i>
              Comments ({comments.length})
            </h3>

            {/* No Comments */}
            {comments.length === 0 ? (
              <div
                className="text-center py-5 bg-light rounded"
              >
                <i
                  className="bi bi-chat-square-text fs-1 text-muted"
                ></i>
                <h5 className="mt-3">
                  No comments yet
                </h5>
                <p className="text-muted mb-0">
                  Be the first person to share your thoughts.
                </p>
              </div>
            ) : (
              <div>
                {comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                  />
                ))}
              </div>
            )}

            {/* ================= ADD COMMENT ================= */}
            <div
              className="card border-0 shadow-sm mt-5"
              style={{
                borderRadius: "15px"
              }}
            >
              <div className="card-body p-4">
                <h4 className="fw-bold mb-2">
                  Leave a Comment
                </h4>
                <p className="text-muted mb-4">
                  Share your thoughts about this article.
                </p>

                {!user ? (
                  <div
                    className="alert alert-light border d-flex align-items-center"
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    Please login to add a comment.
                    <Link
                      to="/login"
                      className="ms-2 fw-semibold"
                    >
                      Login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleComment}>
                    <textarea
                      className="form-control mb-3"
                      rows="5"
                      placeholder="Write your comment here..."
                      value={text}
                      onChange={(e) =>
                        setText(e.target.value)
                      }
                      style={{
                        borderRadius: "10px",
                        resize: "vertical"
                      }}
                    ></textarea>

                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-primary px-4"
                        style={{
                          borderRadius: "8px"
                        }}
                      >
                        <i className="bi bi-send me-2"></i>
                        Post Comment
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default BlogDetails;