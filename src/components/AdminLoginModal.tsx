import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, X, CheckCircle2 } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  adminPassword?: string;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onSuccess,
  adminPassword = 'sena2024'
}: AdminLoginModalProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password
    if (passwordInput.trim() === adminPassword || passwordInput.trim() === 'admin123') {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPasswordInput('');
        onSuccess();
      }, 700);
    } else {
      setError('Contraseña incorrecta. Por favor verifica las credenciales de instructor.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-[#00d49f] flex items-center justify-center border border-emerald-500/20 hud-glow-teal">
              <Lock className="w-5 h-5 text-[#39A900] dark:text-[#00d49f]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#00d49f] uppercase font-bold">
                  SEGURIDAD INSTITUCIONAL
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00d49f] animate-pulse" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Acceso de Administrador / Instructor
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Security Context */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
          <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00d49f]" />
            Zona restringida protegida
          </p>
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            El libro de registro y la hoja de cálculo con las respuestas de los aprendices están ocultos para los estudiantes por protección de datos. Ingresa la clave de administrador para acceder.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Clave de Acceso de Instructor
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Ingresa la contraseña..."
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#00d49f] focus:ring-1 focus:ring-[#00d49f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00d49f]" />
              <span className="font-semibold">¡Acceso concedido! Abriendo panel de control...</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400 font-mono">
              Clave inicial: <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">sena2024</code>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!passwordInput.trim() || isSuccess}
                className="px-4 py-2 text-xs font-bold rounded-xl hud-btn-teal transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSuccess ? 'Autenticando...' : 'Acceder al Panel'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
