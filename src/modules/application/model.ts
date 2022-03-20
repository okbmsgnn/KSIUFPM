import { ISize } from '../../types/ISize';
import { InferActionCreatorsTypes } from '../../utils/types';
import { applicationActions } from './applicationActions';

export type ApplicationState = {
  windowSize: {
    client: ISize;
    offset: ISize;
  };
};

export type ApplicationAction = InferActionCreatorsTypes<
  typeof applicationActions
>;
