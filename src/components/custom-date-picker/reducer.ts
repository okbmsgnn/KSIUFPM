import React from 'react';
import {
  SET_ITEMS,
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
  items: { legends: [], dates: [] },
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
      return {
        ...state,
        view: action.payload,
      };
    }
    case SET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case SET_SELECTED_DATE: {
      return {
        ...state,
        selectedDate: action.payload,
      };
    }
    case SET_PAGE_OFFSET: {
      return {
        ...state,
        pageOffset: action.payload,
      };
    }
    default:
      return state;
  }
};
