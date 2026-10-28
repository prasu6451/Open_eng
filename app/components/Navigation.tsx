"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Bell, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Lock page scroll while the full-screen menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close on Escape, and when the viewport grows to the desktop layout.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* The nav stays above the overlay so the logo and close button remain visible */}
      <nav className="relative z-20 flex w-full items-center justify-between border-b border-white/5 bg-gray/80 px-4 py-4 backdrop-blur-md sm:px-8 lg:px-16 xl:px-24">
        {/* Logo */}
        <Link
  href="/"
  onClick={closeMenu}
  aria-label="Open Engineering home"
  className="relative z-10 flex shrink-0 items-center"
>
  <Image
    src="/white-logo.png"
    alt="Open Engineering logo"
    width={64}
    height={64}
    priority
    className="h-12 w-auto object-contain sm:h-14 lg:h-16"
  />
</Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-mono text-gray-300 transition-colors hover:text-white lg:text-lg"
            >
              {link.name}
            </Link>
          ))}

          <button
            type="button"
            aria-label="Notifications"
            className="relative text-gray-300 transition-colors hover:text-white"
          >
            <Bell size={21} />

            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
  type="button"
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  aria-expanded={menuOpen}
  aria-controls="mobile-navigation"
  onClick={() => setMenuOpen((open) => !open)}
  className="group relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:hidden"
>
  <span aria-hidden="true" className="relative block h-6 w-6">
    {/* Top line */}
    <span
      className={`absolute left-0 block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
        menuOpen ? "top-[11px] rotate-45" : "top-[7px]"
      }`}
    />
    {/* Bottom line */}
    <span
      className={`absolute left-0 block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
        menuOpen ? "top-[11px] -rotate-45" : "top-[15px]"
      }`}
    />
  </span>
</button>
      </nav>

      {/* Mobile full-screen menu.
          Rendered outside <nav>: the nav's backdrop-blur would otherwise act as
          the containing block for `fixed` and trap the overlay inside the bar. */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-10 flex flex-col overflow-y-auto bg-black px-6 pb-10 pt-28 transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* Soft purple glow to match the site background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/15 blur-[100px]"
        />

        <ul className="relative divide-y divide-white/10 border-y border-white/10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between py-5 text-3xl font-semibold tracking-tight text-gray-200 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {link.name}
                <ArrowUpRight
                  aria-hidden="true"
                  size={24}
                  className="text-gray-600 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={closeMenu}
          className="relative mt-auto flex items-center gap-3 self-start rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-base text-gray-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <Bell size={20} />
          <span>Notifications</span>
          <span className="h-2 w-2 rounded-full bg-red-500" />
          
        </button>
      </div>
    </header>
  );
}
