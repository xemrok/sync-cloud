import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button, Icon, IconTypes } from '../../index';

import style from './SidebarItems.module.css';


export type TreeItem = {
    icon?: IconTypes;
    label: string;
    path?: string;
    root?: boolean;
    children?: TreeItem[];
};

export type SidebarItemsProps = {
    items: TreeItem[];
    onClick?: (e: any) => void;
};

const SidebarItems = ({ items, onClick }: SidebarItemsProps) => (
    <nav className={style.tree}>
        {items.map((item, index) => (
            <Branch key={'branch-0-' + index} item={item} level={0} onClick={onClick} />
        ))}
    </nav>
);

type BranchProps = {
    item: TreeItem;
    level: number;
    onClick?: (e: any) => void;
};

const isActive = (item: TreeItem): boolean => {
    const path = window.location.pathname;
    return item?.root ? path === item.path : !!item.path && path.includes(item.path);
};

const Branch = ({ item, level, onClick }: BranchProps) => {
    const [selected, setSelected] = useState<boolean>(false);

    const toggleSelected = () => setSelected(!selected);

    useEffect(() => {
        setSelected(!!item?.children?.some((child) => isActive(child)));
    }, [item]);

    return (
        <>
            <Node
                item={item}
                level={level}
                active={isActive(item)}
                selected={selected}
                onToggle={toggleSelected}
                onClick={onClick}
            />

            {selected &&
                item?.children?.map((child, index) => (
                    <Branch key={`branch-${level}-${index}`} item={child} level={level + 1} onClick={onClick} />
                ))}
        </>
    );
};

type NodeProps = {
    item: TreeItem;
    level: number;
    active: boolean;
    selected: boolean;
    onToggle: () => void;
    onClick?: (e: any) => void;
};

const Node = ({ item, level, active, selected, onToggle, onClick }: NodeProps) => {
    const { t } = useTranslation();

    return (
        <li className={style.node} style={{ paddingLeft: `${level * 34}px` }}>
            {item.children && item.children.length !== 0 ? (
                <Button size="small" className={style.nodeButton} onClick={onToggle}>
                    <Icon color="gray" size={18} type={selected ? 'chevronDown' : 'chevronRight'} />
                    <span className={style.linkLabel}>{t(item.label)}</span>
                </Button>
            ) : (
                <>
                    {item.path ? (
                        <Link className={`${style.linkNode} ${active ? style.active : ''}`} to={item.path} onClick={onClick}>
                            <Icon color="gray" size={26} type={item.icon} />
                            <span className={style.linkLabel}>{t(item.label)}</span>
                        </Link>
                    ) : (
                        <div className={style.linkNode} onClick={onClick}>
                            <Icon color="gray" size={26} type={item.icon} />
                            <span className={style.linkLabel}>{t(item.label)}</span>
                        </div>
                    )}
                </>
            )}
        </li>
    );
};

export default SidebarItems;
