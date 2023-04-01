import { ChangeEvent } from 'react';

import style from './Checkbox.module.css';


export type CheckboxProps = {
    id?: string;
    name?: string;
    className?: string;
    label?: string;
    position?: 'right' | 'left';
    leftText?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    error?: boolean;
    required?: boolean;
    onChange?: (value: any, name: string, id: string, e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
    id,
    name,
    className,
    label,
    position = 'right',
    checked,
    indeterminate,
    disabled,
    error,
    required,
    onChange,
    ...props
}: CheckboxProps) => (
    <label className={`${style.labelCheckbox} ${disabled ? style.disabled : ''} ${className}`}>
        {label && position === 'left' && (
            <span className={`${style.text} ${error ? style.error : ''}`}>
                {label} {required && <span className={style.mandatory}>*</span>}
            </span>
        )}
        <input
            id={id || name}
            name={name || id}
            type="checkbox"
            className={`${style.checkbox} ${
                indeterminate && !checked ? style.indeterminate : ''} ${
                error ? style.error : ''} ${
                disabled ? style.disabled : ''}`
            }
            checked={checked || indeterminate || false}
            disabled={disabled}
            required={required}
            onChange={e => onChange && onChange(e.target.checked, e.target.name, e.target.id, e)}
            {...props}
        />
        {label && position === 'right' && (
            <span className={`${style.text} ${error ? style.error : ''}`}>
                {label} {required && <span className={style.mandatory}>*</span>}
            </span>
        )}
    </label>
)

export default Checkbox;
