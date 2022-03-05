import React from 'react';
import styled from 'styled-components';
import { CreateTableForm } from './modules/create-table-form';

const App = () => {

  return (
    <App.Container>

      <CreateTableForm />

    </App.Container>
  );
}

App.Container = styled.div`
  background: #131313;
  width: 100%;
  height: 100%;
`

export default App;
