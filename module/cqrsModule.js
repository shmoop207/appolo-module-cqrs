"use strict";
var CqrsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CqrsModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const index_1 = require("../index");
const queryBus_1 = require("./src/query/queryBus");
let CqrsModule = CqrsModule_1 = class CqrsModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            commandsBusId: "commandsBus",
            eventsBusId: "eventsBus",
            queryBusId: "queryBus"
        };
    }
    static for(options) {
        return { type: CqrsModule_1, options };
    }
    get exports() {
        return [
            { id: this.moduleOptions.commandsBusId, type: index_1.CommandsBus },
            { id: this.moduleOptions.eventsBusId, type: index_1.EventsBus },
            { id: this.moduleOptions.queryBusId, type: queryBus_1.QueryBus }
        ];
    }
};
CqrsModule = CqrsModule_1 = tslib_1.__decorate([
    engine_1.module()
], CqrsModule);
exports.CqrsModule = CqrsModule;
//# sourceMappingURL=cqrsModule.js.map