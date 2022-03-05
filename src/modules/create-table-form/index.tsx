import React from "react";
import styled from 'styled-components';
import { NeonInput } from "../../components/neon-input";

const CreateTableForm = () => {
  return (
    <CreateTableForm.Container>
      <NeonInput backdropColor="#444" glowColor="aqua" border={{activeColor: '#fff', defaultColor: '#777'}}/>

      <NeonInput backdropColor="#444" glowColor="aqua" border={{activeColor: '#fff', defaultColor: '#777'}}/>

      <NeonInput backdropColor="#444" glowColor="aqua" border={{activeColor: '#fff', defaultColor: '#777'}}/>
    </CreateTableForm.Container>
  )
}

CreateTableForm.Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #232323;
  color: #ffffff;
  width: 800px;
  height: 500px;

  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export { CreateTableForm }