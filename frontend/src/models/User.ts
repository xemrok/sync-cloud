
import { authService } from '../services';

import { Language, Roles } from '../common/constants';
import { changeLanguage, LocalStorage, SessionStorage } from '../utils';


export interface IUser {
    _id: string;
    name: string;
    email: string;
    roles: Roles[];
    lang?: Language;
}

export default class User implements IUser {
    _id!: string;
    name!: string;
    email!: string;
    roles!: Roles[];
    lang?: Language;
    access_token!: string; // Authorization token

    static async login(email?: string, password?: string, storage?: boolean): Promise<User> {
        window.storage = storage ? LocalStorage : SessionStorage;
        window.storage.clear();

        const user = await authService.signIn(email, password);
        window.storage.set('sync_cloud_access_token', user.access_token);
        window.token = user.access_token;
        return user;
    }

    static async me(): Promise<IUser> {
        return await authService.me();
    }

    constructor(data: any) {
        Object.assign(this, data);
        this.access_token = data.access_token || window.storage.get('sync_cloud_access_token');
        if (data.lang) changeLanguage(data.lang).then();
        else this.lang = localStorage.getItem('i18nextLng') as Language || Language.en
    }

    logout(): void {
        window.token = null;
        window.storage.clear();
    }
}
