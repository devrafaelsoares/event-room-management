import { Room } from './room';
import { User } from './user';
import { Event } from './event';
import { BookingStatus } from './booking-status';
import { Replace } from '@helpers';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { Either, error, success } from '@helpers';
import { randomUUID } from 'crypto';

export type BookingProps = {
    user: User;
    room: Room;
    event: Event;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
};

export class Booking implements BookingProps {
    private _id: string;
    private props: BookingProps;

    private constructor(props: Replace<BookingProps, { createdAt?: Date }>) {
        this._id = randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
        };
    }

    public static create(
        props: BookingProps,
        validator: Validator<BookingProps>
    ): Either<ValidationError<BookingProps>[], Booking> {
        const validationErrors: ValidationError<BookingProps>[] = validator.validate(props);

        if (validationErrors.length > 0) {
            return error(validationErrors);
        }

        return success(new Booking(props));
    }

    get id(): string {
        return this._id;
    }

    get user(): User {
        return this.props.user;
    }

    get room(): Room {
        return this.props.room;
    }

    get event(): Event {
        return this.props.event;
    }

    get status(): BookingStatus {
        return this.props.status;
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
