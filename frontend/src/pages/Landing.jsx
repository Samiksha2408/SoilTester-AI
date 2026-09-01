import CTA from "../components/landing/CTA"
import Features from "../components/landing/Features"
import Footer from "../components/landing/Footer"
import Hero from "../components/landing/Hero"
import HowItWorks from "../components/landing/HowItWorks"
import Navbar from "../components/landing/Navbar"
import Stats from "../components/landing/Stats"
import Testimonials from "../components/landing/Testimonials"
import WhyChoose from "../components/landing/WhyChoose"

export default function Landing() {
  return (
    <div className="min-h-svh bg-cream">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
