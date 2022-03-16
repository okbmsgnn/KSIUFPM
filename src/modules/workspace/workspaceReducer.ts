import { Reducer } from 'react';
import { WorkspaceAction, WorkspaceState } from './model';

export const STATE_KEY = 'workspace';

const initialState: WorkspaceState = {
  table: null,
};

// export const predictionTableReducer: Reducer<
//   WorkspaceState,
//   WorkspaceAction
// > = (state = initialState, action) => {
//   switch (action.type) {
//   }
// };
