export interface ValidationError<T> {
    field: keyof T;
    message: string;
}

export interface Validator<T> {
    validate(props: T): ValidationError<T>[];
}
