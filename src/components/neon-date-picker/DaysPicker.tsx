import { utcDay } from 'd3-time';
import React from 'react';
import styled from 'styled-components';
import { CustomDatePickerChildrenProps } from '../custom-date-picker';

export const DaysPicker = ({
  items,
  selectedDate,
  viewDate,
  selectDate,
}: CustomDatePickerChildrenProps) => {
  const isDaySelected = React.useCallback(
    (date: Date) => {
      return selectedDate
        ? utcDay.count(date, selectedDate) === 0
        : false;
    },
    [selectedDate]
  );

  const isCurrentMonth = React.useCallback(
    (date: Date) => date.getMonth() === viewDate.getMonth(),
    [viewDate]
  );

  const rows = React.useMemo(
    () =>
      items.dates.reduce<Date[][]>((acc, n, idx) => {
        const rowIndex = Math.floor(idx / 7);
        if (!acc[rowIndex]) acc[rowIndex] = [];
        acc[rowIndex].push(n);
        return acc;
      }, []),
    [items.dates]
  );

  return (
    <DaysPicker.DaysContainer>
      {rows.map((row, idx) => (
        <DaysPicker.DayRow key={idx}>
          {row.map((day) => (
            <DaysPicker.Day
              key={day.toISOString()}
              onClick={() => selectDate(day)}
              className={`${isDaySelected(day) && 'selected'} ${
                !isCurrentMonth(day) && 'other'
              }`}
            >
              {day.getDate()}
            </DaysPicker.Day>
          ))}
        </DaysPicker.DayRow>
      ))}
    </DaysPicker.DaysContainer>
  );
};

DaysPicker.DaysContainer = styled.div`
  color: #000;
  height: 100%;

  display: grid;
  grid-template: repeat(6, 1fr) / 1fr;

  .selected {
    background: #232323;
    color: #ffffff;
  }

  .other {
    color: #cacaca;
  }
`;

DaysPicker.DayRow = styled.div`
  display: grid;
  grid-template: 1fr / repeat(7, 1fr);
`;

DaysPicker.Day = styled.div`
  background: #ffffff;
  color: #232323;
  border: 2px solid transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: border-color 0.3s, color 0.3s, background 0.3s;

  :hover {
    border-color: #232323;
  }
`;
