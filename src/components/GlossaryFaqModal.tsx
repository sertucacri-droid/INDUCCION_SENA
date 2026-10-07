import React, { useState } from 'react';
import { X, Search, BookOpen, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/inductionData';

interface GlossaryFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_ITEMS = [
  {
    q: '¿Cómo obtengo mi carné institucional de aprendiz?',
    a: 'En las primeras semanas de inducción, la coordinación del centro o bienestar toma el registro fotográfico o habilita la descarga del carné digital a través de SOFIA Plus / portal institucional. Es obligatorio portarlo en todo momento en sede física.'
  },
  {
    q: '¿Qué pasa si tengo una incapacidad médica durante la etapa lectiva?',
    a: 'Debes presentar el certificado o incapacidad médica emitida o convalidada por tu EPS ante la coordinación académica y tu instructor técnico dentro de los 3 días hábiles siguientes al hecho para justificar las inasistencias.'
  },
  {
    q: '¿Cómo sé si tengo un resultado de aprendizaje pendiente o aprobado?',
    a: 'Ingresando a SOFIA Plus con tu usuario y contraseña, en el rol de "Aprendiz" > pestaña "LMS" o "Consultar Juicios Evaluativos". La letra "A" significa Aprobado y la "D" Por Mejorar.'
  },
  {
    q: '¿Cuándo puedo empezar a buscar mi Contrato de Aprendizaje?',
    a: 'En la mayoría de programas tecnológicos puedes postularte a ofertas de empresas a través de la plataforma Caprendizaje del SENA desde los últimos meses de la etapa lectiva, previa autorización de la coordinación.'
  },
  {
    q: '¿Qué es el Plan de Mejoramiento pedagógico?',
    a: 'Es una oportunidad concertada entre el instructor y el aprendiz donde se definen actividades adicionales para superar insuficiencias en el logro de resultados de aprendizaje, fijando fechas claras de entrega.'
  }
];

export const GlossaryFaqModal: React.FC<GlossaryFaqModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [viewTab, setViewTab] = useState<'glosario' | 'faq'>('glosario');

  if (!isOpen) return null;

  const filteredTerms = GLOSSARY_TERMS.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCat = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] flex flex-col transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Glosario y Preguntas Frecuentes SENA</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Términos indispensables para entender el lenguaje institucional</p>
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

        {/* View switcher */}
        <div className="my-4 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setViewTab('glosario')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              viewTab === 'glosario' 
                ? 'bg-[#39A900] dark:bg-[#48C309] text-white shadow-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Glosario de Términos ({filteredTerms.length})
          </button>
          <button
            onClick={() => setViewTab('faq')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              viewTab === 'faq' 
                ? 'bg-[#39A900] dark:bg-[#48C309] text-white shadow-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Preguntas Frecuentes ({FAQ_ITEMS.length})
          </button>
        </div>

        {viewTab === 'glosario' ? (
          <div className="flex flex-col min-h-0 flex-1">
            {/* Search and Filters */}
            <div className="space-y-3 shrink-0 pb-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar término (ej. RAP, Guía, Zajuna, Ficha, Juicio...)"
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:border-[#39A900] dark:focus:border-[#48C309]"
                />
              </div>

              {/* Category filter tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['Todos', 'Académico', 'Institucional', 'Plataformas', 'Reglamento'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedCategory === cat
                        ? 'bg-slate-900 dark:bg-slate-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List of terms */}
            <div className="overflow-y-auto space-y-3 pr-1 flex-1">
              {filteredTerms.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No se encontraron términos que coincidan con la búsqueda.
                </div>
              ) : (
                filteredTerms.map((term, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 space-y-1.5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {term.term}
                      </h4>
                      <span className="text-[10px] font-semibold text-[#39A900] dark:text-[#48C309] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-sm border border-emerald-100 dark:border-emerald-800/60">
                        {term.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {term.definition}
                    </p>
                    {term.example && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                        {term.example}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto space-y-3 pr-1 flex-1">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-850">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cerrar Glosario
          </button>
        </div>
      </div>
    </div>
  );
};
