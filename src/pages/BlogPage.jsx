import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useSearchParams } from "react-router-dom";

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [author, setAuthor] = useState("All");

  // Fetch Blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/blogs"
      );

      // Latest blogs first
      const sortedBlogs = [...res.data].sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setBlogs(sortedBlogs);
      setFilteredBlogs(sortedBlogs);
    } catch (error) {
      console.log(error);
    }

  };

  // Read Category From URL
  useEffect(() => {
    const categoryFromURL =
      searchParams.get("category");
    if (categoryFromURL) {
      setCategory(categoryFromURL);
    } else {
      setCategory("All");
    }

  }, [searchParams]);

  // Filtering
  useEffect(() => {
    let result = [...blogs];

    // Category
    if (category !== "All") {
      result = result.filter(
        blog =>
          blog.category === category
      );
    }

    // Author
    if (author !== "All") {
      result = result.filter(
        blog =>
          blog.author === author
      );
    }

    // Search
    if (search.trim() !== "") {
      result = result.filter(
        blog =>
          blog.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    setFilteredBlogs(result);

  }, [
    blogs,
    category,
    author,
    search
  ]);

  // Dynamic Categories
  const categories = [
    ...new Set(
      blogs.map(
        blog => blog.category
      )
    )
  ];

  // Dynamic Authors
  const authors = [
    ...new Set(
      blogs.map(
        blog => blog.author
      )
    )
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1>
            Explore Blogs
          </h1>
          <p>
            Discover articles,
            tutorials and technology blogs.
          </p>
        </div>
      </section>
      
      {/* Search & Filters */}


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

      {/* Blogs */}
      <div className="container mb-5">
        <h2 className="mb-4">
          Latest Blogs
        </h2>
        <div className="row">
          {filteredBlogs.length === 0 ? (
            <div className="col-12 text-center">
              <h5>
                No blogs found.
              </h5>
            </div>
          ) : (
            filteredBlogs.map(
              blog => (
                <div
                  className="col-md-4 mb-4"
                  key={blog.id}
                >
                  <BlogCard
                    blog={blog}
                  />
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;