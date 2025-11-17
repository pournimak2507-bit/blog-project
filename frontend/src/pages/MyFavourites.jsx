import { useEffect, useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import BlogCard from "../components/BlogCard";

export default function MyFavourites() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const res = await axios.get("/favourites/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-10">Please login to view your favourites.</p>
    );

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        My Favourites
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((b) => <BlogCard key={b.id} blog={b} isFavInitial={true} />)
        ) : (
          <p className="text-center">No favourites yet.</p>
        )}
      </div>
    </div>
  );
}
