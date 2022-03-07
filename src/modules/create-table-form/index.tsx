import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../../components/color-picker';
import { NeonDatePicker } from '../../components/neon-date-picker';
import { NeonInput } from '../../components/neon-input';
import { Portal } from '../../components/portal';

const CreateTableForm = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    null
  );

  return (
    <CreateTableForm.Background>
      <CreateTableForm.Container className="slight-shadow">
        <CreateTableForm.TitleText>
          Create new table
        </CreateTableForm.TitleText>

        <CreateTableForm.InputContainer>
          <NeonInput
            backdropColor="#444"
            glowColor="aqua"
            border={{
              activeColor: '#fff',
              defaultColor: '#777',
            }}
            placeholder="Table name"
            width={300}
          />

          <NeonInput
            backdropColor="#444"
            glowColor="aqua"
            border={{
              activeColor: '#fff',
              defaultColor: '#777',
            }}
            placeholder="Table description"
            width={300}
          />

          <NeonInput
            backdropColor="#444"
            glowColor="aqua"
            border={{
              activeColor: '#fff',
              defaultColor: '#777',
            }}
            placeholder={selectedDate?.toISOString()}
            width={300}
            onMouseDown={() => setIsDatePickerOpen(true)}
          />
        </CreateTableForm.InputContainer>

        {isDatePickerOpen && (
          <Portal>
            <NeonDatePicker
              onRequestClose={() => setIsDatePickerOpen(false)}
              onDateSelect={(date) => setSelectedDate(date)}
            />
          </Portal>
        )}
        <CreateTableForm.PickerContainer>
          <ColorPicker size={20} defaultColor="#0af" />
          <ColorPicker size={20} defaultColor="#0af" />
          <ColorPicker size={20} defaultColor="#0af" />
          <ColorPicker size={20} defaultColor="#0af" />
        </CreateTableForm.PickerContainer>
      </CreateTableForm.Container>
    </CreateTableForm.Background>
  );
};

CreateTableForm.TitleText = styled.div`
  font-size: 45px;
  margin: 20px 0 0 20px;
`;

CreateTableForm.InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0 0 20px;
  gap: 20px;
`;

CreateTableForm.PickerContainer = styled.div`
  padding: 15px 15px 15px 15px;
  display: flex;
  flex-direction: row;
  position: relative;
  left: 130px;
  width: max-content;
  font-size: 15px;

  align-items: flex-start;
  margin: 20px 0 0 20px;
  gap: 15px;

  background: #191919;
`;

CreateTableForm.Container = styled.div`
  background: #232323;
  color: #ffffff;
  width: 800px;
  height: 500px;
`;

CreateTableForm.Background = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  background: #23232377;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export { CreateTableForm };
