import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { IStrictEvent } from '../model';

export const createStrictEventFrom = (
  tableId: string,
  partial?: Omit<Partial<IStrictEvent>, 'tableId'>
) =>
  R.mergeDeepRight(
    {
      date: new Date(),
      id: uuid(),
      incomingChances: {},
      outcomingChances: {},
      props: {},
      size: { width: 50, height: 50 },
      sizeMultiplier: 1,
      text: '',
      x: 0.5,
      tableId,
    },
    partial ?? {}
  );
