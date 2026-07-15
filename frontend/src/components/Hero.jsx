function Hero() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold mb-8">
          🌱 AI Powered Farming Platform
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          AI Powered Smart
          <br />
          <span className="text-green-600">Agriculture Advisor</span>
        </h1>

        {/* Description */}
        <p className="mt-8 text-xl text-gray-600 leading-9 max-w-3xl mx-auto">
          Helping farmers make smarter decisions using AI-powered soil analysis,
          crop disease detection, weather insights, and personalized fertilizer
          recommendations.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-gray-700 font-medium">
          <span>🌱 Soil Analysis</span>
          <span>📷 Disease Detection</span>
          <span>🌦 Weather Insights</span>
          <span>🤖 AI Recommendations</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl">
            Get Started
          </button>

          <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
