export const namespace = 'PREDICTION_TABLE';

export const SET_DATA = `${namespace}/SET_DATA` as const;

export const predictionTableActions = {
  setData(payload: number) {
    return { type: SET_DATA, payload };
  },
};
