import { TimeData, TimeView } from './model';

const namespace = '@customDatePicker';

export const SET_VIEW = `${namespace}/SET_VIEW`;
export const SET_ITEMS = `${namespace}/SET_ITEMS`;
export const SET_SELECTED_DATE = `${namespace}/SET_SELECTED_DATE`;
export const SET_PAGE_OFFSET = `${namespace}/SET_PAGE_OFFSET`;

export const customDatePickerActions = {
  setView: (payload: TimeView) => ({
    type: SET_VIEW,
    payload,
  }),
  setItems: (payload: TimeData) => ({
    type: SET_ITEMS,
    payload,
  }),
  setSelectedDate: (payload: Date | null) => ({
    type: SET_SELECTED_DATE,
    payload,
  }),
  setPageOffset: (payload: number) => ({
    type: SET_PAGE_OFFSET,
    payload,
  }),
};
