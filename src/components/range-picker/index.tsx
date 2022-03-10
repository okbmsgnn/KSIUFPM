import React from 'react';
import styled from 'styled-components';
import { DateInput } from '../date-input';
import { IconClock } from '../icons';

interface RangePickerProps {
  onStartDateSelect?: (date: Date | null) => void;
  onEndDateSelect?: (date: Date | null) => void;
  onDatesSelect?: (dates: [Date | null, Date | null]) => void;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
}

export const RangePicker = ({
  endDate = null,
  startDate = null,
  maxDate = null,
  minDate = null,
  onDatesSelect,
  onEndDateSelect,
  onStartDateSelect,
}: RangePickerProps) => {
  const [dates, setDates] = React.useState({
    start: startDate,
    end: endDate,
  });

  const setStartDate = React.useCallback(
    (date: Date | null) => {
      onStartDateSelect?.call(null, date);
      setDates((prev) => ({ ...prev, start: date }));
    },
    [onStartDateSelect]
  );

  const setEndDate = React.useCallback(
    (date: Date | null) => {
      onEndDateSelect?.call(null, date);
      setDates((prev) => ({ ...prev, end: date }));
    },
    [onEndDateSelect]
  );

  React.useEffect(() => setStartDate(startDate), [startDate]);
  React.useEffect(() => setEndDate(endDate), [endDate]);

  React.useEffect(
    () => onDatesSelect?.call(null, [dates.start, dates.end]),
    [dates]
  );

  return (
    <RangePicker.Container>
      <DateInput
        onDateSelect={setStartDate}
        selectedDate={startDate}
      />

      <IconClock width={21} height={21} />

      <DateInput onDateSelect={setEndDate} selectedDate={endDate} />
    </RangePicker.Container>
  );
};

RangePicker.Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
