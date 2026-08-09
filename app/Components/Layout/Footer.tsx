"use client"
import type { ReactNode } from "react";
import { Aref_Ruqaa } from "next/font/google";
import gsap from "gsap";
import ScrollToPlugin from "gsap/src/ScrollToPlugin";
import { scrollToSection } from "../Animations/sharedAnimation";

gsap.registerPlugin(ScrollToPlugin);

// A calligraphic Arabic display face for the "مروان" wordmark. Swap for a
// custom logo/SVG if you have exact brand type — this is the closest
// stock Google Font to a flowing signature-style mark.
const logoFont = Aref_Ruqaa({ subsets: ["arabic"], weight: "700" });

const NAV_LINKS = [
  { label: "Home", link: "home" },
  { label: "About", link: "about" },
  { label: "Services", link: "services" },
  { label: "Contact", link: "contact" },
];
const SOCIAL_LINKS = [
  { label: "LinkedIn", link: "#" },
  { label: "Instagram", link: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full overflow-x-hidden bg-[#080808] text-[#F5F5F5]">
      {/* PART 1 — top information area */}
      <div className="mx-auto max-w-[1600px]  px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 border-b border-white/[0.08] py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Column 1 — identity */}
          <div className="flex flex-col">
            <span
              // dir="rtl"
              lang="ar"
              className={`${logoFont.className} text-4xl leading-none text-white sm:text-5xl`}
            >
              زياد
            </span>

            <p className="mt-5 max-w-[22ch] text-sm leading-relaxed text-gray-400">
              Designing, developing, and launching digital experiences built for
              real-world impact.
            </p>

            <div className="mt-6 flex items-center gap-2 text-gray-500">
              <span aria-hidden="true" className="text-xs leading-none">
                •
              </span>
              <span className="text-xs tracking-wide">Available for work</span>
            </div>
          </div>

          {/* Column 2 — menu */}
          <FooterColumn heading="Menu">
            <ul className="divide-y divide-white/[0.08]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.link}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Column 3 — social */}
          <FooterColumn heading="Follow on">
            <ul className="divide-y divide-white/[0.08]">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <FooterLink href={social.link}>{social.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Column 4 — description + credit, pinned to column bottom */}
          <div className="flex flex-col justify-between">
            <p className="max-w-[26ch] text-sm leading-relaxed text-gray-400">
              Creating digital experiences that balance design, performance, and
              usability.
            </p>

            <div className="mt-10 lg:mt-0">
              <span className="text-xs uppercase tracking-[0.15em] text-gray-500">
                Created by
              </span>
              <div className="mt-3 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[11px] font-medium text-white"
                >
                  ZA
                </span>
                <span className="text-sm text-gray-300">Zyad Elbehiry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2 — giant edge-to-edge wordmark */}
      <div className="w-full overflow-hidden px-2 pb-4 pt-8 sm:px-4 md:pb-8 md:pt-12">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-extrabold text-[#F5F5F5]"
          style={{
            fontSize: "clamp(8rem, 25vw, 30rem)",
            lineHeight: 0.75,
            letterSpacing: "-0.07em",
          }}
        >
          ZYAD
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
        {heading}
      </span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p
      onClick={() => {
        scrollToSection(`#${href.toLowerCase()}`);
      }}
      className="group flex items-center justify-between cursor-pointer py-3 text-lg font-medium text-white/90 transition-colors duration-300 hover:text-white"
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="text-gray-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
      >
        <path d="M7 17 17 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </p>
  );
}
