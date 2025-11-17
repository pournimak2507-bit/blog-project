import axios from "../api/axiosInstance";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, isFavInitial = false }) {
  const { user } = useContext(AuthContext);
  const [fav, setFav] = useState(isFavInitial);

  useEffect(() => {
    setFav(isFavInitial);
  }, [isFavInitial]);

  // BACKEND Base URL
  const BASE_URL =
    process.env.REACT_APP_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

  // Local fallback images
  const categoryImages = {
    Technology: "/images/Technology.jpg",
    Travel: "/images/Travel.jpg",
    Environment: "/images/Environment.jpg",
  };

  // Build final image safely
  const finalImage = blog?.image
    ? `${BASE_URL}/uploads/${encodeURIComponent(blog.image)}`
    : categoryImages[blog?.category] || "/images/default-blog.jpg";

  const toggleFav = async () => {
    if (!user) return alert("Please login");

    try {
      if (!fav) {
        await axios.post(
          "/favourites",
          { blogId: blog.id },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setFav(true);
      } else {
        await axios.delete(`/favourites/${blog.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFav(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating favourites");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition p-4 hover:-translate-y-1 relative">
      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={finalImage}
          alt={blog?.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              categoryImages[blog?.category] || "/images/default-blog.jpg";
          }}
        />
      </div>

      <button
        onClick={toggleFav}
        className="absolute top-4 right-4 text-3xl drop-shadow"
      >
        {fav ? "❤️" : "🤍"}
      </button>

      <h3 className="text-xl font-bold mt-3 dark:text-white">{blog?.title}</h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {blog?.category} — {blog?.authorFirst} {blog?.authorLast}
      </p>

      <p className="text-gray-500 dark:text-gray-400 text-sm">
        ❤️ {blog?.favouriteCount || 0}
      </p>

      <Link
        to={`/blog/${blog?.id}`}
        className="text-blue-600 dark:text-blue-300 mt-2 inline-block font-semibold"
      >
        Read More →
      </Link>
    </div>
  );
}
