import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../../components/color-picker';
import { NeonDatePicker } from '../../components/neon-date-picker';
import { NeonInput } from '../../components/neon-input';
import { Portal } from '../../components/portal';
import { Switch } from '../../components/switch';

const CreateTableForm = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState(false);

  const commonInputAttributes = React.useMemo(
    () => ({
      backdropColor: '#444',
      glowColor: 'aqua',
      border: {
        activeColor: '#fff',
        defaultColor: '#777',
      },
    }),
    []
  );

  return (
    <CreateTableForm.Background>
      <CreateTableForm.Container className="slight-shadow">
        <CreateTableForm.TitleText>
          Create new table
        </CreateTableForm.TitleText>

        <CreateTableForm.Content>
          <div>
            <CreateTableForm.InputContainer>
              <NeonInput
                {...commonInputAttributes}
                placeholder="Table name"
              />

              <NeonInput
                {...commonInputAttributes}
                placeholder="Table description"
              />

              <NeonInput
                {...commonInputAttributes}
                placeholder="Table tags"
              />
            </CreateTableForm.InputContainer>

            <CreateTableForm.AdvancedSettingsContainer>
              <CreateTableForm.AdvancedSettingsTitle>
                Advanced Settings
              </CreateTableForm.AdvancedSettingsTitle>

              <CreateTableForm.AdvancedSettings></CreateTableForm.AdvancedSettings>
            </CreateTableForm.AdvancedSettingsContainer>
          </div>

          <div></div>
        </CreateTableForm.Content>

        {/* <Switch
          size={52}
          disabled={isDatePickerOpen}
          type="squared"
        /> */}

        {/* <CreateTableForm.PickerContainer>
          <ColorPicker size={20} defaultColor="#0af" />
          <ColorPicker size={20} defaultColor="#0af" />
          <ColorPicker size={20} defaultColor="#0af" />
          <ColorPicker size={20} defaultColor="#0af" />
        </CreateTableForm.PickerContainer> */}
      </CreateTableForm.Container>

      {isDatePickerOpen && (
        <Portal>
          <NeonDatePicker
            onRequestClose={() => setIsDatePickerOpen(false)}
            onDateSelect={(date) => {}}
          />
        </Portal>
      )}
    </CreateTableForm.Background>
  );
};

CreateTableForm.TitleText = styled.div`
  font-size: 45px;
  line-height: 45px;

  margin-bottom: 20px;
`;

CreateTableForm.Content = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
`;

CreateTableForm.InputContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > input {
    width: 100%;
  }
`;

CreateTableForm.PickerContainer = styled.div`
  padding: 15px 15px 15px 15px;
  display: flex;

  gap: 15px;

  background: #191919;
  align-self: flex-end;
`;

CreateTableForm.Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #23232377;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

CreateTableForm.Container = styled.div`
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  background: var(--color-z1);
  color: #ffffff;
  width: 800px;
  height: 500px;

  padding: 20px;
`;

CreateTableForm.AdvancedSettingsContainer = styled.div`
  margin-top: 20px;
`;

CreateTableForm.AdvancedSettingsTitle = styled.div`
  color: #fff;
  margin-bottom: 4px;
`;

CreateTableForm.AdvancedSettings = styled.div`
  background: var(--color-z3);
  height: 200px;
  border-top: 2px solid #fff;
`;

export { CreateTableForm };
