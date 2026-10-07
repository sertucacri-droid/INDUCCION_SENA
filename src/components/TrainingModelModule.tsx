import React, { useState } from 'react';
import { 
  Brain, 
  Wrench, 
  Heart, 
  CheckCircle2, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  ArrowRight,
  ChevronRight,
  BookOpen,
  Award
} from 'lucide-react';
import { TRAINING_MODEL_DATA } from '../data/inductionData';

interface TrainingModelModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNextModule: () => void;
}

export default function TrainingModelModule({
  isCompleted,
  onToggleComplete,
  onNextModule
}: TrainingModelModuleProps) {
  const [activeStage, setActiveStage] = useState<'lectiva' | 'productiva'>('lectiva');
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);
  const [selectedDimension, setSelectedDimension] = useState<string>('Saber');

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <span>Módulo 2</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#39A900] dark:text-[#48C309]">Modelo Pedagógico</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Formación Profesional Integral (FPI) y Ruta Formativa
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Descubre cómo se aprende en el SENA a través del enfoque por competencias, el aprendizaje basado en proyectos y las dos etapas clave de tu carrera.
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
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#39A900] dark:text-[#48C309]' : 'text-slate-300'}`} />
              <span>{isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Las 3 Dimensiones de la Competencia (Saber, Saber Hacer, Saber Ser) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 transition-colors duration-300">
        <div>
          <span className="text-xs font-semibold text-[#39A900] dark:text-[#48C309] uppercase tracking-wider">
            Enfoque por Competencias
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Las Tres Dimensiones del Desarrollo Humano Integral
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            En el SENA no solo adquieres conocimientos teóricos; forjas destrezas prácticas y principios de convivencia ciudadana para el mundo productivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRAINING_MODEL_DATA.fpi.dimensions.map((dim) => {
            const isSelected = selectedDimension === dim.key;
            return (
              <button
                key={dim.key}
                onClick={() => setSelectedDimension(dim.key)}
                className={`text-left p-5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-[#39A900] dark:border-[#48C309] bg-emerald-50/50 dark:bg-emerald-950/40 shadow-xs ring-1 ring-[#39A900]/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#39A900] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                    {dim.key === 'Saber' && <Brain className="w-5 h-5" />}
                    {dim.key === 'Saber Hacer' && <Wrench className="w-5 h-5" />}
                    {dim.key === 'Saber Ser' && <Heart className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {dim.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{dim.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {dim.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Las Dos Etapas de la Formación: Lectiva vs Productiva */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#39A900] dark:text-[#48C309] uppercase tracking-wider">
              Ciclo Académico
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Las Dos Etapas de tu Programa de Formación
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setActiveStage('lectiva')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeStage === 'lectiva' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1. Etapa Lectiva
            </button>
            <button
              onClick={() => setActiveStage('productiva')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeStage === 'productiva' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2. Etapa Productiva
            </button>
          </div>
        </div>

        {activeStage === 'lectiva' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#39A900] dark:text-[#48C309]" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Etapa Lectiva: Construcción del Saber</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Durante esta fase asistes a los ambientes de aprendizaje (presenciales o virtuales en Zajuna). Tu aprendizaje se estructura alrededor de <strong>Guías de Aprendizaje</strong> e instructores técnicos, de transversalidad (inglés, TIC, ética, seguridad y salud en el trabajo) y emprendimiento.
              </p>
              
              <div className="pt-2">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Dinámicas Clave en la Etapa Lectiva:
                </h5>
                <div className="space-y-2">
                  {TRAINING_MODEL_DATA.stages[0].keyActivities?.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#39A900] dark:text-[#48C309] flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                        ✓
                      </span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Evaluación en el SENA</span>
                <h5 className="text-base font-bold text-slate-900 dark:text-white mt-1">Resultados de Aprendizaje (RAP)</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  No se evalúa con notas numéricas tradicionales de 1 a 5. Se emite un juicio evaluativo:
                </p>
                <div className="mt-4 space-y-2">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
                    <strong className="text-emerald-800 dark:text-emerald-300">A - Aprobado:</strong> <span className="text-emerald-900 dark:text-emerald-200">El aprendiz evidenció el logro completo del resultado de aprendizaje según los criterios.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs">
                    <strong className="text-amber-800 dark:text-amber-300">D - No Aprobado (Deficiente):</strong> <span className="text-amber-900 dark:text-amber-200">Requiere concertar un Plan de Mejoramiento para alcanzar los estándares requeridos.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/70 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <Briefcase className="w-4 h-4 text-[#39A900] dark:text-[#48C309]" />
                <span>Consolidación en el Entorno Real de Trabajo</span>
              </div>
              <p className="text-xs text-emerald-900/80 dark:text-emerald-200/80 mt-1">
                La Etapa Productiva es obligatoria para graduarte. Te permite aplicar el 100% de lo aprendido con acompañamiento de un instructor de seguimiento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRAINING_MODEL_DATA.stages[1].modalities?.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 space-y-2">
                  <span className="text-xs font-bold text-[#39A900] dark:text-[#48C309] block">{mod.name}</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{mod.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Las 5 Fases del Proyecto Formativo (Simulador de Ruta) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 transition-colors duration-300">
        <div>
          <span className="text-xs font-semibold text-[#39A900] dark:text-[#48C309] uppercase tracking-wider">
            Estrategia Didáctica Activa
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Las 5 Fases del Proyecto Formativo
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            En el SENA todo el programa se desarrolla a través de un proyecto real que resuelve un problema del sector productivo. Haz clic en cada fase para ver sus entregables:
          </p>
        </div>

        {/* Phase stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TRAINING_MODEL_DATA.projectPhases.map((phase, idx) => {
            const isSelected = selectedPhaseIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedPhaseIndex(idx)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-[#39A900] dark:border-[#48C309] bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#39A900] dark:text-[#48C309] block">
                  Paso {idx + 1}
                </span>
                <span className="text-xs font-bold block truncate">
                  {phase.phase.split(':')[1] || phase.phase}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail of active phase */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {TRAINING_MODEL_DATA.projectPhases[selectedPhaseIndex].phase}
            </h4>
            <span className="text-xs font-bold text-[#39A900] dark:text-[#48C309] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
              Fase Activa
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Propósito Formativo</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {TRAINING_MODEL_DATA.projectPhases[selectedPhaseIndex].objective}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Entregable o Evidencia Principal</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {TRAINING_MODEL_DATA.projectPhases[selectedPhaseIndex].deliverable}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors duration-300">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente módulo formativo: Reglamento del Aprendiz SENA
        </span>
        <button
          onClick={onNextModule}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span>Ir a Reglamento del Aprendiz</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
