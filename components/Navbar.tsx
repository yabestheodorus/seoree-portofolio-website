"use client";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const onMouseEnter = () => document.body.classList.add("hovering");
  const onMouseLeave = () => document.body.classList.remove("hovering");

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-7 mix-blend-difference">
      <div className="font-display text-[22px] tracking-[0.15em] text-brand-cream select-none">
        SEOREE
      </div>
      <ul className="flex gap-10 list-none">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="font-sans text-[11px] tracking-[0.2em] uppercase text-brand-cream opacity-80 transition-opacity duration-200 hover:opacity-100"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
