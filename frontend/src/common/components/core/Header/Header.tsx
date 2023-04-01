import { ReactNode } from 'react';

import { Button, Icon } from '../../index';

import style from './Header.module.css';


export type HeaderProps = {
    isOpen?: boolean;
    leftActions: ReactNode | ReactNode[];
    rightActions: ReactNode | ReactNode[];
    mobileActions: ReactNode | ReactNode[];
    onClick?: (value: boolean, event: any) => void;
};

const Header = ({ isOpen, leftActions, rightActions, mobileActions, onClick }: HeaderProps) => (
    <div className={style.wrapper}>
        <div className={style.container}>
            <Button
                id="menu-button"
                className={style.menu}
                buttonType="fill"
                color="transparent"
                onClick={(e) => onClick && onClick(!isOpen, e)}
            >
                <Icon type={isOpen ? 'close' : 'menu'} color="white" size={28} />
            </Button>
            <div className={style.leftContainer}>{leftActions}</div>
            <div className={style.mobileContainer}>{mobileActions}</div>
            <div className={style.rightContainer}>{rightActions}</div>
        </div>
    </div>
);

export default Header;
