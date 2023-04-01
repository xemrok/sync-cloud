import { authService } from '../services';

import { Language, Roles } from '../common/constants';
import { changeLanguage, LocalStorage, SessionStorage } from '../utils';


export interface IUser {
    _id: number;
    name: string;
    email: string;
    roles: Roles[];
    lang?: Language;
}

export default class User implements IUser {
    _id!: number;
    name!: string;
    email!: string;
    roles!: Roles[];
    lang?: Language;
    token!: string; // Authorization token

    static async login(email?: string, password?: string, storage?: boolean): Promise<User> {
        window.storage = storage ? LocalStorage : SessionStorage;
        window.storage.clear();

        const user = await authService.signIn(email, password);
        window.storage.set('sync_cloud_access_token', user.token);
        window.token = user.token;
        return user;
    }

    static async me(): Promise<IUser> {
        return await authService.me();
    }

    constructor(data: any) {
        Object.assign(this, data);
        this.token = data.token || window.storage.get('sync_cloud_access_token');
        if (data.lang) changeLanguage(data.lang).then();
        else this.lang = localStorage.getItem('i18nextLng') as Language || Language.en
    }

    logout(): void {
        window.token = null;
        window.storage.clear();
    }
}
