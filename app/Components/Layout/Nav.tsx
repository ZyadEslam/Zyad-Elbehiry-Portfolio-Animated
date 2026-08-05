"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/src/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navLinks = ["About", "Projects", "Services", "Contact"];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMenuVisible = menuOpen && !scrolled;

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: `${id}`,
      ease: "power2.inOut",
      offsetY: -80,
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
      if (!isMenuVisible) {
        setMenuOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top pill — visible while inside the hero */}
      <div
        className={`fixed inset-x-0 top-4 z-50 mx-auto flex max-w-[80%] text-text-primary items-center justify-between rounded-full bg-white px-6 py-2 font-orbitron shadow-lg transition-opacity duration-500 md:px-12 ${
          scrolled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span
          dir="rtl"
          className="font-aref-ruqaa text-sm uppercase tracking-widest"
        >
          زياد البحيري
        </span>

        <nav className="hidden gap-8 text-sm cursor-pointer uppercase tracking-widest md:flex">
          {navLinks.map((link) => (
            <p
              key={link}
              onClick={() => {
                scrollToSection(`#${link.toLowerCase()}`);
              }}
              className="transition-opacity hover:opacity-60"
            >
              {link}
            </p>
          ))}
        </nav>

        <span className="hidden rounded-full border border-[#222222]/30 px-3 py-1 text-xs uppercase tracking-widest md:inline-block">
          Available for work
        </span>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-[#222222] transition-transform duration-300 ${
              menuOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-[#222222] transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-[#222222] transition-transform duration-300 ${
              menuOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Bottom dock — compact nav that cross-fades in once scrolled past the hero */}
      <div
        className={`fixed inset-x-0 bottom-8 text-text-primary z-50 mx-auto flex w-fit  items-center gap-6 rounded-full bg-white px-5 py-2 font-orbitron shadow-lg transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="gap-6 text-xs uppercase tracking-widest flex items-center ">
          <span
            dir="rtl"
            className="font-aref-ruqaa text-sm uppercase tracking-widest"
          >
            زياد البحيري
          </span>
          {navLinks.map((link) => (
            <p
              key={link}
              onClick={() => {
                scrollToSection(`#${link.toLowerCase()}`);
              }}
              className="transition-opacity hover:opacity-60 text-[2vw] md:text-sm"
            >
              {link}
            </p>
          ))}
        </nav>
      </div>

      {/* Mobile dropdown — anchored near whichever nav is currently visible */}
      {isMenuVisible && (
        <div
          className={`fixed inset-x-0 text-text-primary z-40 mx-auto flex w-fit flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 text-sm uppercase tracking-widest shadow-lg transition-all duration-300 md:hidden ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          } ${scrolled ? "bottom-20" : "top-20"}`}
        >
          {navLinks.map((link) => (
            <p
              key={link}
              onClick={() => {
                scrollToSection(`#${link.toLowerCase()}`);
                setMenuOpen(false);
              }}
              className="transition-opacity hover:opacity-60"
            >
              {link}
            </p>
          ))}
          <span className="rounded-full border border-[#222222]/30 px-3 py-1 text-xs">
            Available for work
          </span>
        </div>
      )}
    </>
  );
};

export default Nav;
