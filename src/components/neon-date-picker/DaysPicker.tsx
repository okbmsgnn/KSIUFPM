import { utcDay } from 'd3-time';
import { timeFormat } from 'd3-time-format';
import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useComponentSize } from '../../hooks/useComponentSize';
import { measureText } from '../../utils/text';
import { CustomDatePickerChildrenProps } from '../custom-date-picker';

interface DaysPickerProps extends CustomDatePickerChildrenProps {
  cellSize?: {
    width: number;
    height: number;
  };
  pickerPosition?: {
    x: number;
    y: number;
  };
  closeOnClickOutside?: boolean;
  onRequestClose?: () => void;
  onDateSelect?: (date: Date | null) => void;
}

const formatTitleDate = timeFormat('%B, %Y');
const LEGEND = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const DaysPicker = ({
  items,
  selectedDate,
  viewDate,
  selectDate,
  resetSelection,
  moveToNextPage,
  moveToPrevPage,
  cellSize = {
    width: 40,
    height: 40,
  },
  pickerPosition = {
    x: 0,
    y: 0,
  },
  closeOnClickOutside = true,
  onRequestClose,
  onDateSelect,
}: DaysPickerProps) => {
  const [position, setPosition] = React.useState(pickerPosition);
  const [mousePivot, setMousePivot] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const selectedDateRef = React.useRef(selectedDate);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const containerSize = useComponentSize(containerRef.current);

  const baseFontSize = React.useMemo(
    () => cellSize.width / 2.5,
    [cellSize]
  );

  const dateIndicatorOffset = React.useMemo(
    () =>
      (cellSize.width -
        measureText({
          text: LEGEND[0],
          name: 'Segoe UI',
          size: baseFontSize * 0.75,
        })) /
      2,
    [baseFontSize]
  );

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
      if (day.getTime() !== selectedDate?.getTime()) {
        selectDate(day);
      } else {
        resetSelection();
      }
    },
    [selectDate, resetSelection, selectedDate]
  );

  const onMouseMove = React.useCallback(
    (e) => {
      if (!mousePivot || !containerSize) return;

      let newX = e.pageX - mousePivot.x;
      let newY = e.pageY - mousePivot.y;

      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX > window.innerWidth - containerSize.width)
        newX = window.innerWidth - containerSize.width;
      if (newY > window.innerHeight - containerSize.height)
        newY = window.innerHeight - containerSize.height;

      setPosition({
        x: newX,
        y: newY,
      });
    },
    [mousePivot, containerSize?.width, containerSize?.height]
  );

  const onDragStart = React.useCallback((e) => {
    if (e.target.classList.contains('arrow')) return;

    setMousePivot({
      x: e.nativeEvent.layerX,
      y: e.nativeEvent.layerY,
    });
  }, []);

  const onDragEnd = React.useCallback(() => {
    setMousePivot(null);
  }, []);

  const onClickOutside = React.useCallback(() => {
    if (!closeOnClickOutside) return;

    onRequestClose?.call(null);
  }, [closeOnClickOutside, onRequestClose]);

  useClickOutside(containerRef, onClickOutside, 'mousedown');

  React.useEffect(() => {
    if (!mousePivot) return;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onDragEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onDragEnd);
    };
  }, [mousePivot, onMouseMove, onDragEnd]);

  React.useEffect(() => {
    return () => {
      onDateSelect?.call(null, selectedDateRef.current);
    };
  }, []);

  React.useEffect(() => {
    selectedDateRef.current = selectedDate;
  }, [selectedDate]);

  return (
    <DaysPicker.Container
      ref={containerRef}
      width={cellSize.width}
      baseFontSize={baseFontSize}
      style={{
        top: position.y,
        left: position.x,
      }}
      className="slight-shadow"
    >
      <DaysPicker.TopBar onMouseDown={onDragStart}>
        <DaysPicker.DateIndicator offset={dateIndicatorOffset}>
          {formatTitleDate(viewDate)}
        </DaysPicker.DateIndicator>

        <DaysPicker.Controls>
          <DaysPicker.Arrow
            up={true}
            onClick={moveToPrevPage}
            className="arrow"
            dayWidth={cellSize.width}
          >
            ❯
          </DaysPicker.Arrow>

          <DaysPicker.Arrow
            up={false}
            onClick={moveToNextPage}
            className="arrow"
            dayWidth={cellSize.width}
          >
            ❯
          </DaysPicker.Arrow>
        </DaysPicker.Controls>
      </DaysPicker.TopBar>

      <DaysPicker.Legend>
        {LEGEND.map((l) => (
          <div key={l}>{l}</div>
        ))}

        <DaysPicker.Divider />
      </DaysPicker.Legend>

      <DaysPicker.DaysContainer height={cellSize.height}>
        {rows.map((row, idx) => (
          <DaysPicker.DayRow key={idx}>
            {row.map((day) => (
              <DaysPicker.Day
                key={day.toISOString()}
                onClick={(e) => onDayClick(day)}
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
  width: number;
  baseFontSize: number;
}>`
  position: absolute;
  background: #33455c85;
  backdrop-filter: blur(4.5px);
  width: ${({ width }) => `calc(${width}px * 7 + 12px + 20px)`};

  font-size: ${({ baseFontSize }) => baseFontSize}px;

  border: 1px solid #777;
`;

DaysPicker.TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #232323;
  color: #fff;

  padding: 10px;
  cursor: move;
`;

DaysPicker.Legend = styled.div`
  position: relative;
  padding: 4px 10px;

  display: grid;
  grid-template: 1fr / repeat(7, 1fr);
  align-items: center;
  font-size: 0.75em;
  margin: 6px 0 12px 0;
  color: #ffffff;

  > * {
    text-align: center;
  }
`;

DaysPicker.DateIndicator = styled.div<{ offset: number }>`
  margin-left: ${({ offset }) => offset}px;
  font-size: 0.9em;
`;

DaysPicker.Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 1.4em;
`;

DaysPicker.Arrow = styled.div<{ up: boolean; dayWidth: number }>`
  display: flex;
  justify-content: center;
  line-height: 1em;
  width: ${({ dayWidth }) => dayWidth}px;
  transform: scaleY(${({ up }) => (up ? -1 : 1)}) rotate(90deg);
  cursor: pointer;

  :hover {
    color: #c1c1c1;
  }
`;

DaysPicker.DaysContainer = styled.div<{ height: number }>`
  position: relative;
  color: #ffffff;
  height: ${({ height }) => `calc(${height}px * 6 + 10px)`};

  display: grid;
  grid-template: repeat(6, 1fr) / 1fr;
  gap: 2px;
  padding: 0 10px 10px 10px;

  .selected {
    background: #ddffff20;
    border: 2px solid #ffffff;
  }

  .other {
    color: #b3b3b3;
  }

  font-size: 0.75em;
`;

DaysPicker.DayRow = styled.div`
  display: grid;
  grid-template: 1fr / repeat(7, 1fr);
  gap: 2px;
`;

DaysPicker.Day = styled.div`
  border: 2px solid transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: border-color 0.3s, color 0.3s, background 0.3s;

  :hover {
    border-color: #ffffff;
  }
`;

DaysPicker.Divider = styled.div`
  height: 1px;
  width: 100%;

  background: linear-gradient(
    to right,
    transparent 5%,
    #ffffff,
    transparent 95%
  );
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.3;
`;
