import { IRange } from '../../types/IRange';
import { ISize } from '../../types/ISize';

export const namespace = 'TIMESCALE';

export const SET_TIMESCALE_SIZE =
  `${namespace}/SET_TIMESCALE_SIZE` as const;
export const SET_EXTREME_DATES =
  `${namespace}/SET_EXTREME_DATES` as const;
export const ZOOM_IN = `${namespace}/ZOOM_IN` as const;
export const ZOOM_OUT = `${namespace}/ZOOM_OUT` as const;
export const RESET_ZOOM = `${namespace}/RESET_ZOOM` as const;

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

export const zoomIn = (payload: string) => ({
  type: ZOOM_IN,
  payload,
});

export const zoomOut = (payload: string) => ({
  type: ZOOM_OUT,
  payload,
});

export const resetZoom = (payload: string) => ({
  type: RESET_ZOOM,
  payload,
});

export const timescaleActions = {
  setTimescaleSize,
  setExtremeDates,
};
