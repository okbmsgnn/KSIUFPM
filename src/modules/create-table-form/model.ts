import { PredictionTableDraft } from '../prediction-table/model';

export const DEFAULT_TABLE_TEMPLATE: PredictionTableDraft = {
  name: '',
  localName: '',
  description: '',
  tags: '',
  startDate: null,
  endDate: null,
  colorPalette: ['#b0f4ff', '#d7ffbf', '#86aff7', '#9a86f7'],
  step: { type: 'days', value: 1 },
};
