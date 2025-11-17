import { useEffect, useState, useContext } from "react";
import axios from "../api/axiosInstance";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);
  const [favIds, setFavIds] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const q = params.get("q");

    const load = async () => {
      try {
        const res = await axios.get("/blogs", {
          params: category ? { category } : q ? { q } : {},
        });
        setBlogs(res.data);
      } catch (err) {
        console.log("Error loading blogs:", err);
      }
    };
    load();
  }, [location.search]);

  useEffect(() => {
    if (!user) {
      setFavIds([]);
      return;
    }
    const loadFavs = async () => {
      try {
        const res = await axios.get("/favourites/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setFavIds(res.data.map((b) => b.id));
      } catch (err) {
        console.log(err);
      }
    };
    loadFavs();
  }, [user]);

  return (
    <>
      {/* ===========================
          🚀 Professional Banner 
      ============================ */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-12 rounded-xl overflow-hidden shadow-xl">
        <img
          src="/images/main-banner-blog.jpg"
          alt="Main Banner"
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Banner Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold drop-shadow-lg">
            Welcome to BlogSpace
          </h1>
          <p className="mt-3 text-lg sm:text-xl opacity-90">
            Discover amazing blogs, explore categories & share your story ✨
          </p>
        </div>
      </div>

      {/* ===========================
          Blog Cards Section
      ============================ */}
      <div className="px-6 pb-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Explore Latest Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                isFavInitial={favIds.includes(blog.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No blogs available yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
