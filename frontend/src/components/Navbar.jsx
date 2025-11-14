import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        {" "}
        BlogSpace
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/create" className="hover:text-blue-300">
              Create
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
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
    </nav>
  );
}

export default Navbar;
