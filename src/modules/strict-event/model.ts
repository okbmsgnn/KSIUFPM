import { InferActionCreatorsTypes } from '../../utils/types';
import { ITableObject } from '../table-object/model';
import {
  LOAD_STRICT_EVENTS,
  strictEventActions,
} from './strictEventActions';

export interface IStrictEvent extends ITableObject {
  text: string;
  incomingChances: { [tableObjectId: string]: number };
  outcomingChances: { [tableObjectId: string]: number };
  props: { [key: string]: number };
}

export type StrictEventState = {
  [tableId: string]: {
    strictEvents: IStrictEvent[];
  };
};

export type StrictEventAction =
  | InferActionCreatorsTypes<typeof strictEventActions>
  | {
      type: `${typeof LOAD_STRICT_EVENTS}_SUCCESS`;
      payload: IStrictEvent[];
    };
