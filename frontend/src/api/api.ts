import qs from 'qs';

interface RequestOptions {
    method?: string;
    headers?: any;
    responseType?: string;
    isPublic?: boolean;
    retry?: boolean;
    fullUrl?: boolean;
    silentError?: boolean;
}

interface RequestOptionsBody extends RequestOptions {
    data?: any;
}

class Http {
    baseUrl: string;
    unauthorized: (() => void) | undefined;
    errorMessage: ((res: Response | { status: number, message: string }) => void) | undefined;

    static async parseResponse(response: Response, responseType: string) {
        switch (responseType) {
            case 'json':
                return response.json();
            case 'blob':
                return response.blob();
            default:
                return response;
        }
    }

    constructor(options: { baseUrl: string }) {
        this.baseUrl = options.baseUrl;
        Object.assign(this, options);
    }

    async request(
        url: string,
        {
            method = 'GET',
            headers = {},
            data,
            isPublic = false,
            retry = true,
            responseType = 'json',
            fullUrl = false,
            silentError = false,
        }: any = {},
    ): Promise<any> {
        url = fullUrl ? url : this.baseUrl + url;
        const opts: any = { method };

        if (method === 'GET') {
            if (data) {
                let query;
                [url, query] = url.split('?');
                url += '?' + qs.stringify({ ...qs.parse(query), ...data }, { indices: false, skipNulls: true });
            }
        } else if ((typeof FormData !== 'undefined' && data instanceof FormData) || data instanceof File) {
            opts.body = data;
        } else {
            opts.body = JSON.stringify(data);
            headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...headers,
            };
        }

        if (!isPublic) headers.Authorization = 'Token ' + window.storage.get('indoor_access_token');

        const response = (await this.fetchRequest(url, { ...opts, headers }, retry)) as Response;
        if (response.status === 401) setTimeout(() => this.unauthorized && this.unauthorized());
        if (!response.ok) {
            !silentError && this.errorMessage && this.errorMessage(response);
            return Promise.reject(response);
        }

        try {
            return await Http.parseResponse(response, responseType);
        } catch (e) {
            !silentError && this.errorMessage && this.errorMessage({ status: 415, message: 'BAD_PARSING' });
            return Promise.reject(null);
        }
    }

    wait = () => new Promise((resolve) =>
        setTimeout(resolve, parseInt(process.env.REACT_APP_REQUEST_DELAY as string) || 5000)
    );

    fetchRequest = async (url: string, options: any, retry?: boolean) => {
        let error;

        do {
            try {
                error && (await this.wait());
                return await fetch(url, options);
            } catch (err) {
                error = err;
                console.error(err);
            }
        } while (error && retry);
    };

    get(url: string, opts?: RequestOptions): Promise<any> {
        return this.request(url, { ...opts, method: 'GET' });
    }

    post(url: string, opts?: RequestOptionsBody): Promise<any> {
        return this.request(url, { ...opts, method: 'POST' });
    }

    put(url: string, opts?: RequestOptionsBody): Promise<any> {
        return this.request(url, { ...opts, method: 'PUT' });
    }

    patch(url: string, opts?: RequestOptionsBody): Promise<any> {
        return this.request(url, { ...opts, method: 'PATCH' });
    }

    del(url: string, opts?: RequestOptionsBody): Promise<any> {
        return this.request(url, { ...opts, method: 'DELETE' });
    }
}

export const api = new Http({
    baseUrl: process.env.REACT_APP_ORIGIN_BACKEND_URL + '',
});
