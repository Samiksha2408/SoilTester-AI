function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-4 border-b border-gray-200">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-green-700"> SmartAgriAI</h1>

      {/* Navigation */}
      <div className="flex items-center gap-10 text-gray-700 font-medium">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-8">
        <button className="text-gray-700">Login</button>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
