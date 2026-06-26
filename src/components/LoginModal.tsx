import React, { useState, useEffect } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userEmail: string) => void;
  t: any;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess, t }: LoginModalProps) {
  const [email, setEmail] = useState("cliente@empresa.com");
  const [password, setPassword] = useState("proserco2026");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError(t.login.errorEmpty);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes("@") && password.length >= 4) {
        onLoginSuccess(email);
        onClose();
      } else {
        setError(t.login.errorInvalid);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#050814]/90 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass bg-navy-950/95 border border-gold-500/30 rounded-2xl p-8 shadow-2xl shadow-gold-500/10 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 hover:border-gold-500/50 flex items-center justify-center text-white/60 hover:text-gold-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label={t.common.close}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/40 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold-500/5">
            <span className="text-gold-500 font-serif font-bold text-2xl">P</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            {t.login.title}
          </h3>
          <p className="font-sans text-navy-200/50 text-xs mt-1">
            {t.login.subtitle}
          </p>
        </div>

        {/* Demo Credentials alert */}
        <div className="mb-6 p-3.5 bg-gold-500/5 border border-gold-500/20 rounded-xl text-left">
          <span className="block text-[10px] font-sans text-gold-400 font-bold uppercase tracking-wider mb-1">
            {t.login.demoTitle}
          </span>
          <p className="font-sans text-navy-200/60 text-xs leading-relaxed">
            {t.login.demoDesc}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-xs font-sans text-white/65 font-semibold uppercase tracking-wider mb-2">
              {t.login.labelEmail}
            </label>
            <div className="relative">
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@empresa.com"
                className="w-full px-4 py-3 bg-navy-950/60 border border-white/5 focus:border-gold-500 rounded-xl text-white font-sans text-sm focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block text-xs font-sans text-white/65 font-semibold uppercase tracking-wider mb-2">
              {t.login.labelPass}
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-navy-950/60 border border-white/5 focus:border-gold-500 rounded-xl text-white font-sans text-sm focus:outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-200/40 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs text-rose-400 font-sans mt-2 text-center">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center text-xs font-sans text-navy-200/50 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-gold-500 rounded bg-navy-900 border-white/5" defaultChecked />
              <span>{t.login.chkRemember}</span>
            </label>
            <a href="#" className="hover:text-gold-400 transition-colors">
              {t.login.btnForgot}
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-4 btn-gold rounded-xl font-sans font-bold text-sm flex items-center justify-center gap-3 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-navy-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{t.login.btnValidating}</span>
              </>
            ) : (
              <span>{t.login.btnSubmit}</span>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <span className="text-xs font-sans text-navy-200/40">
            {t.login.noPortalText}{" "}
            <a href="#contact" onClick={onClose} className="text-gold-400 font-semibold hover:underline">
              {t.login.noPortalLink}
            </a>
          </span>
        </div>

      </div>
    </div>
  );
}
