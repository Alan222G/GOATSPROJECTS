import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface CalculatorProps {
  t: any;
}

export function Calculator({ t }: CalculatorProps) {
  const [activeTab, setActiveTab] = useState<"tax" | "health">("tax");

  // --- TAB 1: GUATEMALAN ISR CALCULATOR STATES & LOGIC (QUETZALES) ---
  const [monthlyIncome, setMonthlyIncome] = useState<number>(35000); // Default Q35k

  const calculateIsrTax = (income: number) => {
    let tax = 0;
    let marginalRate = 0;

    if (income <= 30000) {
      tax = income * 0.05;
      marginalRate = 5;
    } else {
      tax = 1500 + (income - 30000) * 0.07;
      marginalRate = 7;
    }

    const netIncome = income - tax;
    const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

    return {
      tax: Math.round(tax),
      net: Math.round(netIncome),
      marginalRate,
      effectiveRate: parseFloat(effectiveRate.toFixed(1)),
    };
  };

  const taxResults = calculateIsrTax(monthlyIncome);

  // --- TAB 2: FINANCIAL HEALTH STATES & LOGIC ---
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleSelectAnswer = (qId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
  };

  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

  const getHealthStatus = (score: number) => {
    if (score >= 80) {
      return {
        title: t.calculator.healthStatus.excellent.title,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        desc: t.calculator.healthStatus.excellent.desc,
      };
    }
    if (score >= 50) {
      return {
        title: t.calculator.healthStatus.vulnerable.title,
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
        desc: t.calculator.healthStatus.vulnerable.desc,
      };
    }
    return {
      title: t.calculator.healthStatus.critical.title,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
      desc: t.calculator.healthStatus.critical.desc,
    };
  };

  const healthStatus = getHealthStatus(totalScore);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
      minimumFractionDigits: 0,
    }).format(val).replace("GTQ", "Q");
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
              {t.calculator.tag}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
              {t.calculator.title}
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
              {t.calculator.tab1}
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`px-6 py-3 rounded-lg text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "health"
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/10"
                  : "text-navy-200/60 hover:text-white"
              }`}
            >
              {t.calculator.tab2}
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
                      {t.calculator.taxTitle}
                    </h3>
                    <p className="font-sans text-navy-200/60 text-sm leading-relaxed">
                      {t.calculator.taxDesc}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="salary-range" className="text-sm font-sans font-semibold text-white/90">
                        {t.calculator.salaryLabel}
                      </label>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-gold-400">
                        {formatCurrency(monthlyIncome)}
                      </span>
                    </div>

                    <input
                      id="salary-range"
                      type="range"
                      min="5000"
                      max="150000"
                      step="1000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
                      className="w-full h-2 bg-navy-900 border border-white/5 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-[10px] font-sans text-navy-200/40">
                      <span>{t.calculator.rangeMin}</span>
                      <span>Q 50k</span>
                      <span>Q 100k</span>
                      <span>{t.calculator.rangeMax}</span>
                    </div>
                  </div>

                  {/* Reference */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-sans text-navy-200/50 leading-relaxed flex gap-3 items-center">
                    <svg className="w-5 h-5 text-gold-500/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {t.calculator.taxReference}
                    </span>
                  </div>
                </div>

                {/* Outputs Panel */}
                <div className="lg:col-span-5 bg-navy-950/60 border border-gold-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-navy-950/30">
                  <h4 className="text-xs font-sans text-white/55 font-bold uppercase tracking-wider border-b border-white/5 pb-3">
                    {t.calculator.resultsTitle}
                  </h4>

                  <div className="space-y-4">
                    {/* Gross Income */}
                    <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                      <span>{t.calculator.resIncome}</span>
                      <span className="text-white font-medium">{formatCurrency(monthlyIncome)}</span>
                    </div>

                    {/* Marginal Rate */}
                    <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                      <span>{t.calculator.resTaxRate}</span>
                      <span className="text-white font-medium">{taxResults.marginalRate}%</span>
                    </div>

                    {/* Effective Rate */}
                    <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                      <span>{t.calculator.resEffectiveRate}</span>
                      <span className="text-gold-400 font-semibold">{taxResults.effectiveRate}%</span>
                    </div>

                    <div className="border-t border-white/5 pt-4 my-2" />

                    {/* Tax CLP */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-sans text-navy-200/80">{t.calculator.resTaxPayable}</span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-rose-400">
                        {formatCurrency(taxResults.tax)}
                      </span>
                    </div>

                    {/* Sueldo Neto CLP */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-sans text-navy-200/85">{t.calculator.resNet}</span>
                      <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-400">
                        {formatCurrency(taxResults.net)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="#contact"
                      className="block w-full text-center py-3 btn-gold rounded-xl font-sans font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      {t.calculator.btnPlan}
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
                        {t.calculator.healthTitle}
                      </h3>
                      <p className="font-sans text-navy-200/60 text-sm max-w-2xl">
                        {t.calculator.healthDesc}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {t.calculator.questions.map((q: any) => (
                        <div key={q.id} className="p-5 bg-white/[0.01] border border-white/5 rounded-xl">
                          <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-4">
                            {q.id}. {q.text}
                          </h4>
                          <div className="grid sm:grid-cols-3 gap-4">
                            {q.options.map((opt: any, oIdx: number) => (
                              <button
                                key={oIdx}
                                type="button"
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
                        {t.calculator.btnCalculate}
                      </button>
                    </div>
                  </div>
                ) : (
                  // DIAGNOSTIC RESULT
                  <div className="grid lg:grid-cols-12 gap-12 items-center animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="lg:col-span-6 space-y-6">
                      <div>
                        <span className="text-xs font-sans text-gold-400 font-bold uppercase tracking-wider">
                          {t.calculator.diagTitle}
                        </span>
                        <h3 className="font-serif text-3xl font-bold text-white mt-1">
                          {t.calculator.diagLevelText}{" "}
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
                          {t.calculator.btnReset}
                        </button>
                        <a
                          href="#contact"
                          className="px-6 py-2.5 btn-gold rounded-xl font-sans text-xs sm:text-sm font-bold text-center"
                        >
                          {t.calculator.btnDiscuss}
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
                            {t.calculator.scoreLabel}
                          </span>
                        </div>
                      </div>

                      <div className="w-full max-w-sm space-y-3">
                        <div className="flex justify-between text-xs font-sans text-navy-200/50">
                          <span>{t.calculator.scoreScaleMin}</span>
                          <span>{t.calculator.scoreScaleMax}</span>
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
