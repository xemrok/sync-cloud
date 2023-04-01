import { ComponentProps, ReactNode } from 'react';

import style from './TooltipMenu.module.css';


export type MenuItemProps = {
    className?: string;
    children?: string | ReactNode | ReactNode[];
} & ComponentProps<'li'>;

const MenuItem = ({ className, children, ...props }: MenuItemProps) => (
    <li {...props} className={`${style.menuItem} ${className || ''}`}>
        {children}
    </li>
);

export default MenuItem;
