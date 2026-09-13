import { ArrowUpRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why SmartAgriAI", href: "#about" },
];

const accountLinks = [
  { label: "Sign In", href: "/login" },
  { label: "Get Started", href: "/register" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 px-4 pb-6 pt-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Main footer */}
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div>
              <Logo />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-stone-500">
              AI-powered farm intelligence that helps turn soil and farm data
              into clearer, smarter farming decisions.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-medium text-forest-700">
              <Leaf className="h-3.5 w-3.5" />
              Smarter farming, one decision at a time.
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
              Explore
            </p>

            <div className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-stone-600 transition hover:text-forest-800"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
              Account
            </p>

            <div className="mt-4 space-y-3">
              {accountLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="group flex items-center gap-1 text-sm text-stone-600 transition hover:text-forest-800"
                >
                  {link.label}

                  {link.label === "Get Started" && (
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-stone-200 pt-5 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SmartAgriAI. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>Built for smarter agriculture</span>

            <span className="h-1 w-1 rounded-full bg-stone-300" />

            <Link to="/" className="transition hover:text-forest-700">
              Back to top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
