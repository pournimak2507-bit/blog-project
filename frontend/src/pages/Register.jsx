import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "blogger",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error during registration");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            className="w-full border p-2 mb-2 rounded"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="w-full border p-2 mb-2 rounded"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="w-full border p-2 mb-2 rounded"
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="w-full border p-2 mb-2 rounded"
            onChange={handleChange}
          />
          <input
            name="category"
            placeholder="Category"
            className="w-full border p-2 mb-4 rounded"
            onChange={handleChange}
          />
          <button className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
