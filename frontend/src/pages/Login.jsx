import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700">SmartAgriAI</h1>

          <p className="text-gray-500 mt-3">Welcome Back 👋</p>

          <p className="text-gray-400 text-sm mt-2">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Email:", email);
            console.log("Password:", password);
            navigate("/dashboard");
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div className="text-right mb-6">
            <a href="#" className="text-green-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            onClick={() => {
              console.log("Email:", email);
              console.log("Password:", password);
              navigate("/dashboard");
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
