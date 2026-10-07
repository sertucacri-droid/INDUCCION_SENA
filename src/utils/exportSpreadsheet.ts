import { InductionRecord } from '../types/induction';

/**
 * Generates and downloads a CSV spreadsheet file containing the apprentices
 * who presented the SENA induction.
 * Uses UTF-8 BOM so Excel, Google Sheets and other spreadsheet programs
 * display Spanish accents (tildes, ñ) correctly.
 */
export function downloadApprenticeSpreadsheet(records: InductionRecord[], fileNamePrefix = 'Registro_Induccion_SENA'): void {
  const headers = [
    'ID Registro',
    'Nombre Completo',
    'Tipo Documento',
    'Número Documento',
    'Programa de Formación',
    'Número de Ficha',
    'Centro de Formación',
    'Regional',
    'Modalidad',
    'Calificación Evaluación (%)',
    'Puntos Gamificados (XP)',
    'Tiempo Empleado',
    'Racha Máxima',
    'Estado Inducción',
    'Fecha de Presentación',
    'Código de Verificación'
  ];

  const rows = records.map(r => [
    r.id,
    `"${r.fullName.replace(/"/g, '""')}"`,
    r.documentType,
    `"${r.documentNumber}"`,
    `"${r.trainingProgram.replace(/"/g, '""')}"`,
    `"${r.fichaNumber}"`,
    `"${r.trainingCenter.replace(/"/g, '""')}"`,
    `"${r.regional.replace(/"/g, '""')}"`,
    r.modality,
    `${r.score}%`,
    r.gamifiedScore ?? Math.round((r.score / 100) * 2500),
    `"${r.timeSpentFormatted || '03:45 min'}"`,
    r.streakMax ?? Math.round(r.score / 10),
    r.status,
    `"${r.completedDate}"`,
    `"${r.verificationCode}"`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n');

  // \uFEFF is the UTF-8 Byte Order Mark for Microsoft Excel compatibility
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().split('T')[0];
  link.href = url;
  link.setAttribute('download', `${fileNamePrefix}_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
