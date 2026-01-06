import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api-helper";
// import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser(form.username, form.password);
      setSuccess("Account created. You can log in now.");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8]">
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-[#faf7f2] p-6 rounded-xl shadow-sm border border-[#e6dccf]"
      >
        <h1 className="text-[#3b2f2f] text-xl mb-4 text-center font-medium">
          Create account
        </h1>

        {error && (
          <p className="text-[#a14f3c] text-sm mb-3 text-center">{error}</p>
        )}

        {success && (
          <p className="text-[#5f7a61] text-sm mb-3 text-center">{success}</p>
        )}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded-md bg-[#f2ede4] text-[#3b2f2f] outline-none placeholder-[#7b6a58] focus:ring-1 focus:ring-[#c2b59b]"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded-md bg-[#f2ede4] text-[#3b2f2f] outline-none placeholder-[#7b6a58] focus:ring-1 focus:ring-[#c2b59b]"
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded-md bg-[#f2ede4] text-[#3b2f2f] outline-none placeholder-[#7b6a58] focus:ring-1 focus:ring-[#c2b59b]"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-[#3b2f2f] text-[#faf7f2] py-2 rounded-md hover:bg-[#2f2424] transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-xs text-center text-[#7b6a58] mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
