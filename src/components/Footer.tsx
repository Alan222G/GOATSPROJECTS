interface FooterProps {
  scrollToSection: (id: string) => void;
  t: any;
}

export function Footer({ scrollToSection, t }: FooterProps) {
  const quickLinks = [
    { label: t.nav.home, target: "hero" },
    { label: t.nav.about, target: "about" },
    { label: t.nav.services, target: "services" },
    { label: t.nav.calculator, target: "calculator" },
    { label: t.nav.contact, target: "contact" },
  ];

  return (
    <footer className="bg-[#070b19] border-t border-white/5 py-16 text-navy-200/60 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-navy-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/30 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/5">
                <span className="text-gold-500 font-serif font-bold text-2xl">P</span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-serif font-bold text-xl tracking-wider text-white">
                  PROSERCO
                </span>
                <span className="text-[9px] font-sans text-gold-400/70 tracking-[0.2em] font-semibold mt-1">
                  {t.footer.logoSubtitle}
                </span>
              </div>
            </div>
            <p className="font-sans text-navy-200/50 text-sm max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-sans text-white uppercase tracking-widest font-bold mb-6">
              {t.footer.mapTitle}
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="text-sm font-sans hover:text-gold-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Hours */}
          <div>
            <h4 className="text-xs font-sans text-white uppercase tracking-widest font-bold mb-6">
              {t.footer.hoursTitle}
            </h4>
            <ul className="space-y-4 text-sm font-sans text-navy-200/50">
              {t.footer.hours.map((hour: any, idx: number) => (
                <li key={idx}>
                  <span className="block text-white font-medium">{hour.label}</span>
                  {hour.val}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-white/5 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-navy-200/40">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
