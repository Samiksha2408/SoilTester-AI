import { Upload, ScanSearch, BrainCircuit, Sprout } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Upload size={40} className="text-green-600" />,
      title: "Upload",
      description: "Upload a crop image or soil details.",
    },
    {
      icon: <ScanSearch size={40} className="text-green-600" />,
      title: "Analyze",
      description: "Our AI analyzes the uploaded data.",
    },
    {
      icon: <BrainCircuit size={40} className="text-green-600" />,
      title: "Get AI Advice",
      description: "Receive smart recommendations instantly.",
    },
    {
      icon: <Sprout size={40} className="text-green-600" />,
      title: "Improve Yield",
      description: "Apply suggestions for healthier crops.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <h2 className="text-5xl font-bold text-center mb-4">How It Works</h2>

      <p className="text-center text-gray-600 mb-16">
        Four simple steps to smarter farming.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-5">{step.icon}</div>

            <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>

            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
