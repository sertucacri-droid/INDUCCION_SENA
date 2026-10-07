import React, { useState } from 'react';
import { 
  Building2, 
  Flag, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  HeartHandshake,
  Layers,
  ChevronRight
} from 'lucide-react';
import { INSTITUTIONAL_INFO, SYMBOLS_DATA } from '../data/inductionData';
import AudioAnthemPlayer from './AudioAnthemPlayer';
import { SENA_LOGO_SVG } from '../assets/senaLogo';

interface IdentitySymbolsModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNextModule: () => void;
}

export default function IdentitySymbolsModule({
  isCompleted,
  onToggleComplete,
  onNextModule
}: IdentitySymbolsModuleProps) {
  const [activeTab, setActiveTab] = useState<'fundacion' | 'mision' | 'valores' | 'simbolos' | 'himno'>('fundacion');
  const [selectedCrestSector, setSelectedCrestSector] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <span>Módulo 1</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#39A900] dark:text-[#48C309]">Identidad Institucional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Historia, Símbolos y Valores del SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Comprende el origen social, los símbolos que nos representan como colombianos y los principios éticos que guían a cada aprendiz en su paso por la institución.
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
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg">
          <button
            onClick={() => setActiveTab('fundacion')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'fundacion' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Origen y Fundador
          </button>
          <button
            onClick={() => setActiveTab('mision')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'mision' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Misión y Visión
          </button>
          <button
            onClick={() => setActiveTab('valores')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'valores' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Valores Institucionales
          </button>
          <button
            onClick={() => setActiveTab('simbolos')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'simbolos' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Escudo, Bandera y Logo
          </button>
          <button
            onClick={() => setActiveTab('himno')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'himno' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Himno del SENA
          </button>
        </div>
      </div>

      {/* Tab Content: Origen y Fundador */}
      {activeTab === 'fundacion' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] dark:text-[#48C309]">
              <Calendar className="w-4 h-4" />
              <span>Fundado el 21 de junio de 1957</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              La iniciativa visionaria de Rodolfo Martínez Tono
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              El Servicio Nacional de Aprendizaje (SENA) nació gracias a la visión del cartagenero <strong>Rodolfo Martínez Tono</strong>, quien durante su tesis de grado en ciencias económicas y jurídicas planteó una organización estatal dedicada a la formación profesional acelerada de los obreros colombianos.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Bajo el gobierno de la Junta Militar, mediante el <strong>Decreto Ley 118 de 1957</strong>, se formalizó la entidad con un modelo tripartito histórico: financiado por aportes parafiscales de los empresarios, respaldado por las centrales obreras y administrado por el Estado colombiano.
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Decreto Fundacional</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{INSTITUTIONAL_INFO.decree}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Naturaleza Jurídica</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{INSTITUTIONAL_INFO.nature}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-900 rounded-xl p-6 sm:p-8 text-white flex flex-col justify-between border border-emerald-900/60">
            <div>
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block mb-2">
                Hito Histórico
              </span>
              <h4 className="text-lg font-bold">Un pacto nacional por el trabajo digno</h4>
              <p className="text-xs text-emerald-100/90 leading-relaxed mt-2">
                Desde 1957, el SENA ha capacitado a millones de campesinos, operarios, técnicos y tecnólogos, garantizando movilidad social real para las familias colombianas.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-800/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-emerald-200/70">Primer Director General</span>
                <span className="font-semibold text-white">Rodolfo Martínez Tono (1957 - 1974)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-200/70">Ministerio de Adscripción</span>
                <span className="font-semibold text-white">Ministerio del Trabajo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Misión y Visión */}
      {activeTab === 'mision' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Misión Institucional</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {INSTITUTIONAL_INFO.mission}
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              Eje rector: Formación Profesional Integral gratuita y pertinente para el sector productivo.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visión Institucional</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {INSTITUTIONAL_INFO.vision}
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              Eje rector: Innovación tecnológica, sostenibilidad ambiental y justicia social en las 33 regionales.
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Valores */}
      {activeTab === 'valores' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Código de Integridad y Valores del Aprendiz SENA
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              El comportamiento del aprendiz se fundamenta en seis valores que transforman vidas y entornos productivos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INSTITUTIONAL_INFO.values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-[#39A900]/50 transition-all space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950 text-[#39A900] dark:text-[#48C309] flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{val.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Símbolos */}
      {activeTab === 'simbolos' && (
        <div className="space-y-6">
          {/* Símbolo 1: El Escudo con desglose interactivo */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
                <img
                  src="/src/assets/images/sena_symbols_crest_1791319387565.jpg"
                  alt="Escudo Institucional del SENA"
                  className="w-56 h-56 object-contain rounded-lg shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-3 text-center">
                  Emblema que unifica los 3 sectores de la economía
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold text-[#39A900] dark:text-[#48C309] uppercase tracking-wider">
                  Símbolo Oficial
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{SYMBOLS_DATA.crest.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {SYMBOLS_DATA.crest.description}
                </p>

                {/* Interactive sector cards */}
                <div className="space-y-2 pt-2">
                  {SYMBOLS_DATA.crest.elements.map((elem, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCrestSector(idx)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                        selectedCrestSector === idx
                          ? 'border-[#39A900] dark:border-[#48C309] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{elem.title}</span>
                        <span className="text-xs font-semibold text-[#39A900] dark:text-[#48C309]">{elem.sector}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {elem.meaning}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Símbolo 2 & 3: Bandera y Logotipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309] flex items-center justify-center">
                <Flag className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{SYMBOLS_DATA.flag.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {SYMBOLS_DATA.flag.meaning}
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <strong>Color Blanco:</strong> Paz, transparencia y libertad. <br />
                <strong>Verde SENA (#39A900):</strong> Esperanza, crecimiento y desarrollo productivo.
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                  <img
                    src={SENA_LOGO_SVG}
                    alt="Logotipo Oficial SENA"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#39A900] dark:text-[#48C309] uppercase tracking-wider block">
                    Identidad Gráfica
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{SYMBOLS_DATA.logo.name}</h4>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {SYMBOLS_DATA.logo.meaning}
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <strong>Estructura:</strong> Tres líneas ascendentes que convergen en la cabeza del estudiante, indicando que el aprendiz es el centro del proceso formativo.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Himno del SENA */}
      {activeTab === 'himno' && (
        <div className="space-y-4">
          <AudioAnthemPlayer />
        </div>
      )}

      {/* Navigation footer to next module */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors duration-300">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Siguiente módulo formativo: Modelo Pedagógico y Ruta del Aprendiz
        </span>
        <button
          onClick={onNextModule}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span>Ir a Formación Integral</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
