import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { strings } from "../../i18n/strings";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

const links = [
  { href: "#home", label: strings.nav.home },
  { href: "#features", label: strings.nav.features },
  { href: "#how-it-works", label: strings.nav.how },
  { href: "#about", label: strings.nav.about },
  { href: "#contact", label: strings.nav.contact },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-600 transition hover:text-forest-800"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/dashboard">
            <Button variant="ghost">{strings.nav.login}</Button>
          </Link>
          <Link to="/register">
            <Button>{strings.nav.getStarted}</Button>
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-stone-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-stone-700 hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="secondary" className="w-full">
                {strings.nav.login}
              </Button>
            </Link>
            <Link to="/register" onClick={() => setOpen(false)}>
              <Button className="w-full">{strings.nav.getStarted}</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
