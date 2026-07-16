function Login() {
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
        <form className="mt-10">
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
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
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div className="text-right mb-6">
            <a href="#" className="text-green-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
            Login
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span className="text-green-600 font-semibold cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
