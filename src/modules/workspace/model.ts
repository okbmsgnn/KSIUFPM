import { IPoint } from '../../types/IPoint';
import { ISize } from '../../types/ISize';
import { InferActionCreatorsTypes } from '../../utils/types';
import { workspaceActions } from './workspaceActions';

export enum WindowState {
  Maximized = 'Maximized',
  Minimized = 'Minimized',
  Normal = 'Normal',
}

export type WorkspaceWindow = {
  id: string;
  state: WindowState;
  size: ISize;
  location: IPoint;
  order: number;
  index: number;
};

export interface WorkspaceState {
  windows: { [key: string]: WorkspaceWindow };
  activeWindow: WorkspaceWindow | null;
}

export type WorkspaceAction = InferActionCreatorsTypes<
  typeof workspaceActions
>;
