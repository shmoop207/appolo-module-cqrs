"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBus = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const baseBus_1 = require("../base/baseBus");
const decorators_1 = require("../decorators/decorators");
let QueryBus = class QueryBus extends baseBus_1.BaseBus {
    constructor() {
        super(...arguments);
        this.Symbol = decorators_1.QuerySymbol;
        this.QueryResultSymbol = "__QueryResultSymbol__";
        this._results = new Map();
    }
    initialize() {
        super.initialize();
        this.on(this.QueryResultSymbol, this._onResult, this);
    }
    _onResult(params) {
        let result = this._results.get(params.guid);
        if (!result) {
            return;
        }
        this._results.delete(params.guid);
        if (params.status) {
            result.resolve(params.result);
        }
        else {
            result.reject(params.e);
        }
    }
    async query(command) {
        return new Promise(async (resolve, reject) => {
            let guid = utils_1.Guid.guid();
            this._results.set(guid, { resolve, reject });
            await this._dispatcher.fireEventAsync(typeof command == "string" ? command : utils_1.Classes.className(command.constructor), {
                guid,
                command
            });
        });
    }
    async _callHandler(define, propertyKey, args) {
        try {
            let instance = this.injector.parent.get(define.id);
            let result = await instance[propertyKey](args.command);
            this._dispatcher.fireEvent(this.QueryResultSymbol, { guid: args.guid, result, status: true });
        }
        catch (e) {
            this._dispatcher.fireEvent(this.QueryResultSymbol, { guid: args.guid, result: null, status: false, e });
        }
    }
};
QueryBus = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], QueryBus);
exports.QueryBus = QueryBus;
//# sourceMappingURL=queryBus.js.map