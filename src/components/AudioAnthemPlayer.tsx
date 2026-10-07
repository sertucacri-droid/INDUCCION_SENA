import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Music, Copy, Check } from 'lucide-react';
import { SYMBOLS_DATA } from '../data/inductionData';

export default function AudioAnthemPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Solemn institutional fanfare melody notes (frequencies in Hz: C4, E4, G4, C5...)
  const melodyNotes = [
    { freq: 261.63, dur: 0.5 }, // C4
    { freq: 329.63, dur: 0.5 }, // E4
    { freq: 392.00, dur: 0.75 }, // G4
    { freq: 523.25, dur: 1.0 }, // C5
    { freq: 440.00, dur: 0.5 }, // A4
    { freq: 392.00, dur: 0.5 }, // G4
    { freq: 349.23, dur: 0.5 }, // F4
    { freq: 329.63, dur: 0.75 }, // E4
    { freq: 293.66, dur: 0.5 }, // D4
    { freq: 261.63, dur: 1.2 }  // C4
  ];

  const playNote = (ctx: AudioContext, freq: number, duration: number, time: number) => {
    if (isMuted) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.2, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  };

  const startAudio = () => {
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      const ctx = audioCtxRef.current;
      let currTime = ctx.currentTime + 0.1;

      // Play 2 passes of melody sequence
      for (let pass = 0; pass < 2; pass++) {
        melodyNotes.forEach((n) => {
          playNote(ctx, n.freq, n.dur, currTime);
          currTime += n.dur;
        });
        currTime += 0.4;
      }

      // Interval to highlight verses progression
      let currentIdx = 0;
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        currentIdx = (currentIdx + 1) % SYMBOLS_DATA.anthem.stanzas.length;
        setActiveVerseIndex(currentIdx);
      }, 3500);

    } catch (e) {
      console.warn('Audio playback error', e);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  const handleCopyLyrics = () => {
    const fullText = SYMBOLS_DATA.anthem.stanzas
      .map(s => `[${s.type}]\n${s.lines.join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(`HIMNO DEL SENA\nLetra: ${SYMBOLS_DATA.anthem.lyricsAuthor} | Música: ${SYMBOLS_DATA.anthem.musicAuthor}\n\n${fullText}`)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch(() => {});
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48C309]">
              <Music className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">{SYMBOLS_DATA.anthem.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Letra: {SYMBOLS_DATA.anthem.lyricsAuthor} · Música: {SYMBOLS_DATA.anthem.musicAuthor}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLyrics}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            title="Copiar la letra completa del Himno al portapapeles"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#39A900]" />
                <span className="text-[#39A900] font-bold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Letra</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (isPlaying) {
                stopAudio();
              } else {
                startAudio();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#39A900] text-white hover:bg-[#329600] font-medium text-xs transition-colors shadow-xs cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausar Sintonía</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Escuchar Melodía Institucional</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            aria-label="Silenciar o activar"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-amber-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setActiveVerseIndex(0)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Reiniciar a coro inicial"
            aria-label="Reiniciar estrofa"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Verses Grid with interactive selector */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-3">
        {SYMBOLS_DATA.anthem.stanzas.map((stanza, idx) => {
          const isActive = activeVerseIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveVerseIndex(idx)}
              className={`text-left p-3.5 rounded-lg transition-all border ${
                isActive
                  ? 'border-[#39A900] dark:border-[#48C309] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                  : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold tracking-wide ${isActive ? 'text-[#39A900] dark:text-[#48C309]' : 'text-slate-600 dark:text-slate-400'}`}>
                  {stanza.type}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#39A900] dark:bg-[#48C309] animate-pulse" />
                )}
              </div>
              <div className="space-y-1">
                {stanza.lines.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className={`text-xs leading-relaxed ${
                      isActive ? 'text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>El himno se entona con respeto y solemnidad en todos los actos protocolarios del SENA.</span>
        <span>Decreto Ley 118 de 1957</span>
      </div>
    </div>
  );
}
