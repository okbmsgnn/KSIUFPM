import React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { ColorPicker } from '../../components/color-picker';
import { NeonInput } from '../../components/neon-input';
import { NumericInput } from '../../components/numeric-input';
import { RangePicker } from '../../components/range-picker';
import { SelectOption } from '../../components/select-option';

import fs from 'fs';
import path from 'path';
import { app } from '@electron/remote';
import { useRouter } from '../../context/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTable,
  deleteTable,
  loadTables,
} from '../prediction-table/predictionTableActions';
import { getSortedPredictionTables } from '../prediction-table/predictionTableReducer';
import { DEFAULT_TABLE_TEMPLATE } from './model';
import { generatePredictionTable } from '../prediction-table/utils/generatePredictionTable';

const commonInputAttributes = {
  backdropColor: '#444',
  glowColor: 'aqua',
  border: {
    activeColor: '#fff',
    defaultColor: '#777',
  },
};

const CreateTableForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = React.useState(DEFAULT_TABLE_TEMPLATE);
  const setDataParam = React.useCallback(
    (key: string, value: any) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const tables = useSelector(getSortedPredictionTables);

  const getColorPickerProps = React.useCallback(
    (idx: number) => ({
      size: 15,
      value: data.colorPalette[idx],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDataParam(
          'colorPalette',
          data.colorPalette.map((color, i) =>
            i === idx ? e.target.value : color
          )
        ),
    }),
    [data]
  );

  const onSubmit = React.useCallback(async () => {
    const newTable = generatePredictionTable(data);
    await dispatch(createTable(newTable));
    router.redirectTo('workspace');
  }, [data]);

  const loadTablesDebounce = React.useMemo(
    () => debounce(() => dispatch(loadTables()), 500),
    []
  );

  React.useEffect(() => {
    const basePath = path.join(app.getAppPath(), 'tables');

    dispatch(loadTables());

    const watcher = fs.watch(basePath, {}, (r, s) => {
      loadTablesDebounce();
    });

    return () => watcher.close();
  }, []);

  return (
    <CreateTableForm.Background>
      <CreateTableForm.Container className="slight-shadow">
        <CreateTableForm.TitleText>
          Create new table
        </CreateTableForm.TitleText>
        <CreateTableForm.ButtonClose
          onClick={() => router.redirectTo('workspace')}
        >
          ✕
        </CreateTableForm.ButtonClose>

        <CreateTableForm.Content>
          <CreateTableForm.LeftPanel>
            <CreateTableForm.InputContainer>
              <NeonInput
                {...commonInputAttributes}
                placeholder="Table name"
                onChange={(e) => setDataParam('name', e.target.value)}
                value={data.name}
              />

              <NeonInput
                {...commonInputAttributes}
                placeholder="Table description"
                onChange={(e) =>
                  setDataParam('description', e.target.value)
                }
                value={data.description}
              />

              <NeonInput
                {...commonInputAttributes}
                placeholder="Table tags"
                onChange={(e) => setDataParam('tags', e.target.value)}
                value={data.tags}
              />
            </CreateTableForm.InputContainer>

            <CreateTableForm.AdvancedSettingsContainer>
              <CreateTableForm.AdvancedSettingsTitle>
                Advanced Settings
              </CreateTableForm.AdvancedSettingsTitle>

              <CreateTableForm.AdvancedSettings>
                <CreateTableForm.AdvancedSettingRow>
                  <div>Date Interval</div>

                  <RangePicker
                    startDate={data.startDate}
                    endDate={data.endDate}
                    onStartDateSelect={(date) =>
                      setDataParam('startDate', date)
                    }
                    onEndDateSelect={(date) =>
                      setDataParam('endDate', date)
                    }
                  />
                </CreateTableForm.AdvancedSettingRow>

                <CreateTableForm.AdvancedSettingRow>
                  <div>Color Palette</div>

                  <CreateTableForm.PickerContainer>
                    <ColorPicker {...getColorPickerProps(0)} />
                    <ColorPicker {...getColorPickerProps(1)} />
                    <ColorPicker {...getColorPickerProps(2)} />
                    <ColorPicker {...getColorPickerProps(3)} />
                  </CreateTableForm.PickerContainer>
                </CreateTableForm.AdvancedSettingRow>

                <CreateTableForm.AdvancedSettingRow>
                  <div>Step</div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <SelectOption
                      value={data.step.type}
                      onChange={(e) =>
                        setDataParam('step', {
                          ...data.step,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                    </SelectOption>

                    <NumericInput
                      min={1}
                      value={data.step.value}
                      onChange={(e) =>
                        setDataParam('step', {
                          ...data.step,
                          value: e.target.value,
                        })
                      }
                    />
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

            <CreateTableForm.ListContainer>
              <CreateTableForm.List>
                <CreateTableForm.ListScroller>
                  {tables.map((t, idx) => (
                    <div
                      onMouseDown={(e) => {
                        if (e.button === 0) setData(t);
                        else if (e.button === 2)
                          dispatch(deleteTable(t));
                      }}
                      key={t.name + idx}
                    >
                      {t.name ? t.name : '<empty_name>'}
                    </div>
                  ))}
                </CreateTableForm.ListScroller>
              </CreateTableForm.List>
            </CreateTableForm.ListContainer>

            <CreateTableForm.ButtonCreate onClick={onSubmit}>
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
  position: relative;

  border-top-right-radius: 12px;

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

CreateTableForm.ListContainer = styled.div`
  background: #131313;
  position: relative;
`;

CreateTableForm.List = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

CreateTableForm.ListScroller = styled.div`
  > div {
    padding: 4px 8px;
    min-height: 30px;

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

CreateTableForm.ButtonClose = styled.div`
  background: transparent;
  border: solid 1.8px transparent;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 1;
  font-size: 12px;
  width: 26px;
  height: 26px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  cursor: pointer;

  :hover {
    background: #000;
    border: solid 1.8px #0af9;
    transition: 0.3s;
    color: #fff;
  }
`;

export { CreateTableForm };
