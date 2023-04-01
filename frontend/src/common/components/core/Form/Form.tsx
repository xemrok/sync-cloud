import { ComponentProps, FormEvent, ReactNode } from 'react';


export type FormProps = {
    children?: string | ReactNode | ReactNode[];
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
} & ComponentProps<'form'>;

const Form = ({ children, onSubmit, ...props }: FormProps) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSubmit && onSubmit(e);
    }

    return (
        <form {...props} onSubmit={handleSubmit}>{children}</form>
    )
}

export default Form;
