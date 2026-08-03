import Link from "next/link";

const Nav = () => {
  const navLinks = ["Work", "About", "Contact"];

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between text-text-primary px-6 py-6 md:px-12">
      <span className="text-sm uppercase tracking-widest">Zyad Elbehiry</span>

      <nav className="gap-8 text-sm uppercase tracking-widest md:flex">
        {navLinks.map((link) => (
          <Link
            key={link}
            href={`#${link.toLowerCase()}`}
            className="transition-opacity hover:opacity-60"
          >
            {link}
          </Link>
        ))}
      </nav>

      <span className="rounded-full border border-[#222222]/30 px-3 py-1 text-xs uppercase tracking-widest">
        Available for work
      </span>
    </div>
  );
};

export default Nav;
