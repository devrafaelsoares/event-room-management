import { UserPropsCreate } from '@domain/entities';
import { ValidationError, Validator } from './protocols';

export class UserValidatorSimple implements Validator<UserPropsCreate> {
    private errors: ValidationError<UserPropsCreate>[] = [];

    public validate(props: UserPropsCreate): ValidationError<UserPropsCreate>[] {
        this.validateEmail(props.email);
        this.validateName(props.name);

        return this.errors;
    }

    private isEmpty(value: string): boolean {
        const valueSanatize = value.trim();
        return valueSanatize.length === 0;
    }

    private isEmailValid(value: string): boolean {
        return !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    }

    private validateEmail(value: string): void {
        const rules = [
            { validate: (val: string) => this.isEmpty(val), message: 'O email é obrigatório' },
            { validate: (val: string) => this.isEmailValid(val), message: 'Email inválido' },
        ];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ field: 'email', message: rule.message });
                break;
            }
        }
    }

    private validateName(value: string): void {
        const rules = [{ validate: (val: string) => this.isEmpty(val), message: 'O nome é obrigatório' }];

        for (const rule of rules) {
            if (rule.validate(value)) {
                this.errors.push({ field: 'name', message: rule.message });
                break;
            }
        }
    }

    public cleanErrors(): void {
        this.errors = [];
    }
}
