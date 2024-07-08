import { User, UserPropsCreate } from './user';
import { UserRole } from './user-role';

describe('User', () => {
    it('should be able to create a user', () => {
        const userProps: UserPropsCreate = {
            email: 'anyon@eemail.com',
            name: 'Anyone',
            role: UserRole.PARTICIPANT,
        };

        const userResult = User.create(userProps);

        expect(userResult).toBeTruthy();
        expect(userResult).toStrictEqual(expect.any(User));
    });

    it('should not be possible to create a user', () => {
        const userProps: UserPropsCreate = {
            email: '',
            name: 'Anyone',
            role: UserRole.ADMIN,
        };
        const userResult = User.create(userProps);

        expect(userResult).toBeTruthy();
    });
});
