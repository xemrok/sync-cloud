import React, { useEffect } from 'react';

import { setHtmlTag } from '../../../../utils';

import style from './Dialog.module.css';


export type DialogProps = {
    children: React.ReactNode;
    outsideClose?: boolean;
    onClose: (event: any) => void;
};

const Dialog = ({ outsideClose = true, onClose, children }: DialogProps) => {
    const onKeyboardClose = (e: KeyboardEvent) => e.code === 'Escape' && onClose(e);

    useEffect(() => {
        window.addEventListener('keydown', onKeyboardClose);
        setHtmlTag(true);
        return () => {
            setHtmlTag(false);
            window.removeEventListener('keydown', onKeyboardClose);
        };
    }, []);

    return (
        <div className={style.overlayContainer}>
            <div className={style.overlayBackdrop} onClick={(e) => outsideClose && onClose(e)} />
            <div className={style.overlayWrapper}>{children}</div>
        </div>
    );
};

export default Dialog;
