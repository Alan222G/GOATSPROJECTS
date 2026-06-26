import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

interface NavbarProps {
  scrollToSection: (id: string) => void;
  onOpenLogin: () => void;
  isAuthenticated: boolean;
  userEmail: string;
  onLogout: () => void;
  lang: "es" | "en";
  setLang: (lang: "es" | "en") => void;
  t: any;
}

export function Navbar({
  scrollToSection,
  onOpenLogin,
  isAuthenticated,
  userEmail,
  onLogout,
  lang,
  setLang,
  t,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, target: "hero" },
    { label: t.nav.about, target: "about" },
    { label: t.nav.services, target: "services" },
    { label: t.nav.calculator, target: "calculator" },
    { label: t.nav.contact, target: "contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#050814]/90 backdrop-blur-md border-b border-gold-500/10 py-3 shadow-lg shadow-navy-950/40"
            : "bg-transparent py-5"
        )}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/30 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/5 group-hover:border-gold-500/60 transition-all duration-300">
              <span className="text-gold-500 font-serif font-bold text-2xl group-hover:scale-110 transition-transform duration-300">P</span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-serif font-bold text-xl tracking-wider text-white group-hover:text-gold-400 transition-colors duration-300">
                PROSERCO
              </span>
              <span className="text-[9px] font-sans text-gold-400/70 tracking-[0.2em] font-semibold mt-1">
                {t.footer.logoSubtitle}
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          {!isAuthenticated && (
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="text-sm font-sans font-medium text-navy-200/90 hover:text-gold-400 transition-all duration-300 relative py-2 cursor-pointer group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Desktop Auth, Language Selector and CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="px-2.5 py-1.5 border border-gold-500/20 hover:border-gold-500/50 rounded-lg text-xs font-sans font-bold text-gold-400 hover:text-white transition-all duration-300 flex items-center gap-1 cursor-pointer bg-white/[0.01]"
              title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              <span>{lang === "es" ? "EN" : "ES"}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-sans text-navy-200/60">
                  {t.nav.session}: <strong className="text-gold-400">{userEmail.split("@")[0]}</strong>
                </span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 border border-rose-500/20 hover:border-rose-500/50 text-rose-400 hover:text-white hover:bg-rose-500/10 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer"
                >
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="text-sm font-sans font-semibold text-white hover:text-gold-400 px-4 py-2 hover:bg-white/[0.02] rounded-lg transition-all duration-300 cursor-pointer"
                >
                  {t.common.clientPortal}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="btn-gold px-5 py-2.5 text-navy-950 font-sans font-bold text-sm rounded shadow-lg shadow-gold-500/10 cursor-pointer"
                >
                  {t.common.freeConsultation}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-gold-400 transition-colors focus:outline-none p-1.5 rounded-lg border border-white/10 hover:border-gold-500/30 cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-navy-950/98 backdrop-blur-lg lg:hidden transition-all duration-500 flex flex-col justify-center items-center px-8",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-10px]"
        )}
      >
        <ul className="flex flex-col gap-6 text-center mb-8">
          {!isAuthenticated ? (
            navLinks.map((link, idx) => (
              <li
                key={link.label}
                style={{
                  transitionDelay: mobileMenuOpen ? `${idx * 75}ms` : "0ms",
                  transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
                className="transition-all duration-500"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTimeout(() => scrollToSection(link.target), 300);
                  }}
                  className="text-2xl font-serif font-semibold text-navy-100 hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))
          ) : (
            <li
              style={{
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              className="transition-all duration-500"
            >
              <span className="text-xl font-sans text-navy-200/60 block mb-2">
                {t.nav.session}:
              </span>
              <span className="text-2xl font-serif font-bold text-gold-400 block">
                {userEmail}
              </span>
            </li>
          )}
        </ul>

        <div
          style={{
            transitionDelay: mobileMenuOpen ? `${isAuthenticated ? 1 : navLinks.length * 75}ms` : "0ms",
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="transition-all duration-500 flex flex-col gap-4 w-full max-w-[240px]"
        >
          {/* Mobile Language Selector */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="w-full py-2.5 border border-gold-500/20 text-gold-400 font-sans font-semibold rounded-xl hover:bg-white/[0.03] transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{lang === "es" ? "English (EN)" : "Español (ES)"}</span>
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="w-full py-3.5 border border-rose-500/20 text-rose-400 font-sans font-bold rounded-xl hover:bg-rose-500/10 transition-colors text-center cursor-pointer"
            >
              {t.nav.logout}
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 border border-white/15 text-white font-sans font-semibold rounded-xl hover:bg-white/[0.03] transition-colors text-center cursor-pointer"
              >
                {t.common.clientPortal}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => scrollToSection("contact"), 300);
                }}
                className="w-full py-3.5 btn-gold font-sans font-bold rounded-xl text-center cursor-pointer"
              >
                {t.common.freeConsultation}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
