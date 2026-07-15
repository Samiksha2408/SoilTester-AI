import { ShieldCheck, Brain, CloudSun, Leaf } from "lucide-react";

function WhyChoose() {
  const benefits = [
    {
      icon: <Brain size={40} className="text-green-600" />,
      title: "AI Powered",
      description: "Advanced AI analyzes crops and soil with high accuracy.",
    },
    {
      icon: <CloudSun size={40} className="text-green-600" />,
      title: "Real-Time Weather",
      description:
        "Stay updated with live weather forecasts for smarter decisions.",
    },
    {
      icon: <Leaf size={40} className="text-green-600" />,
      title: "Better Crop Health",
      description:
        "Improve productivity with personalized farming suggestions.",
    },
    {
      icon: <ShieldCheck size={40} className="text-green-600" />,
      title: "Reliable Results",
      description:
        "Fast, accurate, and trusted recommendations for every farmer.",
    },
  ];

  return (
    <section className="py-24 bg-green-50">
      <h2 className="text-5xl font-bold text-center mb-4">
        Why Choose SmartAgriAI?
      </h2>

      <p className="text-center text-gray-600 mb-16">
        Helping farmers make smarter decisions with AI technology.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-5">{item.icon}</div>

            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>

            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;
