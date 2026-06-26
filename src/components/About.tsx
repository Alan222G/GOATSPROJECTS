import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface Milestone {
  year: string;
  title: string;
  description: string;
  details: string[];
}

export function About() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  const milestones: Milestone[] = [
    {
      year: "2006",
      title: "Fundación de la Firma",
      description: "PROSERCO inicia operaciones en Santiago con un equipo de 3 socios fundadores enfocados en asesoría tributaria y contabilidad corporativa.",
      details: [
        "Establecimiento de las bases de integridad profesional",
        "Primeros 20 clientes corporativos en industrias clave",
        "Especialización en cumplimiento tributario local"
      ]
    },
    {
      year: "2012",
      title: "Expansión de Servicios & Cobertura",
      description: "Ampliamos la gama de soluciones incorporando auditoría operativa y consultoría financiera estratégica para medianas empresas.",
      details: [
        "Inauguración de departamento especializado de Auditoría",
        "Aumento del equipo a 15 profesionales experimentados",
        "Certificación en normas internacionales de contabilidad (IFRS)"
      ]
    },
    {
      year: "2018",
      title: "Revolución Digital y Nube",
      description: "Migramos toda la infraestructura de gestión y el 100% de la contabilidad de nuestros clientes a plataformas inteligentes basadas en la nube.",
      details: [
        "Implementación de portales de autoservicio y reportería en tiempo real",
        "Reducción del 45% en los tiempos de conciliación bancaria",
        "Asociación con los principales ERPs del mercado"
      ]
    },
    {
      year: "2026",
      title: "Auditoría de Precisión Predictiva",
      description: "Integramos herramientas avanzadas de analítica forense digital y predicción fiscal para anticipar contingencias tributarias.",
      details: [
        "Auditorías fiscales preventivas basadas en modelos predictivos",
        "Asesoría de negocio adaptada a la economía digital y criptoactivos",
        "Firma líder en contabilidad corporativa inteligente"
      ]
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#050814] to-[#0b132b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-navy-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <ScrollReveal delay={100} direction="down">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Quiénes Somos
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
              Compromiso de Clase Mundial
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="up">
            <div className="w-16 h-[2px] bg-gold-500 mx-auto mt-6" />
          </ScrollReveal>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Mission */}
          <ScrollReveal delay={200} direction="left">
            <div className="glow-card glass hover:border-gold-500/25 p-8 sm:p-10 rounded-2xl transition-all duration-500 group shadow-lg hover:shadow-gold-500/5 h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/20 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-gold-500/40 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-gold-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  Misión
                </h3>
                <p className="font-sans text-navy-200/70 leading-relaxed">
                  Proporcionar servicios contables y financieros de la más alta calidad,
                  basados en la integridad y el profesionalismo, que permitan a nuestros
                  clientes tomar decisiones estratégicas informadas y alcanzar sus
                  objetivos empresariales con confianza.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-gold-400 font-sans text-xs font-semibold tracking-wider uppercase group-hover:gap-5 transition-all duration-300">
                Rigurosidad · Ética · Excelencia
              </div>
            </div>
          </ScrollReveal>

          {/* Vision */}
          <ScrollReveal delay={400} direction="right">
            <div className="glow-card glass hover:border-gold-500/25 p-8 sm:p-10 rounded-2xl transition-all duration-500 group shadow-lg hover:shadow-gold-500/5 h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-navy-500/10 border border-navy-400/20 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-navy-400/40 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-navy-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  Visión
                </h3>
                <p className="font-sans text-navy-200/70 leading-relaxed">
                  Ser la firma de contadores públicos líder en el mercado, reconocida por
                  nuestra excelencia profesional, innovación constante y compromiso
                  irrefutable con el éxito financiero de nuestros clientes a largo plazo.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-navy-300 font-sans text-xs font-semibold tracking-wider uppercase group-hover:gap-5 transition-all duration-300">
                Liderazgo · Innovación · Futuro
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive Timeline Section */}
        <ScrollReveal delay={200} direction="up">
          <div className="glow-card glass p-8 sm:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
              Nuestra Evolución
            </h3>
            <p className="font-sans text-navy-200/60 text-sm text-center mb-12 max-w-xl mx-auto">
              Haz clic en los hitos para explorar cómo hemos crecido junto a nuestros clientes a lo largo de las décadas.
            </p>

            {/* Timeline Line & Controls */}
            <div className="relative mb-16 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
              {/* Horizontal Line behind (Desktop only) */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2 hidden md:block" />
              {/* Gold Progress line */}
              <div
                className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-gold-600 to-gold-400 -translate-y-1/2 hidden md:block transition-all duration-500"
                style={{ width: `${(activeMilestone / (milestones.length - 1)) * 100}%` }}
              />

              {milestones.map((milestone, idx) => (
                <button
                  key={milestone.year}
                  onClick={() => setActiveMilestone(idx)}
                  className="relative z-10 flex flex-col items-center focus:outline-none cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-serif text-sm font-bold transition-all duration-500 ${
                      activeMilestone === idx
                        ? "bg-gold-500 border-gold-400 text-navy-950 scale-110 shadow-lg shadow-gold-500/20"
                        : "bg-navy-950 border-white/10 text-white/60 hover:border-gold-500/50 hover:text-gold-400"
                    }`}
                  >
                    {milestone.year}
                  </div>
                  <span
                    className={`text-xs font-sans font-semibold tracking-wider mt-3 transition-colors duration-300 ${
                      activeMilestone === idx ? "text-gold-400" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {milestone.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Milestone Card */}
            <div className="relative min-h-[220px] bg-navy-950/40 border border-white/5 rounded-2xl p-6 sm:p-8 transition-all duration-500 flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-2/3">
                <span className="text-gold-400 font-serif text-4xl sm:text-5xl font-extrabold block mb-2">
                  {milestones[activeMilestone].year}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">
                  {milestones[activeMilestone].title}
                </h4>
                <p className="font-sans text-navy-200/80 text-sm sm:text-base leading-relaxed">
                  {milestones[activeMilestone].description}
                </p>
              </div>
              <div className="md:w-1/3 w-full bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <span className="text-xs font-sans text-white/40 font-bold uppercase tracking-wider block mb-3">
                  Logros Clave:
                </span>
                <ul className="space-y-3">
                  {milestones[activeMilestone].details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex gap-2.5 items-start text-xs font-sans text-navy-200/70">
                      <svg
                        className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
