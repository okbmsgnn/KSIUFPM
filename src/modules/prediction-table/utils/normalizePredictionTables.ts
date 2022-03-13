import { PredictionTable } from '../model';

export const normalizePredictionTables = (
  data: string[]
): PredictionTable[] => {
  const tables: (PredictionTable & {
    endDate: string;
    startDate: string;
  })[] = data.map((d) => JSON.parse(d));

  return tables.map((t) => ({
    ...t,
    startDate: t.startDate ? new Date(t.startDate) : null,
    endDate: t.endDate ? new Date(t.endDate) : null,
  }));
};
