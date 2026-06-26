interface FooterProps {
  scrollToSection: (id: string) => void;
}

export function Footer({ scrollToSection }: FooterProps) {
  const quickLinks = [
    { label: "Inicio", target: "hero" },
    { label: "Sobre Nosotros", target: "about" },
    { label: "Nuestros Servicios", target: "services" },
    { label: "Simulador Tributario", target: "calculator" },
    { label: "Contacto", target: "contact" },
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
                  CONTADORES PÚBLICOS
                </span>
              </div>
            </div>
            <p className="font-sans text-navy-200/50 text-sm max-w-sm leading-relaxed">
              Firma líder en asesoría contable, tributaria y de auditoría de alta precisión. Impulsamos la solidez y el crecimiento financiero de su corporación.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-sans text-white uppercase tracking-widest font-bold mb-6">
              Mapa del Sitio
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
              Horario de Atención
            </h4>
            <ul className="space-y-4 text-sm font-sans text-navy-200/50">
              <li>
                <span className="block text-white font-medium">Lunes a Jueves:</span>
                09:00 - 18:30 hrs
              </li>
              <li>
                <span className="block text-white font-medium">Viernes:</span>
                09:00 - 17:00 hrs
              </li>
              <li className="text-gold-500 font-medium">
                Sábado y Domingo: Cerrado
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/5 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-navy-200/40">
          <p>© 2026 PROSERCO Contadores Públicos. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
