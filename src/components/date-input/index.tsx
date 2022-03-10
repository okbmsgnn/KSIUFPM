import { timeFormat } from 'd3-time-format';
import React from 'react';
import { NeonDatePicker } from '../neon-date-picker';
import { NeonInput } from '../neon-input';
import { Portal } from '../portal';

interface DateInputProps {
  onDateSelect?: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  selectedDate?: Date | null;
}

export const DateInput = ({
  maxDate,
  minDate,
  onDateSelect,
  selectedDate = null,
}: DateInputProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState(false);
  const [date, setDate] = React.useState(selectedDate);

  React.useEffect(() => setDate(selectedDate), [selectedDate]);

  React.useEffect(() => onDateSelect?.call(null, date), [date]);

  return (
    <>
      <NeonInput
        onClick={() => setIsDatePickerOpen(true)}
        value={date ? timeFormat('%Y/%m/%d')(date) : ''}
        width={100}
      />

      {isDatePickerOpen && (
        <Portal>
          <NeonDatePicker
            onRequestClose={() => setIsDatePickerOpen(false)}
            onDateSelect={(date) => setDate(date)}
            maxDate={maxDate}
            minDate={minDate}
            initialDate={date}
            position="center"
          />
        </Portal>
      )}
    </>
  );
};
