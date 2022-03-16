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
  size: { width: number; height: number };
  order: number;
};

export const DEFAULT_WINDOW: WorkspaceWindow = {
  id: '',
  size: { width: 300, height: 300 },
  state: WindowState.Normal,
  order: -1,
};

export interface WorkspaceState {
  windows: { [key: string]: WorkspaceWindow };
  activeWindow: WorkspaceWindow | null;
}

export type WorkspaceAction = InferActionCreatorsTypes<
  typeof workspaceActions
>;
