import { api } from '../api/api';
import { IFilter, IFile } from '../models';

import { stringifyQuery } from '../utils';


function getList(filter: IFilter): Promise<IFile> {
    const query = stringifyQuery(filter);
    return api.get(`/files/list${query}`);
}

export default {
    getList,
};
