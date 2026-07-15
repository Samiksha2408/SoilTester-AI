import { Star } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "Ramesh Patil",
      location: "Maharashtra",
      review:
        "SmartAgriAI helped me identify crop diseases early and improved my harvest.",
    },
    {
      name: "Priya Sharma",
      location: "Punjab",
      review:
        "The weather insights and fertilizer suggestions are incredibly useful.",
    },
    {
      name: "Amit Verma",
      location: "Uttar Pradesh",
      review: "A simple and powerful tool that every farmer should use.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <h2 className="text-5xl font-bold text-center mb-4">What Farmers Say</h2>

      <p className="text-center text-gray-600 mb-16">
        Trusted by farmers across India.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl shadow-md p-8 hover:shadow-xl transition"
          >
            <div className="flex text-yellow-500 mb-4">
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
            </div>

            <p className="text-gray-600 italic mb-6">"{item.review}"</p>

            <h3 className="text-xl font-semibold">{item.name}</h3>

            <p className="text-gray-500">{item.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
