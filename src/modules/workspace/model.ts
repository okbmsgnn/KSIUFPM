import { InferActionCreatorsTypes } from '../../utils/types';
import { PredictionTable } from '../prediction-table/model';
import { workspaceActions } from './workspaceActions';

export enum ChartState {
  Maximized = 'Maximized',
  Minimized = 'Minimized',
}

export interface WorkspaceState {
  tables: { [key: string]: ChartState } | null;
  activeTable: PredictionTable | null;
}

export type WorkspaceAction = InferActionCreatorsTypes<
  typeof workspaceActions
>;
