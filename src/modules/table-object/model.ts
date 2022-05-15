import { InferActionCreatorsTypes } from '../../utils/types';
import {
  LOAD_STRICT_EVENTS,
  tableObjectActions,
} from './tableObjectActions';

export interface ITableObject {
  id: string;
  sizeMultiplier: number;
  x: number;
  date: Date;
}

export interface IStrictEvent extends ITableObject {
  text: string;
  incomingChances: { [tableObjectId: string]: number };
  outcomingChances: { [tableObjectId: string]: number };
  props: { [key: string]: number };
}

export type TableObjectState = {
  [tableId: string]: {
    strictEvents: IStrictEvent[];
  };
};

export type TableObjectAction =
  | InferActionCreatorsTypes<typeof tableObjectActions>
  | {
      type: `${typeof LOAD_STRICT_EVENTS}_SUCCESS`;
      payload: IStrictEvent[];
    };
