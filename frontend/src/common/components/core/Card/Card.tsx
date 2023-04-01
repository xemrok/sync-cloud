import { ReactNode } from 'react';

import style from './Card.module.css';


export type CardProps = {
    className?: string;
    headerClassName?: string;
    title?: string | ReactNode | ReactNode[];
    titleClassName?: string;
    actions?: string | ReactNode | ReactNode[];
    actionsClassName?: string;
    children?: ReactNode | ReactNode[];
};

const Card = ({
    className,
    headerClassName,
    title,
    titleClassName,
    actions,
    actionsClassName,
    children,
}: CardProps) => (
    <div className={style.container}>
        {(title || actions) &&
            <div className={`${style.header} ${headerClassName}`}>
                {title && <div className={`${style.title} ${titleClassName}`}>{title}</div>}
                {actions && <div className={`${style.actions} ${actionsClassName}`}>{actions}</div>}
            </div>
        }
        <div className={className}>{children}</div>
    </div>
);

export default Card;
