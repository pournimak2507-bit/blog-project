import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const CATEGORIES = ["Technology", "Travel", "Environment"];

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: CATEGORIES[0],
    image: null,
  });
  const [oldImage, setOldImage] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setForm({
          title: res.data.title,
          content: res.data.content,
          category: res.data.category,
          image: null,
        });
        setOldImage(res.data.image);
      } catch (err) {
        console.log(err);
      }
    };
    loadBlog();
  }, [id]);

  useEffect(() => {
    const handler = (e) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    data.append("category", form.category);
    if (form.image) data.append("image", form.image);
    try {
      await axios.put(`/blogs/${id}`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDirty(false);
      alert("Updated Successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      console.log(err);
      alert("Error updating blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
            setDirty(true);
          }}
          className="w-full border px-3 py-2 rounded"
          placeholder="Blog Title"
        />
        <textarea
          value={form.content}
          onChange={(e) => {
            setForm({ ...form, content: e.target.value });
            setDirty(true);
          }}
          className="w-full border px-3 py-2 rounded h-40"
        />
        <select
          value={form.category}
          onChange={(e) => {
            setForm({ ...form, category: e.target.value });
            setDirty(true);
          }}
          className="w-full border px-3 py-2 rounded"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="block">Old Image:</label>
        {oldImage && (
          <img
            src={`${
              process.env.REACT_APP_API_URL?.replace("/api", "") ||
              "http://localhost:5000"
            }/uploads/${oldImage}`}
            className="w-48 rounded"
            alt="Old Blog"
          />
        )}

        <input
          type="file"
          onChange={(e) => {
            setForm({ ...form, image: e.target.files[0] });
            setDirty(true);
          }}
          className="w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
}
