import { UserValidatorSimple } from '@domain/validators/user-validator-simple';
import { User, UserProps } from './user';
import { UserRole } from './user-role';

describe('User', () => {
    it('should be able to create a user', () => {
        const userValidator = new UserValidatorSimple();
        const userProps = {
            email: 'anyon@eemail.com',
            name: 'Anyone',
            createdAt: new Date(),
            role: UserRole.PARTICIPANT,
            updatedAt: new Date(),
        };

        const userResult = User.create(userProps, userValidator);

        expect(userResult.isSuccess()).toBeTruthy();
        expect(userResult.value).toStrictEqual(expect.any(User));
    });

    it('should not be possible to create a user', () => {
        const userValidator = new UserValidatorSimple();
        const userProps: UserProps = {
            email: '',
            name: 'Anyone',
            createdAt: new Date(),
            role: UserRole.ADMIN,
            updatedAt: new Date(),
        };
        const userResult = User.create(userProps, userValidator);

        expect(userResult.isError()).toBeTruthy();
        expect(userResult.value).toEqual([{ field: 'email', message: 'O email é obrigatório' }]);
    });
});
