import { ArrowRight, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-forest-900 px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          {/* Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
              <Leaf className="h-3.5 w-3.5" />
              Smarter farming starts here
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
              Make your next farming decision smarter.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-emerald-50/70">
              Analyze your soil, explore suitable crops, plan fertilizers and
              protect your plants with one connected farm intelligence
              workspace.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full border border-white/15 text-white hover:bg-white/10 sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full border border-white/15 text-white hover:bg-white/10 sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden shrink-0 lg:block">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10">
                <Sprout className="h-12 w-12 text-emerald-300" />
              </div>

              <div className="absolute -right-3 top-7 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-300" />
              </div>

              <div className="absolute -bottom-2 left-1 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm">
                <Leaf className="h-4.5 w-4.5 text-lime-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
