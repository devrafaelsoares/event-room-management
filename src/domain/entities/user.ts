import { Replace } from '@helpers';
import { UserRole } from './user-role';
import { randomUUID } from 'crypto';

export type UserProps = {
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
};

export type UserPropsCreate = Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>;

export class User implements UserProps {
    private _id: string;
    private props: UserProps;

    private constructor(props: UserPropsCreate) {
        this._id = randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        };
    }

    public static create(props: UserPropsCreate): User {
        return new User(props);
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

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.props.email = email;
    }

    get role(): UserRole {
        return this.props.role;
    }

    set role(role: UserRole) {
        this.props.role = role;
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
