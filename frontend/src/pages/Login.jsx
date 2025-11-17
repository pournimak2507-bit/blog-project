import { useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Email & Password required");
    }

    try {
      const res = await axios.post("/auth/login", { email, password });
      login({ user: res.data.user, token: res.data.token });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-300"
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold">
            Login
          </button>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 dark:text-blue-400">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
