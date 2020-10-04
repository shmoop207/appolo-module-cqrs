"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsBus = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const decorators_1 = require("../decorators/decorators");
const baseBus_1 = require("../base/baseBus");
let EventsBus = class EventsBus extends baseBus_1.BaseBus {
    constructor() {
        super(...arguments);
        this.Symbol = decorators_1.EventSymbol;
    }
    publish(command) {
        return this._dispatcher.fireEventAsync(typeof command == "string" ? command : utils_1.Classes.className(command.constructor), command);
    }
    on(event, fn, scope, options) {
        super.on(event, fn, this);
    }
};
EventsBus = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], EventsBus);
exports.EventsBus = EventsBus;
//# sourceMappingURL=eventsBus.js.map