import React, { useState } from 'react';
import { 
  Laptop, 
  Heart, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Dumbbell, 
  Palette, 
  Users2, 
  Coins, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PLATFORMS_DATA, WELLBEING_DIMENSIONS } from '../data/inductionData';

interface PlatformsWellbeingModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNextModule: () => void;
}

export default function PlatformsWellbeingModule({
  isCompleted,
  onToggleComplete,
  onNextModule
}: PlatformsWellbeingModuleProps) {
  const [activeTab, setActiveTab] = useState<'plataformas' | 'bienestar'>('plataformas');
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>(PLATFORMS_DATA[0].id);

  const activePlatform = PLATFORMS_DATA.find(p => p.id === selectedPlatformId) || PLATFORMS_DATA[0];

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <span>Módulo 4</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#39A900] dark:text-[#48C309]">Ecosistema y Apoyo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Plataformas Tecnológicas y Bienestar al Aprendiz
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Familiarízate con las herramientas digitales del SENA (Zajuna, SOFIA Plus, Biblioteca SBS) y los servicios de acompañamiento biopsicosocial y apoyos económicos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#39A900]' : 'text-slate-300'}`} />
              <span>{isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('plataformas')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'plataformas' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Plataformas Digitales SENA
          </button>
          <button
            onClick={() => setActiveTab('bienestar')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'bienestar' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Plan de Bienestar al Aprendiz
          </button>
        </div>
      </div>

      {/* Tab 1: Plataformas Tecnológicas */}
      {activeTab === 'plataformas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Platform selection list */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                Herramientas Institucionales
              </span>
              {PLATFORMS_DATA.map((plat) => {
                const isSelected = selectedPlatformId === plat.id;
                return (
                  <button
                    key={plat.id}
                    onClick={() => setSelectedPlatformId(plat.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-[#39A900] dark:border-[#48C309] bg-emerald-50/70 dark:bg-emerald-950/60 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{plat.name}</span>
                      <span className="text-[10px] font-semibold text-[#39A900] dark:text-[#48C309] bg-emerald-100/60 dark:bg-emerald-950 px-2 py-0.5 rounded-sm">
                        {plat.tagline}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block truncate">
                      {plat.urlText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Platform Card */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] flex items-center justify-center">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                    Acceso Oficial
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activePlatform.name}</h3>
                  <p className="text-xs font-semibold text-[#39A900] dark:text-[#48C309]">{activePlatform.tagline}</p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activePlatform.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-2">
                    Funciones y Procedimientos Clave:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activePlatform.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-[#39A900] dark:bg-[#48C309]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Portal: https://{activePlatform.urlText}
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Uso con credenciales Soy SENA</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bienestar al Aprendiz */}
      {activeTab === 'bienestar' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 transition-colors duration-300">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#48C309]">
              <Heart className="w-4 h-4" />
              <span>Desarrollo Humano Integral</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Las Dimensiones de Bienestar al Aprendiz
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              El SENA no solo brinda formación para el trabajo, sino que acompaña al aprendiz en su salud mental, cultura, liderazgo y apoyo económico para evitar la deserción.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WELLBEING_DIMENSIONS.map((dim, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-[#39A900]/40 transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309]">
                    {idx === 0 && <Heart className="w-4 h-4" />}
                    {idx === 1 && <Dumbbell className="w-4 h-4" />}
                    {idx === 2 && <Palette className="w-4 h-4" />}
                    {idx === 3 && <Users2 className="w-4 h-4" />}
                    {idx === 4 && <Coins className="w-4 h-4" />}
                    {idx === 5 && <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{dim.title}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {dim.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">¿Cómo acceder a los Apoyos de Sostenimiento?</h4>
            <p className="leading-relaxed text-emerald-950 dark:text-emerald-200">
              Cada trimestre los centros abren convocatorias a través de la oficina de Bienestar al Aprendiz. Los requisitos principales son: pertenecer a estratos socioeconómicos 1 o 2, no tener contrato de aprendizaje vigente ni otro beneficio estatal incompatible, y registrar un excelente rendimiento académico y disciplinario.
            </p>
          </div>
        </div>
      )}

      {/* Navigation footer */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors duration-300">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente módulo formativo: Evaluación Final y Certificación de Inducción
        </span>
        <button
          onClick={onNextModule}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span>Ir a Evaluación y Certificado</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
