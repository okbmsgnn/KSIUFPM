import { IRange } from '../../types/IRange';
import { ISize } from '../../types/ISize';

export const namespace = 'UI';

export const SET_TIMESCALE_SIZE =
  `${namespace}/SET_TIMESCALE_SIZE` as const;
export const SET_EXTREME_DATES =
  `${namespace}/SET_EXTREME_DATES` as const;

export const setTimescaleSize = (payload: ISize) => ({
  type: SET_TIMESCALE_SIZE,
  payload,
});

export const setExtremeDates = (payload: IRange<Date>) => ({
  type: SET_EXTREME_DATES,
  payload,
});

export const uiActions = {
  setTimescaleSize,
  setExtremeDates,
};
