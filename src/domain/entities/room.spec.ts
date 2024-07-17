import { RoomValidatorSimple } from '../validators/room-validator-simple';
import { Room } from './room';

describe('Room', () => {
    it('should be able to create a room', () => {
        const roomValidator = new RoomValidatorSimple();
        const roomProps = {
            name: 'Sala 01',
            capacity: 500,
            locality: 'Brasília - DF',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const roomResult = Room.create(roomProps, roomValidator);

        expect(roomResult.isSuccess()).toBeTruthy();
        expect(roomResult.value).toStrictEqual(expect.any(Room));
    });

    it('should not be able to create a room', () => {
        const roomValidator = new RoomValidatorSimple();
        const roomProps = {
            name: 'Sala 01',
            capacity: 501,
            locality: 'Brasília - DF',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const roomResult = Room.create(roomProps, roomValidator);

        expect(roomResult.isError()).toBeTruthy();
        expect(roomResult.value).toEqual([{ field: 'capacity', message: 'Capacidade inválida' }]);
    });
});
