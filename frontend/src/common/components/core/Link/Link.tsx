import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';

import style from './Link.module.css';


export type LinkProps = {
    className?: string;
    to: string;
    children?: string | ReactNode | ReactNode[];
}

const Link = ({ className, to, children, ...props }: LinkProps) => (
    <ReactLink className={`${style.link} ${className || ''}`} to={to} {...props}>
        {children}
    </ReactLink>
)

export default Link;
