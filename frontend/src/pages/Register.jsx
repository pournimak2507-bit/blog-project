import { useState } from "react";
import axios from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = ["Technology", "Travel", "Environment"];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    category: "",
  });

  const [showPass, setShowPass] = useState(false);

  const strongPassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.email || !form.password) {
      return alert("First name, email & password required!");
    }

    if (!strongPassword(form.password)) {
      return alert(
        "Password must contain uppercase, lowercase, number & special char"
      );
    }

    try {
      await axios.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
          />

          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-300"
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <select
            name="role"
            className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
            value={form.role}
          >
            <option value="user">User</option>
            <option value="blogger">Blogger</option>
          </select>

          {form.role === "blogger" && (
            <select
              name="category"
              className="w-full border p-3 rounded dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold">
            Register
          </button>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
