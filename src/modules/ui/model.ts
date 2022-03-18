import { IRange } from '../../types/IRange';
import { ISize } from '../../types/ISize';
import { InferActionCreatorsTypes } from '../../utils/types';
import { uiActions } from './uiActions';

export type UIState = {
  timescaleSize: ISize;
  extremeDates: IRange<Date> | null;
};

export type UIAction = InferActionCreatorsTypes<typeof uiActions>;
