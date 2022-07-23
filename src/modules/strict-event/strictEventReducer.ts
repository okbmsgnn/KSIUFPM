import { Reducer } from 'redux';
import * as R from 'ramda';
import { createSelector } from 'reselect';
import { StrictEventAction, StrictEventState } from './model';
import {
  LOAD_STRICT_EVENTS,
  SAVE_STRICT_EVENTS,
} from './strictEventActions';

export const STATE_KEY = 'tableObject';

const initialState: StrictEventState = {};

export const strictEventReducer: Reducer<
  StrictEventState,
  StrictEventAction
> = (state = initialState, action) => {
  switch (action.type) {
    case `${LOAD_STRICT_EVENTS}_SUCCESS`: {
      const events = action.payload;

      const tableId =
        //@ts-ignore
        action.previousAction.meta.payload.tableId;

      return R.assocPath([tableId, 'strictEvents'], events, state);
    }
    case `${SAVE_STRICT_EVENTS}_SUCCESS`: {
      //@ts-ignore
      const { meta, payload } = action.previousAction;
      return R.assocPath(
        [meta.payload.tableId, 'strictEvents'],
        payload.data,
        state
      );
    }
    default:
      return state;
  }
};

export const getState = (state: any): StrictEventState =>
  state[STATE_KEY];

export const getStrictEvents = createSelector(
  getState,
  (_: any, props: { tableId: string }) => props.tableId,
  (state, tableId) => state[tableId]?.strictEvents ?? []
);
