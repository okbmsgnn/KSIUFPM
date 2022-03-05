import { TimeView } from './model';

const namespace = '@customDatePicker';

export const SET_VIEW = `${namespace}/SET_VIEW`;

export const customDatePickerActions = {
  setView: (payload: TimeView) => ({ type: SET_VIEW, payload }),
};
