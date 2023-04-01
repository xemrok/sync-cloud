import { ComponentProps, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './HeaderButton.module.css';


export type HeaderButtonProps = {
    rootPath?: string;
    path?: string;
    active?: boolean;
    children?: string | ReactNode | ReactNode[];
    className?: string;
    onClick?: (e: any) => void;
} & ComponentProps<'button'>;

const HeaderButton = ({ rootPath, path, children, active, onClick, className, ...props }: HeaderButtonProps) => {
    const navigate = useNavigate();

    const goto = (e: any): void => {
        if (path) navigate(path);
        onClick && onClick(e);
    };

    return (
        <button
            {...props}
            className={`${style.container} ${
                (rootPath && window.location.pathname.includes(rootPath)) || active ? style.active : ''
              } ${className}`}
            onClick={goto}
        >
            {children}
        </button>
    );
}

export default HeaderButton;
