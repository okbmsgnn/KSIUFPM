import { utcMonth, utcYear } from 'd3-time';
import React from 'react';
import { customDatePickerActions as actions } from './actions';
import { generateDays, generateMonths, generateYears } from './generator';
import {
  CustomDatePickerState,
  TimeData,
  TimeDay,
  TimeMonth,
  TimeView,
} from './model';
import { customDatePickerReducer, initialState } from './reducer';

interface CustomDatePickerChildrenProps extends CustomDatePickerState {
  setView: (view: TimeView) => void;
  selectDate: (date: Date) => void;
  resetSelection: () => void;
  moveToNextPage: () => void;
  moveToPrevPage: () => void;
}

interface CustomDatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  children: (props: CustomDatePickerChildrenProps) => React.ReactNode;
}

export const CustomDatePicker = ({
  children,
  minDate,
  maxDate,
  initialDate,
}: CustomDatePickerProps) => {
  const [state, dispatch] = React.useReducer(customDatePickerReducer, {
    ...initialState,
    selectedDate: initialDate ?? null,
  });

  const setView = React.useCallback((view: TimeView) => {
    dispatch(actions.setView(view));
  }, []);

  const selectDate = React.useCallback((date: Date) => {
    dispatch(actions.setSelectedDate(date));
  }, []);

  const resetSelection = React.useCallback(() => {
    dispatch(actions.setSelectedDate(null));
  }, []);

  const moveToNextPage = React.useCallback(() => {
    dispatch(actions.setPageOffset(state.pageOffset + 1));
  }, [state.pageOffset]);

  const moveToPrevPage = React.useCallback(() => {
    dispatch(actions.setPageOffset(state.pageOffset - 1));
  }, []);

  const childrenProps = React.useMemo<CustomDatePickerChildrenProps>(
    () => ({
      ...state,
      setView,
      selectDate,
      resetSelection,
      moveToNextPage,
      moveToPrevPage,
    }),
    [state, setView, selectDate, resetSelection, moveToNextPage, moveToPrevPage]
  );

  React.useEffect(() => {
    let timeData: TimeData | null = null;

    if (state.view === TimeView.Day) {
      const days = generateDays(
        utcMonth.offset(state.initialDate, state.pageOffset)
      );

      timeData = {
        cells: days.slice(0, 7).map((d) => TimeDay[d.getDay()]),
        dates: days,
      };
    } else if (TimeView.Month) {
      const min = minDate ?? utcMonth.offset(new Date(), -12);
      const max = maxDate ?? utcMonth.offset(new Date(), +12);

      const months = generateMonths(min, utcMonth.count(min, max));

      timeData = {
        cells: months.map((d) => TimeMonth[d.getMonth()]),
        dates: months,
      };
    } else {
      const min = minDate ?? utcYear.offset(new Date(), -12);
      const max = maxDate ?? utcYear.offset(new Date(), +12);
      const years = generateYears(min, utcMonth.count(min, max));

      timeData = {
        cells: years.map((d) => d.getFullYear().toString()),
        dates: years,
      };
    }

    if (!timeData) return;
    dispatch(actions.setDates(timeData));
  }, [state.view, state.pageOffset, minDate, maxDate]);

  return <>{children(childrenProps)}</>;
};
