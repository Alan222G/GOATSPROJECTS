import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function Contact() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<"empresa" | "persona" | "">("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset single field error
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep2 = () => {
    let valid = true;
    const errors = { name: "", email: "", phone: "" };

    if (formData.name.trim().length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Ingrese un correo electrónico válido";
      valid = false;
    }

    // Chilean phone format check or generic digits check (at least 8 numbers)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      errors.phone = "Ingrese un número telefónico de contacto válido";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (profile && serviceNeeded) {
        setStep(2);
      }
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Simulate server request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#0b132b] to-[#070b19] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <ScrollReveal delay={100} direction="down">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Hablemos
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
              Inicia tu Transformación
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="up">
            <div className="w-16 h-[2px] bg-gold-500 mx-auto mt-6" />
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal delay={200} direction="left">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
                Contacto Corporativo
              </h3>
              <p className="font-sans text-navy-200/60 text-sm sm:text-base leading-relaxed mb-8">
                Agenda una sesión inicial de diagnóstico sin costo con nuestros consultores expertos para evaluar tus requerimientos fiscales y contables.
              </p>

              <div className="space-y-6">
                {/* Email detail */}
                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-white/[0.02] border border-white/5 group-hover:border-gold-500/30 rounded-xl flex items-center justify-center text-gold-400 group-hover:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold mb-1">
                      Correo Electrónico
                    </span>
                    <a href="mailto:contacto@proserco.com" className="text-white hover:text-gold-400 transition-colors font-sans font-semibold text-sm sm:text-base">
                      contacto@proserco.com
                    </a>
                  </div>
                </div>

                {/* Phone detail */}
                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-white/[0.02] border border-white/5 group-hover:border-gold-500/30 rounded-xl flex items-center justify-center text-gold-400 group-hover:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold mb-1">
                      Central Telefónica
                    </span>
                    <a href="tel:+56223456789" className="text-white hover:text-gold-400 transition-colors font-sans font-semibold text-sm sm:text-base">
                      +56 2 2345 6789
                    </a>
                  </div>
                </div>

                {/* Office detail */}
                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-white/[0.02] border border-white/5 group-hover:border-gold-500/30 rounded-xl flex items-center justify-center text-gold-400 group-hover:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold mb-1">
                      Casa Matriz
                    </span>
                    <span className="text-white font-sans font-semibold text-sm sm:text-base">
                      Av. Apoquindo 3400, Las Condes. Santiago, Chile.
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 w-full">
            <ScrollReveal delay={300} direction="right">
              <div className="glass p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative min-h-[480px] flex flex-col justify-between">
                
                {isSubmitted ? (
                  // Success State
                  <div className="flex-grow flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/20">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                      ¡Consulta Recibida!
                    </h3>
                    <p className="font-sans text-navy-200/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                      Muchas gracias, <strong>{formData.name}</strong>. Un consultor senior de PROSERCO revisará tu solicitud de <strong>{serviceNeeded}</strong> y te contactará a <strong>{formData.email}</strong> en un lapso de 2 horas hábiles.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                        setProfile("");
                        setServiceNeeded("");
                        setFormData({ name: "", email: "", phone: "", message: "" });
                      }}
                      className="mt-8 px-6 py-2.5 border border-white/10 hover:border-gold-500/30 text-white hover:text-gold-400 font-sans text-xs sm:text-sm font-semibold rounded cursor-pointer"
                    >
                      Enviar otra Consulta
                    </button>
                  </div>
                ) : (
                  // Form State
                  <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">
                    
                    {/* Form Header / Step Indicator */}
                    <div className="mb-8 flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <span className="text-xs font-sans text-gold-400 font-bold uppercase tracking-wider block">
                          Paso {step} de 2
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                          {step === 1 ? "Requerimientos Iniciales" : "Detalles de Contacto"}
                        </h4>
                      </div>
                      <div className="flex gap-1">
                        <span className={`w-6 h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? "bg-gold-500" : "bg-white/10"}`} />
                        <span className={`w-6 h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? "bg-gold-500" : "bg-white/10"}`} />
                      </div>
                    </div>

                    {/* Step 1 Content */}
                    {step === 1 && (
                      <div className="space-y-6 flex-grow animate-in fade-in duration-300">
                        {/* Profile selector */}
                        <div>
                          <label className="block text-xs font-sans text-white/55 font-bold uppercase tracking-wider mb-3">
                            1. ¿A quién representa?
                          </label>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setProfile("empresa")}
                              className={`p-4 rounded-xl border text-left font-sans font-semibold transition-all duration-300 cursor-pointer ${
                                profile === "empresa"
                                  ? "bg-gold-500/10 border-gold-500 text-gold-400"
                                  : "bg-navy-950/40 border-white/5 text-navy-200/50 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <span className="block text-sm sm:text-base text-white">Empresa</span>
                              <span className="block text-[10px] font-normal text-navy-200/50 mt-1">Persona Jurídica o Startup</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setProfile("persona")}
                              className={`p-4 rounded-xl border text-left font-sans font-semibold transition-all duration-300 cursor-pointer ${
                                profile === "persona"
                                  ? "bg-gold-500/10 border-gold-500 text-gold-400"
                                  : "bg-navy-950/40 border-white/5 text-navy-200/50 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <span className="block text-sm sm:text-base text-white">Persona Natural</span>
                              <span className="block text-[10px] font-normal text-navy-200/50 mt-1">Profesionales o Rentistas</span>
                            </button>
                          </div>
                        </div>

                        {/* Service needed */}
                        <div>
                          <label className="block text-xs font-sans text-white/55 font-bold uppercase tracking-wider mb-3">
                            2. Servicio de mayor interés
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Auditoría", "Contabilidad", "Planificación Fiscal", "Consultoría M&A"].map((service) => (
                              <button
                                key={service}
                                type="button"
                                onClick={() => setServiceNeeded(service)}
                                className={`p-3 rounded-lg border text-xs sm:text-sm font-sans font-semibold text-center transition-all duration-300 cursor-pointer ${
                                  serviceNeeded === service
                                    ? "bg-gold-500/10 border-gold-500 text-gold-400"
                                    : "bg-navy-950/40 border-white/5 text-navy-200/40 hover:border-white/20 hover:text-white"
                                }`}
                              >
                                {service}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2 Content */}
                    {step === 2 && (
                      <div className="space-y-5 flex-grow animate-in fade-in duration-300">
                        {/* Name */}
                        <div>
                          <label htmlFor="name-input" className="block text-xs font-sans text-white/60 font-semibold uppercase tracking-wider mb-2">
                            Nombre Completo
                          </label>
                          <input
                            id="name-input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ej. Juan Pérez"
                            className={`w-full px-4 py-3 bg-navy-950/60 border rounded-xl text-white font-sans text-sm focus:outline-none focus:border-gold-500 transition-colors ${
                              formErrors.name ? "border-rose-500/60 bg-rose-500/5" : "border-white/5"
                            }`}
                          />
                          {formErrors.name && (
                            <span className="text-[10px] font-sans text-rose-400 mt-1.5 block">
                              {formErrors.name}
                            </span>
                          )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Email */}
                          <div>
                            <label htmlFor="email-input" className="block text-xs font-sans text-white/60 font-semibold uppercase tracking-wider mb-2">
                              Correo Electrónico
                            </label>
                            <input
                              id="email-input"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="ejemplo@correo.com"
                              className={`w-full px-4 py-3 bg-navy-950/60 border rounded-xl text-white font-sans text-sm focus:outline-none focus:border-gold-500 transition-colors ${
                                formErrors.email ? "border-rose-500/60 bg-rose-500/5" : "border-white/5"
                              }`}
                            />
                            {formErrors.email && (
                              <span className="text-[10px] font-sans text-rose-400 mt-1.5 block">
                                {formErrors.email}
                              </span>
                            )}
                          </div>

                          {/* Phone */}
                          <div>
                            <label htmlFor="phone-input" className="block text-xs font-sans text-white/60 font-semibold uppercase tracking-wider mb-2">
                              Teléfono Móvil
                            </label>
                            <input
                              id="phone-input"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Ej. +56 9 1234 5678"
                              className={`w-full px-4 py-3 bg-navy-950/60 border rounded-xl text-white font-sans text-sm focus:outline-none focus:border-gold-500 transition-colors ${
                                formErrors.phone ? "border-rose-500/60 bg-rose-500/5" : "border-white/5"
                              }`}
                            />
                            {formErrors.phone && (
                              <span className="text-[10px] font-sans text-rose-400 mt-1.5 block">
                                {formErrors.phone}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message-input" className="block text-xs font-sans text-white/60 font-semibold uppercase tracking-wider mb-2">
                            Coméntanos brevemente sobre tu proyecto (Opcional)
                          </label>
                          <textarea
                            id="message-input"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Cuéntanos en qué podemos ayudarte..."
                            rows={3}
                            className="w-full px-4 py-3 bg-navy-950/60 border border-white/5 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step Actions */}
                    <div className="flex gap-4 pt-8 border-t border-white/5 mt-8">
                      {step === 2 && (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-3 border border-white/10 hover:border-white/20 text-white font-sans text-sm font-semibold rounded-xl hover:bg-white/[0.02] active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                          Atrás
                        </button>
                      )}

                      {step === 1 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!profile || !serviceNeeded}
                          className="flex-grow py-3.5 bg-gradient-to-r from-gold-600 to-gold-400 disabled:opacity-40 disabled:hover:scale-100 disabled:pointer-events-none text-navy-950 font-sans font-bold text-sm sm:text-base rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-center"
                        >
                          Continuar
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-grow py-3.5 bg-gradient-to-r from-gold-600 to-gold-400 disabled:opacity-50 text-navy-950 font-sans font-bold text-sm sm:text-base rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-3"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-navy-950" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Procesando...</span>
                            </>
                          ) : (
                            <span>Enviar Solicitud</span>
                          )}
                        </button>
                      )}
                    </div>

                  </form>
                )}

              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
