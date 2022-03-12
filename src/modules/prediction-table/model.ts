import { InferActionCreatorsTypes } from '../../utils/types';
import { predictionTableActions } from './predictionTableActions';

export type StepType = 'hours' | 'days' | 'month';

export type PredictionTable = {
  name: string;
  description: string;
  tags: string;
  startDate: Date | null;
  endDate: Date | null;
  colorPalette: [string, string, string, string];
  step: { type: StepType; value: number };
};

export type PredictionTableAction = InferActionCreatorsTypes<
  typeof predictionTableActions
>;

export type PredictionTableState = {
  tables: PredictionTable[];
};
