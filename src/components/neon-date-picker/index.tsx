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
}

export const NeonDatePicker = ({
  onRequestClose,
}: NeonDatePickerProps) => {
  const renderPicker = React.useCallback(
    (props: CustomDatePickerChildrenProps) => {
      if (props.view === TimeView.Day) {
        return (
          <DaysPicker
            {...props}
            cellSize={{ height: 40, width: 45 }}
            closeOnClickOutside
            onRequestClose={onRequestClose}
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
