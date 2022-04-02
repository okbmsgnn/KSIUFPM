import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { CreateTableForm } from './modules/create-table-form';

import 'react-toastify/dist/ReactToastify.min.css';
import { Route, RouterProvider } from './context/router';
import { Workspace } from './modules/workspace';
import { getStatus } from './modules/prediction-table/predictionTableReducer';
import React from 'react';
import { setWindowSize } from './modules/application/applicationActions';
import debounce from 'lodash.debounce';
import path from 'path';
import { app } from '@electron/remote';
import { loadTables } from './modules/prediction-table/predictionTableActions';
import fs from 'fs';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  // Store window size
  React.useEffect(() => {
    const handler = (e: UIEvent) => {
      dispatch(
        setWindowSize({
          client: {
            height: (e.target as Window).innerHeight,
            width: (e.target as Window).innerWidth,
          },
          offset: {
            height: (e.target as Window).outerHeight,
            width: (e.target as Window).outerWidth,
          },
        })
      );
    };

    window.addEventListener('resize', handler);
    window.dispatchEvent(new UIEvent('resize'));

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  // Show status
  React.useEffect(() => {
    if (!status) return;

    const notify = status.success ? toast.success : toast.error;

    notify(status.description);
  }, [status]);

  // Load tables
  React.useEffect(() => {
    const basePath = path.join(app.getAppPath(), 'tables');

    const loadTablesDebounce = debounce(
      () => dispatch(loadTables()),
      500
    );

    dispatch(loadTables());

    const watcher = fs.watch(basePath, {}, (r, s) => {
      loadTablesDebounce();
    });

    return () => watcher.close();
  }, []);

  return (
    <RouterProvider initialLocation="/workspace">
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
