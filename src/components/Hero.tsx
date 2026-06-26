import { ScrollReveal } from "./ScrollReveal";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export function Hero({ scrollToSection }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070b19]"
    >
      {/* Background Image with Parallax-like overlay and glow */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-10000"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/90 to-navy-950" />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px] animate-pulse-glow" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-navy-500/20 blur-[150px] animate-pulse-glow" style={{ animationDuration: "12s" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        {/* Subtitle */}
        <ScrollReveal delay={150} direction="down">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase mb-8 shadow-inner shadow-gold-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
            PROSERCO — Excelencia Contable
          </span>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={300} direction="up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
            Arquitectura de la <br />
            <span className="text-gradient-gold">Confianza Financiera</span>
          </h1>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={450} direction="up">
          <p className="text-base sm:text-lg md:text-xl text-navy-200/80 mb-12 max-w-3xl mx-auto font-sans leading-relaxed">
            Fusionamos rigor analítico con visión estratégica para potenciar empresas de primer nivel. 
            Auditoría de alta precisión, ingeniería contable avanzada y consultoría tributaria de élite.
          </p>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal delay={600} direction="up">
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-sans font-bold text-base rounded shadow-lg shadow-gold-500/10 hover:shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden relative group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer" style={{ background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)", backgroundSize: "200% 100%" }} />
              Iniciar Asesoría
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-navy-300/30 hover:border-gold-500/40 text-white hover:text-gold-400 font-sans font-semibold text-base rounded hover:bg-white/[0.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Nuestras Soluciones
            </button>
          </div>
        </ScrollReveal>

        {/* Trust Metrics Row */}
        <ScrollReveal delay={800} direction="up" className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10 border-t border-white/5">
            {[
              { val: "20+", label: "Años de Trayectoria", accent: "text-gold-400" },
              { val: "500+", label: "Clientes Corporativos", accent: "text-white" },
              { val: "99.4%", label: "Tasa de Retención", accent: "text-gold-400" },
              { val: "100%", label: "Cumplimiento Regulatorio", accent: "text-white" },
            ].map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className={`text-3xl md:text-4xl font-serif font-extrabold ${metric.accent} mb-1 tracking-tight`}>
                  {metric.val}
                </span>
                <span className="text-[10px] sm:text-xs font-sans text-navy-300/60 uppercase tracking-[0.1em] text-center">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Down Arrow Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 group transition-opacity hover:opacity-100 opacity-60 focus:outline-none"
        aria-label="Scroll Down"
      >
        <span className="text-[9px] font-sans text-gold-400/80 tracking-[0.3em] font-semibold uppercase group-hover:text-gold-400 group-hover:translate-y-1 transition-all duration-300">
          Descubrir
        </span>
        <svg
          className="w-5 h-5 text-gold-400/80 group-hover:text-gold-400 group-hover:translate-y-1 transition-all duration-300 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  );
}
