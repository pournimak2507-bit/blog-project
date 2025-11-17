import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Sun, Moon } from "lucide-react";

const CATEGORIES = ["Technology", "Travel", "Environment"];

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setQ("");
  };

  return (
    <nav className="bg-gray-900 dark:bg-black text-white px-6 py-4 shadow-md">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-400">
          BlogSpace
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to={`/?category=${c}`}
              className="hover:text-blue-300"
            >
              {c}
            </Link>
          ))}

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="px-2 py-1 rounded text-black"
            />
            <button className="bg-blue-600 px-3 py-1 rounded">Go</button>
          </form>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-xl"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>

          {user ? (
            <>
              <Link to="/create-blog">Create</Link>
              <Link to="/my-favourites">Favourites</Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-lg">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to={`/?category=${c}`}
              className="hover:text-blue-300"
            >
              {c}
            </Link>
          ))}

          {user ? (
            <>
              <Link to="/create-blog">Create</Link>
              <Link to="/my-favourites">Favourites</Link>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
