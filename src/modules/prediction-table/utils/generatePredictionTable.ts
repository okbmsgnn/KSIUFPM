import { v4 as uuid } from 'uuid';
import { PredictionTable, PredictionTableDraft } from '../model';

export const generatePredictionTable = (
  draft: PredictionTableDraft
): PredictionTable => ({
  ...draft,
  createdAt: new Date(),
  id: uuid(),
});
