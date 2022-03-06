import { TimeInterval, utcDay, utcMonth, utcYear } from 'd3-time';
import React from 'react';
import { customDatePickerActions as actions } from './actions';
import {
  generateDays,
  generateMonths,
  generateYears,
} from './generator';
import {
  CustomDatePickerState,
  TimeData,
  TimeDay,
  TimeMonth,
  TimeView,
} from './model';
import { customDatePickerReducer, initialState } from './reducer';

export interface CustomDatePickerChildrenProps
  extends CustomDatePickerState {
  setView: (view: TimeView) => void;
  selectDate: (date: Date) => void;
  resetSelection: () => void;
  moveToNextPage: () => void;
  moveToPrevPage: () => void;
  viewDate: Date;
}

export interface CustomDatePickerProps {
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
  const [state, dispatch] = React.useReducer(
    customDatePickerReducer,
    {
      ...initialState,
      selectedDate: initialDate ?? null,
    }
  );

  const viewDate = React.useMemo(() => {
    if (state.view === TimeView.Day)
      return utcMonth.offset(state.initialDate, state.pageOffset);

    if (state.view === TimeView.Month)
      return utcYear.offset(
        utcYear.floor(state.initialDate),
        state.pageOffset
      );

    return utcYear.offset(
      utcYear.floor(state.initialDate),
      state.pageOffset * 10
    );
  }, [state.pageOffset, state.initialDate, state.view]);

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
  }, [state.pageOffset]);

  const childrenProps = React.useMemo<CustomDatePickerChildrenProps>(
    () => ({
      ...state,
      setView,
      selectDate,
      resetSelection,
      moveToNextPage,
      moveToPrevPage,
      viewDate,
    }),
    [
      state,
      setView,
      selectDate,
      resetSelection,
      moveToNextPage,
      moveToPrevPage,
      viewDate,
    ]
  );

  React.useEffect(() => {
    let timeData: TimeData | null = null;

    if (state.view === TimeView.Day) {
      const days = generateDays(
        utcMonth.offset(state.initialDate, state.pageOffset)
      );
      const daysBefore =
        days[0].getUTCDay() === 0 ? 6 : days[0].getUTCDay() - 1;
      const daysAfter = 42 - daysBefore - days.length;

      if (daysBefore !== 0) {
        const daysToPrepend = (utcDay.every(1) as TimeInterval).range(
          utcDay.offset(days[0], -daysBefore),
          days[0],
          1
        );

        days.unshift(...daysToPrepend);
      }

      if (daysAfter !== 0) {
        const daysToAppend = (utcDay.every(1) as TimeInterval).range(
          days[days.length - 1],
          utcDay.offset(days[days.length - 1], daysAfter + 1),
          1
        );

        days.pop();
        days.push(...daysToAppend);
      }

      timeData = {
        legends: days.slice(0, 7).map((d) => TimeDay[d.getDay()]),
        dates: days,
      };
    } else if (TimeView.Month) {
      const min = minDate ?? utcMonth.offset(new Date(), -12);
      const max = maxDate ?? utcMonth.offset(new Date(), +12);

      const months = generateMonths(min, utcMonth.count(min, max));

      timeData = {
        legends: months.map((d) => TimeMonth[d.getMonth()]),
        dates: months,
      };
    } else {
      const min = minDate ?? utcYear.offset(new Date(), -12);
      const max = maxDate ?? utcYear.offset(new Date(), +12);
      const years = generateYears(min, utcMonth.count(min, max));

      timeData = {
        legends: years.map((d) => d.getFullYear().toString()),
        dates: years,
      };
    }

    if (!timeData) return;
    dispatch(actions.setItems(timeData));
  }, [state.view, state.pageOffset, minDate, maxDate]);

  return <>{children(childrenProps)}</>;
};
