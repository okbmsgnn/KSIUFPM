import React from 'react';
import {
  SET_DATES,
  SET_PAGE_OFFSET,
  SET_SELECTED_DATE,
  SET_VIEW,
} from './actions';
import {
  CustomDatePickerAction,
  CustomDatePickerState,
  TimeData,
  TimeView,
} from './model';

export const initialState: CustomDatePickerState = {
  dates: null,
  view: TimeView.Day,
  selectedDate: null,
  initialDate: new Date(),
  pageOffset: 0,
};

export const customDatePickerReducer: React.Reducer<
  CustomDatePickerState,
  CustomDatePickerAction
> = (state, action) => {
  switch (action.type) {
    case SET_VIEW: {
      return { ...initialState, view: action.payload as TimeView };
    }
    case SET_DATES: {
      return {
        ...initialState,
        dates: action.payload as TimeData,
      };
    }
    case SET_SELECTED_DATE: {
      return {
        ...state,
        selectedDate: action.payload as Date,
      };
    }
    case SET_PAGE_OFFSET: {
      return {
        ...state,
        pageOffset: action.payload as number,
      };
    }
    default:
      return state;
  }
};
