import { InferActionCreatorsTypes } from '../../utils/types';
import { customDatePickerActions } from './actions';

export enum TimeView {
  Year = 'Year',
  Month = 'Month',
  Day = 'Day',
}

export enum TimeDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum TimeMonth {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

export interface TimeData<T> {
  cells: T[];
  dates: Date[];
}

export interface CustomDatePickerState {
  days: TimeData<TimeDay> | null;
  months: TimeData<TimeMonth> | null;
  years: TimeData<string> | null;
  view: TimeView;
}

export type CustomDatePickerAction = InferActionCreatorsTypes<
  typeof customDatePickerActions
>;
