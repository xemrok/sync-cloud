import { ChangeEvent, ReactNode, useRef } from 'react';

import { Button, Icon } from '../../index';

import style from './FileUploader.module.css';


export type FileUploaderProps = {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    filename?: string;
    className?: string;
    accept?: string[];
    disabled?: boolean;
    required?: boolean;
    error?: string | ReactNode | ReactNode[];
    withoutError?: boolean;
    onUpload: (files: any, name: string, id: string, e: ChangeEvent<HTMLInputElement>) => void;
    onRemove?: (name?: string, id?: string, e?: any) => void;
};

const FileUploader = ({
    id,
    name,
    label,
    placeholder,
    filename,
    className,
    accept,
    disabled,
    required,
    error,
    withoutError,
    onUpload,
    onRemove,
}: FileUploaderProps) => {
    const inputRef = useRef<any>(null);

    const handleClick = (e: any): void => {
        if (!filename) inputRef.current && inputRef.current.click();
        else {
            onRemove && onRemove(name, id, e);
            inputRef.current.value = null;
        }
    }

    return (
        <div className={`${style.fullWidth} ${className || ''}`}>
            {label && (
                <label className={`${style.label} ${error ? style.error : ''}`} htmlFor={id || name}>
                    {label} {required && <span className={style.mandatory}>*</span>}
                </label>
            )}
            <div className={style.wrapper}>
                <div className={`${style.container} ${disabled ? style.disabledContainer : ''}`}>
                    <div className={`${style.placeholder} ${filename ? style.filePlaceholder : ''} ${disabled ? style.disabledPlaceholder : ''} ${error ? style.errorPlaceholder : ''}`}>
                        {filename || placeholder}
                    </div>
                    <input
                        id={id || name}
                        name={name || id}
                        type="file"
                        className={`${style.input} ${disabled ? style.disabledInput : ''}`}
                        ref={inputRef}
                        onChange={(e) => onUpload(e.target.files, e.target.name, e.target.id, e)}
                        accept={accept?.join(', ')}
                        disabled={disabled}
                        required={required}
                    />
                    <Button className={style.button} disabled={disabled} onClick={handleClick}>
                        <Icon type={filename ? 'close' : 'fileUploadOutline'} color={disabled ? 'gray' : 'white'} size={24} />
                    </Button>
                </div>
                {!withoutError && <div className={style.error} title={typeof error === 'string' ? error : ''}>{error}</div>}
            </div>
        </div>
    );
};

export default FileUploader;
