import i18next from 'i18next';

import { Language } from '../common/constants';


export function changeLanguage(l: Language): Promise<void> {
    return i18next.changeLanguage(l)
        .then(() => localStorage.setItem('i18nextLng', l))
        .catch(e => console.error('Language change error', e));
}
