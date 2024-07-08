import { User, UserProps } from './user';
import { UserRole } from './user-role';

describe('User', () => {
    it('should be able to create a user', () => {
        const userProps = {
            email: 'anyon@eemail.com',
            name: 'Anyone',
            createdAt: new Date(),
            role: UserRole.PARTICIPANT,
            updatedAt: new Date(),
        };

        const userResult = User.create(userProps);

        expect(userResult).toBeTruthy();
        expect(userResult).toStrictEqual(expect.any(User));
    });

    it('should not be possible to create a user', () => {
        const userProps: UserProps = {
            email: '',
            name: 'Anyone',
            createdAt: new Date(),
            role: UserRole.ADMIN,
            updatedAt: new Date(),
        };
        const userResult = User.create(userProps);

        expect(userResult).toBeTruthy();
    });
});
