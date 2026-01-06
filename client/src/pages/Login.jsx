import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api-helper";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);

      console.log("Login response:", res.token);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res.name);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
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
          Login
        </h1>

        {error && (
          <p className="text-[#a14f3c] text-sm mb-3 text-center">{error}</p>
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
          className="w-full mb-4 p-2 rounded-md bg-[#f2ede4] text-[#3b2f2f] outline-none placeholder-[#7b6a58] focus:ring-1 focus:ring-[#c2b59b]"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-[#3b2f2f] text-[#faf7f2] py-2 rounded-md hover:bg-[#2f2424] transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-center text-[#7b6a58] mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
