import React from 'react';
import styled from 'styled-components';
import { CreateTableForm } from './modules/create-table-form';
import fs from 'fs';

const tableDirectory = '/Users/flavio/folder';
const files = fs.readdirSync(tableDirectory);

const App = () => {
  React.useEffect(() => {
    for (const file of files) {
      console.log(file);
    }
  }, []);

  return (
    <App.Container>
      <CreateTableForm />
    </App.Container>
  );
};

App.Container = styled.div`
  background: #eeffff;
  width: 100%;
  height: 100%;
`;

export default App;
