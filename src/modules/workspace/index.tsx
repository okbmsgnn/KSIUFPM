import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getIndexedPredictionTables,
  getSortedPredictionTables,
} from '../prediction-table/predictionTableReducer';
import { Window } from '../window';
import { initOpenWindow } from './workspaceActions';
import { getWindows, getWindowsAsArray } from './workspaceReducer';

export const Workspace = () => {
  const dispatch = useDispatch();

  const tables = useSelector(getSortedPredictionTables);
  const indexedTables = useSelector(getIndexedPredictionTables);
  const windows = useSelector(getWindowsAsArray);
  const indexedWindows = useSelector(getWindows);

  return (
    <Workspace.Container>
      {windows.length !== 0 && (
        <Workspace.Windows>
          {windows.map((w) => (
            <Window
              window={w}
              table={indexedTables[w.id]}
              key={w.id}
            />
          ))}
        </Workspace.Windows>
      )}

      <Workspace.ChooseTable>
        {tables.map((t) => (
          <div
            key={t.id}
            onClick={() => {
              if (indexedWindows[t.id]) return;
              dispatch(initOpenWindow(t.id));
            }}
            style={{
              color: indexedWindows[t.id] ? '#000' : '#fff',
              background: indexedWindows[t.id] ? '#fff' : 'initial',
            }}
          >
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

Workspace.Windows = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

Workspace.ChooseTable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  z-index: 2;
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
