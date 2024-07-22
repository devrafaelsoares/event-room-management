import { randomUUID } from 'crypto';
import { Replace } from '@helpers/replace';
import { Either, error, success } from '@helpers/either';
import { ValidationError, Validator } from '@domain/validators/protocols';

export type RoomProps = {
    name: string;
    capacity: number;
    locality: string;
    createdAt: Date;
    updatedAt: Date;
};

export type RoomPropsCreate = Replace<RoomProps, { createdAt?: Date; updatedAt?: Date }>;

export class Room implements RoomProps {
    private _id: string;
    private props: RoomProps;

    private constructor(props: RoomPropsCreate) {
        this._id = randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        };
    }

    public static create(
        props: RoomPropsCreate,
        validator: Validator<RoomPropsCreate>
    ): Either<ValidationError<RoomPropsCreate>[], Room> {
        const validationErrors: ValidationError<RoomPropsCreate>[] = validator.validate(props);

        if (validationErrors.length > 0) {
            return error(validationErrors);
        }

        return success(new Room(props));
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

    get capacity(): number {
        return this.props.capacity;
    }

    set capacity(capacity: number) {
        this.props.capacity = capacity;
    }

    get locality(): string {
        return this.props.locality;
    }

    set locality(locality: string) {
        this.props.locality = locality;
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
