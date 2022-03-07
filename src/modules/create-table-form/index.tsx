import React from 'react';
import styled from 'styled-components';
import { NeonDatePicker } from '../../components/neon-date-picker';
import { NeonInput } from '../../components/neon-input';
import { Portal } from '../../components/portal';

const CreateTableForm = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState(true);

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
            placeholder="Table tags"
            width={300}
            onClick={() => setIsDatePickerOpen(true)}
          />
        </CreateTableForm.InputContainer>

        {isDatePickerOpen && (
          <Portal>
            <NeonDatePicker
              onRequestClose={() => setIsDatePickerOpen(false)}
            />
          </Portal>
        )}
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
