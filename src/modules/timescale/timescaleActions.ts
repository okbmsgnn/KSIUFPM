import { IRange } from '../../types/IRange';
import { ISize } from '../../types/ISize';

export const namespace = 'TIMESCALE';

export const SET_TIMESCALE_SIZE =
  `${namespace}/SET_TIMESCALE_SIZE` as const;
export const SET_EXTREME_DATES =
  `${namespace}/SET_EXTREME_DATES` as const;

export const setTimescaleSize = (payload: {
  tableId: string;
  size: ISize;
}) => ({
  type: SET_TIMESCALE_SIZE,
  payload,
});

export const setExtremeDates = (payload: {
  tableId: string;
  dates: IRange<Date>;
}) => ({
  type: SET_EXTREME_DATES,
  payload,
});

export const timescaleActions = {
  setTimescaleSize,
  setExtremeDates,
};
