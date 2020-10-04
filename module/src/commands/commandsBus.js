"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsBus = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const decorators_1 = require("../decorators/decorators");
const baseBus_1 = require("../base/baseBus");
const index_1 = require("@appolo/utils/index");
let CommandsBus = class CommandsBus extends baseBus_1.BaseBus {
    constructor() {
        super(...arguments);
        this.Symbol = decorators_1.CommandHandlerSymbol;
    }
    execute(command) {
        return this._dispatcher.fireEventAsync(typeof command == "string" ? command : index_1.Classes.className(command.constructor), command);
    }
    on(command, fn, scope, options) {
        super.on(command, fn, this);
    }
};
CommandsBus = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], CommandsBus);
exports.CommandsBus = CommandsBus;
//# sourceMappingURL=commandsBus.js.map