import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  some: (state = { test: 2 }, action) => {
    switch (action.type) {
      case 'test':
        throw new Error('Kekma');
      default:
        return state;
    }
  },
});

export { rootReducer };
