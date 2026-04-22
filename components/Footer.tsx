export default function Footer() {
  const onMouseEnter = () => document.body.classList.add("hovering");
  const onMouseLeave = () => document.body.classList.remove("hovering");

  return (
    <footer className="bg-brand-ink px-12 py-8 flex items-center justify-between">
      <div className="footer-logo font-display text-[18px] tracking-[0.2em] text-brand-cream opacity-50 select-none">
        SEOREE
      </div>
      <div className="footer-copy font-sans text-[10px] tracking-[0.15em] text-[#a6a6a6]">
        © 2025 Seoree. All rights reserved.
      </div>
      <div className="footer-socials flex gap-6">
        {["Instagram", "Behance", "LinkedIn"].map((platform) => (
          <a
            key={platform}
            href={`#${platform.toLowerCase()}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#a6a6a6] no-underline transition-colors duration-200 hover:text-brand-gold"
          >
            {platform}
          </a>
        ))}
      </div>
    </footer>
  );
}
