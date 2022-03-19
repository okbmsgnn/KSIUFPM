import { all, fork } from 'redux-saga/effects';
import { predictionTableSagas } from '../modules/prediction-table/predictionTableSaga';
import { timescaleSaga } from '../modules/timescale/timescaleSaga';

function* rootSaga() {
  yield all([fork(predictionTableSagas), fork(timescaleSaga)]);
}

export { rootSaga };
