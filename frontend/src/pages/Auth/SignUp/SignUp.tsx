import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { authService } from '../../../services';

import { Card, Form, Input, Button, Loader, TooltipMenu, MenuItem } from '../../../common/components';

import { Language, PATHS } from '../../../common/constants';
import { changeLanguage } from '../../../utils';

import style from './SignUp.module.css';


const SignUp = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [state, setState] = useState<{ name?: string, email?: string, password?: string }>();
    const [errorState, setErrorState] = useState<{ name?: string, email?: string, password?: string }>();
    const [hide, setHide] = useState<boolean>(true);
    const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || Language.en);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (value: string, name: string): void => setState({ ...state, [name]: value });

    const handleChangeLang = (lang: Language): void => {
        changeLanguage(lang).then();
        setLang(lang);
    }

    const goBack = (): void => navigate(PATHS.AUTH.SIGN_IN);

    const onSubmit = (): void => {
        setLoading(true);

        authService.signUp(state)
            .then(({ name }) => {
                toast.success(t('User {{name}}, successfully created', { name }));
                navigate(PATHS.AUTH.SIGN_IN);
            })
            .catch((e) => setErrorState(e))
            .finally(() => setLoading(false));
    }


    return (
        <Form onSubmit={onSubmit}>
            <Card
                className={style.body}
                titleClassName={style.title}
                actionsClassName={style.actions}
                title={t('Create your account')}
                actions={
                    <TooltipMenu
                        node={
                            <Button className={style.menuAction} color="transparent" disabled={loading}>
                                {t(`LANG.SHORT.${lang}`)}
                            </Button>
                        }
                    >
                        <MenuItem  onClick={() => handleChangeLang(Language.en)}>
                            {t('EN')}
                        </MenuItem>
                        <MenuItem onClick={() => handleChangeLang(Language.ru)}>
                            {t('RU')}
                        </MenuItem>
                    </TooltipMenu>
                }
            >
                <Input
                    name="name"
                    label={t('Username')}
                    placeholder={t('Enter username')}
                    onChange={handleChange}
                    disabled={loading}
                    error={errorState?.name}
                    autoComplete="off"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    label={t('Email')}
                    placeholder={t('hello@example.com')}
                    onChange={handleChange}
                    disabled={loading}
                    error={errorState?.email}
                    autoComplete="off"
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
                    autoComplete="new-password"
                    required
                />

                <Button type="submit" className={style.button} size="fullWidth" disabled={loading}>
                    {loading ? <Loader size={30} /> : t('Create')}
                </Button>

                <Button className={style.button} buttonType="border" size="fullWidth" onClick={goBack} disabled={loading}>
                    {t('Back to login')}
                </Button>
            </Card>
        </Form>
    )
};

export default SignUp;
