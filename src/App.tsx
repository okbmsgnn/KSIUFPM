import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { CreateTableForm } from './modules/create-table-form';
import { store } from './store';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  React.useEffect(() => {
    toast.error('Error');
  }, []);

  return (
    <StoreProvider store={store}>
      <>
        <App.Container>
          asdaasdsasdasda
          <CreateTableForm />
        </App.Container>

        <ToastContainer autoClose={3000} position="top-right" />
      </>
    </StoreProvider>
  );
};

App.Container = styled.div`
  background: #eeffff;
  width: 100%;
  height: 100%;
`;

export default App;
