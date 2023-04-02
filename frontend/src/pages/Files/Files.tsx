import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IFile } from '../../models';

import { fileService } from '../../services';

import {
    Breadcrumbs,
    TableCard,
    Input,
    Button,
    Thead,
    TableLoader,
    TableNoData,
    Paginator,
    Icon,
    DeleteDialog,
} from '../../common/components';
import UploadDialog from './UploadDialog/UploadDialog';

import { createParams, formatDate, parseQuery, useDebounce } from '../../utils';

import style from './Files.module.css';


const Files = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [deleteDialogVisible, setDeleteDialogVisible] = useState<number>();
    const [uploadDialogVisible, setUploadDialogVisible] = useState<boolean>(false);
    const [files, setFiles] = useState<IFile[]>();
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<{
        offset: number;
        limit: number;
        search?: string;
        sort?: string[];
    }>({
        offset: 0,
        limit: 20,
        ...parseQuery(searchParams.toString()),
    });

    useEffect(() => {
        load();
    }, []);

    useDebounce(() => load(), 500, [filter]);

    const load = (): void => {
        setLoading(true);
        setSearchParams(createParams(filter), { replace: true });

        fileService.getList({ ...filter, sort: filter?.sort?.join(',') || undefined })
            .then(({ items, total }) => {
                setFiles(items);
                setTotal(total);
            })
            .finally(() => setLoading(false));
    };

    const onSearch = (value: string): void => setFilter({ ...filter, offset: 0, search: value || undefined });

    const onSort = (sort?: string[]): void => setFilter({ ...filter, offset: 0, sort });

    const onPageChange = (offset: number): void => setFilter({ ...filter, offset });

    const deleteFile = (e: any, id: number): void => {
        e.stopPropagation();
        setDeleteDialogVisible(id);
    };

    const handleDelete = (): void => {
        if (!deleteDialogVisible) return;

        setLoading(true);
        fileService.deleteFile(deleteDialogVisible)
            .then(() => load())
            .finally(() => setLoading(false));
    };

    const onCloseDialog = (isUpdate?: boolean): void => {
        setUploadDialogVisible(false);
        if (isUpdate) load();
    };

    const goto = (id: number) => {
        //TODO Add directory work
    };

    const downloadFile = (e: any, id: number) => {
        e.stopPropagation();
        //TODO
    };

    return (
        <>
            <Breadcrumbs breadcrumbs={[{ title: t('List of files') }]} />
            <TableCard
                filters={
                    <Input
                        placeholder={t('Search') + '...'}
                        icon={{ type: 'search' }}
                        value={filter.search}
                        onChange={onSearch}
                        withoutError
                    />
                }
                actions={
                    <Button className={style.action} onClick={() => setUploadDialogVisible(true)}>
                        <Icon type="cloudUpload" color="white" size={28} />
                        <span>{t('Upload')}</span>
                    </Button>
                }
            >
                <div className="table-container">
                    <table className="table card">
                        <Thead sort={filter.sort} onSort={onSort}>
                            <th className={style.icon} />
                            <th data-sort-field="filename">{t('Name')}</th>
                            <th data-sort-field="status">{t('Status')}</th>
                            <th data-sort-field="updated_at">{t('Date')}</th>
                            <th className={style.icon} />
                            <th className={style.icon} />
                        </Thead>
                        <tbody>
                            {loading && <TableLoader />}
                            {!total && <TableNoData colSpan={6}>{t('No data')}</TableNoData>}
                            {files?.map((f, i) => (
                                <tr key={i} className={style.row} onClick={() => goto(f._id)}>
                                    <td className={style.icon}>
                                        <Icon size={28} />
                                    </td>
                                    <td>{f.filename}</td>
                                    <td>{f.status}</td>
                                    <td>{formatDate(f.updated_at)}</td>
                                    <td className={style.icon}>
                                        <Button buttonType="fill" color="transparent" size="small" onClick={(e) => deleteFile(e, f._id)}>
                                            <Icon type="deleteOutline" size={28} />
                                        </Button>
                                    </td>
                                    <td className={style.icon}>
                                        <Button buttonType="fill" color="transparent" size="small" onClick={(e) => downloadFile(e, f._id)}>
                                            <Icon type="deleteOutline" size={28} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TableCard>
            {total > filter.limit && (
                <Paginator skip={filter.offset} pageSize={filter.limit} total={total} onPageChange={onPageChange} />
            )}

            {deleteDialogVisible && (
                <DeleteDialog
                    header={t('Remove file')}
                    body={t('Are you sure you want to delete this file?')}
                    buttons={{ close: t('Cancel'), accept: t('Remove file') }}
                    onAccept={handleDelete}
                    onClose={() => setDeleteDialogVisible(undefined)}
                />
            )}

            {uploadDialogVisible && <UploadDialog onClose={onCloseDialog} />}
        </>
    )
}

export default Files;
