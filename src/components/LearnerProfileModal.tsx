import React, { useState } from 'react';
import { X, CheckCircle2, User, Award, Building, FileText, Sparkles } from 'lucide-react';
import { LearnerProfile, ModuleProgress } from '../types/induction';

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  learner: LearnerProfile;
  progress: ModuleProgress;
  onSaveProfile: (updated: LearnerProfile) => void;
}

const COMMON_PROGRAMS = [
  'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  'Técnico en Programación de Software',
  'Tecnólogo en Gestión Empresarial',
  'Técnico en Contabilización de Operaciones Comerciales y Financieras',
  'Tecnólogo en Gestión de Redes de Datos',
  'Tecnólogo en Producción Multimedia',
  'Técnico en Mantenimiento de Motores Diésel',
  'Técnico en Servicios Farmacéuticos',
  'Tecnólogo en Gestión Logística',
  'Tecnólogo en Animación 3D'
];

const COMMON_CENTERS = [
  'Centro de Electricidad, Electrónica y Telecomunicaciones - CEET (Bogotá)',
  'Centro de Servicios Financieros - CSF (Bogotá)',
  'Centro de Gestión de Mercados, Logística y TI (Bogotá)',
  'Centro de Tecnología de la Manufactura Avanzada (Medellín)',
  'Centro de Comercio y Servicios (Regional Antioquia)',
  'Centro de Teleinformática y Producción Industrial (Popayán)',
  'Centro Náutico Pesquero (Buenaventura)',
  'Centro para el Desarrollo Tecnológico de la Construcción y el Centro (Armenia)',
  'Centro Nacional Colombo Alemán (Barranquilla)'
];

export default function LearnerProfileModal({
  isOpen,
  onClose,
  learner,
  progress,
  onSaveProfile
}: LearnerProfileModalProps) {
  const [formData, setFormData] = useState<LearnerProfile>({ ...learner });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  const completedCount = [
    progress.identity,
    progress.training,
    progress.regulations,
    progress.platforms,
    progress.assessmentScore !== null && progress.assessmentScore >= 80
  ].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Perfil del Aprendiz SENA</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configura tus datos oficiales para tu Acta y Certificado de Inducción</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress pill overview */}
        <div className="my-5 p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estado de Inducción</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {completedCount} de 5 módulos completados ({Math.round((completedCount / 5) * 100)}%)
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#39A900] dark:bg-[#48C309] h-full transition-all duration-500 rounded-full"
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
            {progress.assessmentScore !== null && (
              <span className="text-xs font-bold text-[#39A900] dark:text-[#48C309] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                Nota: {progress.assessmentScore}/100
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nombre Completo del Aprendiz *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Ej. Andrés Felipe Morales Rodríguez"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900] focus:ring-1 focus:ring-[#39A900]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tipo Documento *
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900]"
              >
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                placeholder="Ej. 1020304050"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Programa de Formación *
              </label>
              <input
                type="text"
                required
                list="programs-list"
                value={formData.trainingProgram}
                onChange={(e) => setFormData({ ...formData, trainingProgram: e.target.value })}
                placeholder="Ej. Tecnólogo en Análisis y Desarrollo de Software (ADSO)"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900]"
              />
              <datalist id="programs-list">
                {COMMON_PROGRAMS.map((prog, idx) => (
                  <option key={idx} value={prog} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ficha de Caracterización *
              </label>
              <input
                type="text"
                required
                value={formData.fichaNumber}
                onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                placeholder="Ej. 2834921"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Centro de Formación *
              </label>
              <input
                type="text"
                required
                list="centers-list"
                value={formData.trainingCenter}
                onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                placeholder="Centro de Formación SENA"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900]"
              />
              <datalist id="centers-list">
                {COMMON_CENTERS.map((cntr, idx) => (
                  <option key={idx} value={cntr} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Regional *
              </label>
              <input
                type="text"
                required
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                placeholder="Ej. Regional Distrito Capital"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900]"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg transition-colors shadow-xs"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>¡Datos Guardados!</span>
                </>
              ) : (
                <span>Guardar Perfil</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
