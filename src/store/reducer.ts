import { combineReducers } from 'redux';
import * as predictionTable from '../modules/prediction-table/predictionTableReducer';
import * as workspace from '../modules/workspace/workspaceReducer';
import * as timescale from '../modules/timescale/timescaleReducer';

const rootReducer = combineReducers({
  [predictionTable.STATE_KEY]: predictionTable.predictionTableReducer,
  [workspace.STATE_KEY]: workspace.workspaceReducer,
  [timescale.STATE_KEY]: timescale.timescaleReducer,
});

export { rootReducer };
