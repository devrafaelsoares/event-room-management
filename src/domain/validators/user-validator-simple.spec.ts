import { UserProps, UserRole } from '@domain/entities';
import { UserValidatorSimple } from './user-validator-simple';

describe('UserValidator', () => {
    it('should return an error if name is empty', () => {
        const user: UserProps = {
            email: 'anyone@email.com',
            name: '',
            role: UserRole.PARTICIPANT,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const userValidator = new UserValidatorSimple();

        const userValidationResult = userValidator.validate(user);
        expect(userValidationResult).toEqual([{ field: 'name', message: 'O nome é obrigatório' }]);
    });

    it('should return an error if email is empty', () => {
        const user: UserProps = {
            email: '',
            name: 'Anyone',
            role: UserRole.PARTICIPANT,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const userValidator = new UserValidatorSimple();

        const userValidationResult = userValidator.validate(user);
        expect(userValidationResult).toEqual([{ field: 'email', message: 'O email é obrigatório' }]);
    });

    it('should return an error if email format is invalid', () => {
        const user: UserProps = {
            email: 'anyoneemail.com',
            name: 'Anyone',
            role: UserRole.PARTICIPANT,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const userValidator = new UserValidatorSimple();

        const userValidationResult = userValidator.validate(user);
        expect(userValidationResult).toEqual([{ field: 'email', message: 'Email inválido' }]);
    });
});
