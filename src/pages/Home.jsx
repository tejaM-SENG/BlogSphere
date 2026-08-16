import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

function Home() {

  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  // Fetch Blogs
  useEffect(() => {
    const fetchData = async () => {
      try {

        const blogsRes = await axios.get(
          "http://localhost:3000/blogs"
        );

        const commentsRes = await axios.get(
          "http://localhost:3000/comments"
        );

        setBlogs(blogsRes.data);
        setComments(commentsRes.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Latest Blogs
  const latestBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 6);

  // Popular Categories
  const categories = [
    ...new Set(
      blogs.map(blog => blog.category)
    )
  ];

  // Trending Blogs
  // Based on number of comments
  const trendingBlogs = blogs
    .map(blog => {
      const count = comments.filter(
        comment =>
          String(comment.blogId) ===
          String(blog.id)
      ).length;
      return {
        ...blog,
        commentCount: count
      };
    })
    .sort(
      (a, b) =>
        b.commentCount -
        a.commentCount
    )
    .slice(0, 5);

  return (
    <>

      {/* HERO SECTION */}
      <section className="bg-dark text-white">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-7 py-5">
              <h1 className="display-3 fw-bold">
                BLOG
                <span className="text-danger">
                  Sphere
                </span>
              </h1>
              <p className="lead mt-3">
                Learn • Build • Share • Grow
              </p>
              <p className="text-light">
                Discover tutorials, programming
                guides, technology articles and
                development tips from our community.
              </p>
              <Link
                to="/BlogPage"
                className="btn btn-primary btn-lg mt-3"
              >
                Explore Articles
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-md-5 text-center">
              <i
                className="bi bi-journal-code"
                style={{
                  fontSize: "180px"
                }}
              ></i>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-2">
          Popular Categories
        </h2>
        <p className="text-center text-muted mb-4">
          Explore articles by topic
        </p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          {categories.map(
            (category, index) => (
              <Link
                key={index}
                to={`/BlogPage?category=${encodeURIComponent(category)}`}
                className="btn btn-outline-primary rounded-pill px-4"
              >
                <i className="bi bi-hash"></i>
                {category}
              </Link>
            )
          )}
        </div>
      </section>

      {/* LATEST BLOGS */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">
                Latest Blogs
              </h2>
              <p className="text-muted mb-0">
                Fresh articles from our authors
              </p>
            </div>
            <Link
              to="/BlogPage"
              className="btn btn-outline-primary"
            >
              View All
            </Link>
          </div>
          <div className="row">
            {latestBlogs.map(blog => (
              <div
                className="col-md-4 mb-4"
                key={blog.id}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING ARTICLES */}
      <section className="container py-5">
        <h2 className="fw-bold mb-2">
          Trending Articles
        </h2>
        <p className="text-muted mb-4">
          Most discussed articles in our community
        </p>
        <div className="list-group">
          {trendingBlogs.map(
            (blog, index) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="list-group-item list-group-item-action py-3"
              >
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span
                      className="fs-4 fw-bold text-primary"
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="col">
                    <h5 className="mb-1">
                      {blog.title}
                    </h5>
                    <small className="text-muted">
                      {blog.category}
                      {" • "}
                      {blog.author}
                    </small>
                  </div>
                  <div className="col-auto">
                    <span className="text-muted">
                      <i className="bi bi-chat me-1"></i>
                      {blog.commentCount}
                    </span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </section>
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-3">
            Learn. Share. Inspire.
          </h2>
          <p>
            Whether you're learning React, Java, Python, or
            JavaScript, you'll find articles and tutorials to help
            you improve your skills.
          </p>
          <p className="lead">
            BlogSphere is a place where developers and technology
            enthusiasts can share their knowledge, discover useful
            tutorials, and learn from other writers.
          </p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold">
            Ready to Share Your Knowledge?
          </h2>
          <p className="lead">
            Join BlogSphere and start publishing
            your own articles.
          </p>
          <Link
            to="/Register"
            className="btn btn-light btn-lg"
          >
            Become an Author
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;


