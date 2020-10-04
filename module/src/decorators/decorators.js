"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saga = exports.query = exports.event = exports.command = exports.defineHandler = exports.SagaSymbol = exports.QuerySymbol = exports.EventSymbol = exports.CommandHandlerSymbol = void 0;
const utils_1 = require("@appolo/utils");
exports.CommandHandlerSymbol = "__CommandHandlerSymbol__";
exports.EventSymbol = "__EventHandlerSymbol__";
exports.QuerySymbol = "__QueryHandlerSymbol__";
exports.SagaSymbol = "__SagaHandlerSymbol__";
function defineHandler(eventName, options, symbol) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(symbol, target.constructor, {});
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
            eventName = utils_1.Classes.className(eventName);
        }
        if (!eventName) {
            throw new Error("failed to find event name");
        }
        data[propertyKey].events.push({ eventName: eventName, options: options || {} });
    };
}
exports.defineHandler = defineHandler;
function command(eventName) {
    return defineHandler(eventName, {}, exports.CommandHandlerSymbol);
}
exports.command = command;
function event(eventName) {
    return defineHandler(eventName, {}, exports.EventSymbol);
}
exports.event = event;
function query(eventName) {
    return defineHandler(eventName, {}, exports.QuerySymbol);
}
exports.query = query;
function saga(events, identifier) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(exports.SagaSymbol, target.constructor, {});
        if (!data[propertyKey]) {
            data[propertyKey] = {
                items: [],
                propertyKey,
                descriptor
            };
        }
        events = events.map(event => typeof event == "string" ? event : utils_1.Classes.className(event));
        data[propertyKey].items.push({ events: events, identifier });
    };
}
exports.saga = saga;
//# sourceMappingURL=decorators.js.map