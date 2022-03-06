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
        return <DaysPicker {...props} />;
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
  width: calc(40px * 7);
  height: calc(40px * 6);
  background: #fff;
  padding: 10px;
`;
