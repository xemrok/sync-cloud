import { ReactNode } from 'react';

import style from './Sidebar.module.css';


export type SidebarProps = {
    isHidden?: boolean;
    children?: ReactNode | ReactNode[];
};

const Sidebar = ({ isHidden = false, ...props }: SidebarProps) => {
    return (
        <div className={`${style.sidebarWrapper} ${isHidden ? style.transition : ''}`}>
            <nav className={style.sidebarContent}>{props.children}</nav>
        </div>
    );
};

export default Sidebar;
