/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IdentitySymbolsModule from './components/IdentitySymbolsModule';
import TrainingModelModule from './components/TrainingModelModule';
import RegulationsModule from './components/RegulationsModule';
import PlatformsWellbeingModule from './components/PlatformsWellbeingModule';
import AssessmentCertificateModule from './components/AssessmentCertificateModule';
import LearnerProfileModal from './components/LearnerProfileModal';
import { GlossaryFaqModal } from './components/GlossaryFaqModal';
import HudTelemetryPanel from './components/HudTelemetryPanel';
import ApprenticeRosterModal from './components/ApprenticeRosterModal';
import AdminLoginModal from './components/AdminLoginModal';
import { LearnerProfile, ModuleProgress, InductionRecord } from './types/induction';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ShieldCheck, 
  Layers, 
  Award, 
  Clock, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const STORAGE_KEY_LEARNER = 'sena_induction_learner_v1';
const STORAGE_KEY_PROGRESS = 'sena_induction_progress_v1';
const STORAGE_KEY_DARKMODE = 'sena_induction_theme_v1';
const STORAGE_KEY_ROSTER = 'sena_induction_roster_v1';

const INITIAL_ROSTER: InductionRecord[] = [
  {
    id: 'REC-2024-001',
    fullName: 'Laura Valentina Torres Méndez',
    documentType: 'CC',
    documentNumber: '1018492019',
    trainingProgram: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: '2834921',
    trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones - CEET',
    regional: 'Regional Distrito Capital',
    modality: 'Presencial',
    score: 100,
    status: 'Aprobado',
    completedDate: '2024-03-04 10:30',
    verificationCode: 'SENA-IND-2834921-94AE',
    timeSpentSeconds: 194,
    timeSpentFormatted: '03:14 min',
    gamifiedScore: 3450,
    streakMax: 25
  },
  {
    id: 'REC-2024-002',
    fullName: 'Mateo Alejandro Ruiz Morales',
    documentType: 'TI',
    documentNumber: '1075849302',
    trainingProgram: 'Tecnólogo en Gestión Empresarial',
    fichaNumber: '2829104',
    trainingCenter: 'Centro de Servicios Financieros - CSF',
    regional: 'Regional Distrito Capital',
    modality: 'Presencial',
    score: 92,
    status: 'Aprobado',
    completedDate: '2024-03-05 14:15',
    verificationCode: 'SENA-IND-2829104-87C2',
    timeSpentSeconds: 245,
    timeSpentFormatted: '04:05 min',
    gamifiedScore: 2980,
    streakMax: 18
  },
  {
    id: 'REC-2024-003',
    fullName: 'Daniela Sofía Castro Henao',
    documentType: 'CC',
    documentNumber: '1032948190',
    trainingProgram: 'Tecnólogo en Producción Multimedia',
    fichaNumber: '2819042',
    trainingCenter: 'Centro de Comercio y Servicios',
    regional: 'Regional Antioquia',
    modality: 'Virtual',
    score: 84,
    status: 'Aprobado',
    completedDate: '2024-03-06 09:40',
    verificationCode: 'SENA-IND-2819042-43FA',
    timeSpentSeconds: 310,
    timeSpentFormatted: '05:10 min',
    gamifiedScore: 2620,
    streakMax: 12
  }
];

const DEFAULT_LEARNER: LearnerProfile = {
  fullName: 'Carlos Andrés Gómez Pérez',
  documentType: 'CC',
  documentNumber: '1020304050',
  trainingProgram: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  fichaNumber: '2834921',
  trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones - CEET',
  regional: 'Regional Distrito Capital',
  modality: 'Presencial'
};

const DEFAULT_PROGRESS: ModuleProgress = {
  identity: false,
  training: false,
  regulations: false,
  platforms: false,
  assessmentScore: null
};

export default function App() {
  const [learner, setLearner] = useState<LearnerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEARNER);
      return saved ? JSON.parse(saved) : DEFAULT_LEARNER;
    } catch {
      return DEFAULT_LEARNER;
    }
  });

  const [progress, setProgress] = useState<ModuleProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [records, setRecords] = useState<InductionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROSTER);
      return saved ? JSON.parse(saved) : INITIAL_ROSTER;
    } catch {
      return INITIAL_ROSTER;
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_DARKMODE);
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('sena_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEARNER, JSON.stringify(learner));
    } catch (e) {
      console.warn('Could not save learner to storage', e);
    }
  }, [learner]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress to storage', e);
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ROSTER, JSON.stringify(records));
    } catch (e) {
      console.warn('Could not save roster to storage', e);
    }
  }, [records]);

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(STORAGE_KEY_DARKMODE, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(STORAGE_KEY_DARKMODE, 'light');
      }
    } catch (e) {
      console.warn('Could not sync dark mode', e);
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setIsBlurTransitioning(true);
    setDarkMode(prev => !prev);
    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 450);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('sena_admin_auth', 'true');
    } catch (e) {
      console.warn('Could not save admin session', e);
    }
    setIsAdminLoginOpen(false);
    setIsRosterModalOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('sena_admin_auth');
    } catch (e) {
      console.warn('Could not clear admin session', e);
    }
    setIsRosterModalOpen(false);
  };

  const toggleModuleComplete = (moduleKey: 'identity' | 'training' | 'regulations' | 'platforms') => {
    setProgress(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  const handleAddOrUpdateLearnerRecord = (
    score: number, 
    answers?: Record<number, number>,
    gamifiedData?: {
      timeSpentSeconds?: number;
      timeSpentFormatted?: string;
      gamifiedScore?: number;
      streakMax?: number;
      updatedLearner?: LearnerProfile;
    }
  ) => {
    const activeLearner = gamifiedData?.updatedLearner || learner;
    const verificationCode = `SENA-IND-${activeLearner.fichaNumber}-${Math.abs(
      activeLearner.fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000)
    ).toString(16).toUpperCase()}`;

    const newRecord: InductionRecord = {
      id: `REC-${new Date().getFullYear()}-${String(records.length + 1).padStart(3, '0')}`,
      fullName: activeLearner.fullName,
      documentType: activeLearner.documentType,
      documentNumber: activeLearner.documentNumber,
      trainingProgram: activeLearner.trainingProgram,
      fichaNumber: activeLearner.fichaNumber,
      trainingCenter: activeLearner.trainingCenter,
      regional: activeLearner.regional,
      modality: activeLearner.modality,
      score: score,
      status: score >= 80 ? 'Aprobado' : 'No Aprobado',
      completedDate: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
      verificationCode,
      answers,
      timeSpentSeconds: gamifiedData?.timeSpentSeconds,
      timeSpentFormatted: gamifiedData?.timeSpentFormatted,
      gamifiedScore: gamifiedData?.gamifiedScore,
      streakMax: gamifiedData?.streakMax
    };

    setRecords(prev => {
      const existingIndex = prev.findIndex(r => r.documentNumber === activeLearner.documentNumber);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          ...newRecord,
          id: updated[existingIndex].id,
          answers: answers || updated[existingIndex].answers
        };
        return updated;
      }
      return [newRecord, ...prev];
    });
  };

  const handleAddCustomRecord = (newRecordData: Omit<InductionRecord, 'id' | 'verificationCode' | 'completedDate'>) => {
    const verificationCode = `SENA-IND-${newRecordData.fichaNumber}-${Math.abs(
      newRecordData.fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000)
    ).toString(16).toUpperCase()}`;

    const newRecord: InductionRecord = {
      ...newRecordData,
      id: `REC-${new Date().getFullYear()}-${String(records.length + 1).padStart(3, '0')}`,
      completedDate: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
      verificationCode
    };

    setRecords(prev => {
      const existingIndex = prev.findIndex(r => r.documentNumber === newRecordData.documentNumber);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          ...newRecord,
          id: updated[existingIndex].id
        };
        return updated;
      }
      return [newRecord, ...prev];
    });
  };

  const handleUpdateScore = (
    score: number, 
    answers?: Record<number, number>,
    gamifiedData?: {
      timeSpentSeconds?: number;
      timeSpentFormatted?: string;
      gamifiedScore?: number;
      streakMax?: number;
      updatedLearner?: LearnerProfile;
    }
  ) => {
    if (gamifiedData?.updatedLearner) {
      setLearner(gamifiedData.updatedLearner);
    }
    setProgress(prev => ({
      ...prev,
      assessmentScore: score,
      completedAt: new Date().toISOString()
    }));
    handleAddOrUpdateLearnerRecord(score, answers, gamifiedData);
  };

  const handleManualAddCurrentLearner = () => {
    const score = progress.assessmentScore ?? 0;
    handleAddOrUpdateLearnerRecord(score);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const completedCount = [
    progress.identity,
    progress.training,
    progress.regulations,
    progress.platforms,
    progress.assessmentScore !== null && progress.assessmentScore >= 80
  ].filter(Boolean).length;

  const modulesList = [
    {
      id: 'identity',
      title: 'Módulo 1: Identidad Institucional',
      desc: 'Historia (1957), Rodolfo Martínez Tono, misión, valores, escudo, bandera e himno.',
      duration: '15 min',
      isCompleted: progress.identity,
      icon: BookOpen
    },
    {
      id: 'training',
      title: 'Módulo 2: Formación Profesional Integral',
      desc: 'Saber, Saber Hacer, Saber Ser, etapas lectiva y productiva, fases del proyecto.',
      duration: '20 min',
      isCompleted: progress.training,
      icon: Layers
    },
    {
      id: 'regulations',
      title: 'Módulo 3: Reglamento del Aprendiz',
      desc: 'Acuerdo 007 de 2012, derechos, deberes, tipificación de faltas y simulador de casos.',
      duration: '25 min',
      isCompleted: progress.regulations,
      icon: ShieldCheck
    },
    {
      id: 'platforms',
      title: 'Módulo 4: Plataformas y Bienestar',
      desc: 'Zajuna, SOFIA Plus, Biblioteca SBS, APE y las dimensiones de bienestar al aprendiz.',
      duration: '15 min',
      isCompleted: progress.platforms,
      icon: Sparkles
    },
    {
      id: 'assessment',
      title: 'Módulo 5: Evaluación y Certificación Gamificada',
      desc: 'Evaluación de 25 preguntas (5 por sección del reglamento), reloj cronometrado, refuerzos inmediatos y ranking.',
      duration: '20 min',
      isCompleted: progress.assessmentScore !== null && progress.assessmentScore >= 80,
      icon: Award
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300 ${isBlurTransitioning ? 'theme-blur-active' : ''}`}>
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        learner={learner}
        progress={progress}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenGlossary={() => setIsGlossaryModalOpen(true)}
        onOpenRoster={() => setIsRosterModalOpen(true)}
        isAdmin={isAdminAuthenticated}
        onLogoutAdmin={handleAdminLogout}
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Container */}
      <main className="flex-1">
        {activeSection === 'inicio' && (
          <div>
            <HeroSection
              learner={learner}
              progress={progress}
              onStartInduction={() => {
                setActiveSection('identity');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />

            {/* Institutional Progress Dashboard */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
              <HudTelemetryPanel
                progress={progress}
                learner={learner}
                onGoToSection={(sec) => {
                  setActiveSection(sec);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* Modular Roadmap Overview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-mono font-bold text-[#39A900] dark:text-[#00d49f] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#39A900] dark:bg-[#00d49f] animate-pulse" />
                    ESTACIONES PEDAGÓGICAS SENA
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                    Los 5 Módulos de tu Inducción
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Completa las estaciones formativas en orden o navega directamente a la temática de tu interés.
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-xs">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Progreso total:</span>
                  <span className="text-xs font-mono font-bold text-[#39A900] dark:text-[#00d49f]">
                    {completedCount}/5 Completados ({Math.round((completedCount / 5) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {modulesList.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.id}
                      className="bg-white dark:hud-card border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 flex flex-col justify-between hover:border-[#00d49f]/60 transition-all shadow-md group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:hud-bezel-circle text-[#39A900] dark:text-[#00d49f] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-mono">
                            {m.isCompleted ? (
                              <span className="flex items-center gap-1 text-[#39A900] dark:text-[#00d49f] font-bold">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Aprobado</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-slate-400 dark:text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{m.duration}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00d49f] block mb-1">
                          Estación 0{idx + 1}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] dark:group-hover:text-[#00d49f] transition-colors">
                          {m.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {m.isCompleted ? 'Contenido repasable' : 'Por completar'}
                        </span>
                        <button
                          onClick={() => {
                            setActiveSection(m.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            m.isCompleted
                              ? 'hud-btn-dark'
                              : 'hud-btn-teal'
                          }`}
                        >
                          <span>{m.isCompleted ? 'Revisar' : 'Ingresar'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Fast banner to Certificate */}
              {progress.assessmentScore !== null && progress.assessmentScore >= 80 && (
                <div className="mt-8 p-6 rounded-2xl hud-card-bevel text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#00d49f]/40">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00d49f] uppercase tracking-wider">
                      ¡ACREDITACIÓN OFICIAL LISTA!
                    </span>
                    <h4 className="text-lg font-bold mt-1">
                      Tu Constancia de Inducción está disponible para descarga e impresión
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 font-mono">
                      Calificación obtenida: {progress.assessmentScore}/100 puntos.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveSection('assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hud-btn-teal px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap shadow-md cursor-pointer uppercase tracking-wider"
                  >
                    Ver mi Certificado Oficial
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Section View Routing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeSection !== 'inicio' && (
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveSection('inicio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>← Volver al Menú Principal</span>
              </button>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Aprendiz: <strong className="text-slate-900 dark:text-white">{learner.fullName.split(' ')[0]}</strong> ({learner.trainingProgram.split(' ')[0]})
              </div>
            </div>
          )}

          {activeSection === 'identity' && (
            <IdentitySymbolsModule
              isCompleted={progress.identity}
              onToggleComplete={() => toggleModuleComplete('identity')}
              onNextModule={() => {
                setActiveSection('training');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeSection === 'training' && (
            <TrainingModelModule
              isCompleted={progress.training}
              onToggleComplete={() => toggleModuleComplete('training')}
              onNextModule={() => {
                setActiveSection('regulations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeSection === 'regulations' && (
            <RegulationsModule
              isCompleted={progress.regulations}
              onToggleComplete={() => toggleModuleComplete('regulations')}
              onNextModule={() => {
                setActiveSection('platforms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeSection === 'platforms' && (
            <PlatformsWellbeingModule
              isCompleted={progress.platforms}
              onToggleComplete={() => toggleModuleComplete('platforms')}
              onNextModule={() => {
                setActiveSection('assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeSection === 'assessment' && (
            <AssessmentCertificateModule
              learner={learner}
              progress={progress}
              records={records}
              onUpdateLearner={(updated) => setLearner(updated)}
              onUpdateScore={handleUpdateScore}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 no-print transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Servicio Nacional de Aprendizaje - SENA
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Establecimiento público de orden nacional adscrito al Ministerio del Trabajo de la República de Colombia.
              </p>
              <p className="text-xs text-[#39A900] dark:text-[#48C309] font-semibold">
                Decreto Ley 118 de 1957
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                Canales y Sedes
              </span>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li>Línea Nacional Gratuita: 01 8000 910 270</li>
                <li>Línea de Atención Bogotá: +57 (601) 343 0111</li>
                <li>Sede Dirección General: Calle 57 No. 8 - 69, Bogotá D.C.</li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                Portales Institucionales
              </span>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <a href="https://www.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-[#39A900] dark:hover:text-[#48C309] transition-colors">
                    Portal Institucional (sena.edu.co)
                  </a>
                </li>
                <li>
                  <a href="https://zajuna.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-[#39A900] dark:hover:text-[#48C309] transition-colors">
                    Zajuna - Plataforma Virtual
                  </a>
                </li>
                <li>
                  <a href="https://senasofiaplus.edu.co" target="_blank" rel="noreferrer" className="hover:text-[#39A900] dark:hover:text-[#48C309] transition-colors">
                    SOFIA Plus Académico
                  </a>
                </li>
                <li>
                  <a href="https://agenciapublicadeempleo.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-[#39A900] dark:hover:text-[#48C309] transition-colors">
                    Agencia Pública de Empleo (APE)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                Compromiso del Aprendiz
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                "Honestidad, Respeto, Compromiso, Diligencia, Justicia y Solidaridad para la transformación productiva de Colombia."
              </p>
              <div className="mt-4">
                <button
                  onClick={() => setIsGlossaryModalOpen(true)}
                  className="text-xs font-semibold text-[#39A900] dark:text-[#48C309] hover:underline cursor-pointer"
                >
                  Abrir Glosario Institucional
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-2">
            <span>© {new Date().getFullYear()} SENA · Todos los derechos reservados. Formación Profesional Integral.</span>
            <div className="flex items-center gap-3">
              <span>Plataforma de Inducción al Aprendiz</span>
              <span>·</span>
              <button
                onClick={() => {
                  if (isAdminAuthenticated) {
                    setIsRosterModalOpen(true);
                  } else {
                    setIsAdminLoginOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-[#00d49f] transition-colors cursor-pointer"
                title="Acceso exclusivo para el Instructor / Administrador para ver libro de registro y respuestas"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAdminAuthenticated ? 'Panel Instructor (Sesión Activa)' : 'Acceso Instructor / Admin'}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LearnerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        learner={learner}
        progress={progress}
        onSaveProfile={(updated) => setLearner(updated)}
      />

      <GlossaryFaqModal
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      <ApprenticeRosterModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        records={records}
        onAddCurrentLearner={handleManualAddCurrentLearner}
        onAddCustomRecord={handleAddCustomRecord}
        onDeleteRecord={handleDeleteRecord}
        currentLearner={learner}
        currentScore={progress.assessmentScore}
      />
    </div>
  );
}
