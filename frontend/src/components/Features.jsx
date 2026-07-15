import FeatureCard from "./FeatureCard";
import { Sprout, Camera, CloudSun, Wheat } from "lucide-react";

function Features() {
  return (
    <section className="px-12 py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-14">Smart Features</h2>

      <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
        <FeatureCard
          icon={<Sprout size={42} className="text-green-600" />}
          title="Soil Analysis"
          description="Analyze soil health and receive AI-powered recommendations."
        />
        <FeatureCard
          icon={<Camera size={42} className="text-green-600" />}
          title="Disease Detection"
          description="Upload crop images and detect diseases instantly."
        />

        <FeatureCard
          icon={<CloudSun size={42} className="text-green-600" />}
          title="Weather Insights"
          description="Get accurate weather forecasts for better farming decisions."
        />

        <FeatureCard
          icon={<Wheat size={42} className="text-green-600" />}
          title="Fertilizer Recommendation"
          description="Receive personalized fertilizer suggestions based on soil data."
        />
      </div>
    </section>
  );
}

export default Features;
