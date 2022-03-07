import React from 'react';
import styled from 'styled-components';
import {
  CustomDatePicker,
  CustomDatePickerChildrenProps,
} from '../custom-date-picker';
import { TimeView } from '../custom-date-picker/model';
import { DaysPicker } from './DaysPicker';

interface NeonDatePickerProps {
  onRequestClose: () => void;
  onDateSelect: (date: Date | null) => void;
}

export const NeonDatePicker = ({
  onRequestClose,
  onDateSelect,
}: NeonDatePickerProps) => {
  const renderPicker = React.useCallback(
    (props: CustomDatePickerChildrenProps) => {
      if (props.view === TimeView.Day) {
        return (
          <DaysPicker
            {...props}
            cellSize={{ height: 40, width: 45 }}
            pickerPosition={{ x: 200, y: 300 }}
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
    <CustomDatePicker>
      {(props) => renderPicker(props)}
    </CustomDatePicker>
  );
};
