import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { fileService } from '../../../services';

import { Dialog, Form, DialogPanel, Button, Loader, FileUploader } from '../../../common/components';

import style from './UploadDialog.module.css';


export type UploadDialogProps = {
    onClose: (isUpdate?: boolean) => void;
}

const UploadDialog = ({ onClose }: UploadDialogProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>();
    const [state, setState] = useState<{ file?: File }>();
    const [errorState, setErrorState] = useState<{ file?: string }>();

    const onUpload = (files: File[]): void => setState({ file: files[0] });

    const onSubmit = (): void => {
        if (!state) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', state.file as File, state.file?.name);

        fileService.uploadFile(formData)
            .then(() => {
                toast.success(t('The file has been successfully uploaded'));
                onClose(true);
            })
            .catch((e: any) => setErrorState(e))
            .finally(() => setLoading(true));
    }

    return (
        <Dialog onClose={() => onClose()}>
            <Form onSubmit={onSubmit}>
                <DialogPanel
                    bodyClassName={style.body}
                    title={t('Upload file')}
                    onClose={() => onClose()}
                    actions={
                        <div className={style.action}>
                            <Button buttonType="border" color="primary" onClick={() => onClose()}>
                                {t('Cancel')}
                            </Button>
                            <Button type="submit" className={style.button} disabled={loading}>
                                {loading ? <Loader size={30} /> : t('Upload')}
                            </Button>
                        </div>
                    }
                >
                    <FileUploader
                        name="file"
                        label={t('File')}
                        placeholder={t('File not selected')}
                        filename={state?.file?.name}
                        onUpload={onUpload}
                        onRemove={(name) => name && setState({ ...state, [name]: undefined })}
                        accept={['*']}
                        error={errorState?.file}
                        disabled={loading}
                        required
                    />
                </DialogPanel>
            </Form>
        </Dialog>
    )
}

export default UploadDialog;
