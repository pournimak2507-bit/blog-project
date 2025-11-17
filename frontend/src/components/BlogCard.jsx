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

  // Default category images
  const categoryImages = {
    Technology: "/images/Technology.jpg",
    Travel: "/images/Travel.jpg",
    Environment: "/images/Environment.jpg",
  };

  // Backend Base URL
  const BASE_URL = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL.replace("/api", "")
    : "http://localhost:5000";

  // Final Image (Main logic)
  const finalImage = blog.image
    ? `${BASE_URL}/uploads/${blog.image}`
    : categoryImages[blog.category] || "/images/default-blog.jpg";

  const toggleFav = async () => {
    if (!user) return alert("Please login");

    try {
      if (!fav) {
        await axios.post(
          "/favourites",
          { blogId: blog.id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setFav(true);
      } else {
        await axios.delete(`/favourites/${blog.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFav(false);
      }
    } catch (err) {
      console.log(err);
      alert("Error updating favourites");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition hover:shadow-xl hover:-translate-y-1 relative">
      {/* IMAGE */}
      <div className="w-full aspect-[4/3] rounded overflow-hidden">
        <img
          src={finalImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* FAV BUTTON */}
      <button onClick={toggleFav} className="absolute top-4 right-4 text-2xl">
        {fav ? "❤️" : "🤍"}
      </button>

      {/* Blog Details */}
      <h3 className="text-xl font-bold mt-2 dark:text-white">{blog.title}</h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {blog.category} — {blog.authorFirst} {blog.authorLast}
      </p>

      <p className="text-gray-500 dark:text-gray-400 text-sm">
        ❤️ {blog.favouriteCount || 0}
      </p>

      <Link
        to={`/blog/${blog.id}`}
        className="text-blue-600 dark:text-blue-300 mt-2 inline-block"
      >
        Read More →
      </Link>
    </div>
  );
}
