import {Reflector, Classes} from '@appolo/utils';
import {Command, ICommandCtr} from "../interfaces/ICommand";
import {IHandlerMetadata, IHandlerMetaIndex, ISagaMetaIndex} from "../interfaces/IHandlerMetadata";
import {IEventCtr} from "../interfaces/IEvent";
import {IQueryCtr} from "../interfaces/IQuery";

export const CommandHandlerSymbol = "__CommandHandlerSymbol__"
export const EventSymbol = "__EventHandlerSymbol__"
export const QuerySymbol = "__QueryHandlerSymbol__"
export const SagaSymbol = "__SagaHandlerSymbol__"


export function defineHandler(eventName: string | Command, options: any, symbol: string,) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        let data = Reflector.getFnMetadata<IHandlerMetaIndex>(symbol, target.constructor, {});

        if (!eventName) {
            let paramTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);

            if (paramTypes && paramTypes.length) {
                eventName = paramTypes[0];
            }
        }

        if (!data[propertyKey]) {
            data[propertyKey] = {
                events: [],
                propertyKey,
                descriptor
            };
        }


        if (typeof eventName != "string") {
            eventName = Classes.className(eventName as Function);
        }

        if (!eventName) {
            throw  new Error("failed to find event name");
        }

        data[propertyKey].events.push(
            {eventName: eventName as string, options: options || {}});
    }
}

export function command(eventName?: string | ICommandCtr) {
    return defineHandler(eventName, {}, CommandHandlerSymbol)
}

export function event(eventName?: string | IEventCtr) {
    return defineHandler(eventName, {}, EventSymbol)
}

export function query(eventName?: string | IQueryCtr) {
    return defineHandler(eventName, {}, QuerySymbol)
}

export function saga(events: (string | IEventCtr)[], identifier?: (event: Event) => boolean) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        let data = Reflector.getFnMetadata<ISagaMetaIndex>(SagaSymbol, target.constructor, {})

        if (!data[propertyKey]) {
            data[propertyKey] = {
                items: [],
                propertyKey,
                descriptor
            };
        }

        events = events.map(event => typeof event == "string" ? event : Classes.className(event as Function))

        data[propertyKey].items.push({events: events as string[], identifier})
    };
}


