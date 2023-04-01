import { Link } from 'react-router-dom';

import style from './Breadcrumbs.module.css';


export type BreadcrumbType = {
    title: string;
    path?: string;
    onClick?: (e: any) => void
};

export type BreadcrumbsProps = {
    breadcrumbs: BreadcrumbType[];
    className?: string;
    noIndent?: boolean;
};

const Breadcrumbs = ({ breadcrumbs, className, noIndent }: BreadcrumbsProps) => (
    <ul className={`${style.container} ${!noIndent ? style.indent : ''} ${className}`}>
        {breadcrumbs.map((breadcrumb, i) => (
            <li
                key={i}
                className={`${style.list} ${i === breadcrumbs.length - 1 && breadcrumb.path ? '' : style.title}`}
                onClick={breadcrumb.onClick}
            >
                <Link to={breadcrumb.path || ''} className={breadcrumb.path || breadcrumb.onClick ? '' : style.default}>
                    {breadcrumb.title}
                </Link>
            </li>
        ))}
    </ul>
)

export default Breadcrumbs;
