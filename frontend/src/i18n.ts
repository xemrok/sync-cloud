import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { Language } from './common/constants';

import en from './translations/en.json';
import ru from './translations/ru.json';


const setLanguage = (): string => {
    if (!localStorage.getItem('i18nextLng')) localStorage.setItem('i18nextLng', Language.en);
    return String(localStorage.getItem('i18nextLng'));
};

i18n.use(initReactI18next).init({
    resources: {
        [Language.en]: {
            translations: en,
        },
        [Language.ru]: {
            translations: ru,
        }
    },
    lng: setLanguage(),
    fallbackLng: Language.en,
    debug: false,

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false,

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
