import { InferActionCreatorsTypes } from '../../utils/types';
import { customDatePickerActions } from './actions';

export enum TimeView {
  Year = 'Year',
  Month = 'Month',
  Day = 'Day',
}

export const TimeDay = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const TimeMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export interface TimeData {
  legends: string[];
  dates: Date[];
}

export interface CustomDatePickerState {
  items: TimeData;
  view: TimeView;
  selectedDate: Date | null;
  initialDate: Date;
  pageOffset: number;
}

export type CustomDatePickerAction = InferActionCreatorsTypes<
  typeof customDatePickerActions
>;
