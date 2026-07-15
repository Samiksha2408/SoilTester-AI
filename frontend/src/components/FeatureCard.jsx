function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
