import { combineReducers } from 'redux';
import * as predictionTable from '../modules/prediction-table/predictionTableReducer';
import * as workspace from '../modules/workspace/workspaceReducer';
import * as ui from '../modules/ui/uiReducer';

const rootReducer = combineReducers({
  [predictionTable.STATE_KEY]: predictionTable.predictionTableReducer,
  [workspace.STATE_KEY]: workspace.workspaceReducer,
  [ui.STATE_KEY]: ui.uiReducer,
});

export { rootReducer };
