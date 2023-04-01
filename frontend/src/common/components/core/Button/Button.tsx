import { ComponentProps, ReactNode } from 'react';

import style from './Button.module.css';


export type ButtonColor =
    'gray'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'white'
    | 'dark-gray'
    | 'black'
    | 'transparent';

export type ButtonProps = {
    id?: string;
    name?: string;
    type?: 'button' | 'reset' | 'submit';
    className?: string;
    color?: ButtonColor;
    size?: 'small' | 'medium' | 'fullWidth';
    buttonType?: 'fill' | 'border';
    children?: string | ReactNode | ReactNode[];
    disabled?: boolean;
    onClick?: (e: any) => void;
} & ComponentProps<'button'>;

const Button = ({
    id,
    name,
    type = 'button',
    className,
    color = 'primary',
    size = 'medium',
    buttonType = 'fill',
    children,
    disabled,
    onClick,
    ...props
}: ButtonProps) => (
    <button
        {...props}
        id={id}
        name={name}
        type={type}
        className={`${style.button} ${
            style[color + '-' + buttonType]} ${style[size] ? style[size] : ''} ${
            disabled ? style[`disabled-${buttonType}`] : ''} ${className}`
        }
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
