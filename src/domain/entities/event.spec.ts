import { EventValidatorSimple } from '../validators/event-validator-simple';
import { Event, EventProps, EventPropsCreate } from './event';

describe('Event', () => {
    it('should be able to create a event', () => {
        const eventValidator = new EventValidatorSimple();
        const eventPropsCreate: EventPropsCreate = {
            name: 'Evento 01',
            capacity: 500,
            date: new Date('2024-11-01'),
        };

        const eventResult = Event.create(eventPropsCreate, eventValidator);

        expect(eventResult.isSuccess()).toBeTruthy();
        expect(eventResult.value).toStrictEqual(expect.any(Event));
    });

    it('should not be able to create a event', () => {
        const eventValidator = new EventValidatorSimple();
        const eventPropsCreate: EventPropsCreate = {
            name: 'Evento 01',
            capacity: 500,
            date: new Date('2022-11-01'),
        };

        const eventResult = Event.create(eventPropsCreate, eventValidator);

        expect(eventResult.isError()).toBeTruthy();
        expect(eventResult.value).toEqual([{ field: 'date', message: 'Data inválida' }]);
    });
});
