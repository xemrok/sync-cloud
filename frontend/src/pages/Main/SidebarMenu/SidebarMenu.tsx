import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Sidebar, SidebarFooter, SidebarItemWrapper, SidebarItems, IconTypes, } from '../../../common/components';

import { PATHS } from '../../../common/constants';
import { setHtmlTag } from '../../../utils';

import style from './SidebarMenu.module.css';


type MenuList = {
    icon?: IconTypes;
    path?: string;
    root?: boolean;
    label: string;
    children?: MenuList[];
};

type SidebarMenuProps = {
    isOpen?: boolean;
    onClick?: (value: boolean, event: any) => void;
};

const getRoutePath = () => '/' + window.location.pathname.slice(1).split('/')[0];

const SidebarMenu = ({ isOpen, onClick }: SidebarMenuProps) => {
    const location = useLocation();
    const mouseOver = useRef<boolean>(false);
    const [route, setRoute] = useState<string>(getRoutePath());

    setHtmlTag(isOpen);

    useEffect(() => {
        document.addEventListener('mousedown', onClose);
        return () => document.removeEventListener('mousedown', onClose);
    }, []);

    const onClose = (e: any) => !mouseOver.current && e.target.id !== 'menu-button' && onClick && onClick(false, e);

    useEffect(() => {
        const rootPath = getRoutePath();
        if (rootPath !== route) setRoute(rootPath);
    }, [location]);

    const getItems = (): any[] => {
        switch (route) {
            case PATHS.DASHBOARD.ROOT:
                return dashboardItems;
            default:
                return [];
        }
    };

    const dashboardItems: MenuList[] = [
        { icon: 'folderTable', label: 'Files', path: PATHS.DASHBOARD.FILES, root: true },
        { icon: 'deleteRestore', label: 'Trash', path: PATHS.DASHBOARD.TRASH },
    ];

    return (
        <>
            <div className={style.desktopSidebar}>
                <Sidebar>
                    <SidebarItemWrapper>
                        <SidebarItems items={getItems()} onClick={(e) => onClick && onClick(false, e)} />
                    </SidebarItemWrapper>
                    <SidebarFooter />
                </Sidebar>
            </div>

            <div className={`${style.overlayMobileContainer} ${isOpen ? style.open : ''}`}>
                <div className={`${style.overlayMobileBackdrop} ${isOpen ? style.open : ''}`} />

                <div
                    className={`${style.mobileSidebar} ${!isOpen ? style.close : ''}`}
                    onMouseOver={() => (mouseOver.current = true)}
                    onMouseOut={() => (mouseOver.current = false)}
                >
                    <Sidebar isHidden={!isOpen}>
                        <SidebarItemWrapper>
                            <SidebarItems items={getItems()} onClick={(e) => onClick && onClick(false, e)} />
                        </SidebarItemWrapper>
                        <SidebarFooter />
                    </Sidebar>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;
