import { Reducer } from 'react';
import * as R from 'ramda';
import { ApplicationAction, ApplicationState } from './model';
import { createSelector } from 'reselect';
import { SET_WINDOW_SIZE } from './applicationActions';

export const STATE_KEY = 'application' as const;

const initialState: ApplicationState = {
  windowSize: {
    client: { width: 0, height: 0 },
    offset: { width: 0, height: 0 },
  },
};

export const applicationReducer: Reducer<
  ApplicationState,
  ApplicationAction
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_WINDOW_SIZE: {
      return R.assoc('windowSize', action.payload, state);
    }
    default:
      return state;
  }
};

export const getState = (state: any): ApplicationState =>
  state[STATE_KEY];

export const getWindowSize = createSelector(
  getState,
  (state) => state.windowSize
);
