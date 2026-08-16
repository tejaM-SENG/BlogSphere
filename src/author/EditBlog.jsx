import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
    tags: ""
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/blogs/${id}`
      );

      // Prevent editing other author's blog
      if (res.data.authorId !== user.id) {
        alert("Unauthorized access.");
        navigate("/author/blogs");
        return;
      }
      setBlog({
        ...res.data,
        tags: res.data.tags
          ? res.data.tags.join(", ")
          : ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/blogs/${id}`,
        {
          ...blog,
          author: user.name,
          authorId: user.id,  tags: blog.tags
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag !== "")
        }
      );

      alert("Blog updated successfully.");

      navigate("/author/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Edit Blog
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
                    <option value="React">React</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
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
                  </div>)}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Update Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;