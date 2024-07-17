import { BookingValidatorSimple } from '@domain/validators/booking-validator-simple';
import { EventValidatorSimple } from '@domain/validators/event-validator-simple';
import { RoomValidatorSimple } from '@domain/validators/room-validator-simple';
import { UserValidatorSimple } from '@domain/validators/user-validator-simple';
import { Booking, BookingProps } from './booking';
import { BookingStatus } from './booking-status';
import { Event, EventPropsCreate } from './event';
import { RoomProps, Room } from './room';
import { User } from './user';
import { UserRole } from './user-role';

describe('Booking', () => {
    it('should be able to create a booking', () => {
        const roomValidator = new RoomValidatorSimple();
        const roomProps: RoomProps = {
            name: 'Sala 01',
            capacity: 500,
            locality: 'Brasília - DF',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const eventValidator = new EventValidatorSimple();
        const eventPropsCreate: EventPropsCreate = {
            name: 'Evento 01',
            capacity: 500,
            date: new Date('2024-10-01'),
        };

        const userValidator = new UserValidatorSimple();
        const userProps = {
            email: 'anyon@eemail.com',
            name: 'Anyone',
            createdAt: new Date(),
            role: UserRole.PARTICIPANT,
            updatedAt: new Date(),
        };

        const userResult = User.create(userProps, userValidator);

        const eventResult = Event.create(eventPropsCreate, eventValidator);
        const roomResult = Room.create(roomProps, roomValidator);

        const room = roomResult.value as Room;
        const event = eventResult.value as Event;
        const user = userResult.value as User;

        const bookingValidator = new BookingValidatorSimple();
        const bookingProps: BookingProps = {
            event,
            room,
            user,
            status: BookingStatus.CONFIRMED,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const bookingResult = Booking.create(bookingProps, bookingValidator);

        expect(bookingResult.isSuccess()).toBeTruthy();
        expect(bookingResult.value).toStrictEqual(expect.any(Booking));
    });

    it('should not be able to create a booking', () => {
        const roomValidator = new RoomValidatorSimple();
        const roomProps: RoomProps = {
            name: 'Sala 01',
            capacity: 500,
            locality: 'Brasília - DF',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const eventValidator = new EventValidatorSimple();
        const eventPropsCreate: EventPropsCreate = {
            name: 'Evento 01',
            capacity: 501,
            date: new Date('2024-10-01'),
        };

        const userValidator = new UserValidatorSimple();
        const userProps = {
            email: 'anyon@eemail.com',
            name: 'Anyone',
            createdAt: new Date(),
            role: UserRole.PARTICIPANT,
            updatedAt: new Date(),
        };

        const userResult = User.create(userProps, userValidator);

        const eventResult = Event.create(eventPropsCreate, eventValidator);
        const roomResult = Room.create(roomProps, roomValidator);

        const room = roomResult.value as Room;
        const event = eventResult.value as Event;
        const user = userResult.value as User;

        const bookingValidator = new BookingValidatorSimple();
        const bookingProps: BookingProps = {
            event,
            room,
            user,
            status: BookingStatus.CONFIRMED,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const bookingResult = Booking.create(bookingProps, bookingValidator);

        expect(bookingResult.isError()).toBeTruthy();
        expect(bookingResult.value).toEqual([
            { field: 'event', message: 'Capacidade do evento é maior que a permitida da sala' },
        ]);
    });
});
