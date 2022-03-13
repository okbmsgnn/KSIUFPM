import { PredictionTable } from '../model';

export const normalizePredictionTables = (
  tables: (PredictionTable & {
    endDate: string;
    startDate: string;
    createdAt: string;
  })[]
): PredictionTable[] => {
  return tables.map((t) => ({
    ...t,
    startDate: t.startDate ? new Date(t.startDate) : null,
    endDate: t.endDate ? new Date(t.endDate) : null,
    createdAt: new Date(t.createdAt),
  }));
};
