import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../../components/color-picker';
import { NeonInput } from '../../components/neon-input';
import { NumericInput } from '../../components/numeric-input';
import { RangePicker } from '../../components/range-picker';
import { SelectOption } from '../../components/select-option';
import { StepType, TableFormData } from './model';

import fs from 'fs';
import path from 'path';
import { app } from '@electron/remote';
import { useRouter } from '../../context/router';
import { toast } from 'react-toastify';

const CreateTableForm = () => {
  const router = useRouter();

  const data = React.useRef<TableFormData>({
    name: '',
    description: '',
    tags: '',
    startDate: null,
    endDate: null,
    colorPalette: ['#b0f4ff', '#d7ffbf', '#86aff7', '#9a86f7'],
    step: { type: 'days', value: 1 },
  });

  const [template, setTemplate] = React.useState<TableFormData>(
    data.current
  );

  const [templates, setTemplates] = React.useState<TableFormData[]>(
    []
  );

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

  const getColorPickerProps = React.useCallback(
    (idx: number) => ({
      size: 15,
      value: template.colorPalette[idx],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        (template.colorPalette[idx] = e.target.value),
    }),
    [template]
  );

  const onSubmit = React.useCallback(() => {
    fs.writeFile(
      path.join(
        app.getAppPath(),
        'tables',
        `${data.current.name}_${Date.now()}.json`
      ),
      JSON.stringify(data.current, null, 4),
      { encoding: 'utf-8' },
      (error) => {
        if (error) {
          toast(error);
        } else {
          router.redirectTo('/workspace');
        }
      }
    );
  }, []);

  React.useEffect(() => {
    data.current = template;
  }, [template]);

  React.useEffect(() => {
    const basePath = path.join(app.getAppPath(), 'tables');

    const loadTemplates = () => {
      fs.readdir(basePath, (err, files) => {
        if (err) return;

        Promise.all(
          files.map(
            (file) =>
              new Promise((res) => {
                fs.readFile(
                  path.join(basePath, file),
                  { encoding: 'utf-8' },
                  (err, data) => {
                    if (err) res([]);
                    else {
                      const json = JSON.parse(data);
                      res({
                        ...json,
                        startDate: json.startDate
                          ? new Date(json.startDate)
                          : null,
                        endDate: json.endDate
                          ? new Date(json.endDate)
                          : null,
                      });
                    }
                  }
                );
              })
          )
        ).then((templates) => setTemplates(templates as any));
      });
    };

    //loadTemplates();

    const watcher = fs.watch(basePath, {}, loadTemplates);

    return () => watcher.close();
  }, []);

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
                onChange={(e) => (data.current.name = e.target.value)}
                value={template.name}
              />

              <NeonInput
                {...commonInputAttributes}
                placeholder="Table description"
                onChange={(e) =>
                  (data.current.description = e.target.value)
                }
                value={template.description}
              />

              <NeonInput
                {...commonInputAttributes}
                placeholder="Table tags"
                onChange={(e) => (data.current.tags = e.target.value)}
                value={template.tags}
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
                    startDate={template.startDate}
                    endDate={template.endDate}
                    onStartDateSelect={(date) =>
                      (template.startDate = date)
                    }
                    onEndDateSelect={(date) =>
                      (template.endDate = date)
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
                      value={template.step.type}
                      onChange={(e) =>
                        (data.current.step.type = e.target
                          .value as StepType)
                      }
                    >
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                    </SelectOption>

                    <NumericInput
                      type="number"
                      min={1}
                      value={template.step.value}
                      onChange={(e) =>
                        (data.current.step.value = Number(
                          e.target.value
                        ))
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
                  {Array.from(templates, (t, idx) => (
                    <div
                      onClick={() => setTemplate(t)}
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

export { CreateTableForm };
