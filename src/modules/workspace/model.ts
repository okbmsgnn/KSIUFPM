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
  order: number;
  index: number;
};

export const DEFAULT_WINDOW: WorkspaceWindow = {
  id: '',
  size: { width: 400, height: 300 },
  state: WindowState.Normal,
  order: -1,
  index: -1,
};

export interface WorkspaceState {
  windows: { [key: string]: WorkspaceWindow };
  activeWindow: WorkspaceWindow | null;
}

export type WorkspaceAction = InferActionCreatorsTypes<
  typeof workspaceActions
>;
