import { all, fork } from 'redux-saga/effects';
import { predictionTableSagas } from '../modules/prediction-table/predictionTableSaga';
import { strictEventSaga } from '../modules/strict-event/strictEventSaga';
import { timescaleSaga } from '../modules/timescale/timescaleSaga';
import { workspaceSaga } from '../modules/workspace/workspaceSaga';

function* rootSaga() {
  yield all([
    fork(predictionTableSagas),
    fork(timescaleSaga),
    fork(workspaceSaga),
    fork(strictEventSaga),
  ]);
}

export { rootSaga };
