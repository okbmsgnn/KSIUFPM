import { ISize } from '../../types/ISize';

export const namespace = 'APPLICATION';

export const SET_WINDOW_SIZE =
  `${namespace}/SET_WINDOW_SIZE` as const;
export const SET_STATUS = `${namespace}/SET_STATUS` as const;

export const setWindowSize = (payload: {
  client: ISize;
  offset: ISize;
}) => ({
  type: SET_WINDOW_SIZE,
  payload,
});

// export const setStatus = (payload: {

// }) => ({
//   type: SET_STATUS,
//   payload,
// });

export const applicationActions = {
  setWindowSize,
};
