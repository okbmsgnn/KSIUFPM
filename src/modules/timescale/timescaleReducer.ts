import { Reducer } from 'react';
import * as R from 'ramda';
import { TimescaleAction, TimescaleState } from './model';
import {
  SET_EXTREME_DATES,
  SET_TIMESCALE_SIZE,
} from './timescaleActions';
import { createSelector } from 'reselect';
import { utcMillisecond } from 'd3-time';

export const STATE_KEY = 'timescale' as const;

const initialState: TimescaleState = {
  timescaleSize: {},
  extremeDates: {},
};

export const timescaleReducer: Reducer<
  TimescaleState,
  TimescaleAction
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMESCALE_SIZE: {
      const { size, tableId } = action.payload;
      return R.assocPath(['timescaleSize', tableId], size, state);
    }
    case SET_EXTREME_DATES: {
      const { dates, tableId } = action.payload;
      return R.assocPath(['extremeDates', tableId], dates, state);
    }
    default:
      return state;
  }
};

export const getState = (state: any): TimescaleState =>
  state[STATE_KEY];

export const getTimescaleSize = createSelector(
  getState,
  (_: any, props: { tableId: string }) => props.tableId,
  (state, tableId) =>
    state.timescaleSize[tableId] ?? { height: 0, width: 0 }
);

export const getExtremeDates = createSelector(
  getState,
  (_: any, props: { tableId: string }) => props.tableId,
  (state, tableId) =>
    state.extremeDates[tableId] ?? {
      max: new Date(),
      min: new Date(),
    }
);

export const getMsDelta = createSelector(
  getState,
  (_: any, props: { tableId: string }) => props.tableId,
  (state, tableId) => {
    const dates = state.extremeDates[tableId] ?? {
      max: new Date(),
      min: new Date(),
    };

    return utcMillisecond.count(dates.min, dates.max);
  }
);
