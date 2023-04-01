import { ReactNode } from 'react';

import style from './SidebarItemWrapper.module.css';


export type SidebarItemWrapperProps = {
    children?: ReactNode | ReactNode[];
};

const SidebarItemWrapper = (props: SidebarItemWrapperProps) => (
    <div className={style.sidebarBody}>{props.children}</div>
);

export default SidebarItemWrapper;
