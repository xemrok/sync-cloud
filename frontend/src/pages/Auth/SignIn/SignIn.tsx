import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { User } from '../../../models';

import { useUserContext } from '../../../ContextProvider';
import { Card, Form, Input, Button, Checkbox, Link, Loader, TooltipMenu, MenuItem } from '../../../common/components';

import { Language, PATHS } from '../../../common/constants';
import { changeLanguage } from '../../../utils';

import style from './SignIn.module.css';


const SignIn = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setCurrentUser } = useUserContext();
    const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || Language.en);
    const [state, setState] = useState<{ email?: string, password?: string, remember?: boolean }>();
    const [errorState, setErrorState] = useState<{ email?: string, password?: string }>();
    const [hide, setHide] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (value: string | boolean, name: string): void => setState({ ...state, [name]: value });

    const handleChangeLang = (lang: Language): void => {
        changeLanguage(lang).then();
        setLang(lang);
    }

    const onSubmit = (): void => {
        setLoading(true);
        User.login(state?.email?.trim(), state?.password, state?.remember)
            .then((user) => {
                setCurrentUser(user);
                navigate(PATHS.DASHBOARD.FILES);
            })
            .catch(e => setErrorState(e))
            .finally(() => setLoading(false));
    }

    return (
        <Form onSubmit={onSubmit}>
            <Card
                className={style.body}
                titleClassName={style.title}
                actionsClassName={style.actions}
                title={t('Login')}
                actions={
                    <TooltipMenu
                        node={
                            <Button className={style.menuAction} color="transparent" disabled={loading}>
                                {t(`LANG.SHORT.${lang}`)}
                            </Button>
                        }
                    >
                        <MenuItem onClick={() => handleChangeLang(Language.en)}>
                            {t('EN')}
                        </MenuItem>
                        <MenuItem onClick={() => handleChangeLang(Language.ru)}>
                            {t('RU')}
                        </MenuItem>
                    </TooltipMenu>
                }
            >
                <Input
                    type="email"
                    name="email"
                    label={t('Email')}
                    placeholder={t('hello@example.com')}
                    onChange={handleChange}
                    disabled={loading}
                    error={errorState?.email}
                    required
                />
                <Input
                    type={hide ? 'password' : 'text'}
                    name="password"
                    label={t('Password')}
                    placeholder={t('Input you password')}
                    icon={{
                        className: style.eye,
                        type: hide ? 'eye' : 'eyeOff',
                        onClick: () => setHide(!hide),
                        disabled: loading
                    }}
                    onChange={handleChange}
                    disabled={loading}
                    error={errorState?.password}
                    required
                />
                <Checkbox
                    name="remember"
                    className={style.checkbox}
                    label={t('Remember me')}
                    checked={state?.remember}
                    onChange={handleChange}
                    disabled={loading}
                />
                <Button type="submit" className={style.button} size="fullWidth" disabled={loading}>
                    {loading ? <Loader size={30} /> : t('Login', { context: 'action' })}
                </Button>

                <div className={style.link}>
                    <Link to={PATHS.AUTH.SIGN_UP}>{t('Create user')}</Link>
                </div>
            </Card>
        </Form>
    )
};

export default SignIn;
