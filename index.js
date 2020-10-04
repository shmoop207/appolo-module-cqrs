"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsBus = exports.CommandsBus = exports.saga = exports.event = exports.query = exports.command = exports.CqrsModule = void 0;
const cqrsModule_1 = require("./module/cqrsModule");
Object.defineProperty(exports, "CqrsModule", { enumerable: true, get: function () { return cqrsModule_1.CqrsModule; } });
const decorators_1 = require("./module/src/decorators/decorators");
Object.defineProperty(exports, "command", { enumerable: true, get: function () { return decorators_1.command; } });
Object.defineProperty(exports, "query", { enumerable: true, get: function () { return decorators_1.query; } });
Object.defineProperty(exports, "event", { enumerable: true, get: function () { return decorators_1.event; } });
Object.defineProperty(exports, "saga", { enumerable: true, get: function () { return decorators_1.saga; } });
const commandsBus_1 = require("./module/src/commands/commandsBus");
Object.defineProperty(exports, "CommandsBus", { enumerable: true, get: function () { return commandsBus_1.CommandsBus; } });
const eventsBus_1 = require("./module/src/events/eventsBus");
Object.defineProperty(exports, "EventsBus", { enumerable: true, get: function () { return eventsBus_1.EventsBus; } });
//# sourceMappingURL=index.js.map