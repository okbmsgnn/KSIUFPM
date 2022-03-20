import { IPoint } from '../../types/IPoint';
import { WorkspaceWindow } from './model';

export const namespace = 'WORKSPACE';

export const INIT_OPEN_WINDOW =
  `${namespace}/INIT_OPEN_WINDOW` as const;
export const OPEN_WINDOW = `${namespace}/OPEN_WINDOW` as const;
export const CLOSE_WINDOW = `${namespace}/CLOSE_WINDOW` as const;
export const MAXIMIZE_WINDOW =
  `${namespace}/MAXIMIZE_WINDOW` as const;
export const MINIMIZE_WINDOW =
  `${namespace}/MINIMIZE_WINDOW` as const;
export const NORMALIZE_WINDOW =
  `${namespace}/NORMALIZE_WINDOW` as const;
export const SET_ACTIVE_WINDOW =
  `${namespace}/SET_ACTIVE_WINDOW` as const;
export const LOCATE_WINDOW = `${namespace}/LOCATE_WINDOW` as const;

export const initOpenWindow = (payload: string) => ({
  type: INIT_OPEN_WINDOW,
  payload,
});

export const openWindow = (payload: WorkspaceWindow) => ({
  type: OPEN_WINDOW,
  payload,
});

export const closeWindow = (payload: string) => ({
  type: CLOSE_WINDOW,
  payload,
});

export const minimizeWindow = (payload: string) => ({
  type: MINIMIZE_WINDOW,
  payload,
});

export const maximizeWindow = (payload: string) => ({
  type: MAXIMIZE_WINDOW,
  payload,
});

export const normalizeWindow = (payload: string) => ({
  type: NORMALIZE_WINDOW,
  payload,
});

export const setActiveWindow = (payload: string) => ({
  type: SET_ACTIVE_WINDOW,
  payload,
});

export const locateWindow = (payload: {
  id: string;
  location: IPoint;
}) => ({
  type: LOCATE_WINDOW,
  payload,
});

export const workspaceActions = {
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  normalizeWindow,
  setActiveWindow,
  locateWindow,
};
