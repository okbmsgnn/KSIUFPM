import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useRouter } from '../../context/router';
import {
  getIndexedPredictionTables,
  getSortedPredictionTables,
} from '../prediction-table/predictionTableReducer';
import { openWindow, setActiveWindow } from './workspaceActions';
import {
  getActiveWindow,
  getOrderedWindows,
} from './workspaceReducer';

export const Workspace = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const tables = useSelector(getSortedPredictionTables);
  const indexedTables = useSelector(getIndexedPredictionTables);
  const windows = useSelector(getOrderedWindows);
  const activeWindow = useSelector(getActiveWindow);

  React.useEffect(() => {
    toast.success(router.location);
  }, []);

  return (
    <>
      <Workspace.ChooseTable>
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => dispatch(openWindow(table.id))}
          >
            {table.name}
          </div>
        ))}
      </Workspace.ChooseTable>

      {windows.map((window, idx) => (
        <div
          style={{
            marginLeft: '200px',
            width: window.size.width,
            height: window.size.height,
            position: 'absolute',
            top: 50 + window.order * 30,
            left: 50 + window.order * window.size.width,
            background:
              activeWindow?.id === window.id ? 'red' : 'initial',
          }}
          key={window.id}
          onClick={() => dispatch(setActiveWindow(window.id))}
        >
          {window.order} - {indexedTables[window.id].name}
        </div>
      ))}

      <Workspace.KvadratikNazvanieVremennoe></Workspace.KvadratikNazvanieVremennoe>
    </>
  );
};

Workspace.ChooseTable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
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
