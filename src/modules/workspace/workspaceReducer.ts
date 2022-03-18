import { Reducer } from 'react';
import * as R from 'ramda';
import {
  DEFAULT_WINDOW,
  WindowState,
  WorkspaceAction,
  WorkspaceState,
  WorkspaceWindow,
} from './model';
import {
  CLOSE_WINDOW,
  MAXIMIZE_WINDOW,
  MINIMIZE_WINDOW,
  NORMALIZE_WINDOW,
  OPEN_WINDOW,
  SET_ACTIVE_WINDOW,
} from './workspaceActions';
import { createSelector } from 'reselect';
import { indexWindows } from './utils/indexWindows';

export const STATE_KEY = 'workspace';

const initialState: WorkspaceState = {
  windows: {},
  activeWindow: null,
};

export const workspaceReducer: Reducer<
  WorkspaceState,
  WorkspaceAction
> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_WINDOW: {
      const window: WorkspaceWindow = {
        ...DEFAULT_WINDOW,
        id: action.payload,
      };

      const orderedWindows = indexWindows(
        R.assoc(window.id, window, state.windows)
      );

      return R.assoc('windows', orderedWindows, state);
    }
    case CLOSE_WINDOW: {
      const windows = R.dissoc(action.payload, state.windows);
      const orderedWindows = indexWindows(windows);

      return R.assoc('windows', orderedWindows, state);
    }
    case MAXIMIZE_WINDOW: {
      const windows = R.mapObjIndexed<
        WorkspaceWindow,
        WorkspaceWindow,
        string
      >((value) => {
        if (value.state === WindowState.Maximized)
          value.state = WindowState.Normal;
        return value;
      }, state.windows);

      const window = windows[action.payload];
      if (!window) return state;
      window.state = WindowState.Maximized;

      return R.assoc('windows', windows, state);
    }
    case MINIMIZE_WINDOW: {
      const window = R.path<WorkspaceWindow>(
        ['windows', action.payload],
        state
      );
      if (!window) return state;
      window.state = WindowState.Minimized;

      return R.assocPath(['windows', action.payload], window, state);
    }
    case NORMALIZE_WINDOW: {
      const window = R.path<WorkspaceWindow>(
        ['windows', action.payload],
        state
      );
      if (!window) return state;

      const normalizedWindow = {
        ...window,
        state: WindowState.Normal,
      };
      const windows = R.assocPath(
        ['windows', action.payload],
        normalizedWindow,
        state.windows
      );
      const orderedWindows = indexWindows(windows);

      return R.assocPath(
        ['windows', action.payload],
        orderedWindows,
        state
      );
    }
    case SET_ACTIVE_WINDOW: {
      const window = R.path<WorkspaceWindow>(
        ['windows', action.payload],
        state
      );
      if (!window) return state;

      const reorderedWindows = R.assoc(
        action.payload,
        { ...window, order: -1 },
        state.windows
      );
      const orderedWindow = indexWindows(reorderedWindows);

      return R.compose(
        R.assoc('activeWindow', window),
        R.assoc('windows', orderedWindow)
      )(state) as WorkspaceState;
    }
    default:
      return state;
  }
};

export const getState = (state: any): WorkspaceState =>
  state[STATE_KEY];

export const getWindows = createSelector(
  getState,
  (state) => state.windows
);

export const getWindowsAsArray = createSelector(
  getWindows,
  (windows) =>
    Object.values(windows).filter(
      (window) => window.state !== WindowState.Maximized
    )
);

export const getMaximizedWindow = createSelector(
  getWindows,
  (windows) =>
    Object.values(windows ?? {}).find(
      (window) => window.state === WindowState.Maximized
    )
);

export const getActiveWindow = createSelector(
  getState,
  (state) => state.activeWindow
);
