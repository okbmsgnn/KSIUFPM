import { combineReducers } from 'redux';
import * as predictionTable from '../modules/prediction-table/predictionTableReducer';
import * as workspace from '../modules/workspace/workspaceReducer';
import * as timescale from '../modules/timescale/timescaleReducer';
import * as application from '../modules/application/applicationReducer';
import * as tableObject from '../modules/table-object/tableObjectReducer';

const rootReducer = combineReducers({
  [predictionTable.STATE_KEY]: predictionTable.predictionTableReducer,
  [workspace.STATE_KEY]: workspace.workspaceReducer,
  [timescale.STATE_KEY]: timescale.timescaleReducer,
  [application.STATE_KEY]: application.applicationReducer,
  [tableObject.STATE_KEY]: tableObject.tableObjectReducer,
});

export { rootReducer };
