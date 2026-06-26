import { ScrollReveal } from "./ScrollReveal";

interface HeroProps {
  scrollToSection: (id: string) => void;
  t: any;
}

export function Hero({ scrollToSection, t }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen py-24 sm:py-32 flex items-center justify-center bg-[#070b19] pb-36"
    >
      {/* Background Image with Parallax-like overlay and glow */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 transition-transform duration-10000"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/90 to-navy-950" />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px] animate-pulse-glow" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-navy-500/15 blur-[150px] animate-pulse-glow" style={{ animationDuration: "12s" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Subtitle */}
        <ScrollReveal delay={150} direction="down">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase mb-8 shadow-inner shadow-gold-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
            {t.hero.tag}
          </span>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={300} direction="up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
            {t.hero.title1} <br />
            <span className="text-gradient-gold">{t.hero.title2}</span>
          </h1>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={450} direction="up">
          <p className="text-base sm:text-lg md:text-xl text-navy-200/80 mb-12 max-w-3xl mx-auto font-sans leading-relaxed">
            {t.hero.desc}
          </p>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal delay={600} direction="up">
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-4 btn-gold rounded-xl font-sans font-bold text-base cursor-pointer"
            >
              {t.hero.btn1}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-navy-300/30 hover:border-gold-500/40 text-white hover:text-gold-400 font-sans font-semibold text-base rounded hover:bg-white/[0.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {t.hero.btn2}
            </button>
          </div>
        </ScrollReveal>

        {/* Trust Metrics Row */}
        <ScrollReveal delay={800} direction="up" className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10 border-t border-white/5">
            {t.hero.metrics.map((metric: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center">
                <span className={`text-3xl md:text-4xl font-serif font-extrabold ${idx % 2 === 0 ? 'text-gold-400' : 'text-white'} mb-1 tracking-tight`}>
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

      {/* Down Arrow Indicator - Adjusted positioning to prevent clipping */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 group transition-opacity hover:opacity-100 opacity-60 focus:outline-none"
        aria-label="Scroll Down"
      >
        <span className="text-[9px] font-sans text-gold-400/80 tracking-[0.3em] font-semibold uppercase group-hover:text-gold-400 group-hover:translate-y-0.5 transition-all duration-300">
          {t.hero.scrollText}
        </span>
        <svg
          className="w-4 h-4 text-gold-400/80 group-hover:text-gold-400 group-hover:translate-y-0.5 transition-all duration-300 animate-bounce"
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
