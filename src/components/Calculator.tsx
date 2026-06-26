import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function Calculator() {
  const [activeTab, setActiveTab] = useState<"tax" | "health">("tax");

  // --- TAB 1: TAX CALCULATOR STATES & LOGIC ---
  const [monthlySalary, setMonthlySalary] = useState<number>(2500000); // Default 2.5M CLP
  const utmValue = 66200; // Simulated UTM value for 2026

  const calculateTax = (salary: number) => {
    const salaryInUtm = salary / utmValue;
    let taxRate = 0;
    let deductionUtm = 0;

    if (salaryInUtm <= 13.5) {
      taxRate = 0;
      deductionUtm = 0;
    } else if (salaryInUtm <= 30) {
      taxRate = 0.04;
      deductionUtm = 0.54;
    } else if (salaryInUtm <= 50) {
      taxRate = 0.08;
      deductionUtm = 1.74;
    } else if (salaryInUtm <= 70) {
      taxRate = 0.135;
      deductionUtm = 4.49;
    } else if (salaryInUtm <= 90) {
      taxRate = 0.23;
      deductionUtm = 11.14;
    } else if (salaryInUtm <= 120) {
      taxRate = 0.304;
      deductionUtm = 17.8;
    } else if (salaryInUtm <= 310) {
      taxRate = 0.35;
      deductionUtm = 23.32;
    } else {
      taxRate = 0.4;
      deductionUtm = 38.82;
    }

    const calculatedTaxClp = Math.max(0, (salaryInUtm * taxRate - deductionUtm) * utmValue);
    const netIncomeClp = salary - calculatedTaxClp;
    const effectiveRate = salary > 0 ? (calculatedTaxClp / salary) * 100 : 0;

    return {
      tax: Math.round(calculatedTaxClp),
      net: Math.round(netIncomeClp),
      marginalRate: taxRate * 100,
      effectiveRate: parseFloat(effectiveRate.toFixed(1)),
      utm: parseFloat(salaryInUtm.toFixed(2)),
    };
  };

  const taxResults = calculateTax(monthlySalary);

  // --- TAB 2: FINANCIAL HEALTH STATES & LOGIC ---
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      text: "¿Su empresa realiza conciliación bancaria al día de forma mensual?",
      options: [
        { text: "Sí, siempre al cierre de mes", score: 20 },
        { text: "A veces, o con desfase de meses", score: 10 },
        { text: "No, solo al final del año tributario", score: 0 },
      ],
    },
    {
      id: 2,
      text: "¿Realiza planificación tributaria estratégica antes del cierre del año fiscal?",
      options: [
        { text: "Sí, evaluamos regímenes y optimizaciones de forma planificada", score: 20 },
        { text: "A veces realizamos ajustes de última hora", score: 10 },
        { text: "No, pagamos los impuestos resultantes sin planificación previa", score: 0 },
      ],
    },
    {
      id: 3,
      text: "¿Tiene claridad de su flujo de caja proyectado a un horizonte de 3 meses?",
      options: [
        { text: "Sí, tenemos modelos y escenarios de proyección", score: 20 },
        { text: "Parcialmente, solo controlamos el saldo bancario inmediato", score: 10 },
        { text: "No, operamos al día sin proyecciones", score: 0 },
      ],
    },
    {
      id: 4,
      text: "¿Cuenta con Estados Financieros mensuales entregados por su área contable?",
      options: [
        { text: "Sí, recibimos balances analizados los primeros 10 días del mes", score: 20 },
        { text: "Recibimos informes esporádicamente o sin análisis", score: 10 },
        { text: "No, la contabilidad solo sirve para liquidar impuestos anuales", score: 0 },
      ],
    },
    {
      id: 5,
      text: "¿Su documentación de respaldo contable está digitalizada e integrada en la nube?",
      options: [
        { text: "Sí, 100% digital y accesible desde cualquier lugar", score: 20 },
        { text: "En proceso, mezclamos digital con carpetas físicas", score: 10 },
        { text: "No, todo es físico y archivado de manera tradicional", score: 0 },
      ],
    },
  ];

  const handleSelectAnswer = (qId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
  };

  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

  const getHealthStatus = (score: number) => {
    if (score >= 80) return { title: "Excelente", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", desc: "Su gestión financiera y tributaria cuenta con sólidos estándares. Cumple con los pilares estratégicos de orden contable." };
    if (score >= 50) return { title: "Vulnerable", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", desc: "Su empresa opera pero tiene brechas críticas que podrían desencadenar multas tributarias u oportunidades de ahorro fiscal perdidas." };
    return { title: "Crítica", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", desc: "Se detectan severas deficiencias de control. Riesgo latente de auditorías del SII, problemas de caja o asimetrías de información contable urgente." };
  };

  const healthStatus = getHealthStatus(totalScore);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-[#050814] to-[#0b132b] relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-navy-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <ScrollReveal delay={100} direction="down">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Asistente Interactivo
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
              Herramientas Inteligentes
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="up">
            <div className="w-16 h-[2px] bg-gold-500 mx-auto mt-6" />
          </ScrollReveal>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-xl bg-navy-950/80 border border-white/5 backdrop-blur-md">
            <button
              onClick={() => {
                setActiveTab("tax");
                setShowResult(false);
              }}
              className={`px-6 py-3 rounded-lg text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "tax"
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/10"
                  : "text-navy-200/60 hover:text-white"
              }`}
            >
              Simulador Tributario
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`px-6 py-3 rounded-lg text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "health"
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/10"
                  : "text-navy-200/60 hover:text-white"
              }`}
            >
              Diagnóstico Financiero
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <ScrollReveal delay={200} direction="up">
          <div className="glow-card glass p-8 sm:p-12 rounded-3xl border border-white/5 shadow-2xl">
            {activeTab === "tax" ? (
              // SIMULADOR DE IMPUESTO
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                      Simulador de Impuesto Único
                    </h3>
                    <p className="font-sans text-navy-200/60 text-sm leading-relaxed">
                      Calcula una estimación mensual del Impuesto Único de Segunda Categoría para trabajadores dependientes en base al valor actual de la UTM (~{formatCurrency(utmValue)}).
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="salary-range" className="text-sm font-sans font-semibold text-white/90">
                        Sueldo Tributable Mensual (CLP)
                      </label>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-gold-400">
                        {formatCurrency(monthlySalary)}
                      </span>
                    </div>

                    <input
                      id="salary-range"
                      type="range"
                      min="500000"
                      max="12000000"
                      step="50000"
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(parseInt(e.target.value))}
                      className="w-full h-2 bg-navy-900 border border-white/5 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-[10px] font-sans text-navy-200/40">
                      <span>$500 mil</span>
                      <span>$3.0 mill.</span>
                      <span>$6.0 mill.</span>
                      <span>$9.0 mill.</span>
                      <span>$12.0 mill.</span>
                    </div>
                  </div>

                  {/* UTM Reference */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-sans text-navy-200/50 leading-relaxed flex gap-3 items-center">
                    <svg className="w-5 h-5 text-gold-500/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      * El cálculo se basa en el tramo tributario del SII de Chile aplicando descuentos y factores de deducción en UTM. No considera cotizaciones obligatorias de AFP ni Salud, por lo que debe ingresar su sueldo imponible líquido legal.
                    </span>
                  </div>
                </div>

                {/* Outputs Panel */}
                <div className="lg:col-span-5 bg-navy-950/60 border border-gold-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-navy-950/30">
                  <h4 className="text-xs font-sans text-white/55 font-bold uppercase tracking-wider border-b border-white/5 pb-3">
                    Resultados Estimados
                  </h4>

                  <div className="space-y-4">
                    {/* Imponible UTM */}
                    <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                      <span>Equivalente imponible</span>
                      <span className="text-white font-medium">{taxResults.utm} UTM</span>
                    </div>

                    {/* Tasa Marginal */}
                    <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                      <span>Tasa marginal del tramo</span>
                      <span className="text-white font-medium">{taxResults.marginalRate}%</span>
                    </div>

                    {/* Tasa Efectiva */}
                    <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                      <span>Tasa efectiva total</span>
                      <span className="text-gold-400 font-semibold">{taxResults.effectiveRate}%</span>
                    </div>

                    <div className="border-t border-white/5 pt-4 my-2" />

                    {/* Impuesto CLP */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-sans text-navy-200/80">Impuesto a Pagar</span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-rose-400">
                        {formatCurrency(taxResults.tax)}
                      </span>
                    </div>

                    {/* Sueldo Neto CLP */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-sans text-navy-200/85">Sueldo Neto Líquido</span>
                      <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-400">
                        {formatCurrency(taxResults.net)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="#contact"
                      className="block w-full text-center py-3 btn-gold rounded-xl font-sans font-bold text-xs sm:text-sm"
                    >
                      Planificar mi Declaración Anual
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              // EVALUACION DE SALUD FINANCIERA
              <div>
                {!showResult ? (
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                        Autoevaluación de Salud Contable y Financiera
                      </h3>
                      <p className="font-sans text-navy-200/60 text-sm max-w-2xl">
                        Responda estas 5 preguntas rápidas para diagnosticar el nivel de riesgo de su gestión financiera actual y obtener recomendaciones de nuestros expertos.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {questions.map((q) => (
                        <div key={q.id} className="p-5 bg-white/[0.01] border border-white/5 rounded-xl">
                          <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-4">
                            {q.id}. {q.text}
                          </h4>
                          <div className="grid sm:grid-cols-3 gap-4">
                            {q.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectAnswer(q.id, opt.score)}
                                className={`p-3.5 rounded-lg border text-xs sm:text-sm font-sans font-semibold text-left transition-all duration-300 cursor-pointer ${
                                  answers[q.id] === opt.score
                                    ? "bg-gold-500/10 border-gold-500 text-gold-400"
                                    : "bg-navy-950/40 border-white/5 text-navy-200/50 hover:border-white/20 hover:text-white"
                                }`}
                              >
                                {opt.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center pt-4">
                      <button
                        onClick={() => setShowResult(true)}
                        className="px-8 py-3.5 btn-gold rounded-xl font-sans font-bold text-sm sm:text-base cursor-pointer"
                      >
                        Calcular Diagnóstico
                      </button>
                    </div>
                  </div>
                ) : (
                  // DIAGNOSTIC RESULT
                  <div className="grid lg:grid-cols-12 gap-12 items-center animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="lg:col-span-6 space-y-6">
                      <div>
                        <span className="text-xs font-sans text-gold-400 font-bold uppercase tracking-wider">
                          Diagnóstico Contable
                        </span>
                        <h3 className="font-serif text-3xl font-bold text-white mt-1">
                          Tu Nivel de Salud es{" "}
                          <span className={healthStatus.color}>{healthStatus.title}</span>
                        </h3>
                      </div>

                      <p className="font-sans text-navy-200/80 text-sm sm:text-base leading-relaxed">
                        {healthStatus.desc}
                      </p>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setShowResult(false)}
                          className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-white font-sans text-xs sm:text-sm font-semibold rounded hover:bg-white/[0.02] cursor-pointer"
                        >
                          Reiniciar Test
                        </button>
                        <a
                          href="#contact"
                          className="px-6 py-2.5 btn-gold rounded-xl font-sans text-xs sm:text-sm font-bold text-center"
                        >
                          Conversar sobre mi diagnóstico
                        </a>
                      </div>
                    </div>

                    {/* Radial / Bar Chart representation */}
                    <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-navy-950/60 border border-white/5 rounded-2xl shadow-xl">
                      <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                        <div
                          className="absolute inset-0 rounded-full border-[10px] border-white/[0.03]"
                          style={{
                            background: `conic-gradient(var(--color-gold-500) ${totalScore}%, transparent ${totalScore}%)`,
                          }}
                        />
                        <div className="absolute w-[156px] h-[156px] rounded-full bg-navy-950 flex flex-col items-center justify-center border border-white/5">
                          <span className="text-4xl sm:text-5xl font-serif font-extrabold text-white">
                            {totalScore}%
                          </span>
                          <span className="text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold mt-1">
                            Puntaje Contable
                          </span>
                        </div>
                      </div>

                      <div className="w-full max-w-sm space-y-3">
                        <div className="flex justify-between text-xs font-sans text-navy-200/50">
                          <span>0% Riesgo Extremo</span>
                          <span>100% Cumplimiento</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/[0.03] border border-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-1000"
                            style={{ width: `${totalScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
