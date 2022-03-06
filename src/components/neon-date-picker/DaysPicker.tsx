import { utcDay } from 'd3-time';
import { timeFormat } from 'd3-time-format';
import React from 'react';
import styled from 'styled-components';
import { CustomDatePickerChildrenProps } from '../custom-date-picker';

interface DaysPickerProps extends CustomDatePickerChildrenProps {
  cellSize?: {
    width: number;
    height: number;
  };
}

const formatTitleDate = timeFormat('%B, %Y');

export const DaysPicker = ({
  items,
  selectedDate,
  viewDate,
  selectDate,
  resetSelection,
  moveToNextPage,
  moveToPrevPage,
  cellSize,
}: DaysPickerProps) => {
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

  const onDayClick = React.useCallback(
    (day: Date) => {
      if (day.getTime() !== selectedDate?.getTime()) selectDate(day);
      else resetSelection();
    },
    [selectDate, resetSelection, selectedDate]
  );

  return (
    <DaysPicker.Container width={cellSize?.width}>
      <DaysPicker.TopBar>
        <DaysPicker.DateIndicator>
          {formatTitleDate(viewDate)}
        </DaysPicker.DateIndicator>

        <DaysPicker.Controls>
          <DaysPicker.Arrow
            up={true}
            onClick={moveToPrevPage}
            dayWidth={cellSize?.width}
          >
            ❯
          </DaysPicker.Arrow>

          <DaysPicker.Arrow
            up={false}
            onClick={moveToNextPage}
            dayWidth={cellSize?.width}
          >
            ❯
          </DaysPicker.Arrow>
        </DaysPicker.Controls>
      </DaysPicker.TopBar>

      <DaysPicker.DaysContainer height={cellSize?.height}>
        {rows.map((row, idx) => (
          <DaysPicker.DayRow key={idx}>
            {row.map((day) => (
              <DaysPicker.Day
                key={day.toISOString()}
                onClick={() => onDayClick(day)}
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
    </DaysPicker.Container>
  );
};

DaysPicker.Container = styled.div<{
  width?: number;
}>`
  width: ${({ width }) =>
    width ? `calc(${width}px * 7 + 12px)` : '292px'};
  padding: 10px;

  color: #232323;
`;

DaysPicker.TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

DaysPicker.DateIndicator = styled.div`
  border-bottom: 2px solid #232323;
`;

DaysPicker.Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

DaysPicker.Arrow = styled.div<{ up: boolean; dayWidth?: number }>`
  display: flex;
  justify-content: center;
  font-size: 30px;
  line-height: 30px;
  width: ${({ dayWidth }) => dayWidth ?? 40}px;
  transform: scaleY(${({ up }) => (up ? -1 : 1)}) rotate(90deg);
  cursor: pointer;

  :hover {
    color: #777;
  }
`;

DaysPicker.DaysContainer = styled.div<{ height?: number }>`
  color: #000;
  height: ${({ height }) =>
    height ? `calc(${height}px * 6 + 10px)` : '250px'};

  display: grid;
  grid-template: repeat(6, 1fr) / 1fr;
  gap: 2px;

  .selected {
    background: #232323;
    color: #ffffff;
  }

  .other {
    color: #cacaca;
  }

  font-size: 16px;
`;

DaysPicker.DayRow = styled.div`
  display: grid;
  grid-template: 1fr / repeat(7, 1fr);
  gap: 2px;
`;

DaysPicker.Day = styled.div`
  background: #ffffff;
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
