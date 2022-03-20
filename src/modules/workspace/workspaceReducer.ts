import { Reducer } from 'react';
import * as R from 'ramda';
import {
  WindowState,
  WorkspaceAction,
  WorkspaceState,
  WorkspaceWindow,
} from './model';
import {
  CLOSE_WINDOW,
  LOCATE_WINDOW,
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
      const window = action.payload;

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
      if (!R.path(['windows', action.payload], state)) return state;

      const windows = R.mapObjIndexed<
        WorkspaceWindow,
        WorkspaceWindow,
        string
      >((value) => {
        if (value.state === WindowState.Maximized)
          value.state = WindowState.Normal;
        return value;
      }, state.windows);

      const newWindows = R.assocPath(
        [action.payload, 'state'],
        WindowState.Maximized,
        windows
      );

      return R.assoc('windows', newWindows, state);
    }
    case MINIMIZE_WINDOW: {
      if (!R.path(['windows', action.payload], state)) return state;

      return R.assocPath(
        ['windows', action.payload, 'state'],
        WindowState.Minimized,
        state
      );
    }
    case NORMALIZE_WINDOW: {
      if (!R.path(['windows', action.payload], state)) return state;

      return R.assocPath(
        ['windows', action.payload, 'state'],
        WindowState.Normal,
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
      const orderedWindows = indexWindows(reorderedWindows);

      return R.compose(
        R.assoc('activeWindow', window),
        R.assoc('windows', orderedWindows)
      )(state) as WorkspaceState;
    }
    case LOCATE_WINDOW: {
      const { id, location } = action.payload;

      if (!R.path(['windows', id], state)) return state;

      return R.assocPath(
        ['windows', id, 'location'],
        location,
        state
      );
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

export const getWindowsAsArray = createSelector(getState, (state) =>
  Object.values(state.windows)
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
