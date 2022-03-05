import React from 'react';
import { customDatePickerActions as actions } from './actions';
import { CustomDatePickerState, TimeView } from './model';
import { customDatePickerReducer, initialState } from './reducer';

interface CustomDatePickerChildrenProps extends CustomDatePickerState {
  setView: (view: TimeView) => void;
}

interface CustomDatePickerProps {
  children: (props: CustomDatePickerChildrenProps) => React.ReactNode;
}

export const CustomDatePicker = ({ children }: CustomDatePickerProps) => {
  const [state, dispatch] = React.useReducer(
    customDatePickerReducer,
    initialState
  );

  const setView = React.useCallback((view: TimeView) => {
    dispatch(actions.setView(view));
  }, []);

  const childrenProps = React.useMemo<CustomDatePickerChildrenProps>(
    () => ({
      ...state,
      setView,
    }),
    [state, setView]
  );

  React.useEffect(() => {}, [state.view]);

  return children(childrenProps);
};
