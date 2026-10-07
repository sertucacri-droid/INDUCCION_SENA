import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Sparkles,
  Layers,
  GraduationCap,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { ModuleProgress, LearnerProfile } from '../types/induction';

interface HudTelemetryPanelProps {
  progress: ModuleProgress;
  learner: LearnerProfile;
  onGoToSection: (section: string) => void;
}

export default function HudTelemetryPanel({
  progress,
  learner,
  onGoToSection
}: HudTelemetryPanelProps) {
  const [activeTab, setActiveTab] = useState<'competencias' | 'cronograma'>('competencias');

  // Compute stats
  const completedCount = [
    progress.identity,
    progress.training,
    progress.regulations,
    progress.platforms,
    progress.assessmentScore !== null && progress.assessmentScore >= 80
  ].filter(Boolean).length;

  const totalProgressPercent = Math.round((completedCount / 5) * 100);
  const evaluationScore = progress.assessmentScore ?? 0;
  const isCertified = progress.assessmentScore !== null && progress.assessmentScore >= 80;

  const inductionTimeline = [
    {
      session: 'Estación 1',
      title: 'Apertura e Identidad SENA',
      sectionId: 'identity',
      isDone: progress.identity,
      description: 'Historia institucional, fundador Rodolfo Martínez Tono, escudo, bandera, logotipo e himno.',
      duration: '45 min'
    },
    {
      session: 'Estación 2',
      title: 'Modelo de Formación Profesional Integral',
      sectionId: 'training',
      isDone: progress.training,
      description: 'Aprender a Aprender, Aprender a Hacer y Aprender a Ser. Etapa lectiva y productiva.',
      duration: '60 min'
    },
    {
      session: 'Estación 3',
      title: 'Reglamento del Aprendiz (Acuerdo 007)',
      sectionId: 'regulations',
      isDone: progress.regulations,
      description: 'Apropiación de derechos, deberes, prohibiciones, trámites de novedad y faltas disciplinarias.',
      duration: '90 min'
    },
    {
      session: 'Estación 4',
      title: 'Ecosistema Tecnológico y Bienestar',
      sectionId: 'platforms',
      isDone: progress.platforms,
      description: 'Manejo de Zajuna, SOFIA Plus, Agencia Pública de Empleo (APE) y servicios de Bienestar.',
      duration: '60 min'
    },
    {
      session: 'Estación 5',
      title: 'Evaluación Normativa y Certificación',
      sectionId: 'assessment',
      isDone: isCertified,
      description: 'Prueba de 25 preguntas (5 por sección) con gamificación y emisión de constancia oficial.',
      duration: '45 min'
    }
  ];

  return (
    <div className="w-full my-8 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-[#39A900] dark:text-[#00d49f] shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest text-[#39A900] dark:text-[#00d49f] uppercase font-bold">
                  RUTA FORMATIVA INSTITUCIONAL
                </span>
                <span className="w-2 h-2 rounded-full bg-[#39A900] dark:bg-[#00d49f] animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Consola de Seguimiento y Competencias del Aprendiz
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Aprendiz: <strong className="text-slate-700 dark:text-slate-200">{learner.fullName}</strong> · Ficha: <span className="font-mono">{learner.fichaNumber}</span> · {learner.trainingProgram}
              </p>
            </div>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('competencias')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'competencias'
                  ? 'bg-white dark:bg-slate-900 text-[#39A900] dark:text-[#00d49f] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Progreso & Competencias
            </button>
            <button
              onClick={() => setActiveTab('cronograma')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cronograma'
                  ? 'bg-white dark:bg-slate-900 text-[#39A900] dark:text-[#00d49f] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Cronograma de Inducción
            </button>
          </div>
        </div>

        {/* 3 Main Metric Indicators */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-slate-100 dark:border-slate-800">
          {/* Card 1: Avance Global */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
                Avance Ruta de Inducción
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {totalProgressPercent}%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  ({completedCount}/5 módulos)
                </span>
              </div>
              <div className="w-36 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="h-full bg-[#39A900] dark:bg-[#00d49f] transition-all duration-500 rounded-full"
                  style={{ width: `${totalProgressPercent}%` }}
                />
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#00d49f] flex items-center justify-center font-bold text-sm shrink-0">
              {completedCount === 5 ? <CheckCircle2 className="w-6 h-6" /> : `${completedCount}/5`}
            </div>
          </div>

          {/* Card 2: Evaluación Normativa */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
                Evaluación del Reglamento
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black font-mono ${
                  evaluationScore >= 80 
                    ? 'text-[#39A900] dark:text-[#00d49f]' 
                    : evaluationScore > 0 
                    ? 'text-amber-500' 
                    : 'text-slate-400'
                }`}>
                  {progress.assessmentScore !== null ? `${progress.assessmentScore}%` : 'Sin rendir'}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {isCertified ? 'Aprobado (≥ 80)' : 'Mínimo 80%'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isCertified ? 'Cumple requisito normativo' : '25 preguntas con retroalimentación'}
              </p>
            </div>
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
              isCertified 
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#00d49f]' 
                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Estado de Constancia */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
                Constancia Institucional
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-base font-bold ${
                  isCertified 
                    ? 'text-[#39A900] dark:text-[#00d49f]' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {isCertified ? 'Lista para Descargar' : 'En Formación'}
                </span>
              </div>
              <button
                onClick={() => onGoToSection('assessment')}
                className="text-[11px] font-bold text-[#39A900] dark:text-[#00d49f] hover:underline flex items-center gap-1 cursor-pointer"
              >
                {isCertified ? 'Ver constancia oficial' : 'Ir a la evaluación normativa'}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'competencias' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Identidad */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#00d49f] border border-emerald-500/20">
                  ESTACIÓN 01
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {progress.identity ? (
                    <span className="flex items-center gap-1 text-[#39A900] dark:text-[#00d49f]">
                      <CheckCircle2 className="w-4 h-4" /> Completado
                    </span>
                  ) : (
                    'Pendiente'
                  )}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Identidad y Símbolos SENA
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Apropiación de la historia de fundación (1957), valores corporativos, escudo institucional, bandera y letra del himno del SENA.
              </p>
            </div>
            <button
              onClick={() => onGoToSection('identity')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-800 dark:text-slate-200 hover:text-[#39A900] dark:hover:text-[#00d49f] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{progress.identity ? 'Repasar Contenido' : 'Explorar Módulo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Formación Integral */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#00d49f] border border-emerald-500/20">
                  ESTACIÓN 02
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {progress.training ? (
                    <span className="flex items-center gap-1 text-[#39A900] dark:text-[#00d49f]">
                      <CheckCircle2 className="w-4 h-4" /> Completado
                    </span>
                  ) : (
                    'Pendiente'
                  )}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Modelo Pedagógico (FPI)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Enfoque basado en competencias laborales. Diferenciación de etapa lectiva y etapa productiva (contrato de aprendizaje, pasantías y proyectos).
              </p>
            </div>
            <button
              onClick={() => onGoToSection('training')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-800 dark:text-slate-200 hover:text-[#39A900] dark:hover:text-[#00d49f] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{progress.training ? 'Repasar Contenido' : 'Explorar Módulo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Reglamento del Aprendiz */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#00d49f] border border-emerald-500/20">
                  ESTACIÓN 03
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {progress.regulations ? (
                    <span className="flex items-center gap-1 text-[#39A900] dark:text-[#00d49f]">
                      <CheckCircle2 className="w-4 h-4" /> Completado
                    </span>
                  ) : (
                    'Pendiente'
                  )}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Reglamento del Aprendiz
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Capítulos I al X del Acuerdo 007 de 2012: Derechos fundamentales, deberes, prohibiciones, trámites de novedad, faltas y comité de evaluación.
              </p>
            </div>
            <button
              onClick={() => onGoToSection('regulations')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-800 dark:text-slate-200 hover:text-[#39A900] dark:hover:text-[#00d49f] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{progress.regulations ? 'Repasar Contenido' : 'Explorar Módulo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Plataformas y Bienestar */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#00d49f] border border-emerald-500/20">
                  ESTACIÓN 04
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {progress.platforms ? (
                    <span className="flex items-center gap-1 text-[#39A900] dark:text-[#00d49f]">
                      <CheckCircle2 className="w-4 h-4" /> Completado
                    </span>
                  ) : (
                    'Pendiente'
                  )}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Plataformas & Bienestar
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                LMS Zajuna, SOFIA Plus, APE, Biblioteca SENA, apoyos de sostenimiento, monitorías y plan integral de bienestar al aprendiz.
              </p>
            </div>
            <button
              onClick={() => onGoToSection('platforms')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-800 dark:text-slate-200 hover:text-[#39A900] dark:hover:text-[#00d49f] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{progress.platforms ? 'Repasar Contenido' : 'Explorar Módulo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 5: Evaluación y Certificado */}
          <div className="md:col-span-2 lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-slate-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border border-emerald-500/30 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#39A900] text-white">
                  ESTACIÓN 05 · EVALUACIÓN FINAL
                </span>
                <span className="text-xs font-mono font-bold text-[#39A900] dark:text-[#00d49f]">
                  25 Preguntas · 5 por Sección
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Evaluación Normativa Gamificada y Constancia Oficial
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Demuestra tus conocimientos con retroalimentación inmediata, refuerzo pedagógico en caso de error, temporizador de respuesta, ranking de puntos y emisión de la constancia oficial con código de verificación institucional.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onGoToSection('assessment')}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>{isCertified ? 'Ver / Descargar Constancia' : 'Presentar Evaluación Normativa'}</span>
              </button>
              {isCertified && (
                <span className="text-xs text-[#39A900] dark:text-[#00d49f] font-mono font-bold">
                  ✓ Calificación obtenida: {evaluationScore}%
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Cronograma de Inducción */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-[#39A900] dark:text-[#00d49f]" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Secuencia y Cronograma de las 5 Estaciones de Inducción
            </h4>
          </div>

          <div className="space-y-4">
            {inductionTimeline.map((item, idx) => (
              <div 
                key={item.session}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-400 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                    item.isDone 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                        {item.session}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">⏱️ {item.duration}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {item.title}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    item.isDone 
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {item.isDone ? 'Aprobado' : 'Por Realizar'}
                  </span>
                  <button
                    onClick={() => onGoToSection(item.sectionId)}
                    className="p-2 text-slate-400 hover:text-[#39A900] dark:hover:text-[#00d49f] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title={`Ir a ${item.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
