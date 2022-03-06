import React from 'react';
import styled from 'styled-components';
import {
  CustomDatePicker,
  CustomDatePickerChildrenProps,
} from '../custom-date-picker';
import { TimeView } from '../custom-date-picker/model';
import { DaysPicker } from './DaysPicker';

export const NeonDatePicker = () => {
  const renderPicker = React.useCallback(
    (props: CustomDatePickerChildrenProps) => {
      if (props.view === TimeView.Day) {
        return (
          <DaysPicker
            {...props}
            cellSize={{ height: 45, width: 45 }}
          />
        );
      }

      return null;
    },
    []
  );

  return (
    <NeonDatePicker.Container>
      <CustomDatePicker>
        {(props) => renderPicker(props)}
      </CustomDatePicker>
    </NeonDatePicker.Container>
  );
};

NeonDatePicker.Container = styled.div`
  background: #fff;
  display: inline-block;
`;
