import qs from 'qs';
import { PATHS, OPEN_PATHS } from '../common/constants';

export function createParams(f: any): URLSearchParams {
    return new URLSearchParams(qs.stringify(f));
}

export function parseQuery(params: string): any {
    const obj: { [key: string]: any } = qs.parse(params);
    return decoder(obj);
}

function decoder(obj: any): any {
    const keywords: { [key: string]: any } = {
        true: true,
        false: false,
        null: null,
        undefined: undefined,
    };

    Object.keys(obj).forEach((key) => {
        if (String(parseInt(obj[key])) === obj[key]) obj[key] = parseInt(obj[key]);
        if (obj[key] in keywords) obj[key] = keywords[obj[key]];
        if (typeof obj[key] === 'object') obj[key] = decoder(obj[key]);
    });

    return obj;
}

export function logoutUrl(): string {
    return !OPEN_PATHS.some(route => window.location.pathname === route)
        ? savePreviousUrl(PATHS.LOGOUT)
        : PATHS.LOGOUT;
}

export function savePreviousUrl(rootPath: string): string {
    return window.location.search.includes('from')
        ? `${rootPath}${window.location.search}`
        : `${rootPath}?from=${window.location.pathname}${window.location.search}`
}
