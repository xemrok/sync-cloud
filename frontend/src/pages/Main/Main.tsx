import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainContextProvider } from './MainContextProvider';
import HeaderBar from './HeaderBar/HeaderBar';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import Files from '../Files/Files';
import Trash from '../Trash/Trash';

import { PATHS } from '../../common/constants';

import style from './Main.module.css';


const Main = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <MainContextProvider>
            <HeaderBar isOpen={open} onClick={(value) => setOpen(value)} />
            <div className={style.container}>
                <SidebarMenu isOpen={open} onClick={(value) => setOpen(value)} />
                <div className={style.contentWrapper}>
                    <div className={style.contentContainer}>
                        <Routes>

                            {/** Files **/}
                            <Route path={PATHS.DASHBOARD.FILES} element={<Files />} />
                            <Route path={PATHS.DASHBOARD.TRASH} element={<Trash />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </MainContextProvider>
    );
};

export default Main;
