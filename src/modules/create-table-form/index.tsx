import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../../components/color-picker';
import { NeonInput } from '../../components/neon-input';
import { RangePicker } from '../../components/range-picker';

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
          <CreateTableForm.LeftPanel>
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

              <CreateTableForm.AdvancedSettings>
                <CreateTableForm.AdvancedSettingRow>
                  <div>Date Interval</div>

                  <RangePicker />
                </CreateTableForm.AdvancedSettingRow>

                <CreateTableForm.AdvancedSettingRow>
                  <div>Color Palette</div>

                  <CreateTableForm.PickerContainer>
                    <ColorPicker size={15} defaultColor="#0af" />
                    <ColorPicker size={15} defaultColor="#0af" />
                    <ColorPicker size={15} defaultColor="#0af" />
                    <ColorPicker size={15} defaultColor="#0af" />
                  </CreateTableForm.PickerContainer>
                </CreateTableForm.AdvancedSettingRow>

                <CreateTableForm.AdvancedSettingRow>
                  <div>Step</div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select>
                      <option value="">Hours</option>
                      <option value="">Days</option>
                      <option value="">Months</option>
                    </select>

                    <input type="number" min={1} />
                  </div>
                </CreateTableForm.AdvancedSettingRow>

                <CreateTableForm.AdvancedSettingsDivider />
              </CreateTableForm.AdvancedSettings>
            </CreateTableForm.AdvancedSettingsContainer>
          </CreateTableForm.LeftPanel>

          <CreateTableForm.RightPanel>
            <CreateTableForm.ListTitle>
              Template from:
            </CreateTableForm.ListTitle>

            <CreateTableForm.List>
              {Array.from({ length: 5 }, (_, idx) => (
                <div>ITEM {idx + 1}</div>
              ))}
            </CreateTableForm.List>

            <CreateTableForm.ButtonCreate>
              Create Table
            </CreateTableForm.ButtonCreate>
          </CreateTableForm.RightPanel>
        </CreateTableForm.Content>
      </CreateTableForm.Container>
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
  gap: 16px;
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
  padding: 10px;
  display: flex;

  gap: 15px;

  background: var(--color-z6);
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

CreateTableForm.LeftPanel = styled.div`
  display: grid;
  grid-template: auto minmax(0, 1fr) / 1fr;
`;

CreateTableForm.RightPanel = styled.div`
  display: grid;
  grid-template: auto 1fr auto / 1fr;

  gap: 16px;
`;

CreateTableForm.ListTitle = styled.div`
  line-height: 1;
`;

CreateTableForm.List = styled.div`
  background: #131313;
  overflow: auto;
  max-height: 100%;

  > div {
    padding: 4px 8px;

    :hover {
      background: var(--color-z5) !important;
    }
  }
`;

CreateTableForm.ButtonCreate = styled.div`
  background: var(--color-z3);
  padding: 4px 8px;
  cursor: pointer;
  transition: 0.2s;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.8em;

  :hover {
    background: var(--color-z5);
    transition: 0.2s;
  }
`;

CreateTableForm.AdvancedSettingsContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template: auto minmax(0, 1fr) / 1fr;
`;

CreateTableForm.AdvancedSettingsTitle = styled.div`
  color: #fff;
  margin-bottom: 4px;
`;

CreateTableForm.AdvancedSettings = styled.div`
  position: relative;
  background: var(--color-z3);
  border-top: 2px solid #fff;
  border-left: 3px solid var(--color-z6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 2px 0 0 8px;

  font-size: 0.9rem;
`;

CreateTableForm.AdvancedSettingRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-rows: 1fr;
  grid-template-columns: 100px 1fr;
  gap: 8px;
`;

CreateTableForm.AdvancedSettingsDivider = styled.div`
  background: var(--color-z6);
  width: 3px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 98.5px;
`;

export { CreateTableForm };
