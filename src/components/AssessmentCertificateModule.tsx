import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Download, 
  Sparkles, 
  AlertCircle,
  FileBadge2,
  Calendar,
  Building,
  Timer,
  Flame,
  Trophy,
  Medal,
  Zap,
  Clock,
  User,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  AlertTriangle,
  Play,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { LearnerProfile, ModuleProgress, InductionRecord } from '../types/induction';
import { QUIZ_QUESTIONS, INSTITUTIONAL_INFO } from '../data/inductionData';
import { SENA_LOGO_SVG } from '../assets/senaLogo';

interface AssessmentCertificateModuleProps {
  learner: LearnerProfile;
  progress: ModuleProgress;
  records: InductionRecord[];
  onUpdateLearner: (updated: LearnerProfile) => void;
  onUpdateScore: (
    score: number, 
    answers?: Record<number, number>,
    gamifiedData?: {
      timeSpentSeconds?: number;
      timeSpentFormatted?: string;
      gamifiedScore?: number;
      streakMax?: number;
      updatedLearner?: LearnerProfile;
    }
  ) => void;
  onOpenProfile: () => void;
}

const REGULATION_SECTIONS = [
  { key: 'derechos', title: '1. Derechos', range: 'Preguntas 1 - 5' },
  { key: 'deberes', title: '2. Deberes', range: 'Preguntas 6 - 10' },
  { key: 'prohibiciones', title: '3. Prohibiciones', range: 'Preguntas 11 - 15' },
  { key: 'faltas', title: '4. Faltas', range: 'Preguntas 16 - 20' },
  { key: 'medidas', title: '5. Medidas y Sanciones', range: 'Preguntas 21 - 25' }
];

export default function AssessmentCertificateModule({
  learner,
  progress,
  records,
  onUpdateLearner,
  onUpdateScore,
  onOpenProfile
}: AssessmentCertificateModuleProps) {
  // Tabs: 'evaluacion' | 'ranking' | 'certificado'
  const isPreviouslyApproved = progress.assessmentScore !== null && progress.assessmentScore >= 80;
  const [activeTab, setActiveTab] = useState<'evaluacion' | 'ranking' | 'certificado'>(
    isPreviouslyApproved ? 'certificado' : 'evaluacion'
  );

  // Evaluation States
  // 'registration' -> 'in_progress' -> 'summary'
  const [quizState, setQuizState] = useState<'registration' | 'in_progress' | 'summary'>(
    progress.assessmentScore !== null ? 'summary' : 'registration'
  );

  // Form for confirming learner data before starting the quiz
  const [formData, setFormData] = useState<LearnerProfile>({ ...learner });

  // Quiz Navigation & Selection
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Feedback state for current question
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState<boolean>(false);
  const [lastSelectedOption, setLastSelectedOption] = useState<number | null>(null);

  // Gamification Metrics
  const [gamifiedScore, setGamifiedScore] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Final summary stats
  const [finalTimeFormatted, setFinalTimeFormatted] = useState<string>('00:00 min');
  const [finalScorePercent, setFinalScorePercent] = useState<number>(progress.assessmentScore ?? 0);

  // Timer Ref
  const timerRef = useRef<number | null>(null);

  // Start / stop chronometer
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Synchronize formData if prop learner changes externally
  useEffect(() => {
    if (quizState === 'registration') {
      setFormData({ ...learner });
    }
  }, [learner, quizState]);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Start the interactive quiz
  const handleStartQuiz = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Save updated learner profile
    onUpdateLearner(formData);
    setQuizState('in_progress');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setHasAnsweredCurrent(false);
    setLastSelectedOption(null);
    setGamifiedScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setSecondsElapsed(0);
    setIsTimerRunning(true);
  };

  // Current Question
  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex] || QUIZ_QUESTIONS[0];
  const isCurrentCorrect = lastSelectedOption === currentQ.correctIndex;

  // Handle option selection
  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent double click

    const isCorrect = optionIndex === currentQ.correctIndex;
    setLastSelectedOption(optionIndex);
    setHasAnsweredCurrent(true);

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));

    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      // Streak Multiplier bonus: +10 pts on 1st, +25 on 2nd, +50 on 3rd, +80 on 4th, +120 on 5+
      const streakBonus = newStreak === 1 ? 10 : newStreak === 2 ? 25 : newStreak === 3 ? 50 : newStreak === 4 ? 80 : 120;
      setGamifiedScore(prev => prev + 100 + streakBonus);
    } else {
      // Streak broken
      setCurrentStreak(0);
    }
  };

  // Move to next question or finalize
  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setHasAnsweredCurrent(false);
      setLastSelectedOption(null);
    } else {
      // Finalize Quiz
      finishQuiz();
    }
  };

  // Finalize Quiz and compute gamified stats
  const finishQuiz = () => {
    setIsTimerRunning(false);
    const finalSeconds = secondsElapsed;
    const timeFormatted = `${formatTime(finalSeconds)} min`;
    setFinalTimeFormatted(timeFormatted);

    // Calculate score
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    setFinalScorePercent(calculatedScore);

    // Speed bonus: < 4 min (240s) -> +500 pts, < 6 min (360s) -> +350 pts, < 8 min (480s) -> +200 pts
    let speedBonus = 0;
    if (calculatedScore >= 80) {
      if (finalSeconds < 240) speedBonus = 500;
      else if (finalSeconds < 360) speedBonus = 350;
      else if (finalSeconds < 480) speedBonus = 200;
      else speedBonus = 100;
    }

    const finalGamifiedXP = gamifiedScore + speedBonus;
    setGamifiedScore(finalGamifiedXP);

    // Save into state, storage and institutional roster
    onUpdateScore(calculatedScore, selectedAnswers, {
      timeSpentSeconds: finalSeconds,
      timeSpentFormatted: timeFormatted,
      gamifiedScore: finalGamifiedXP,
      streakMax: maxStreak,
      updatedLearner: formData
    });

    setQuizState('summary');
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    setQuizState('registration');
    setSelectedAnswers({});
    setHasAnsweredCurrent(false);
    setLastSelectedOption(null);
    setGamifiedScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setSecondsElapsed(0);
    setIsTimerRunning(false);
  };

  // Current approval status
  const currentScore = progress.assessmentScore ?? finalScorePercent;
  const isApproved = currentScore >= 80;
  const verificationCode = `SENA-IND-${learner.fichaNumber}-${Math.abs(
    learner.fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000)
  ).toString(16).toUpperCase()}`;

  // Build Leaderboard Ranking sorted by gamifiedScore desc, score desc, time asc
  const leaderboardRecords = [...records].sort((a, b) => {
    const aXP = a.gamifiedScore ?? Math.round((a.score / 100) * 2500);
    const bXP = b.gamifiedScore ?? Math.round((b.score / 100) * 2500);
    if (bXP !== aXP) return bXP - aXP;
    if (b.score !== a.score) return b.score - a.score;
    return (a.timeSpentSeconds ?? 300) - (b.timeSpentSeconds ?? 300);
  });

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-colors duration-300 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <span>Módulo 5</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#39A900] dark:text-[#48C309]">Evaluación y Titulación Gamificada</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <span>Evaluación del Reglamento SENA</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                25 Preguntas · 5 Secciones
              </span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Resuelve 5 preguntas de cada una de las 5 secciones del reglamento. Obtén refuerzo inmediato positivo o correctivo, cronometra tu tiempo y compite en el ranking gamificado por responder rápido y sin equivocaciones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isApproved ? (
              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Inducción Aprobada ({currentScore}%)</span>
              </span>
            ) : (
              <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-medium border border-slate-200 dark:border-slate-700">
                Puntaje mínimo de aprobación: <strong>80% (20 de 25)</strong>
              </span>
            )}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('evaluacion')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'evaluacion' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#39A900]" />
            <span>Evaluación del Reglamento (25 Preguntas)</span>
          </button>

          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'ranking' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>🏆 Ranking Gamificado de Aprendices</span>
          </button>

          <button
            onClick={() => setActiveTab('certificado')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'certificado' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-[#00d49f]" />
            <span>Certificado Oficial {isApproved ? '🎓 (Disponible)' : '🔒 (Bloqueado)'}</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: EVALUACIÓN (Registro -> En Progreso -> Resumen)    */}
      {/* ======================================================== */}
      {activeTab === 'evaluacion' && (
        <div className="space-y-6">

          {/* STEP 1: FICHA DE DATOS DEL APRENDIZ (UNIFICACIÓN) */}
          {quizState === 'registration' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] mx-auto flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Identificación del Aprendiz para la Evaluación
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Confirma tus datos antes de iniciar la prueba. Esta información se guardará en el libro de registro institucional (hoja de cálculo) y figurará en tu constancia oficial y en el ranking de aprendices.
                  </p>
                </div>

                <form onSubmit={handleStartQuiz} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Nombre Completo del Aprendiz *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#39A900] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo de Documento *
                      </label>
                      <select
                        value={formData.documentType}
                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#39A900] focus:outline-hidden"
                      >
                        <option value="CC">Cédula de Ciudadanía (CC)</option>
                        <option value="TI">Tarjeta de Identidad (TI)</option>
                        <option value="CE">Cédula de Extranjería (CE)</option>
                        <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                        <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.documentNumber}
                        onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#39A900] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Ficha de Caracterización *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fichaNumber}
                        onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-[#39A900] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Programa de Formación *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.trainingProgram}
                        onChange={(e) => setFormData({ ...formData, trainingProgram: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#39A900] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Modalidad de Formación
                      </label>
                      <select
                        value={formData.modality}
                        onChange={(e) => setFormData({ ...formData, modality: e.target.value as any })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#39A900] focus:outline-hidden"
                      >
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                        <option value="A Distancia">A Distancia</option>
                      </select>
                    </div>
                  </div>

                  {/* Rules of gamification banner */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Reglas del Reto Gamificado SENA:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 dark:text-slate-300">
                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-[#39A900] block">🎯 Precisión</span>
                        <span>100 XP por respuesta correcta (hasta 2500 XP base).</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-amber-500 block">🔥 Racha sin Fallas</span>
                        <span>Multiplicador de combo por aciertos consecutivos.</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-blue-500 block">⏱️ Reloj de Tiempo</span>
                        <span>El cronómetro medirá tu agilidad para el Ranking.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white font-extrabold text-sm flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Iniciar Evaluación Gamificada (25 Preguntas)</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STEP 2: EVALUACIÓN EN PROCESO (GAMIFICADA CON RELOJ Y REFUERZOS) */}
          {quizState === 'in_progress' && (
            <div className="space-y-5">
              {/* Gamified HUD: Cronómetro + Score + Racha + Sección */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Cronómetro activo */}
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Timer className="w-4 h-4 text-emerald-600 dark:text-[#48C309] animate-pulse" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Tiempo:</span>
                    <span className="font-mono font-extrabold text-slate-900 dark:text-white text-sm">
                      {formatTime(secondsElapsed)}
                    </span>
                  </div>

                  {/* Puntuación XP */}
                  <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-3.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800/60 font-bold text-xs sm:text-sm">
                    <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{gamifiedScore} XP</span>
                  </div>

                  {/* Racha / Combo */}
                  <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold border transition-colors ${
                    currentStreak > 0
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/60 animate-bounce'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}>
                    <Flame className={`w-4 h-4 ${currentStreak > 0 ? 'fill-orange-500 text-orange-500' : 'text-slate-400'}`} />
                    <span>{currentStreak > 0 ? `Racha: ${currentStreak} seguidas` : 'Sin Racha'}</span>
                  </div>

                  {/* Pregunta counter */}
                  <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                    Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
                  </div>
                </div>

                {/* Section navigation indicators */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                  {REGULATION_SECTIONS.map((sec, sIdx) => {
                    const isSecActive = currentQ.sectionKey === sec.key;
                    const secStartIndex = sIdx * 5;
                    const secEndIndex = secStartIndex + 4;
                    const isSecPassed = currentQuestionIndex > secEndIndex;

                    return (
                      <div
                        key={sec.key}
                        className={`px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1 font-semibold transition-all ${
                          isSecActive
                            ? 'bg-[#39A900] text-white shadow-xs'
                            : isSecPassed
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isSecPassed && <Check className="w-3 h-3" />}
                        <span>{sec.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tarjeta de Pregunta Actual */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#39A900] dark:text-[#48C309] mb-1">
                    <span>{currentQ.sectionTitle}</span>
                    <span className="font-mono text-slate-400">Puntaje Base: +100 XP</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Opciones A, B, C, D */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = lastSelectedOption === optIdx;
                    const isCorrect = optIdx === currentQ.correctIndex;
                    const letter = String.fromCharCode(65 + optIdx);

                    let btnClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750';
                    let letterClass = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

                    if (hasAnsweredCurrent) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/40';
                        letterClass = 'bg-emerald-600 text-white';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'border-red-400 bg-red-50 dark:bg-red-950/70 text-red-950 dark:text-red-100 font-semibold ring-2 ring-red-400/40';
                        letterClass = 'bg-red-600 text-white';
                      } else {
                        btnClass = 'opacity-50 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnsweredCurrent}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-start gap-3 cursor-pointer ${btnClass}`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${letterClass}`}>
                          {letter}
                        </span>
                        <span className="flex-1 pt-0.5">{opt}</span>
                        {hasAnsweredCurrent && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#48C309] shrink-0" />
                        )}
                        {hasAnsweredCurrent && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* REFUERZO INMEDIATO: POSITIVO vs PEDAGÓGICO DE CORRECCIÓN */}
                {hasAnsweredCurrent && (
                  <div className="pt-2 animate-in fade-in duration-300">
                    {isCurrentCorrect ? (
                      /* Refuerzo Positivo */
                      <div className="p-4 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-900 dark:text-emerald-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-sm text-[#00d49f]">
                            <Sparkles className="w-5 h-5 text-[#00d49f] animate-spin" />
                            <span>¡Respuesta Correcta! (+100 XP + Bono de Racha)</span>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-bold animate-pulse">
                            🔥 Combo Activo
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold">
                          {currentQ.positivePraise}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                          Fundamento institucional: {currentQ.explanation}
                        </p>
                      </div>
                    ) : (
                      /* Refuerzo Pedagógico de Corrección */
                      <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 text-red-950 dark:text-red-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-sm text-red-600 dark:text-red-400">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span>Refuerzo Pedagógico: Identifica en qué consistió el error</span>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-bold">
                            Racha reiniciada
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                          {currentQ.correctionTip}
                        </p>
                        <div className="p-2.5 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-red-200 dark:border-red-900/40 text-xs space-y-1">
                          <p className="text-emerald-800 dark:text-emerald-300 font-bold">
                            Opción correcta: {String.fromCharCode(65 + currentQ.correctIndex)}) {currentQ.options[currentQ.correctIndex]}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 italic">
                            Norma SENA: {currentQ.explanation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Botón Siguiente / Finalizar */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <span>
                          {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Evaluación y Ver Ranking'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: RESUMEN FINAL, ESTADÍSTICAS Y ACCESO A CERTIFICADO */}
          {quizState === 'summary' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Banner de Calificación */}
                  <div className={`p-6 rounded-2xl border text-center space-y-2 ${
                    isApproved 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' 
                      : 'bg-red-50/50 dark:bg-red-950/20 border-red-300 dark:border-red-800'
                  }`}>
                    <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center bg-white dark:bg-slate-900 shadow-xs">
                      {isApproved ? (
                        <Trophy className="w-8 h-8 text-amber-500 animate-bounce" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-red-500" />
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {isApproved ? '¡Felicitaciones! Has Superado la Inducción SENA' : 'Evaluación Finalizada · Requiere Refuerzo'}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                      {isApproved 
                        ? `Tu rendimiento ha sido registrado en el Libro Institucional con código ${verificationCode}. Ya puedes generar tu Constancia Oficial de Inducción.`
                        : 'El puntaje mínimo institucional de aprobación es del 80% (20 de 25 preguntas). Puedes repasar los módulos y reintentar para certificar tu inducción.'}
                    </p>
                  </div>

                  {/* Resumen de Métricas Gamificadas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block mb-1">Calificación</span>
                      <span className={`text-2xl font-black font-mono ${isApproved ? 'text-[#39A900] dark:text-[#48C309]' : 'text-red-500'}`}>
                        {currentScore}%
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {Math.round((currentScore / 100) * 25)} / 25 Aciertos
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block mb-1">Puntos XP</span>
                      <span className="text-2xl font-black font-mono text-amber-500">
                        ⚡ {gamifiedScore > 0 ? gamifiedScore : Math.round((currentScore / 100) * 2500)}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Puntaje Gamificado</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block mb-1">Tiempo Total</span>
                      <span className="text-2xl font-black font-mono text-blue-500">
                        ⏱️ {finalTimeFormatted}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Cronómetro</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block mb-1">Racha Máxima</span>
                      <span className="text-2xl font-black font-mono text-orange-500">
                        🔥 {maxStreak > 0 ? `${maxStreak}` : `${Math.round(currentScore / 10)}`}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Sin Equivocaciones</span>
                    </div>
                  </div>

                  {/* Acciones principales */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {isApproved && (
                      <button
                        onClick={() => setActiveTab('certificado')}
                        className="px-6 py-3 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>Generar Constancia Oficial de Inducción</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveTab('ranking')}
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>Ver Tabla de Ranking Gamificado</span>
                    </button>

                    <button
                      onClick={handleRestartQuiz}
                      className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Presentar Evaluación Nuevamente</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: RANKING GAMIFICADO DE APRENDICES (LEADERBOARD)    */}
      {/* ======================================================== */}
      {activeTab === 'ranking' && (
        <div className="space-y-6">
          {/* Header del Ranking */}
          <div className="p-6 rounded-2xl bg-linear-to-r from-emerald-900 to-slate-900 text-white shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#00d49f] block mb-1">
                  Tabla de Clasificación Oficial
                </span>
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <span>🏆 Cuadro de Honor y Ranking Gamificado</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Los aprendices que responden con mayor precisión, mantienen rachas sin fallas y completan el reto en menor tiempo escalan a las posiciones de honor.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono font-bold">
                  {records.length} Aprendices Registrados
                </span>
              </div>
            </div>
          </div>

          {/* Podio Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboardRecords.slice(0, 3).map((r, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;
              const xp = r.gamifiedScore ?? Math.round((r.score / 100) * 2500);

              return (
                <div 
                  key={r.id}
                  className={`p-5 rounded-2xl border transition-all text-center space-y-2 relative ${
                    isFirst 
                      ? 'bg-amber-500/10 border-amber-400 dark:border-amber-500/60 shadow-md ring-2 ring-amber-400/30'
                      : isSecond
                      ? 'bg-slate-100/80 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
                      : 'bg-orange-500/10 border-orange-300 dark:border-orange-700/60'
                  }`}
                >
                  <div className="text-3xl mb-1">
                    {isFirst ? '🥇' : isSecond ? '🥈' : '🥉'}
                  </div>
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isFirst ? 'bg-amber-500 text-white' : isSecond ? 'bg-slate-400 text-white' : 'bg-orange-600 text-white'
                  }`}>
                    {isFirst ? '1º Lugar · Oro' : isSecond ? '2º Lugar · Plata' : '3º Lugar · Bronce'}
                  </span>

                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {r.fullName}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Ficha {r.fichaNumber}
                  </p>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Puntaje</span>
                      <strong className="font-mono text-emerald-600 dark:text-[#48C309]">{r.score}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Puntos XP</span>
                      <strong className="font-mono text-amber-500">{xp} XP</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tiempo</span>
                      <strong className="font-mono text-slate-700 dark:text-slate-300">{r.timeSpentFormatted || '03:45 min'}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Racha</span>
                      <strong className="font-mono text-orange-500">🔥 {r.streakMax || Math.round(r.score / 10)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabla de Posiciones Completa */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Medal className="w-4 h-4 text-emerald-600" />
                <span>Clasificación General de la Ficha</span>
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Ordenado por XP Gamificados y Tiempo Invertido
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-mono text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3 text-center w-12">#</th>
                    <th className="p-3">Aprendiz</th>
                    <th className="p-3">Ficha y Programa</th>
                    <th className="p-3 text-center">Calificación</th>
                    <th className="p-3 text-center">Puntos XP</th>
                    <th className="p-3 text-center">Tiempo</th>
                    <th className="p-3 text-center">Racha Máx.</th>
                    <th className="p-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {leaderboardRecords.map((r, pos) => {
                    const isCurrent = r.documentNumber === learner.documentNumber;
                    const xp = r.gamifiedScore ?? Math.round((r.score / 100) * 2500);

                    return (
                      <tr 
                        key={r.id}
                        className={`transition-colors ${
                          isCurrent 
                            ? 'bg-emerald-500/10 dark:bg-emerald-500/15 ring-2 ring-[#00d49f]' 
                            : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="p-3 text-center font-mono font-bold">
                          {pos === 0 ? '🥇' : pos === 1 ? '🥈' : pos === 2 ? '🥉' : `#${pos + 1}`}
                        </td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            <span>{r.fullName}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00d49f] text-slate-950">
                                Tu Perfil
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {r.documentType} {r.documentNumber}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{r.fichaNumber}</span>
                          <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{r.trainingProgram}</div>
                        </td>
                        <td className="p-3 text-center font-mono font-bold">
                          <span className={r.score >= 80 ? 'text-[#39A900] dark:text-[#48C309]' : 'text-red-500'}>
                            {r.score}%
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-amber-500">
                          ⚡ {xp}
                        </td>
                        <td className="p-3 text-center font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          ⏱️ {r.timeSpentFormatted || '03:45 min'}
                        </td>
                        <td className="p-3 text-center font-mono text-[11px] text-orange-500 font-bold">
                          🔥 {r.streakMax || Math.round(r.score / 10)}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'Aprobado'
                              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                              : 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: CONSTANCIA OFICIAL DE INDUCCIÓN SENA               */}
      {/* ======================================================== */}
      {activeTab === 'certificado' && (
        <div className="space-y-6">
          {!isApproved ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Constancia de Inducción no disponible
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Debes obtener una calificación de al menos 80% (20 de 25 preguntas correctas) para habilitar y descargar la Constancia Oficial Institucional.
              </p>
              <button
                onClick={() => setActiveTab('evaluacion')}
                className="px-6 py-2.5 rounded-xl bg-[#39A900] text-white font-bold text-xs cursor-pointer"
              >
                Ir a la Evaluación
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Actions Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 no-print">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Constancia Oficial Aprobada · Verificada institucionalmente
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold cursor-pointer shadow-xs transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir / Guardar PDF</span>
                  </button>
                </div>
              </div>

              {/* Certificate Sheet (Printable) */}
              <div className="print-certificate bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border-4 border-double border-[#39A900] shadow-xl max-w-4xl mx-auto relative overflow-hidden">
                {/* Watermark Logo */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5"
                  dangerouslySetInnerHTML={{ __html: SENA_LOGO_SVG.replace('width="100%" height="100%"', 'width="500" height="500"') }}
                />

                <div className="relative z-10 space-y-8 text-center">
                  {/* Top Branding */}
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div 
                      className="w-16 h-16"
                      dangerouslySetInnerHTML={{ __html: SENA_LOGO_SVG.replace('width="100%" height="100%"', 'width="64" height="64"') }}
                    />
                    <h2 className="text-lg font-black tracking-wider text-slate-900 uppercase">
                      Servicio Nacional de Aprendizaje - SENA
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold tracking-widest uppercase">
                      Dirección de Formación Profesional Integral
                    </p>
                    <div className="w-24 h-1 bg-[#39A900] mx-auto rounded-full mt-2" />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      CONSTANCIA INSTITUCIONAL DE INDUCCIÓN
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Hace constar que el (la) aprendiz:
                    </p>
                  </div>

                  {/* Learner Name */}
                  <div className="py-2 border-b-2 border-slate-200 max-w-xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl font-black text-[#39A900] tracking-tight uppercase">
                      {learner.fullName}
                    </h4>
                    <p className="text-xs text-slate-600 font-mono mt-1">
                      Identificado(a) con {learner.documentType} No. {learner.documentNumber}
                    </p>
                  </div>

                  {/* Body text */}
                  <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Ha completado satisfactoriamente los cinco (5) módulos del proceso de <strong>Inducción al Aprendiz SENA</strong>, demostrando apropiación de la Identidad Institucional, el Modelo de Formación Profesional Integral, el Reglamento del Aprendiz (Acuerdo 007 de 2012) y el ecosistema de plataformas tecnológicas, obteniendo una calificación final de:
                    <div className="mt-3 inline-block px-5 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-[#39A900] font-black text-xl font-mono">
                      {currentScore}% · APROBADO
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-xs text-left p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-slate-400 block font-semibold">Programa de Formación:</span>
                      <strong className="text-slate-800">{learner.trainingProgram}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Ficha de Caracterización:</span>
                      <strong className="text-slate-800 font-mono">{learner.fichaNumber}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Centro de Formación:</span>
                      <span className="text-slate-800">{learner.trainingCenter}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Regional & Modalidad:</span>
                      <span className="text-slate-800">{learner.regional} ({learner.modality})</span>
                    </div>
                  </div>

                  {/* Signatures & Verification */}
                  <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-xs">
                    <div className="text-center">
                      <div className="w-40 border-b border-slate-400 mx-auto mb-1" />
                      <p className="font-bold text-slate-800">Coordinación Académica</p>
                      <p className="text-[10px] text-slate-500">Centro de Formación SENA</p>
                    </div>

                    <div className="text-center font-mono">
                      <p className="text-[10px] text-slate-400 uppercase">Código de Verificación Digital:</p>
                      <p className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md border border-slate-300 inline-block mt-0.5">
                        {verificationCode}
                      </p>
                      <p className="text-[9px] text-slate-400 mt-1">
                        Expedido el {new Date().toLocaleDateString('es-CO', { dateStyle: 'long' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
