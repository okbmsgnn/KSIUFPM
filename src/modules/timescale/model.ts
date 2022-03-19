import { IRange } from '../../types/IRange';
import { ISize } from '../../types/ISize';
import { InferActionCreatorsTypes } from '../../utils/types';
import { timescaleActions } from './timescaleActions';

export type TimescaleState = {
  timescaleSize: { [key: string]: ISize };
  extremeDates: { [key: string]: IRange<Date> };
};

export type TimescaleAction = InferActionCreatorsTypes<
  typeof timescaleActions
>;
