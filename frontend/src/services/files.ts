import { api } from '../api/api';
import { IFilter, IFile } from '../models';

import { stringifyQuery } from '../utils';


function getList(filter: IFilter): Promise<{ items: IFile[], total: number }> {
    const query = stringifyQuery(filter);
    return api.get(`/files/list${query}`);
}

function uploadFile(data: FormData): Promise<any> {
    return api.post(`/files/upload`, { data });
}

function deleteFile(id: number): Promise<any> {
    return api.del(`/files/${id}`);
}

export default {
    getList,
    uploadFile,
    deleteFile,
};
