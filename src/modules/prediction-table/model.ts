import { InferActionCreatorsTypes } from '../../utils/types';
import { predictionTableActions } from './predictionTableActions';

export type PredictionTable = {
  name: string;
};

export type PredictionTableAction = InferActionCreatorsTypes<
  typeof predictionTableActions
>;

export type PredictionTableState = {
  tables: PredictionTable[];
};
