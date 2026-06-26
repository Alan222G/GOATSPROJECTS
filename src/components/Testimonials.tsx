import { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote: "La precisión e integridad de PROSERCO nos permitió superar con total éxito una fiscalización compleja del SII. Son socios estratégicos indispensables para el resguardo de nuestro patrimonio corporativo.",
      author: "Roberto Silva",
      role: "Gerente de Finanzas",
      company: "Logística Andes S.A.",
      rating: 5,
    },
    {
      quote: "Migrar nuestra gestión contable a la nube de la mano de PROSERCO redujo a la mitad los tiempos de conciliación y nos brindó reportes consolidados oportunos para la toma de decisiones directivas.",
      author: "Carolina Méndez",
      role: "Directora Financiera",
      company: "TecnoCorp Chile",
      rating: 5,
    },
    {
      quote: "Excelente acompañamiento técnico en nuestro proceso de fusión corporativa y reestructuración tributaria familiar. Profesionalismo del más alto nivel y cercanía en el trato diario.",
      author: "Andrés Valdivia",
      role: "Socio Principal",
      company: "Inversiones V&M",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Shift every 8 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-[#0f172a] to-[#0b132b] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/10 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Title */}
        <div className="mb-16">
          <ScrollReveal delay={100} direction="down">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Opiniones de Líderes
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
              Casos de Éxito
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="up">
            <div className="w-16 h-[2px] bg-gold-500 mx-auto mt-6" />
          </ScrollReveal>
        </div>

        {/* Testimonial Carousel */}
        <ScrollReveal delay={200} direction="up">
          <div className="relative glass p-8 sm:p-14 rounded-3xl border border-white/5 shadow-2xl">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold-500 border border-gold-400 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/25">
              <svg className="w-6 h-6 text-navy-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonials List */}
            <div className="min-h-[220px] flex items-center justify-center">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ease-in-out absolute inset-x-6 sm:inset-x-14 ${
                    idx === activeIndex
                      ? "opacity-100 scale-100 translate-y-0 relative pointer-events-auto"
                      : "opacity-0 scale-95 translate-y-4 absolute pointer-events-none"
                  }`}
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1.5 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, sIdx) => (
                      <svg key={sIdx} className="w-5 h-5 text-gold-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="font-serif text-base sm:text-xl md:text-2xl text-white italic leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Metadata */}
                  <div className="flex flex-col items-center">
                    <span className="font-sans font-bold text-white text-sm sm:text-base">
                      {testimonial.author}
                    </span>
                    <span className="font-sans text-xs text-navy-200/50 uppercase tracking-widest font-semibold mt-1">
                      {testimonial.role} — <span className="text-gold-400">{testimonial.company}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "bg-gold-500 w-6"
                      : "bg-white/10 hover:bg-white/30"
                  }`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
