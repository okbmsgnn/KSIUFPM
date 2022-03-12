import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { CreateTableForm } from './modules/create-table-form';
import { store } from './store';

import 'react-toastify/dist/ReactToastify.min.css';
import { Route, RouterProvider } from './context/router';
import { Workspace } from './modules/workspace';

const App = () => {
  return (
    <StoreProvider store={store}>
      <RouterProvider initialLocation="/new-project">
        <App.Container>
          <Route route="/new-project">
            <CreateTableForm />
          </Route>

          <Route route="/workspace">
            <Workspace />
          </Route>
        </App.Container>

        <ToastContainer autoClose={3000} position="top-right" />
      </RouterProvider>
    </StoreProvider>
  );
};

App.Container = styled.div`
  background: #eeffff;
  width: 100%;
  height: 100%;
`;

export default App;
