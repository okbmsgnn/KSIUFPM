import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { CreateTableForm } from './modules/create-table-form';

import 'react-toastify/dist/ReactToastify.min.css';
import { Route, RouterProvider } from './context/router';
import { Workspace } from './modules/workspace';
import { getStatus } from './modules/prediction-table/predictionTableReducer';
import React from 'react';

const App = () => {
  const status = useSelector(getStatus);

  React.useEffect(() => {
    if (!status) return;

    const notify = status.success ? toast.success : toast.error;

    notify(status.description);
  }, [status]);

  return (
    <RouterProvider initialLocation="/new-project">
      <App.Container>
        <Route route="/new-project">
          <CreateTableForm />
        </Route>

        <Route route="/workspace">
          <Workspace />
        </Route>
      </App.Container>

      <ToastContainer autoClose={1000} position="top-right" />
    </RouterProvider>
  );
};

App.Container = styled.div`
  background: #eeffff;
  width: 100%;
  height: 100%;
`;

export default App;
