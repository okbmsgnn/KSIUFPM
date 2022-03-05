import React from 'react';
import { SET_VIEW } from './actions';
import {
  CustomDatePickerAction,
  CustomDatePickerState,
  TimeView,
} from './model';

export const initialState: CustomDatePickerState = {
  days: null,
  months: null,
  years: null,
  view: TimeView.Day,
};

export const customDatePickerReducer: React.Reducer<
  CustomDatePickerState,
  CustomDatePickerAction
> = (state, action) => {
  switch (action.type) {
    case SET_VIEW: {
      return { ...state, view: action.payload };
    }
    default:
      return state;
  }
};
