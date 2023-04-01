import { forwardRef, ReactNode } from 'react';

import { Button, Icon } from '../../index';

import style from './DialogPanel.module.css';


export type DialogPanelProps = {
    title?: ReactNode | ReactNode[];
    children?: ReactNode | ReactNode[];
    className?: string;
    bodyClassName?: string;
    actions?: ReactNode | ReactNode[];
    onClose?: (event: any) => void;
};

const DialogPanel = forwardRef(({
    title,
    onClose,
    children,
    className,
    bodyClassName,
    actions,
    ...props
}: DialogPanelProps, ref: any) => (
    <div {...props} ref={ref} className={`${style.container} ${style.className}`}>
        {title && (
            <div className={style.header}>
                <div className={style.title}>{title}</div>

                {onClose && (
                    <Button className={style.closeButton} buttonType="fill" color="transparent" size="small" onClick={onClose}>
                        <Icon type="close" size={26} />
                    </Button>
                )}
            </div>
        )}
        <div className={`${bodyClassName || ''} ${style.body} ${!title ? style.bodyOnly : ''}`}>
            <div>
                <div className={className || ''}>{children}</div>
                <div>{actions}</div>
            </div>
        </div>
    </div>
));

export default DialogPanel;
