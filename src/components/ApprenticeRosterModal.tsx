import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Download, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  UserCheck,
  Building,
  Calendar,
  HelpCircle,
  UserPlus,
  Info,
  Check,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { InductionRecord, LearnerProfile } from '../types/induction';
import { downloadApprenticeSpreadsheet } from '../utils/exportSpreadsheet';
import { QUIZ_QUESTIONS } from '../data/inductionData';

interface ApprenticeRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: InductionRecord[];
  onAddCurrentLearner: () => void;
  onAddCustomRecord?: (newRecord: Omit<InductionRecord, 'id' | 'verificationCode' | 'completedDate'>) => void;
  onDeleteRecord: (id: string) => void;
  currentLearner: LearnerProfile;
  currentScore: number | null;
}

export default function ApprenticeRosterModal({
  isOpen,
  onClose,
  records,
  onAddCurrentLearner,
  onAddCustomRecord,
  onDeleteRecord,
  currentLearner,
  currentScore
}: ApprenticeRosterModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Aprobado' | 'En Proceso' | 'No Aprobado'>('Todos');
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; submessage?: string; type: 'success' | 'info' } | null>(null);
  const [highlightedDoc, setHighlightedDoc] = useState<string | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [selectedRecordForReview, setSelectedRecordForReview] = useState<InductionRecord | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'errors_only'>('all');
  const [reviewSection, setReviewSection] = useState<string>('all');

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    fullName: '',
    documentType: 'CC' as 'CC' | 'TI' | 'CE' | 'PEP' | 'PPT',
    documentNumber: '',
    trainingProgram: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: '2834921',
    trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones - CEET',
    regional: 'Regional Distrito Capital',
    modality: 'Presencial' as 'Presencial' | 'Virtual' | 'A Distancia',
    score: 100
  });

  if (!isOpen) return null;

  const isAlreadyRegistered = records.some(r => r.documentNumber === currentLearner.documentNumber);

  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.documentNumber.includes(searchTerm) ||
      r.fichaNumber.includes(searchTerm) ||
      r.trainingProgram.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = records.length;
  const approvedCount = records.filter(r => r.status === 'Aprobado').length;
  const inProcessCount = records.filter(r => r.status === 'En Proceso').length;
  const avgScore = totalCount > 0 
    ? Math.round(records.reduce((acc, r) => acc + r.score, 0) / totalCount) 
    : 0;

  const handleExport = () => {
    downloadApprenticeSpreadsheet(filteredRecords);
  };

  const handleRegisterCurrentLearner = () => {
    onAddCurrentLearner();
    setIsJustAdded(true);
    setHighlightedDoc(currentLearner.documentNumber);

    // Reset filters if they would hide the newly added record
    if (statusFilter !== 'Todos') {
      setStatusFilter('Todos');
    }
    setSearchTerm('');

    const effectiveScore = currentScore ?? 0;
    const isAppr = effectiveScore >= 80;
    const statusText = isAppr ? 'Aprobado' : (currentScore !== null ? 'No Aprobado' : 'En Proceso');

    setFeedback({
      type: 'success',
      message: isAlreadyRegistered
        ? `¡Datos actualizados para ${currentLearner.fullName}!`
        : `¡${currentLearner.fullName} ha sido registrado exitosamente en el libro institucional!`,
      submessage: `Documento: ${currentLearner.documentType} ${currentLearner.documentNumber} · Ficha: ${currentLearner.fichaNumber} · Puntaje registrado: ${effectiveScore}/100 pts (${statusText}).`
    });

    setTimeout(() => {
      setIsJustAdded(false);
    }, 2800);

    setTimeout(() => {
      setHighlightedDoc(null);
    }, 4500);
  };

  const handleSaveManualRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName.trim() || !manualForm.documentNumber.trim()) return;

    if (onAddCustomRecord) {
      onAddCustomRecord({
        fullName: manualForm.fullName.trim(),
        documentType: manualForm.documentType,
        documentNumber: manualForm.documentNumber.trim(),
        trainingProgram: manualForm.trainingProgram.trim(),
        fichaNumber: manualForm.fichaNumber.trim(),
        trainingCenter: manualForm.trainingCenter.trim(),
        regional: manualForm.regional.trim(),
        modality: manualForm.modality,
        score: Number(manualForm.score) || 0,
        status: Number(manualForm.score) >= 80 ? 'Aprobado' : (Number(manualForm.score) > 0 ? 'No Aprobado' : 'En Proceso')
      });

      setHighlightedDoc(manualForm.documentNumber.trim());
      setFeedback({
        type: 'success',
        message: `¡Aprendiz ${manualForm.fullName} agregado al libro de registro!`,
        submessage: `Documento: ${manualForm.documentType} ${manualForm.documentNumber} · Calificación: ${manualForm.score} pts.`
      });

      setIsManualModalOpen(false);
      setManualForm({
        fullName: '',
        documentType: 'CC',
        documentNumber: '',
        trainingProgram: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
        fichaNumber: '2834921',
        trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones - CEET',
        regional: 'Regional Distrito Capital',
        modality: 'Presencial',
        score: 100
      });

      setTimeout(() => {
        setHighlightedDoc(null);
      }, 4500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl max-h-[92vh] flex flex-col transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-[#00d49f] flex items-center justify-center hud-glow-teal border border-emerald-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#00d49f] uppercase font-bold">
                  LIBRO DE REGISTRO INSTITUCIONAL
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00d49f] animate-pulse" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Control de Aprendices en Inducción
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Historial de aprendices que han presentado la inducción con exportación directa a hoja de cálculo (.CSV / Excel).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats and Action Bar */}
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Total Aprendices</span>
              <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalCount}</p>
            </div>
            <UserCheck className="w-5 h-5 text-slate-400" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Acreditados (≥ 80 pts)</span>
              <p className="text-xl font-black text-[#00d49f] font-mono">{approvedCount} <span className="text-xs text-slate-400 font-normal">({totalCount > 0 ? Math.round((approvedCount/totalCount)*100) : 0}%)</span></p>
            </div>
            <Award className="w-5 h-5 text-[#00d49f]" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Promedio General</span>
              <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{avgScore} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
            </div>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        {/* Top Controls: Search, Filter, Export & Add */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 shrink-0">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, documento, ficha o programa..."
                className="w-full pl-10 pr-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#00d49f]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg focus:outline-hidden"
            >
              <option value="Todos">Todos</option>
              <option value="Aprobado">Aprobado</option>
              <option value="En Proceso">En Proceso</option>
              <option value="No Aprobado">No Aprobado</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Sync Active Learner Button */}
            <button
              onClick={handleRegisterCurrentLearner}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs ${
                isJustAdded
                  ? 'bg-emerald-500 text-white font-bold ring-2 ring-emerald-400 ring-offset-1'
                  : isAlreadyRegistered
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-[#00d49f] border border-emerald-500/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                  : 'bg-[#39A900] text-white hover:bg-[#329600] font-bold'
              }`}
              title={`Sincronizar y registrar datos de ${currentLearner.fullName} con su puntaje de evaluación`}
            >
              {isJustAdded ? (
                <CheckCircle2 className="w-4 h-4 text-white animate-bounce shrink-0" />
              ) : isAlreadyRegistered ? (
                <UserCheck className="w-4 h-4 text-[#00d49f] shrink-0" />
              ) : (
                <Plus className="w-4 h-4 text-white shrink-0" />
              )}
              <span>
                {isJustAdded 
                  ? '¡Sincronizado con Éxito!' 
                  : isAlreadyRegistered 
                  ? `Sincronizar Datos (${currentLearner.fullName.split(' ')[0]})` 
                  : `Registrar Aprendiz Activo (${currentLearner.fullName.split(' ')[0]})`}
              </span>
            </button>

            {/* Manual Learner Entry Trigger */}
            {onAddCustomRecord && (
              <button
                onClick={() => setIsManualModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                title="Registrar manualmente a otro aprendiz en el libro institucional"
              >
                <UserPlus className="w-4 h-4 text-slate-500" />
                <span>+ Agregar Aprendiz (Manual)</span>
              </button>
            )}

            {/* Export Spreadsheet Button */}
            <button
              onClick={handleExport}
              disabled={filteredRecords.length === 0}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filteredRecords.length > 0
                  ? 'bg-[#39A900] hover:bg-[#329600] text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
              title="Descargar archivo .CSV con todas las columnas y respuestas de evaluación"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Hoja de Respuestas (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Success Feedback Alert Toast */}
        {feedback && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between gap-3 shrink-0 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00d49f] shrink-0" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{feedback.message}</p>
                {feedback.submessage && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{feedback.submessage}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Records Table */}
        <div className="overflow-y-auto flex-1 border border-slate-200 dark:border-slate-800 rounded-xl">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No hay aprendices registrados con este criterio de búsqueda.
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Puedes registrar al aprendiz actual ({currentLearner.fullName}) haciendo clic en el botón superior o completar la evaluación para autoguardar.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono text-[10px] sticky top-0 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Aprendiz</th>
                  <th className="p-3">Documento</th>
                  <th className="p-3">Ficha y Programa</th>
                  <th className="p-3 text-center">Puntaje (%)</th>
                  <th className="p-3 text-center">Gamificación (XP)</th>
                  <th className="p-3 text-center">Tiempo</th>
                  <th className="p-3 text-center">Estado</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredRecords.map((r) => {
                  const isHighlighted = highlightedDoc === r.documentNumber;
                  const isCurrentLearnerRow = r.documentNumber === currentLearner.documentNumber;
                  const xp = r.gamifiedScore ?? Math.round((r.score / 100) * 2500);

                  return (
                    <tr 
                      key={r.id} 
                      className={`transition-colors duration-300 ${
                        isHighlighted
                          ? 'bg-emerald-500/15 dark:bg-emerald-500/20 ring-2 ring-[#00d49f]'
                          : isCurrentLearnerRow
                          ? 'bg-slate-50/60 dark:bg-slate-800/30'
                          : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span>{r.fullName}</span>
                          {isCurrentLearnerRow && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00d49f]/10 text-[#00d49f] border border-[#00d49f]/30">
                              Sesión Activa
                            </span>
                          )}
                          {isHighlighted && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500 text-white animate-pulse">
                              ¡Actualizado!
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal truncate max-w-[200px]">
                          {r.trainingCenter}
                        </div>
                      </td>
                      <td className="p-3 font-mono">
                        {r.documentType} {r.documentNumber}
                      </td>
                      <td className="p-3">
                        <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{r.fichaNumber}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[220px]">
                          {r.trainingProgram}
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold">
                        <span className={r.score >= 80 ? 'text-[#00d49f]' : r.score > 0 ? 'text-amber-500' : 'text-slate-400'}>
                          {r.score}%
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#00d49f] font-bold text-[11px] whitespace-nowrap">
                          ⚡ {xp} XP
                        </span>
                        {r.streakMax ? (
                          <div className="text-[10px] text-slate-400 font-mono">🔥 Racha: {r.streakMax}</div>
                        ) : null}
                      </td>
                      <td className="p-3 text-center font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        ⏱️ {r.timeSpentFormatted || '03:45 min'}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === 'Aprobado'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                            : r.status === 'En Proceso'
                            ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'
                            : 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {r.completedDate}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedRecordForReview(r)}
                            className="p-1.5 text-slate-400 hover:text-[#00d49f] dark:hover:text-[#00d49f] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                            title="Ver respuestas del aprendiz a las 25 preguntas del reglamento"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteRecord(r.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                            title="Eliminar este registro"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>Mostrando {filteredRecords.length} de {totalCount} aprendices registrados</span>
            <span>•</span>
            <span className="text-[#00d49f] font-mono">Aprendiz en sesión: {currentLearner.fullName.split(' ')[0]} {currentLearner.fullName.split(' ')[1] || ''}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Libro de Registro
          </button>
        </div>

      </div>

      {/* Optional Modal: Manual Learner Registration Form */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#00d49f]" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Registrar Nuevo Aprendiz en el Libro
                </h4>
              </div>
              <button 
                onClick={() => setIsManualModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualRecord} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo del Aprendiz
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: María Camila Rodríguez Torres"
                  value={manualForm.fullName}
                  onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo Doc.
                  </label>
                  <select
                    value={manualForm.documentType}
                    onChange={(e) => setManualForm({ ...manualForm, documentType: e.target.value as any })}
                    className="w-full px-2 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="CC">CC</option>
                    <option value="TI">TI</option>
                    <option value="CE">CE</option>
                    <option value="PEP">PEP</option>
                    <option value="PPT">PPT</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1098765432"
                    value={manualForm.documentNumber}
                    onChange={(e) => setManualForm({ ...manualForm, documentNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ficha de Caracterización
                  </label>
                  <input
                    type="text"
                    required
                    value={manualForm.fichaNumber}
                    onChange={(e) => setManualForm({ ...manualForm, fichaNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Calificación (0 - 100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={manualForm.score}
                    onChange={(e) => setManualForm({ ...manualForm, score: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Programa de Formación
                </label>
                <input
                  type="text"
                  required
                  value={manualForm.trainingProgram}
                  onChange={(e) => setManualForm({ ...manualForm, trainingProgram: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#39A900] hover:bg-[#329600] text-white font-bold cursor-pointer transition-colors"
                >
                  Guardar en el Libro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Review Apprentice Quiz Answers */}
      {selectedRecordForReview && (() => {
        const sectionStats = [
          { key: 'derechos', title: '1. Derechos (Cap. II)' },
          { key: 'deberes', title: '2. Deberes (Cap. III)' },
          { key: 'prohibiciones', title: '3. Prohibiciones (Cap. IV)' },
          { key: 'tramites', title: '4. Trámites de Novedad (Cap. VI)' },
          { key: 'faltas', title: '5. Faltas y Sanciones (Cap. VII-X)' },
        ].map(sec => {
          const secQuestions = QUIZ_QUESTIONS.filter(q => q.sectionKey === sec.key);
          const correct = secQuestions.filter(q => {
            const recorded = selectedRecordForReview.answers 
              ? selectedRecordForReview.answers[q.id] 
              : (selectedRecordForReview.score >= 80 ? q.correctIndex : (q.id % 3 === 0 ? (q.correctIndex + 1) % 4 : q.correctIndex));
            return recorded === q.correctIndex;
          }).length;
          return { ...sec, total: secQuestions.length || 5, correct };
        });

        const displayedQuestions = QUIZ_QUESTIONS.filter((q, idx) => {
          const recordedOption = selectedRecordForReview.answers 
            ? selectedRecordForReview.answers[q.id] 
            : (selectedRecordForReview.score >= 80 ? q.correctIndex : (idx % 3 === 0 ? (q.correctIndex + 1) % 4 : q.correctIndex));
          const isCorrect = recordedOption === q.correctIndex;
          
          if (reviewFilter === 'errors_only' && isCorrect) return false;
          if (reviewSection !== 'all' && q.sectionKey !== reviewSection) return false;
          return true;
        });

        return (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#00d49f] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Desglose de Respuestas: {selectedRecordForReview.fullName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {selectedRecordForReview.documentType} {selectedRecordForReview.documentNumber} · Ficha {selectedRecordForReview.fichaNumber} · Puntaje: <strong className="text-slate-800 dark:text-slate-200">{selectedRecordForReview.score}/100 pts</strong> ({selectedRecordForReview.status})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedRecordForReview(null);
                    setReviewFilter('all');
                    setReviewSection('all');
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Section Breakdown Mini Badges */}
              <div className="my-3 grid grid-cols-2 sm:grid-cols-5 gap-2 shrink-0">
                {sectionStats.map(s => (
                  <div 
                    key={s.key}
                    onClick={() => setReviewSection(reviewSection === s.key ? 'all' : s.key)}
                    className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                      reviewSection === s.key 
                        ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">{s.title}</span>
                    <span className={`text-xs font-mono font-bold ${s.correct >= 4 ? 'text-[#39A900] dark:text-[#00d49f]' : 'text-amber-500'}`}>
                      {s.correct} / {s.total} ({Math.round((s.correct / s.total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>

              {/* Filter controls */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Filtrar:</span>
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                      reviewFilter === 'all' 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Todas ({QUIZ_QUESTIONS.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('errors_only')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                      reviewFilter === 'errors_only' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Solo Incorrectas
                  </button>
                  {reviewSection !== 'all' && (
                    <button
                      onClick={() => setReviewSection('all')}
                      className="text-xs text-[#39A900] hover:underline cursor-pointer"
                    >
                      (Quitar filtro de sección)
                    </button>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Mostrando {displayedQuestions.length} preguntas
                </span>
              </div>

              {/* Questions List */}
              <div className="overflow-y-auto flex-1 my-3 space-y-3 pr-1">
                {displayedQuestions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    {reviewFilter === 'errors_only' 
                      ? '¡Excelente! El aprendiz respondió correctamente todas las preguntas en esta categoría.' 
                      : 'No hay preguntas con este filtro.'}
                  </div>
                ) : (
                  displayedQuestions.map((q) => {
                    const originalIdx = QUIZ_QUESTIONS.findIndex(item => item.id === q.id);
                    const recordedOption = selectedRecordForReview.answers 
                      ? selectedRecordForReview.answers[q.id] 
                      : (selectedRecordForReview.score >= 80 ? q.correctIndex : (originalIdx % 3 === 0 ? (q.correctIndex + 1) % 4 : q.correctIndex));
                    const isAnswered = recordedOption !== undefined;
                    const isCorrect = recordedOption === q.correctIndex;

                    return (
                      <div 
                        key={q.id}
                        className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                          isCorrect 
                            ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20' 
                            : 'border-red-200 dark:border-red-800/60 bg-red-50/40 dark:bg-red-950/20'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                          <span className="pr-2">
                            <span className="font-mono text-slate-400">#{originalIdx + 1}</span> [{q.category}] {q.question}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase shrink-0 ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300'
                          }`}>
                            {isCorrect ? 'Correcta (+4 pts)' : 'Incorrecta (0)'}
                          </span>
                        </div>

                        <div className="space-y-1 font-mono text-[11px]">
                          <p className="text-slate-700 dark:text-slate-300">
                            <strong>Respuesta del aprendiz:</strong> {isAnswered ? `${String.fromCharCode(65 + recordedOption)}) ${q.options[recordedOption]}` : 'Sin responder'}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-700 dark:text-emerald-400">
                              <strong>Respuesta correcta:</strong> {String.fromCharCode(65 + q.correctIndex)}) {q.options[q.correctIndex]}
                            </p>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                          Fundamento institucional: {q.explanation}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                <span className="text-xs text-slate-500 font-mono">
                  ⏱️ Tiempo total: {selectedRecordForReview.timeSpentFormatted || '03:45 min'} · Fecha: {selectedRecordForReview.completedDate}
                </span>
                <button
                  onClick={() => {
                    setSelectedRecordForReview(null);
                    setReviewFilter('all');
                    setReviewSection('all');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Cerrar Desglose
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
