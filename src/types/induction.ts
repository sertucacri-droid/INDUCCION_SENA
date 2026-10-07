export interface LearnerProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PPT' | 'PEP';
  documentNumber: string;
  trainingProgram: string;
  fichaNumber: string;
  trainingCenter: string;
  regional: string;
  modality: 'Presencial' | 'Virtual' | 'A Distancia';
}

export type ModuleId = 'identity' | 'training' | 'regulations' | 'platforms' | 'assessment';

export interface ModuleProgress {
  identity: boolean;
  training: boolean;
  regulations: boolean;
  platforms: boolean;
  assessmentScore: number | null; // 0-100
  completedAt?: string;
}

export interface QuizQuestion {
  id: number;
  sectionKey: 'derechos' | 'deberes' | 'prohibiciones' | 'faltas' | 'medidas';
  sectionTitle: string;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  positivePraise?: string;
  correctionTip?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  situation: string;
  role: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  category: 'Académico' | 'Institucional' | 'Plataformas' | 'Reglamento';
  definition: string;
  example?: string;
}

export interface InductionRecord {
  id: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  trainingProgram: string;
  fichaNumber: string;
  trainingCenter: string;
  regional: string;
  modality: string;
  score: number;
  status: 'Aprobado' | 'En Proceso' | 'No Aprobado';
  completedDate: string;
  verificationCode: string;
  answers?: Record<number, number>; // questionId -> selectedOptionIndex
  timeSpentSeconds?: number;
  timeSpentFormatted?: string;
  gamifiedScore?: number;
  streakMax?: number;
}
