import { ReactNode } from 'react';

import { Dialog, DialogPanel, Icon, Button } from '../../index';

import style from './DeleteDialog.module.css';


export type DeleteDialogProps = {
    header: string;
    body: string | ReactNode | ReactNode[];
    buttons: {
        accept: string | ReactNode | ReactNode[];
        close?: string | ReactNode | ReactNode[];
    };
    data?: any;
    onAccept: (data?: any) => void;
    onClose: () => void;
}

const DeleteDialog = ({ header, body, buttons, data, onAccept, onClose }: DeleteDialogProps) => {

    const handleAccept = (): void => {
        onAccept(data);
        onClose();
    };

    return (
        <Dialog onClose={() => onClose()}>
            <DialogPanel
                className={style.body}
                title={
                    <div className={style.title}>
                        <Icon type="alertOutline" color="danger" size={26} />
                        <span>{header}</span>
                    </div>
                }
                onClose={() => onClose()}
                actions={
                    <div className={style.buttons}>
                        {buttons.close &&
                            <Button buttonType="border" onClick={() => onClose()}>
                                {buttons.close}
                            </Button>
                        }
                        <Button color="danger" onClick={handleAccept}>{buttons.accept}</Button>
                    </div>
                }>
                {body}
            </DialogPanel>
        </Dialog>
    );
};

export default DeleteDialog;
