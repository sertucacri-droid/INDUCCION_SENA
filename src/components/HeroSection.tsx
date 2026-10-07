import React from 'react';
import { ArrowRight, Compass, CheckCircle2, Award, Landmark, Users } from 'lucide-react';
import { LearnerProfile, ModuleProgress } from '../types/induction';
import { SENA_LOGO_SVG } from '../assets/senaLogo';

interface HeroSectionProps {
  learner: LearnerProfile;
  progress: ModuleProgress;
  onStartInduction: () => void;
  onOpenProfile: () => void;
}

export default function HeroSection({
  learner,
  progress,
  onStartInduction,
  onOpenProfile
}: HeroSectionProps) {
  const completedCount = [
    progress.identity,
    progress.training,
    progress.regulations,
    progress.platforms,
    progress.assessmentScore !== null && progress.assessmentScore >= 80
  ].filter(Boolean).length;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <img
                src={SENA_LOGO_SVG}
                alt="Logo SENA"
                className="w-[30px] h-[30px] object-contain shrink-0"
              />
              <span className="text-[#39A900] dark:text-[#48C309] font-bold">SENA Colombia</span>
              <span aria-hidden="true">·</span>
              <span>Decreto Ley 118 de 1957</span>
              <span aria-hidden="true">·</span>
              <span>Formación Profesional Integral</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight text-balance">
              Bienvenido a tu Inducción Institucional SENA
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Inicias tu camino como aprendiz en la institución más querida por los colombianos.
              Apropia la misión, los símbolos, el modelo pedagógico, el reglamento y el ecosistema de bienestar
              que impulsarán tu proyecto de vida y desarrollo laboral.
            </p>

            {/* Personalized greeting block */}
            <div className="p-4 rounded-2xl hud-card-bevel flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#00d49f] animate-pulse" />
                  <p className="text-xs font-mono text-[#00d49f] font-semibold uppercase tracking-wider">Aprendiz Activo en Formación</p>
                </div>
                <p className="text-sm font-bold text-white">
                  {learner.fullName} · {learner.trainingProgram}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  Ficha: {learner.fichaNumber} · {learner.regional}
                </p>
              </div>
              <button
                onClick={onOpenProfile}
                className="hud-btn-dark px-4 py-2 rounded-full text-xs font-semibold self-start sm:self-center cursor-pointer"
              >
                Configurar Perfil
              </button>
            </div>

            {/* CTAs with metallic capsule buttons from UI kit */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartInduction}
                className="hud-btn-teal flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>Comenzar Proceso de Inducción</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="hud-pill-tag text-xs text-slate-300 flex items-center gap-2 px-4 py-2 rounded-full font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#00d49f]" />
                <span>Inducción: {completedCount}/5 Estaciones ({Math.round((completedCount / 5) * 100)}%)</span>
              </div>
            </div>

            {/* Verified Institutional Proof Points */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">117</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Centros de Formación</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">33</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Regionales en el país</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">100%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Educación Gratuita</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md bg-slate-900">
              <img
                src="/src/assets/images/sena_campus_hero_1791319375311.jpg"
                alt="Ambiente de formación tecnológica y aprendices del SENA colaborando"
                className="w-full h-72 sm:h-96 object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container ensures zero broken image frame
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="image-fallback hidden absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-900 p-8 flex flex-col justify-end text-white">
                <Landmark className="w-12 h-12 text-[#39A900] mb-3" />
                <h4 className="text-lg font-bold">Servicio Nacional de Aprendizaje - SENA</h4>
                <p className="text-xs text-emerald-100/80">Conocimiento y empleo para todos los colombianos</p>
              </div>

              {/* Scrim overlay with institutional motto */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block mb-1">
                  Orgullo Institucional
                </span>
                <p className="text-sm font-medium leading-snug">
                  "El futuro de la patria está en las manos del joven que se forja en el trabajo digno y creador."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
