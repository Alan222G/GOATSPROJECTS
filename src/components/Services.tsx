import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: JSX.Element;
  features: string[];
  workflow: string[];
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: "auditoria",
      title: "Auditoría Financiera",
      shortDesc: "Evaluación rigurosa de sus estados financieros bajo estándares internacionales para garantizar transparencia absoluta.",
      longDesc: "Nuestros servicios de auditoría van más allá de la mera verificación de números. Proveemos una opinión independiente y calificada sobre la razonabilidad de la información financiera, ayudando a identificar debilidades en el control interno y riesgos operativos no detectados.",
      icon: (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Auditoría de Estados Financieros (IFRS / NIIF)",
        "Revisiones limitadas e informes de procedimientos acordados",
        "Evaluación de sistemas de control interno y procesos de negocio",
        "Investigación de fraudes y auditoría forense especializada"
      ],
      workflow: [
        "Planificación y evaluación preliminar de riesgos",
        "Pruebas sustantivas y de controles",
        "Discusión de hallazgos y cartas de recomendación de control interno",
        "Emisión de dictamen u opinión formal"
      ]
    },
    {
      id: "contabilidad",
      title: "Gestión Contable",
      shortDesc: "Outsourcing contable integral, reportes oportunos y cumplimiento estricto con la normativa contable y laboral.",
      longDesc: "Brindamos una gestión contable robusta e integrada en la nube que permite a la gerencia tener acceso a sus cifras de manera oportuna y en tiempo real. Nos encargamos de todo el flujo, desde el registro básico hasta los balances consolidados.",
      icon: (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        "Procesamiento mensual de transacciones contables en sistemas ERP en la nube",
        "Preparación de estados financieros mensuales para toma de decisiones",
        "Administración de nóminas, cotizaciones previsionales y contratos laborales",
        "Cumplimiento mensual de obligaciones de IVA y retenciones"
      ],
      workflow: [
        "Sincronización automatizada de documentos y facturación",
        "Procesamiento y conciliación de cuentas bancarias y auxiliares",
        "Generación y revisión de pre-cierres con el cliente",
        "Cierre contable definitivo y entrega de estados de gestión"
      ]
    },
    {
      id: "consultoria",
      title: "Consultoría Estratégica",
      shortDesc: "Ingeniería financiera, reestructuraciones corporativas y estructuración de modelos de negocio eficientes.",
      longDesc: "Diseñamos estrategias para maximizar el valor de su empresa. Apoyamos a los equipos directivos en decisiones complejas de inversión, financiamiento, compra y venta de empresas, o procesos de reestructuración corporativa.",
      icon: (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: [
        "Valoración de empresas y proyectos de inversión",
        "Debida diligencia (Due Diligence) financiera y contable",
        "Modelación financiera de proyecciones y flujos de caja de largo plazo",
        "Estructuración de financiamiento y asesoría en fusiones y adquisiciones (M&A)"
      ],
      workflow: [
        "Diagnóstico estratégico inicial y levantamiento de requerimientos",
        "Análisis de mercado, competidores e histórico financiero",
        "Construcción del modelo analítico y simulación de escenarios",
        "Presentación de propuestas estratégicas y acompañamiento de ejecución"
      ]
    },
    {
      id: "asesoria",
      title: "Planificación Tributaria",
      shortDesc: "Mitigación de riesgos impositivos y optimización de cargas fiscales en estricto cumplimiento de la ley.",
      longDesc: "Ayudamos a personas y empresas a estructurar de manera óptima sus operaciones para cumplir eficientemente con las leyes impositivas vigentes. Prevenimos contingencias y representamos sus intereses de forma experta ante el Servicio de Impuestos Internos.",
      icon: (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      features: [
        "Diagnóstico de brechas de cumplimiento fiscal corporativo e individual",
        "Estructuración y optimización de patrimonios familiares",
        "Preparación y presentación de declaraciones anuales de Impuesto a la Renta (F22/F29)",
        "Defensa técnica tributaria ante fiscalizaciones y citaciones del SII"
      ],
      workflow: [
        "Auditoría tributaria del ejercicio fiscal actual",
        "Identificación de franquicias y regímenes de exención aplicables",
        "Diseño de plan tributario y directrices de implementación corporativa",
        "Seguimiento preventivo y auditoría de control de desviaciones"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#0b132b] to-[#050814] relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-navy-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <ScrollReveal delay={100} direction="down">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Soluciones a tu Medida
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
              Ingeniería de Valor Financiero
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="up">
            <div className="w-16 h-[2px] bg-gold-500 mx-auto mt-6" />
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              delay={idx * 150}
              direction="up"
              className="h-full"
            >
              <div
                onClick={() => setSelectedService(service)}
                className="glow-card group h-full glass hover:border-gold-500/40 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-gold-500/5"
              >
                <div>
                  <div className="w-14 h-14 bg-navy-950/60 border border-white/5 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-gold-500/30 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-sans text-navy-200/60 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans font-semibold text-gold-500 group-hover:text-gold-400 group-hover:gap-4 transition-all duration-300">
                  <span>Explorar Detalles</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Premium Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with extreme blur and fade */}
          <div
            onClick={() => setSelectedService(null)}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity duration-300"
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-3xl glass bg-navy-950/95 border border-gold-500/30 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-gold-500/5 animate-in fade-in zoom-in duration-300 flex flex-col"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-navy-950/90 backdrop-blur border-b border-white/5 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 rounded-lg flex items-center justify-center">
                  {selectedService.icon}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-gold-500/50 flex items-center justify-center text-white/60 hover:text-gold-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 flex-grow">
              {/* Description */}
              <div>
                <h4 className="text-xs font-sans text-gold-400 uppercase tracking-widest font-bold mb-3">
                  Descripción del Servicio
                </h4>
                <p className="font-sans text-navy-200/80 text-sm sm:text-base leading-relaxed">
                  {selectedService.longDesc}
                </p>
              </div>

              {/* Grid of details */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Features list */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                  <h4 className="text-xs font-sans text-gold-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Áreas de Especialización
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-xs sm:text-sm font-sans text-navy-200/70">
                        <svg className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workflow process */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                  <h4 className="text-xs font-sans text-gold-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Nuestra Metodología
                  </h4>
                  <ol className="space-y-4">
                    {selectedService.workflow.map((step, sIdx) => (
                      <li key={sIdx} className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full bg-navy-900 border border-gold-500/20 text-gold-400 text-[10px] font-sans font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-sans font-medium text-white/95">
                            {step}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-navy-950/90 backdrop-blur border-t border-white/5 p-6 flex flex-col sm:flex-row gap-4 sm:justify-end z-10">
              <button
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 border border-white/10 hover:border-white/20 text-white font-sans text-sm font-semibold rounded hover:bg-white/[0.02] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Cerrar
              </button>
              <a
                href="#contact"
                onClick={() => {
                  setSelectedService(null);
                  const element = document.getElementById("contact");
                  if (element) {
                    setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 200);
                  }
                }}
                className="btn-gold px-6 py-2.5 text-navy-950 font-sans text-sm font-bold rounded shadow-lg shadow-gold-500/10 text-center cursor-pointer"
              >
                Cotizar este Servicio
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
