import { InferActionCreatorsTypes } from '../../utils/types';
import { PredictionTable } from '../prediction-table/model';
import { workspaceActions } from './workspaceActions';

export interface WorkspaceState {
  extremeDates: { min: Date; max: Date } | null;
  table: PredictionTable | null;
}

export type WorkspaceAction = InferActionCreatorsTypes<
  typeof workspaceActions
>;
