"use strict";
var SagaBus_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SagaBus = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const engine_1 = require("@appolo/engine");
const decorators_1 = require("../decorators/decorators");
const eventsBus_1 = require("../events/eventsBus");
const index_1 = require("@appolo/logger/index");
let SagaBus = SagaBus_1 = class SagaBus {
    constructor() {
        this.Symbol = decorators_1.SagaSymbol;
    }
    initialize() {
        this.discovery.getParent().findAllReflectData(this.Symbol).forEach(item => {
            Object.values(item.metaData).forEach(metaData => this._createHandler(item.fn, item.define, metaData));
        });
    }
    _createHandler(fn, define, metaData) {
        Object.values(metaData.items).forEach(item => {
            let results = [];
            item.events.forEach((event, index) => {
                results[index] = [];
                let fn = SagaBus_1.sagaFn(results, index, this._callHandler.bind(this, define, metaData.propertyKey), this, item.identifier);
                this.eventsBus.on(event, fn, this);
            });
        });
    }
    async _callHandler(define, propertyKey, ...args) {
        try {
            let instance = this.injector.parent.get(define.id);
            await instance[propertyKey](...args);
        }
        catch (e) {
            this.logger.error(`failed to call handler ${define.id} ${propertyKey}`, { err: e });
            throw e;
        }
    }
    static sagaFn(results, i, fn, scope, identifier) {
        let sagaFn = function (event) {
            results[i].push(event);
            if (!identifier) {
                identifier = ((event) => !!event);
            }
            let indexes = results.map(item => item.findIndex(i => identifier(i)));
            if (indexes.every(index => index > -1)) {
                let args = results.map((item, index) => item[indexes[index]]);
                results.forEach((item, index) => item.splice(indexes[index], 1));
                fn.apply(scope, args.reduce((acc, val) => acc.concat(val), []));
            }
        };
        fn["@__eventDispatcher__"] = sagaFn;
        return sagaFn;
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", inject_1.Injector)
], SagaBus.prototype, "injector", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", engine_1.Discovery)
], SagaBus.prototype, "discovery", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", eventsBus_1.EventsBus)
], SagaBus.prototype, "eventsBus", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", index_1.Logger)
], SagaBus.prototype, "logger", void 0);
tslib_1.__decorate([
    inject_1.initMethod(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SagaBus.prototype, "initialize", null);
SagaBus = SagaBus_1 = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], SagaBus);
exports.SagaBus = SagaBus;
//# sourceMappingURL=sagaBus.js.map