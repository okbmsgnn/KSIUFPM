import React from 'react';
import {
  CustomDatePicker,
  CustomDatePickerChildrenProps,
} from '../custom-date-picker';
import { TimeView } from '../custom-date-picker/model';
import { DaysPicker } from './DaysPicker';

interface NeonDatePickerProps {
  onRequestClose: () => void;
  onDateSelect: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  initialDate?: Date | null;
  position?: { x: number; y: number } | 'center';
}

export const NeonDatePicker = ({
  onRequestClose,
  onDateSelect,
  initialDate,
  maxDate,
  minDate,
  position = 'center',
}: NeonDatePickerProps) => {
  const renderPicker = React.useCallback(
    (props: CustomDatePickerChildrenProps) => {
      if (props.view === TimeView.Day) {
        return (
          <DaysPicker
            {...props}
            cellSize={{ height: 40, width: 45 }}
            pickerPosition={position}
            closeOnClickOutside
            onRequestClose={onRequestClose}
            onDateSelect={onDateSelect}
          />
        );
      }

      return null;
    },
    []
  );

  return (
    <CustomDatePicker
      initialDate={initialDate}
      maxDate={maxDate}
      minDate={minDate}
    >
      {(props) => renderPicker(props)}
    </CustomDatePicker>
  );
};
