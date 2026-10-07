import React, { useState } from 'react';
import { 
  User, 
  BookOpen, 
  Sun, 
  Moon, 
  FileSpreadsheet, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  Compass,
  Award,
  ChevronRight
} from 'lucide-react';
import { LearnerProfile, ModuleProgress } from '../types/induction';
import { SENA_LOGO_SVG } from '../assets/senaLogo';

interface NavbarProps {
  learner: LearnerProfile;
  progress: ModuleProgress;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProfile: () => void;
  onOpenGlossary: () => void;
  onOpenRoster: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  isAdmin?: boolean;
  onLogoutAdmin?: () => void;
}

export default function Navbar({
  learner,
  progress,
  darkMode,
  onToggleDarkMode,
  onOpenProfile,
  onOpenGlossary,
  onOpenRoster,
  activeSection,
  onSelectSection,
  isAdmin = false,
  onLogoutAdmin
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate completed modules percentage
  const completedCount = [
    progress.identity,
    progress.training,
    progress.regulations,
    progress.platforms,
    progress.assessmentScore !== null && progress.assessmentScore >= 80
  ].filter(Boolean).length;
  
  const completionPercent = Math.round((completedCount / 5) * 100);

  const handleSelectMobile = (sectionId: string) => {
    onSelectSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'identity', label: 'Identidad y Símbolos', isDone: progress.identity },
    { id: 'training', label: 'Formación Integral', isDone: progress.training },
    { id: 'regulations', label: 'Reglamento del Aprendiz', isDone: progress.regulations },
    { id: 'platforms', label: 'Plataformas y Bienestar', isDone: progress.platforms },
    { 
      id: 'assessment', 
      label: 'Evaluación y Certificado', 
      isDone: progress.assessmentScore !== null && progress.assessmentScore >= 80 
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Wordmark with official logo */}
        <button
          onClick={() => {
            onSelectSection('inicio');
            setIsMobileMenuOpen(false);
          }}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 hover:text-[#39A900] dark:hover:text-[#48C309] transition-colors text-left truncate flex items-center gap-2.5 cursor-pointer"
        >
          <img
            src={SENA_LOGO_SVG}
            alt="Logo Oficial SENA"
            className="w-8 h-8 object-contain shrink-0"
          />
          <span className="whitespace-nowrap font-extrabold">Inducción SENA</span>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                activeSection === item.id 
                  ? 'bg-emerald-500/15 dark:bg-[#00d49f]/15 text-[#39A900] dark:text-[#00d49f] border border-[#39A900]/40 dark:border-[#00d49f]/40 font-bold shadow-xs' 
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions + Dark Mode Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Admin Exclusive: Libro de Registro & Hoja de Cálculo */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40">
              <button
                onClick={onOpenRoster}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 text-emerald-900 dark:text-[#00d49f] bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700/60 hover:bg-emerald-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
                title="Panel de Instructor: Ver libro de registro y respuestas de aprendices, y descargar hoja de cálculo (.CSV / Excel)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#00d49f]" />
                <span className="hidden sm:inline">Hoja de Respuestas (Admin)</span>
              </button>
              {onLogoutAdmin && (
                <button
                  onClick={onLogoutAdmin}
                  className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-full transition-colors cursor-pointer"
                  title="Cerrar sesión de Administrador"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Desktop Glossary Button */}
          <button
            onClick={onOpenGlossary}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap shrink-0 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            title="Glosario Institucional y Preguntas Frecuentes"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-[#00d49f]" />
            <span>Glosario SENA</span>
          </button>

          {/* Learner Profile Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 shadow-xs bg-[#39A900] text-white hover:bg-[#329600] cursor-pointer"
            title="Ver perfil del aprendiz y avance"
          >
            <User className="w-3.5 h-3.5" />
            <span className="truncate max-w-[80px] sm:max-w-[140px]">{learner.fullName.split(' ')[0]} ({completionPercent}%)</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full transition-all shadow-xs cursor-pointer border text-slate-600 dark:text-amber-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
            title={darkMode ? 'Cambiar a modo claro (Día)' : 'Cambiar a modo oscuro'}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-red-500" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-mono text-slate-500 uppercase tracking-wider text-[10px]">
              Estaciones Formativas
            </span>
            <span className="font-mono font-bold text-[#39A900] dark:text-[#00d49f]">
              {completionPercent}% Completado
            </span>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleSelectMobile('inicio')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeSection === 'inicio'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#00d49f] font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>🏛️ Inicio & Resumen</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectMobile(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#00d49f] font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.isDone && (
                    <span className="text-[10px] font-mono text-[#39A900] dark:text-[#00d49f] font-bold">
                      ✓
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <button
              onClick={() => {
                onOpenGlossary();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#39A900]" />
              <span>Glosario Institucional y FAQ</span>
            </button>

            <button
              onClick={() => {
                onOpenProfile();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#39A900]" />
              <span>Mi Perfil ({learner.fullName.split(' ')[0]})</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => {
                  onOpenRoster();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 dark:text-[#00d49f] bg-emerald-50/70 dark:bg-emerald-950/40 flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Libro de Registro & Hoja de Respuestas (Admin)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
