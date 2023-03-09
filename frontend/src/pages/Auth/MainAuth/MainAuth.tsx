import { Outlet } from 'react-router-dom';

import style from './MainAuth.module.css';


const MainAuth = () => (
  <div className={style.container}>
    <Outlet />
  </div>
)

export default MainAuth;
