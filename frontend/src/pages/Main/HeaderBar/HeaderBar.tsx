import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useUserContext } from '../../../ContextProvider';
import { useNotificationContext } from '../MainContextProvider';
import { Header, HeaderButton, Icon, ProfileLabel, TooltipMenu, MenuItem } from '../../../common/components';

import { PATHS } from '../../../common/constants';

import style from './HeaderBar.module.css';


const ACTIONS = [
    { rootPath: PATHS.DASHBOARD.FILES, title: 'Dashboard' },
];

type HeaderBarProps = {
    isOpen?: boolean;
    onClick?: (value: boolean, event: any) => void;
};

const HeaderBar = ({ isOpen, onClick }: HeaderBarProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentUser } = useUserContext();
    const { count } = useNotificationContext(); // TODO add notifications
    const mouseOver = useRef<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener('mousedown', onMouseClose);
        return () => document.removeEventListener('mousedown', onMouseClose);
    }, []);

    const toggleVisible = (): void => setVisible(!visible);

    const onClose = (): void => setVisible(false);

    const onMouseClose = (): false | void => !mouseOver.current && onClose();

    return (
        <Header
            isOpen={isOpen}
            onClick={onClick}
            leftActions={ACTIONS.map((a, i) =>
                <HeaderButton key={'header-button-' + i} rootPath={a.rootPath} path={a.rootPath}>
                    {t(a.title)}
                </HeaderButton>
            )}
            rightActions={
                <>
                    <TooltipMenu
                        node={
                            <HeaderButton className={style.customHeaderButton}>
                                <>
                                    <span className={style.profileLabel}>
                                        <ProfileLabel name={currentUser.name} fontSize={14} textColor="white" isFullName />
                                    </span>
                                    <span className={style.mobileProfileLabel}>
                                        <ProfileLabel name={currentUser.name} />
                                    </span>
                                </>
                            </HeaderButton>
                        }
                    >
                        <MenuItem className={style.tooltipMenuItem}>
                            <Icon size={22} />
                            <span>{t('Settings')}</span>
                        </MenuItem>
                        <MenuItem className={style.tooltipMenuItem} onClick={() => navigate(PATHS.LOGOUT)}>
                            <Icon type="logout" size={22}/>
                            <span>{t('Logout')}</span>
                        </MenuItem>
                    </TooltipMenu>
                </>
            }
            mobileActions={
                <>
                    <HeaderButton
                        className={style.mobileHeaderButton}
                        active={visible}
                        onMouseOver={() => (mouseOver.current = true)}
                        onMouseOut={() => (mouseOver.current = false)}
                        onClick={toggleVisible}
                    >
                        {t(ACTIONS.find((a) => window.location.pathname.includes(a.rootPath))?.title || ACTIONS[0].title)}
                        <Icon type={visible ? 'chevronUp' : 'chevronDown'} size={16} color="white" />
                    </HeaderButton>
                    <div
                        className={`${style.mobileMenu} ${visible ? style.open : ''}`}
                        onMouseOver={() => (mouseOver.current = true)}
                        onMouseOut={() => (mouseOver.current = false)}
                    >
                        {ACTIONS.map((a, i) => (
                            <HeaderButton
                                key={'mobile-header-button-' + i}
                                rootPath={a.rootPath}
                                path={a.rootPath}
                                onClick={onClose}
                            >
                                {t(a.title)}
                            </HeaderButton>
                        ))}
                    </div>
                </>
            }
        />
    )
};

export default HeaderBar;
