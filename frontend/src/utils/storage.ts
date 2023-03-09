export class Storage {
    ref: any;

    constructor(ref: any) {
        this.ref = ref;
    }

    update(key: string, fn: any, defaultValue?: any) {
        const data = this.get(key, defaultValue);
        let updated = fn(data);
        if (updated === undefined) updated = data;

        if (updated == null) this.del(key);
        else this.set(key, updated);

        return updated;
    }

    get(key: string, defaultValue?: any) {
        const serialized = this.ref.getItem(key);

        try {
            return serialized ? JSON.parse(serialized) : defaultValue;
        } catch (e) {
            return serialized || defaultValue;
        }
    }

    set(key: string, val: any): void {
        if (val == null) return this.del(key);
        this.ref.setItem(key, JSON.stringify(val));
    }

    del(key: string): void {
        this.ref.removeItem(key);
    }

    clear(skip: string[] = []): void {
        Object.keys(this.ref)
            .filter((key) => ![...skip, 'i18nextLng'].includes(key))
            .forEach((key) => this.del(key));
    }
}

export const SessionStorage = new Storage(window.sessionStorage);

export const LocalStorage = new Storage(window.localStorage);
