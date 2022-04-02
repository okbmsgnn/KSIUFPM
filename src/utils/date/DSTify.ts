import { utcHour } from 'd3-time';
import { isDST } from './isDST';

export const DSTify = (date: Date, reverse = false): Date =>
  isDST(date) ? utcHour.offset(date, +!reverse * 2 - 1) : date;
