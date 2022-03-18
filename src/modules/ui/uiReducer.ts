import { Reducer } from 'react';
import * as R from 'ramda';
import { UIAction, UIState } from './model';
import { SET_EXTREME_DATES, SET_TIMESCALE_SIZE } from './uiActions';
import { createSelector } from 'reselect';
import { utcDay } from 'd3-time';

export const STATE_KEY = 'ui' as const;

const initialState: UIState = {
  timescaleSize: { width: 0, height: 0 },
  extremeDates: {
    min: utcDay.offset(new Date(), -30),
    max: utcDay.offset(new Date(), 30),
  },
};

export const uiReducer: Reducer<UIState, UIAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_TIMESCALE_SIZE:
      return R.assoc('timescaleSize', action.payload, state);
    case SET_EXTREME_DATES:
      return R.assoc('extremeDates', action.payload, state);
    default:
      return state;
  }
};

export const getState = (state: any): UIState => state[STATE_KEY];

export const getTimescaleSize = createSelector(
  getState,
  (state) => state.timescaleSize
);

export const getExtremeDates = createSelector(
  getState,
  (state) => state.extremeDates
);
