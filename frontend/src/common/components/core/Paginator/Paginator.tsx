import { Icon, Button } from '../../index';

import style from './Paginator.module.css';


export type PaginatorProps = {
    skip: number;
    total: number;
    pageSize?: number;
    onPageChange: (skip: number) => void;
};

const DISPLAYED_COLUMNS = 7;

const Paginator = ({ skip, total, pageSize = 20, onPageChange }: PaginatorProps) => {
    const totalPages = Math.ceil(total / pageSize);
    const currentPage = totalPages - Math.ceil((total - skip) / pageSize);
    const pages = [0, totalPages - 1, currentPage - 1, currentPage, currentPage + 1];
    const dots = [currentPage - 2, currentPage + 2];

    const goNext = () => currentPage !== totalPages - 1 && onPageChange(skip + pageSize);
    const goPrevious = () => currentPage && onPageChange(skip - pageSize);

    return (
        <ul className={style.container}>
            <div className={style.leftBtn}>
                <Button
                    className={style.button}
                    size="small"
                    buttonType="border"
                    disabled={!currentPage}
                    onClick={goPrevious}
                >
                    <Icon type="chevronLeft" size={22} color={!currentPage ? 'gray' : 'primary'} />
                </Button>
            </div>
            {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) =>
                totalPages <= DISPLAYED_COLUMNS ||
                    (currentPage < DISPLAYED_COLUMNS - 3 && i < DISPLAYED_COLUMNS - 2) ||
                    (currentPage > totalPages - (DISPLAYED_COLUMNS - 2) && i > totalPages - (DISPLAYED_COLUMNS - 1)) ||
                    pages.includes(i) ? (
                    <li
                        key={`pagination-button-${i}`}
                        onClick={() => onPageChange(i * pageSize)}
                        className={i === currentPage ? style.active : ''}
                        title={`Page - ${i + 1}`}
                    >
                        {i + 1}
                    </li>
                ) : dots.includes(i) ||
                    (currentPage < DISPLAYED_COLUMNS - 2 && i === DISPLAYED_COLUMNS - 2) ||
                    (currentPage > totalPages - (DISPLAYED_COLUMNS - 1) && i === totalPages - (DISPLAYED_COLUMNS - 1)) ? (
                    <li key={`pagination-button-${i}`} className={style.dots}>
                        ...
                    </li>
                ) : null,
            )}
            <div className={style.rightBtn}>
                <Button
                    className={style.button}
                    size="small"
                    buttonType="border"
                    disabled={currentPage === totalPages - 1}
                    onClick={goNext}
                >
                    <Icon type="chevronRight" size={22} color={currentPage === totalPages - 1 ? 'gray' : 'primary'} />
                </Button>
            </div>
        </ul>
    );
};

export default Paginator;
