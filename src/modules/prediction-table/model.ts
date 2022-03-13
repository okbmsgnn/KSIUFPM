import { InferActionCreatorsTypes } from '../../utils/types';
import {
  LOAD_TABLES,
  predictionTableActions,
} from './predictionTableActions';

export const MESSAGE = {
  TABLE_CREATION_SUCCESS: 'Table created!',
  TABLE_CREATION_FAIL: 'Failed to create a table!',
};

export type StepType = 'hours' | 'days' | 'month';

export type PredictionTable = {
  id: string;
  createdAt: Date;
  name: string;
  localName: string;
  description: string;
  tags: string;
  startDate: Date | null;
  endDate: Date | null;
  colorPalette: [string, string, string, string];
  step: { type: StepType; value: number };
};

export type PredictionTableDraft = Omit<
  PredictionTable,
  'id' | 'createdAt'
>;

export type PredictionTableAction =
  | InferActionCreatorsTypes<typeof predictionTableActions>
  | {
      type: `${typeof LOAD_TABLES}_SUCCESS`;
      payload: PredictionTable[];
    };

export type TableStatus = {
  success: boolean;
  description?: string;
};

export type PredictionTableState = {
  tables: PredictionTable[];
  tableStatus: TableStatus | null;
};
