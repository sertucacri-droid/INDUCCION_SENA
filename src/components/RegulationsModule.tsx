import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  HelpCircle,
  ChevronRight,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { REGULATIONS_DATA, CASE_STUDIES } from '../data/inductionData';

interface RegulationsModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNextModule: () => void;
}

export default function RegulationsModule({
  isCompleted,
  onToggleComplete,
  onNextModule
}: RegulationsModuleProps) {
  const [activeTab, setActiveTab] = useState<'derechos' | 'deberes' | 'medidas' | 'casos'>('derechos');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);
  const [answeredCases, setAnsweredCases] = useState<Record<string, number>>({});

  const activeCase = CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];
  const userOptionIndex = answeredCases[activeCase.id];

  const handleSelectCaseOption = (optionIndex: number) => {
    setAnsweredCases(prev => ({
      ...prev,
      [activeCase.id]: optionIndex
    }));
  };

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <span>Módulo 3</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#39A900] dark:text-[#48C309]">Marco Normativo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Reglamento del Aprendiz SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Conoce tus derechos fundamentales, tus deberes como futuro profesional, las faltas tipificadas y resuelve dilemas prácticos de la vida institucional.
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

        {/* Tab switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('derechos')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'derechos' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Derechos del Aprendiz
          </button>
          <button
            onClick={() => setActiveTab('deberes')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'deberes' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Deberes Institucionales
          </button>
          <button
            onClick={() => setActiveTab('medidas')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'medidas' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Faltas y Medidas Formativas
          </button>
          <button
            onClick={() => setActiveTab('casos')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'casos' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Simulador de Casos Reales ({Object.keys(answeredCases).length}/{CASE_STUDIES.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Derechos */}
      {activeTab === 'derechos' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 transition-colors duration-300">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#48C309]">
            <ShieldCheck className="w-4 h-4" />
            <span>Garantías Constitucionales e Institucionales</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Tus Derechos como Aprendiz del SENA
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            El Estado y el SENA garantizan que tu proceso formativo se desarrolle en condiciones dignas, transparentes y de alta calidad técnica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {REGULATIONS_DATA.rights.map((right, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#39A900] dark:text-[#48C309] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {right}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48C309] shrink-0" />
            <span>Todos los aprendices cuentan con derecho al <strong>Debido Proceso</strong> frente a cualquier llamado de atención o comité de evaluación.</span>
          </div>
        </div>
      )}

      {/* Tab 2: Deberes */}
      {activeTab === 'deberes' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 transition-colors duration-300">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#48C309]">
            <Scale className="w-4 h-4" />
            <span>Responsabilidad y Convivencia</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Tus Deberes en la Comunidad Formativa
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Ser aprendiz SENA es un honor y una responsabilidad social. El cumplimiento de tus deberes garantiza el bienestar colectivo y tu excelencia profesional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {REGULATIONS_DATA.duties.map((duty, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {duty}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span><strong>Regla de oro:</strong> Recuerda que el carné institucional es obligatorio y visible para acceder a cualquier sede del SENA en el país.</span>
          </div>
        </div>
      )}

      {/* Tab 3: Medidas Formativas */}
      {activeTab === 'medidas' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Clasificación de Faltas y Medidas Formativas
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              El proceso formativo del SENA es de carácter pedagógico y busca siempre la formación integral, pero contempla medidas correctivas cuando se vulneran las normas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {REGULATIONS_DATA.faultTypes.map((ft, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-xs font-bold text-[#39A900] dark:text-[#48C309] block mb-1">{ft.type}</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ft.definition}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                Escala de Medidas Formativas y Sanciones:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {REGULATIONS_DATA.measures.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Nivel {idx + 1} · {m.type}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Simulador de Casos Prácticos */}
      {activeTab === 'casos' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#39A900] dark:text-[#48C309] uppercase tracking-wider">
                Simulador Pedagógico
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Dilemas del Aprendiz: ¿Qué harías en estas situaciones?
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Casos resueltos: {Object.keys(answeredCases).length} de {CASE_STUDIES.length}
            </span>
          </div>

          {/* Case selector chips */}
          <div className="flex flex-wrap gap-2">
            {CASE_STUDIES.map((c, idx) => {
              const isCurrent = c.id === selectedCaseId;
              const hasAnswered = answeredCases[c.id] !== undefined;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    isCurrent
                      ? 'border-[#39A900] dark:border-[#48C309] bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309]'
                      : hasAnswered
                      ? 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Caso {idx + 1}</span>
                  {hasAnswered && <span className="ml-1.5 text-xs text-[#39A900] dark:text-[#48C309]">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Active Case Card */}
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{activeCase.title}</h4>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                Rol: {activeCase.role}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-800/90 p-4 rounded-lg border border-slate-200 dark:border-slate-700/60">
              {activeCase.situation}
            </p>

            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Selecciona la actuación correspondiente según el Reglamento:
              </span>
              {activeCase.options.map((opt, optIdx) => {
                const isSelected = userOptionIndex === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectCaseOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all ${
                      isSelected
                        ? opt.isCorrect
                          ? 'border-[#39A900] dark:border-[#48C309] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-medium'
                          : 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-100 font-medium'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? opt.isCorrect ? 'bg-[#39A900] text-white' : 'bg-red-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Immediate explanation feedback */}
            {userOptionIndex !== undefined && (
              <div className={`p-4 rounded-lg border text-xs leading-relaxed mt-4 ${
                activeCase.options[userOptionIndex].isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <strong>Retroalimentación normativa:</strong> {activeCase.options[userOptionIndex].feedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation footer */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors duration-300">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente módulo formativo: Plataformas Tecnológicas y Bienestar
        </span>
        <button
          onClick={onNextModule}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span>Ir a Plataformas y Bienestar</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
