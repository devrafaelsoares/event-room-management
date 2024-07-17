import { Either, error, success } from '@helpers';
import { Replace } from '@helpers';
import { randomUUID } from 'crypto';
import { ValidationError, Validator } from '@domain/validators/protocols';

export type EventProps = {
    name: string;
    description?: string | null;
    date: Date;
    capacity: number;
    createdAt: Date;
    updatedAt: Date;
};

export type EventPropsCreate = Replace<EventProps, { createdAt?: Date; updatedAt?: Date }>;

export class Event implements EventProps {
    private _id: string;
    private props: EventProps;

    private constructor(props: EventPropsCreate) {
        this._id = randomUUID();
        this.props = {
            ...props,
            updatedAt: props.createdAt ?? new Date(),
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public static create(
        props: EventPropsCreate,
        validator: Validator<EventPropsCreate>
    ): Either<ValidationError<EventPropsCreate>[], Event> {
        const validationErrors: ValidationError<EventPropsCreate>[] = validator.validate(props);

        if (validationErrors.length > 0) {
            return error(validationErrors);
        }

        return success(new Event(props));
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get description(): string | null | undefined {
        return this.props.description;
    }

    set description(description: string) {
        this.props.description = description;
    }

    get date(): Date {
        return this.props.date;
    }

    set date(date: Date) {
        this.props.date = date;
    }

    get capacity(): number {
        return this.props.capacity;
    }

    set capacity(capacity: number) {
        this.props.capacity = capacity;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    updated(): void {
        this.props.updatedAt = new Date();
    }
}
