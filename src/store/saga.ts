import { all, fork } from 'redux-saga/effects';
import { predictionTableSagas } from '../modules/prediction-table/predictionTableSaga';

function* rootSaga() {
  yield all([fork(predictionTableSagas)]);
}

export { rootSaga };
