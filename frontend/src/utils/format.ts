import qs from 'qs';
import { format, parse } from 'date-fns';

export function formatDate(d: string | number | Date, f = 'dd-MM-yyyy', p?: string): string {
    if (!d) return '';
    if (typeof d === 'string') d = p ? parse(d, p, new Date()) : new Date(d);
    return format(d, f);
}

export function stringifyQuery(params: { [s: string]: unknown } | ArrayLike<unknown>): string {
    return qs.stringify(params, { indices: false, skipNulls: true })
        ? '?' + qs.stringify(params, { indices: false, skipNulls: true })
        : '';
}
