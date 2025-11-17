import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL.replace("/api", "")
    : "http://localhost:5000";

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Blog deleted!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error deleting blog");
    }
  };

  const isAuthor = user && user.id === blog.authorId;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      {blog.image && (
        <div className="w-full aspect-[16/9] overflow-hidden rounded">
          <img
            src={`${BASE_URL}/uploads/${blog.image}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
      <p className="text-gray-600 mt-2">
        {blog.category} — {blog.authorFirst} {blog.authorLast}
      </p>

      <p className="mt-4 text-lg">{blog.content}</p>

      <p className="mt-4">
        ❤️ {blog.favouriteCount || 0} people favourited this
      </p>

      {isAuthor && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(`/edit-blog/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
