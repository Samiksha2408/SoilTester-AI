function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className={`text-3xl font-bold mt-3 ${color}`}>{value}</p>
    </div>
  );
}

export default StatsCard;
