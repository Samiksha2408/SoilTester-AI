function Topbar() {
  return (
    <div className="bg-white shadow px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>

        <p className="text-gray-500 mt-1">
          Monitor your soil health, crop recommendations and reports.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full"
        />

        <div>
          <h3 className="font-semibold">Farmer</h3>

          <p className="text-gray-500 text-sm">Welcome Back</p>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
