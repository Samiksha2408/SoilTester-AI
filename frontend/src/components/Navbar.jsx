import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-4 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-green-700">SmartAgriAI</h1>

      <div className="flex items-center gap-10 text-gray-700 font-medium">
        <Link to="/">Home</Link>
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className="flex items-center gap-8">
        <Link to="/login" className="text-gray-700 hover:text-green-700">
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
