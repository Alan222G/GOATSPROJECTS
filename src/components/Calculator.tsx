import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface CalculatorProps {
  t: any;
}

type TabType = "isr" | "iva" | "igss" | "health";

export function Calculator({ t }: CalculatorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("isr");
  const [renderTab, setRenderTab] = useState<TabType>("isr");
  const [isFading, setIsFading] = useState(false);

  const isEs = t.calculator.tag === "Asistente Interactivo";

  // --- LOCALIZED STRINGS FOR UPGRADED CALCULATORS ---
  const localT = {
    ivaTitle: isEs ? "Calculadora de IVA de Guatemala" : "Guatemala VAT Calculator",
    ivaDesc: isEs ? "Desglosa facturas comerciales calculando el Impuesto al Valor Agregado (12% IVA) y base neta." : "Break down commercial invoices by calculating the Value Added Tax (12% VAT) and net base.",
    ivaInputLabel: isEs ? "Monto en Quetzales (Q)" : "Amount in Quetzales (Q)",
    ivaTypeLabel: isEs ? "Modalidad de Cálculo" : "Calculation Mode",
    ivaIncl: isEs ? "Monto con IVA Incluido (Calcular Base)" : "Amount with VAT Included (Calculate Base)",
    ivaExcl: isEs ? "Monto Neto Sin IVA (Calcular Impuesto)" : "Net Amount Without VAT (Calculate Tax)",
    ivaNet: isEs ? "Monto Neto (Base)" : "Net Amount (Base)",
    ivaVal: isEs ? "IVA (12%)" : "VAT (12%)",
    ivaGross: isEs ? "Monto Total Facturado" : "Total Invoiced Amount",
    ivaExplanationIncl: isEs 
      ? "Cálculo: El monto se divide entre 1.12 para obtener la base neta y el residuo es el 12% de IVA."
      : "Calculation: The amount is divided by 1.12 to obtain the net base, and the difference is the 12% VAT.",
    ivaExplanationExcl: isEs 
      ? "Cálculo: El monto se multiplica por 12% para obtener el IVA, sumándose para el total facturado."
      : "Calculation: The amount is multiplied by 12% to obtain the VAT, added together for the total invoiced.",
    
    igssTitle: isEs ? "Calculadora de Planilla e IGSS" : "Payroll & IGSS Calculator",
    igssDesc: isEs ? "Calcula las cuotas del Instituto Guatemalteco de Seguridad Social (IGSS), IRTRA e INTECAP." : "Calculate the contributions for the Guatemalan Social Security Institute (IGSS), IRTRA, and INTECAP.",
    igssSalaryLabel: isEs ? "Salario Mensual del Colaborador (Q)" : "Employee Monthly Salary (Q)",
    igssWorkerTitle: isEs ? "Aportes del Trabajador" : "Employee Contributions",
    igssWorkerDesc: isEs ? "Deducciones legales aplicadas directamente al salario." : "Legal deductions applied directly to the salary.",
    igssWorkerIgss: isEs ? "Cuota Laboral IGSS (4.83%)" : "IGSS Employee Share (4.83%)",
    igssWorkerNet: isEs ? "Salario Neto Recibido" : "Net Take-Home Salary",
    
    igssEmployerTitle: isEs ? "Costos del Patrono" : "Employer Costs",
    igssEmployerDesc: isEs ? "Aportaciones de seguridad social y capacitación empresarial." : "Social security contributions and corporate training funds.",
    igssEmployerIgss: isEs ? "Cuota Patronal IGSS (10.67%)" : "IGSS Employer Share (10.67%)",
    igssEmployerIrtra: isEs ? "Aporte IRTRA (1.00%)" : "IRTRA Contribution (1.00%)",
    igssEmployerIntecap: isEs ? "Aporte INTECAP (1.00%)" : "INTECAP Contribution (1.00%)",
    igssEmployerTotal: isEs ? "Total Aportes Patronales (12.67%)" : "Total Employer Cost (12.67%)",
    igssEmployerCost: isEs ? "Costo Mensual Total de Contratación" : "Total Monthly Payroll Cost",
    
    btnDiscuss: isEs ? "Planificar mi Gestión Tributaria" : "Plan My Tax Management",
    btnQuote: isEs ? "Cotizar Gestión de Planilla" : "Quote Payroll Outsourcing",
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === renderTab) return;
    setIsFading(true);
    setTimeout(() => {
      setRenderTab(tab);
      setActiveTab(tab);
      setIsFading(false);
    }, 200); // match animation speed
  };

  // --- TAB 1: ISR CALCULATOR ---
  const [monthlyIncome, setMonthlyIncome] = useState<number>(35000);

  const calculateIsrTax = (income: number) => {
    let tax = 0;
    let marginalRate = 0;
    let baseTax = 0;
    let excessTax = 0;

    if (income <= 30000) {
      tax = income * 0.05;
      marginalRate = 5;
      excessTax = tax;
    } else {
      baseTax = 1500;
      excessTax = (income - 30000) * 0.07;
      tax = baseTax + excessTax;
      marginalRate = 7;
    }

    const netIncome = income - tax;
    const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

    return {
      tax: Math.round(tax),
      net: Math.round(netIncome),
      marginalRate,
      baseTax,
      excessTax: Math.round(excessTax),
      effectiveRate: parseFloat(effectiveRate.toFixed(1)),
    };
  };

  const taxResults = calculateIsrTax(monthlyIncome);

  // --- TAB 2: VAT CALCULATOR ---
  const [ivaAmount, setIvaAmount] = useState<number>(10000);
  const [ivaType, setIvaType] = useState<"included" | "excluded">("included");

  const calculateIva = (amount: number, type: "included" | "excluded") => {
    let net = 0;
    let vat = 0;
    let gross = 0;

    if (type === "included") {
      gross = amount;
      net = amount / 1.12;
      vat = gross - net;
    } else {
      net = amount;
      vat = amount * 0.12;
      gross = net + vat;
    }

    return {
      net: parseFloat(net.toFixed(2)),
      vat: parseFloat(vat.toFixed(2)),
      gross: parseFloat(gross.toFixed(2)),
    };
  };

  const ivaResults = calculateIva(ivaAmount, ivaType);

  // --- TAB 3: IGSS / PAYROLL CALCULATOR ---
  const [monthlySalary, setMonthlySalary] = useState<number>(12000);

  const calculateIgss = (salary: number) => {
    const workerIgss = salary * 0.0483;
    const workerNet = salary - workerIgss;

    const employerIgss = salary * 0.1067;
    const employerIrtra = salary * 0.01;
    const employerIntecap = salary * 0.01;
    const employerTotal = employerIgss + employerIrtra + employerIntecap;
    const totalCost = salary + employerTotal;

    return {
      workerIgss: parseFloat(workerIgss.toFixed(2)),
      workerNet: parseFloat(workerNet.toFixed(2)),
      employerIgss: parseFloat(employerIgss.toFixed(2)),
      employerIrtra: parseFloat(employerIrtra.toFixed(2)),
      employerIntecap: parseFloat(employerIntecap.toFixed(2)),
      employerTotal: parseFloat(employerTotal.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
    };
  };

  const igssResults = calculateIgss(monthlySalary);

  // --- TAB 4: FINANCIAL HEALTH ---
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
          <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-navy-950/80 border border-white/5 backdrop-blur-md gap-1">
            <button
              onClick={() => handleTabChange("isr")}
              className={`px-4 py-2.5 rounded-lg text-xs font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "isr"
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/10"
                  : "text-navy-200/60 hover:text-white"
              }`}
            >
              {t.calculator.tabIsr}
            </button>
            <button
              onClick={() => handleTabChange("iva")}
              className={`px-4 py-2.5 rounded-lg text-xs font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "iva"
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/10"
                  : "text-navy-200/60 hover:text-white"
              }`}
            >
              {t.calculator.tabIva}
            </button>
            <button
              onClick={() => handleTabChange("igss")}
              className={`px-4 py-2.5 rounded-lg text-xs font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "igss"
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/10"
                  : "text-navy-200/60 hover:text-white"
              }`}
            >
              {t.calculator.tabIgss}
            </button>
            <button
              onClick={() => handleTabChange("health")}
              className={`px-4 py-2.5 rounded-lg text-xs font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "health"
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/10"
                  : "text-navy-200/60 hover:text-white"
              }`}
            >
              {t.calculator.tabHealth}
            </button>
          </div>
        </div>

        {/* Tab Contents Container with Smooth Fading transition */}
        <ScrollReveal delay={200} direction="up">
          <div className="glow-card glass p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl min-h-[400px]">
            <div className={`transition-all duration-300 ease-out ${isFading ? "opacity-0 scale-[0.98] blur-xs" : "opacity-100 scale-100 blur-none"}`}>
              
              {/* --- 1. SIMULADOR ISR --- */}
              {renderTab === "isr" && (
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <label htmlFor="salary-range" className="text-sm font-sans font-semibold text-white/90">
                          {t.calculator.salaryLabel}
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-gold-500 font-sans font-bold text-lg">Q</span>
                          <input
                            type="number"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(Math.max(0, parseInt(e.target.value) || 0))}
                            className="bg-navy-950/80 border border-white/10 rounded-lg px-3 py-1.5 text-right font-serif font-bold text-gold-400 w-32 focus:outline-none focus:border-gold-500 transition-colors"
                          />
                        </div>
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
                        <span>Q 50,000</span>
                        <span>Q 100,000</span>
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
                      <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                        <span>{t.calculator.resIncome}</span>
                        <span className="text-white font-medium">{formatCurrency(monthlyIncome)}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                        <span>{t.calculator.resTaxRate}</span>
                        <span className="text-white font-medium">{taxResults.marginalRate}%</span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                        <span>{t.calculator.resEffectiveRate}</span>
                        <span className="text-gold-400 font-semibold">{taxResults.effectiveRate}%</span>
                      </div>

                      {/* Step by Step Breakdown */}
                      {monthlyIncome > 30000 && (
                        <div className="bg-white/[0.02] rounded-lg p-3 text-xs space-y-1 text-navy-200/50 font-sans border border-white/5">
                          <div className="flex justify-between">
                            <span>{isEs ? "Importe Fijo (Primeros Q30k)" : "Fixed Import (First Q30k)"}</span>
                            <span>{formatCurrency(1500)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{isEs ? "Excedente al 7%" : "Excess at 7%"} ({formatCurrency(monthlyIncome - 30000)})</span>
                            <span>{formatCurrency(taxResults.excessTax)}</span>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-white/5 pt-4 my-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-sans text-navy-200/80">{t.calculator.resTaxPayable}</span>
                        <span className="font-serif text-lg sm:text-xl font-bold text-rose-400">
                          {formatCurrency(taxResults.tax)}
                        </span>
                      </div>

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
                        {localT.btnDiscuss}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. CALCULADORA IVA (12%) --- */}
              {renderTab === "iva" && (
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 space-y-8">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                        {localT.ivaTitle}
                      </h3>
                      <p className="font-sans text-navy-200/60 text-sm leading-relaxed">
                        {localT.ivaDesc}
                      </p>
                    </div>

                    {/* Mode Selector */}
                    <div className="space-y-3">
                      <span className="text-xs font-sans font-bold text-white/50 uppercase tracking-wider block">
                        {localT.ivaTypeLabel}
                      </span>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIvaType("included")}
                          className={`p-4 rounded-xl border text-xs sm:text-sm font-sans font-semibold text-left transition-all duration-300 cursor-pointer flex flex-col gap-1 ${
                            ivaType === "included"
                              ? "bg-gold-500/10 border-gold-500 text-gold-400"
                              : "bg-navy-950/40 border-white/5 text-navy-200/50 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span>{isEs ? "IVA Incluido" : "VAT Included"}</span>
                          <span className="text-[10px] font-medium opacity-60">{localT.ivaIncl}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIvaType("excluded")}
                          className={`p-4 rounded-xl border text-xs sm:text-sm font-sans font-semibold text-left transition-all duration-300 cursor-pointer flex flex-col gap-1 ${
                            ivaType === "excluded"
                              ? "bg-gold-500/10 border-gold-500 text-gold-400"
                              : "bg-navy-950/40 border-white/5 text-navy-200/50 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span>{isEs ? "Más IVA" : "Plus VAT"}</span>
                          <span className="text-[10px] font-medium opacity-60">{localT.ivaExcl}</span>
                        </button>
                      </div>
                    </div>

                    {/* Value Input */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-sans font-semibold text-white/90">
                          {localT.ivaInputLabel}
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-gold-500 font-sans font-bold text-lg">Q</span>
                          <input
                            type="number"
                            value={ivaAmount}
                            onChange={(e) => setIvaAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="bg-navy-950/80 border border-white/10 rounded-lg px-3 py-1.5 text-right font-serif font-bold text-gold-400 w-36 focus:outline-none focus:border-gold-500 transition-colors"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="50000"
                        step="500"
                        value={ivaAmount > 50000 ? 50000 : ivaAmount}
                        onChange={(e) => setIvaAmount(parseInt(e.target.value))}
                        className="w-full h-2 bg-navy-900 border border-white/5 rounded-lg appearance-none cursor-pointer accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-sans text-navy-200/50 leading-relaxed flex gap-3 items-center">
                      <svg className="w-5 h-5 text-gold-500/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        {ivaType === "included" ? localT.ivaExplanationIncl : localT.ivaExplanationExcl}
                      </span>
                    </div>
                  </div>

                  {/* Outputs Panel */}
                  <div className="lg:col-span-5 bg-navy-950/60 border border-gold-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-navy-950/30">
                    <h4 className="text-xs font-sans text-white/55 font-bold uppercase tracking-wider border-b border-white/5 pb-3">
                      {isEs ? "Desglose Fiscal Factura" : "Tax Invoice Breakdown"}
                    </h4>

                    <div className="space-y-4">
                      {/* Net base */}
                      <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                        <span>{localT.ivaNet}</span>
                        <span className="text-white font-semibold">{formatCurrency(ivaResults.net)}</span>
                      </div>

                      {/* VAT 12% */}
                      <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                        <span>{localT.ivaVal}</span>
                        <span className="text-rose-400 font-semibold">{formatCurrency(ivaResults.vat)}</span>
                      </div>

                      <div className="border-t border-white/5 pt-4 my-2" />

                      {/* Total invoiced */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-sans text-navy-200/85">{localT.ivaGross}</span>
                        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-400">
                          {formatCurrency(ivaResults.gross)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="#contact"
                        className="block w-full text-center py-3 btn-gold rounded-xl font-sans font-bold text-xs sm:text-sm cursor-pointer"
                      >
                        {localT.btnDiscuss}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3. CALCULADORA IGSS / PLANILLA --- */}
              {renderTab === "igss" && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                        {localT.igssTitle}
                      </h3>
                      <p className="font-sans text-navy-200/60 text-sm leading-relaxed">
                        {localT.igssDesc}
                      </p>
                    </div>

                    {/* Salary Input */}
                    <div className="bg-navy-950/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-center min-w-[280px]">
                      <label className="text-xs font-sans font-bold text-white/50 uppercase tracking-wider mb-2">
                        {localT.igssSalaryLabel}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-gold-500 font-sans font-bold text-2xl">Q</span>
                        <input
                          type="number"
                          value={monthlySalary}
                          onChange={(e) => setMonthlySalary(Math.max(0, parseInt(e.target.value) || 0))}
                          className="bg-transparent border-b border-white/10 py-1 font-serif font-bold text-2xl text-gold-400 w-full focus:outline-none focus:border-gold-500 transition-colors text-right"
                        />
                      </div>
                      <input
                        type="range"
                        min="3500"
                        max="60000"
                        step="500"
                        value={monthlySalary > 60000 ? 60000 : monthlySalary}
                        onChange={(e) => setMonthlySalary(parseInt(e.target.value))}
                        className="w-full h-1.5 mt-4 accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Worker breakdown */}
                    <div className="bg-navy-950/40 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                          <div>
                            <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                              {localT.igssWorkerTitle}
                            </h4>
                            <p className="text-[10px] font-sans text-navy-200/40 mt-0.5">{localT.igssWorkerDesc}</p>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-navy-500/10 border border-navy-500/20 text-navy-300 font-sans text-[10px] font-bold uppercase tracking-wider">
                            {isEs ? "Colaborador" : "Employee"}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                            <span>{isEs ? "Salario Mensual Bruto" : "Gross Monthly Salary"}</span>
                            <span className="text-white font-medium">{formatCurrency(monthlySalary)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                            <span>{localT.igssWorkerIgss}</span>
                            <span className="text-rose-400 font-semibold">-{formatCurrency(igssResults.workerIgss)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="border-t border-white/5 pt-4 mb-4" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-sans text-navy-200/80 font-bold">{localT.igssWorkerNet}</span>
                          <span className="font-serif text-xl sm:text-2xl font-extrabold text-emerald-400">
                            {formatCurrency(igssResults.workerNet)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Employer breakdown */}
                    <div className="bg-navy-950/60 border border-gold-500/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl">
                      <div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                          <div>
                            <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                              {localT.igssEmployerTitle}
                            </h4>
                            <p className="text-[10px] font-sans text-navy-200/40 mt-0.5">{localT.igssEmployerDesc}</p>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 font-sans text-[10px] font-bold uppercase tracking-wider">
                            {isEs ? "Patrono" : "Employer"}
                          </span>
                        </div>

                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                            <span>{isEs ? "Sueldo Base" : "Base Salary"}</span>
                            <span className="text-white font-medium">{formatCurrency(monthlySalary)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                            <span>{localT.igssEmployerIgss}</span>
                            <span className="text-rose-400 font-medium">+{formatCurrency(igssResults.employerIgss)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                            <span>{localT.igssEmployerIrtra}</span>
                            <span className="text-rose-400 font-medium">+{formatCurrency(igssResults.employerIrtra)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm font-sans text-navy-200/60">
                            <span>{localT.igssEmployerIntecap}</span>
                            <span className="text-rose-400 font-medium">+{formatCurrency(igssResults.employerIntecap)}</span>
                          </div>
                          <div className="bg-white/[0.01] rounded-lg p-2.5 text-xs text-navy-200/40 flex justify-between font-sans border border-white/5 mt-2">
                            <span>{localT.igssEmployerTotal}</span>
                            <span className="font-semibold text-rose-400">+{formatCurrency(igssResults.employerTotal)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="border-t border-white/5 pt-4 mb-4" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-sans text-navy-200/85 font-bold">{localT.igssEmployerCost}</span>
                          <span className="font-serif text-xl sm:text-2xl font-extrabold text-gold-400">
                            {formatCurrency(igssResults.totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <a
                      href="#contact"
                      className="px-8 py-3.5 btn-gold rounded-xl font-sans font-bold text-xs sm:text-sm cursor-pointer shadow-lg hover:shadow-gold-500/10"
                    >
                      {localT.btnQuote}
                    </a>
                  </div>
                </div>
              )}

              {/* --- 4. DIAGNOSTICO DE SALUD FINANCIERA --- */}
              {renderTab === "health" && (
                <div>
                  {!showResult ? (
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                          {t.calculator.healthTitle}
                        </h3>
                        <p className="font-sans text-navy-200/60 text-sm max-w-2xl leading-relaxed">
                          {t.calculator.healthDesc}
                        </p>
                      </div>

                      <div className="space-y-6">
                        {t.calculator.questions.map((q: any) => (
                          <div key={q.id} className="p-5 bg-white/[0.01] border border-white/5 rounded-xl transition-all duration-300 hover:border-white/10">
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
                                      ? "bg-gold-500/10 border-gold-500 text-gold-400 shadow-md shadow-gold-500/5"
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
                          className="px-8 py-3.5 btn-gold rounded-xl font-sans font-bold text-xs sm:text-sm cursor-pointer shadow-lg hover:shadow-gold-500/10"
                        >
                          {t.calculator.btnCalculate}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // DIAGNOSTIC RESULT
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-500">
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
                            className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-white font-sans text-xs font-semibold rounded hover:bg-white/[0.02] cursor-pointer transition-colors"
                          >
                            {t.calculator.btnReset}
                          </button>
                          <a
                            href="#contact"
                            className="px-6 py-2.5 btn-gold rounded-xl font-sans text-xs sm:text-sm font-bold text-center flex items-center justify-center cursor-pointer"
                          >
                            {t.calculator.btnDiscuss}
                          </a>
                        </div>
                      </div>

                      {/* Radial representation */}
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
