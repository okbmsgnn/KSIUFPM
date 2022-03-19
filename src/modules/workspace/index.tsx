import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getIndexedPredictionTables,
  getSortedPredictionTables,
} from '../prediction-table/predictionTableReducer';
import { Window } from '../window';
import { useWindow } from './hooks/useWindow';
import {
  getMaximizedWindow,
  getWindowsAsArray,
} from './workspaceReducer';

export const Workspace = () => {
  const window = useWindow();

  const tables = useSelector(getSortedPredictionTables);
  const indexedTables = useSelector(getIndexedPredictionTables);
  const windows = useSelector(getWindowsAsArray);
  const maximizedWindow = useSelector(getMaximizedWindow);

  return (
    <Workspace.Container>
      {maximizedWindow && (
        <Workspace.MaximizedWindow>
          <Window
            window={maximizedWindow}
            table={indexedTables[maximizedWindow.id]}
            key={maximizedWindow.id}
            activate={() => window.activate(maximizedWindow.id)}
            maximize={() => window.maximize(maximizedWindow.id)}
            minimize={() => window.minimize(maximizedWindow.id)}
            normalize={() => window.normalize(maximizedWindow.id)}
            close={() => window.close(maximizedWindow.id)}
          />
        </Workspace.MaximizedWindow>
      )}

      {windows.length !== 0 && (
        <Workspace.Windows>
          {windows.map((w) => (
            <Window
              window={w}
              table={indexedTables[w.id]}
              key={w.id}
              activate={() => window.activate(w.id)}
              maximize={() => window.maximize(w.id)}
              minimize={() => window.minimize(w.id)}
              normalize={() => window.normalize(w.id)}
              close={() => window.close(w.id)}
            />
          ))}
        </Workspace.Windows>
      )}

      <Workspace.ChooseTable>
        {tables.map((t) => (
          <div key={t.id} onClick={() => window.open(t.id)}>
            {t.name}
          </div>
        ))}
      </Workspace.ChooseTable>
    </Workspace.Container>
  );
};

Workspace.Container = styled.div`
  width: 100%;
  height: 100%;
`;

Workspace.MaximizedWindow = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;

  background: #232323;
`;

Workspace.Windows = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

Workspace.ChooseTable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  z-index: 3;
  transform: translateX(calc(-100% + 10px));

  background-color: rgb(0, 119, 255);
  opacity: 0.2;
  transition: transform 0.3s ease-in, opacity 0.3s;

  overflow: hidden auto;
  user-select: none;

  :hover {
    opacity: 0.9;
    transform: initial;
    transition: transform 0.3s ease-out, opacity 0.3s;
  }

  > .list-item {
    background-color: #0af;
    cursor: pointer;

    padding: 8px 4px;
  }

  > .list-item:hover {
    background: initial;
    transition: 0.5s;
  }
`;

Workspace.KvadratikNazvanieVremennoe = styled.div`
  background: #a1a1a1;
  border: solid 2px #565656;
  width: 31px;
  height: 31px;
  position: absolute;
  top: 50px;
  left: 50%;

  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 85%;
    background: #b0f4ff55;
    transition: 0.4s;
  }

  :hover:after {
    background: #c1f5ffff;
    transition: 0.4s;
  }
`;
