export enum Status {
    pending = 'pending',
    processed = 'processed',
    success = 'success',
    error = 'error',
}

export interface IFile {
    _id: number;
    user_id: number;
    path: string;
    filename: string;
    status: Status;
    updated_at: string;
    created_at: string;
}
