import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useRouter } from '../../context/router';
import { getPredictionTables } from '../prediction-table/predictionTableReducer';

export const Workspace = () => {
  const router = useRouter();

  React.useEffect(() => {
    toast.success(router.location);
  }, []);

  const tables = useSelector(getPredictionTables);

  return (
    <>
      <Workspace.ChooseTable>
        {tables.map((t, idx) => (
          <div>{t.name}</div>
        ))}
      </Workspace.ChooseTable>
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
