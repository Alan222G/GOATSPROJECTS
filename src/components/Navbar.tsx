import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

export function Navbar({ scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background shift
      setIsScrolled(window.scrollY > 20);

      // Scroll progress indicator
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
    { label: "Inicio", target: "hero" },
    { label: "Nosotros", target: "about" },
    { label: "Servicios", target: "services" },
    { label: "Simulador", target: "calculator" },
    { label: "Contacto", target: "contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0b132b]/85 backdrop-blur-md border-b border-gold-500/10 py-3 shadow-lg shadow-navy-950/20"
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
                CONTADORES PÚBLICOS
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
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

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative px-5 py-2.5 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-sans font-semibold text-sm rounded shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25 hover:from-gold-500 hover:to-gold-300 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer" style={{ background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)", backgroundSize: "200% 100%" }} />
              Consulta Gratuita
            </button>
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
          {navLinks.map((link, idx) => (
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
          ))}
        </ul>

        <div
          style={{
            transitionDelay: mobileMenuOpen ? `${navLinks.length * 75}ms` : "0ms",
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="transition-all duration-500"
        >
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setTimeout(() => scrollToSection("contact"), 300);
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-sans font-bold rounded shadow-lg shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Consulta Gratuita
          </button>
        </div>
      </div>
    </>
  );
}
