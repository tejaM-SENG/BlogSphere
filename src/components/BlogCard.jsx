import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const getTimeAgo = (date) => {
  const now = new Date();
  const created = new Date(date);
  const difference = now - created;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return "Just now";
  }
  if (minutes < 60) {
    return `${minutes} min ago`;
  }
  if (hours < 24) {
    return `${hours} hr ago`;
  }
  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (weeks < 4) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  return `${months} month${months > 1 ? "s" : ""} ago`;
};

const [commentCount, setCommentCount] = useState(0);

useEffect(() => {
  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:3000/comments?blogId=${blog.id}`
    );
    setCommentCount(res.data.length);
  };

  fetchComments();
}, [blog.id]);

  return (
    <div
      className="card hblog h-100 border-0 shadow-sm overflow-hidden"
      style={{
        borderRadius: "15px",
        transition: "all 0.3s ease",
      }}
    >

      {/* Blog Image */}
      <div
        className="position-relative"
        style={{ height: "230px" }}
      >

        <img
          src={blog.image}
          className="w-100 h-100"
          alt={blog.title}
          style={{
            objectFit: "cover"
          }}
        />

        {/* Category Badge */}
        <span
          className="position-absolute top-0 start-0 m-3 badge bg-primary px-3 py-2"
          style={{
            borderRadius: "20px"
          }}
        >
          {blog.category}
        </span>
      </div>


      {/* Card Body */}
      <div className="card-body d-flex flex-column p-4">

        {/* Title */}
        <h4
          className="card-title fw-bold mb-3"
          style={{
            lineHeight: "1.4"
          }}
        >
          {blog.title}
        </h4>


        {/* Author / Time / Comments */}
        <div
          className="d-flex align-items-center text-muted small mb-3"
        >
          <span className="me-3">
            <i className="bi bi-person-circle me-1"></i>
            {blog.author}
          </span>

          <span className="me-3">
            <i className="bi bi-clock me-1"></i>
            {getTimeAgo(blog.createdAt)}
          </span>

          <span>
            <i className="bi bi-chat-left-text me-1"></i>
            {commentCount}
          </span>
        </div>

        {/* Tags */}
        <div className="mb-3">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="badge bg-light text-secondary border me-1 mb-1 px-2 py-2"
              style={{
                borderRadius: "15px",
                fontWeight: "500"
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="card-text text-secondary mb-4"
          style={{
            lineHeight: "1.6",
            minHeight: "76px"
          }}
        >
          {blog.description?.length > 120
            ? blog.description.substring(0, 120) + "..."
            : blog.description
          }
        </p>

        {/* Read More */}
        <Link
          to={`/blog/${blog.id}`}
          className="btn btn-primary mt-auto w-100"
          style={{
            borderRadius: "8px"
          }}
        >
          Read More
          <i className="bi bi-arrow-right ms-2"></i>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;