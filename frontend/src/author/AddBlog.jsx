import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
    tags: "",
  });

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !blog.title ||
      !blog.category ||
      !blog.image ||
      !blog.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!user) {
      alert("Please login first.");
      navigate("/Login");
      return;
    }

    try {
      const tagsArray = blog.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "");

      await axios.post(
        "https://blogspheredb.onrender.com/api/blogs/",
        {
          title: blog.title,
          category: blog.category,
          image: blog.image,
          description: blog.description,
          tags: tagsArray,
          author: Number(user.id),
          created_at: new Date().toISOString()
        }
      );

      alert("Blog added successfully.");

      navigate("/author/blogs");

    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log("Server response:", error.response.data);
      }

      alert("Failed to add blog.");
    }
  };

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Add New Blog
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={blog.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Category
                  </label>

                  <select
                    name="category"
                    className="form-select"
                    value={blog.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="React">React</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="Web Development">Web Development</option>
                    <option value="CSS">CSS</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="AI & Machine Learning">
                      AI & Machine Learning
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    value={blog.image}
                    onChange={handleChange}
                  />
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label className="form-label">
                    Tags
                  </label>

                  <input
                    type="text"
                    name="tags"
                    className="form-control"
                    placeholder="React, JavaScript, Hooks, Frontend"
                    value={blog.tags}
                    onChange={handleChange}
                  />

                  <small className="text-muted">
                    Enter tags separated by commas.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    rows="6"
                    name="description"
                    className="form-control"
                    value={blog.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Preview Tags */}
                {blog.tags && (
                  <div className="mb-3">
                    <label className="form-label">
                      Tags Preview
                    </label>

                    <div>
                      {blog.tags
                        .split(",")
                        .map(tag => tag.trim())
                        .filter(tag => tag !== "")
                        .map((tag, index) => (
                          <span
                            key={index}
                            className="badge bg-light text-dark border me-2 mb-2"
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Add Blog
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
