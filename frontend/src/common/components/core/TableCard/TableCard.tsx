import { ReactNode } from 'react';

import style from './TableCard.module.css';


export type TableCardProps = {
    filters?: ReactNode | ReactNode[];
    actions?: ReactNode | ReactNode[];
    children?: ReactNode | ReactNode[];
};

const TableCard = ({ filters, actions, children }: TableCardProps) => (
    <div className={style.tableCardWrapper}>
        {(filters || actions) && (
            <div className={`${style.tableCardHeader} ${!filters ? style.justifyRight : ''}`}>
                {filters && <div className={style.tableCardFilters}>{filters}</div>}
                {actions && <div className={style.tableCardActions}>{actions}</div>}
            </div>
        )}
        {children}
    </div>
)

export default TableCard;
