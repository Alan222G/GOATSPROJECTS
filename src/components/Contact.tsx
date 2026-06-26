import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface ContactProps {
  t: any;
}

export function Contact({ t }: ContactProps) {
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

  // Dynamic Pre-filled Links (Updated for Guatemala office & mail details)
  const mailSubject = encodeURIComponent(t.contact.tag);
  const mailBody = encodeURIComponent("Estimado equipo de PROSERCO,\n\nMe pongo en contacto con ustedes a través de su sitio web para solicitar más detalles sobre sus servicios corporativos.\n\nAtentamente,\n[Su Nombre]");
  const gmailUrl = `mailto:contacto@proserco.com?subject=${mailSubject}&body=${mailBody}`;

  const waMessage = encodeURIComponent("Hola PROSERCO, vengo de su sitio web y me gustaría programar una sesión inicial de diagnóstico gratuito para nuestra empresa.");
  const whatsappUrl = `https://wa.me/50255481234?text=${waMessage}`; // Updated mobile code for Guatemala (+502)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep2 = () => {
    let valid = true;
    const errors = { name: "", email: "", phone: "" };

    if (formData.name.trim().length < 3) {
      errors.name = t.contact.errors.name;
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = t.contact.errors.email;
      valid = false;
    }

    // Guatemalan phone checks (8 digits)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      errors.phone = t.contact.errors.phone;
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleNextStep = () => {
    if (step === 1 && profile && serviceNeeded) {
      setStep(2);
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#0b132b] to-[#050814] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <ScrollReveal delay={100} direction="down">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              {t.contact.tag}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
              {t.contact.title}
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
                {t.contact.subtitle}
              </h3>
              <p className="font-sans text-navy-200/60 text-sm sm:text-base leading-relaxed mb-8">
                {t.contact.desc}
              </p>

              <div className="space-y-6">
                {/* Email detail (Gmail redirect) */}
                <a
                  href={gmailUrl}
                  className="flex gap-4 items-start p-4 bg-white/[0.01] border border-white/5 hover:border-gold-500/30 rounded-2xl group transition-all duration-300 cursor-pointer block"
                >
                  <div className="w-12 h-12 bg-[#ea4335]/10 border border-[#ea4335]/20 group-hover:border-[#ea4335]/50 rounded-xl flex items-center justify-center text-[#ea4335] group-hover:scale-105 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold mb-1">
                      {t.contact.channelEmail}
                    </span>
                    <span className="text-white group-hover:text-gold-400 transition-colors font-sans font-semibold text-sm sm:text-base">
                      contacto@proserco.com
                    </span>
                    <span className="block text-[11px] text-navy-200/30 font-sans mt-0.5">
                      {t.contact.channelEmailSub}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Link integration */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-start p-4 bg-white/[0.01] border border-white/5 hover:border-gold-500/30 rounded-2xl group transition-all duration-300 cursor-pointer block"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/50 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-all duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.903 1.48 5.485 0 9.948-4.471 9.951-9.968.002-2.661-1.034-5.163-2.915-7.047C16.71 1.732 14.218.694 11.562.694c-5.489 0-9.956 4.472-9.959 9.97-.001 1.83.5 3.585 1.455 5.093l-1.026 3.75 3.848-1.012c1.472.8 3.123 1.22 4.767 1.22zM17.48 14.86c-.3-.15-1.782-.88-2.062-.982-.28-.102-.484-.15-.69.155-.204.311-.79.982-.967 1.189-.18.205-.357.23-.656.08-1.516-.76-2.483-1.34-3.473-3.036-.263-.45.263-.42.75-.1.442.29.622.656.802.766.18.11.09.215-.045.365-.135.15-.454.504-.557.625-.102.12-.204.135-.503-.015-.3-.15-1.27-.47-2.417-1.493-.896-.8-1.5-1.787-1.677-2.088-.178-.3-.02-.462.13-.611.135-.135.3-.347.45-.52.15-.173.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.69-1.666-.948-2.28-.25-.6-.52-.52-.71-.53-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.4-.29.32-1.12 1.1-1.12 2.685 0 1.585 1.15 3.12 1.31 3.33.16.21 2.27 3.47 5.5 4.87.77.33 1.37.53 1.84.68.77.24 1.48.21 2.04.12.63-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.12-.26-.18-.56-.33z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold mb-1">
                      {t.contact.channelWa}
                    </span>
                    <span className="text-white group-hover:text-gold-400 transition-colors font-sans font-semibold text-sm sm:text-base">
                      +502 5548 1234
                    </span>
                    <span className="block text-[11px] text-navy-200/30 font-sans mt-0.5">
                      {t.contact.channelWaSub}
                    </span>
                  </div>
                </a>

                {/* Office detail */}
                <div className="flex gap-4 items-start p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/20 rounded-xl flex items-center justify-center text-gold-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans text-navy-200/40 uppercase tracking-widest font-bold mb-1">
                      {t.contact.officeTitle}
                    </span>
                    <span className="text-white font-sans font-semibold text-sm sm:text-base">
                      {t.contact.officeDesc}
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
                      {t.contact.successTitle}
                    </h3>
                    <p className="font-sans text-navy-200/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                      {t.contact.successDesc
                        .replace("{name}", formData.name)
                        .replace("{service}", serviceNeeded)
                        .replace("{email}", formData.email)}
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
                      {t.contact.btnNewConsult}
                    </button>
                  </div>
                ) : (
                  // Form State
                  <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">
                    
                    {/* Form Header / Step Indicator */}
                    <div className="mb-8 flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <span className="text-xs font-sans text-gold-400 font-bold uppercase tracking-wider block">
                          {t.contact.stepLabel.replace("{step}", step.toString())}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                          {step === 1 ? t.contact.stepTitle1 : t.contact.stepTitle2}
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
                            {t.contact.q1Label}
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
                              <span className="block text-sm sm:text-base text-white">{t.contact.profileOpt1}</span>
                              <span className="block text-[10px] font-normal text-navy-200/50 mt-1">{t.contact.profileOpt1Sub}</span>
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
                              <span className="block text-sm sm:text-base text-white">{t.contact.profileOpt2}</span>
                              <span className="block text-[10px] font-normal text-navy-200/50 mt-1">{t.contact.profileOpt2Sub}</span>
                            </button>
                          </div>
                        </div>

                        {/* Service needed */}
                        <div>
                          <label className="block text-xs font-sans text-white/55 font-bold uppercase tracking-wider mb-3">
                            {t.contact.q2Label}
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {t.services.list.map((service: any) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => setServiceNeeded(service.title)}
                                className={`p-3 rounded-lg border text-xs sm:text-sm font-sans font-semibold text-center transition-all duration-300 cursor-pointer ${
                                  serviceNeeded === service.title
                                    ? "bg-gold-500/10 border-gold-500 text-gold-400"
                                    : "bg-navy-950/40 border-white/5 text-navy-200/40 hover:border-white/20 hover:text-white"
                                }`}
                              >
                                {service.title}
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
                            {t.contact.inputName}
                          </label>
                          <input
                            id="name-input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t.contact.inputNamePlace}
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
                              {t.contact.inputEmail}
                            </label>
                            <input
                              id="email-input"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder={t.contact.inputEmailPlace}
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
                              {t.contact.inputPhone}
                            </label>
                            <input
                              id="phone-input"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder={t.contact.inputPhonePlace}
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
                            {t.contact.inputMessage}
                          </label>
                          <textarea
                            id="message-input"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder={t.contact.inputMessagePlace}
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
                          {t.contact.btnBack}
                        </button>
                      )}

                      {step === 1 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!profile || !serviceNeeded}
                          className="flex-grow py-3.5 btn-gold disabled:opacity-40 disabled:hover:scale-100 disabled:pointer-events-none rounded-xl text-navy-950 font-sans font-bold text-sm sm:text-base cursor-pointer text-center"
                        >
                          {t.contact.btnContinue}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-grow py-3.5 btn-gold disabled:opacity-50 rounded-xl text-navy-950 font-sans font-bold text-sm sm:text-base cursor-pointer text-center flex items-center justify-center gap-3"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-navy-950" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>{t.common.submitting}</span>
                            </>
                          ) : (
                            <span>{t.contact.btnSubmit}</span>
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
