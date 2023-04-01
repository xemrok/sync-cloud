import { ChangeEvent, ComponentProps, forwardRef, ReactNode } from 'react';

import { Icon, IconProps } from '../../index';

import style from './Input.module.css';


export type InputProps = {
    id?: string;
    type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'url';
    name?: string;
    className?: string;
    placeholder?: string;
    label?: string | ReactNode | ReactNode[];
    labelPosition?: 'left' | 'top';
    value?: string | number;
    icon?: IconProps & { position?: 'left' | 'right' };
    disabled?: boolean;
    required?: boolean;
    autoComplete?: 'on' | 'off' | 'new-password';
    error?: string | ReactNode | ReactNode[];
    withoutError?: boolean;
    onChange?: (value: any, name: string, id: string, e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<ComponentProps<'input'>, 'onChange'>

const getStyles = (icon?: IconProps & { position?: 'left' | 'right' }): string =>
    icon
        ? `${style.fullWidth} ${style.inputWithIcon} ${icon.position === 'left' ? style.leftIconPosition : style.rightIconPosition}`
        : style.fullWidth;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        id,
        type = 'text',
        name,
        className,
        placeholder,
        label,
        labelPosition = 'top',
        value,
        icon,
        disabled,
        required,
        autoComplete,
        error,
        withoutError,
        onChange,
        ...props
    }: InputProps,
        ref
    ) => (
        <div className={`${style.fullWidth} ${className || ''} ${label && style[labelPosition] || ''}`}>
            {label && (
                <label className={`${style.label} ${error ? style.error : ''}`} htmlFor={id || name}>
                    {label} {required && <span className={style.mandatory}>*</span>}
                </label>
            )}
            <div className={style.wrapper}>
                <div className={getStyles(icon)}>
                    <input
                        {...props}
                        id={id || name}
                        type={type}
                        name={name || id}
                        ref={ref}
                        className={`${style.input} ${(disabled && style.disabled) || ''} ${error && style.error} ${className}`}
                        placeholder={placeholder}
                        value={value || undefined}
                        disabled={disabled}
                        required={required}
                        autoComplete={autoComplete}
                        onChange={e => onChange && onChange(e.target.value, e.target.name, e.target.id, e)}
                    />
                    {icon && <Icon color={icon.color} type={icon.type} size={icon.size || 22} {...icon} />}
                </div>
            </div>
            {!withoutError && <div className={style.error} title={typeof error === 'string' ? error : ''}>{error}</div>}
        </div>
    )
);

export default Input;
