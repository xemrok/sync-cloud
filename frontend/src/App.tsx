import { Navigate, Route, Routes } from 'react-router-dom';

import { MainAuth, SignIn, SignUp, Main, Logout, } from './pages';
import PrivateRouter from './PrivateRouter';

import { PATHS } from './common/constants';
import { LocalStorage, SessionStorage } from './utils';

import './App.css';


function App() {
  const sessionToken = SessionStorage.get('sync_cloud_access_token');
  const localToken = LocalStorage.get('sync_cloud_access_token');

  window.token = sessionToken || localToken;
  window.storage = localToken ? LocalStorage : SessionStorage;

  return (
    <div className="App">
      <Routes>
        {/** AUTH **/}
        <Route element={<MainAuth />}>
          <Route path={PATHS.AUTH.SIGN_IN} element={<SignIn />} />
          <Route path={PATHS.AUTH.SIGN_UP} element={<SignUp />} />
        </Route>

        {/** MAIN components **/}
        <Route
          path="/*"
          element={
            <PrivateRouter>
              <Main />
            </PrivateRouter>
          }
        />

        {/** Service routes **/}
        <Route path={PATHS.LOGOUT} element={<Logout />} />
        <Route path="*" element={<Navigate to={PATHS.NOT_FOUND} />} />
      </Routes>
    </div>
  );
}

export default App;
