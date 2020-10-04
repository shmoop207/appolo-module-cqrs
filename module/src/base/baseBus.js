"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBus = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const events_1 = require("@appolo/events");
const engine_1 = require("@appolo/engine");
const utils_1 = require("@appolo/utils");
const logger_1 = require("@appolo/logger");
class BaseBus {
    constructor() {
        this._dispatcher = new events_1.EventDispatcher();
    }
    initialize() {
        this.discovery.getParent().findAllReflectData(this.Symbol).forEach(item => {
            Object.values(item.metaData).forEach(metaData => this._createHandler(item.fn, item.define, metaData));
        });
    }
    _createHandler(fn, define, metaData) {
        Object.values(metaData.events).forEach(event => this.on(event.eventName, (command) => this._callHandler(define, metaData.propertyKey, command), this, { await: true }));
    }
    async _callHandler(define, propertyKey, command) {
        try {
            let instance = this.injector.parent.get(define.id);
            await instance[propertyKey](command);
        }
        catch (e) {
            this.logger.error(`failed to call handler ${define.id} ${propertyKey}`, { err: e });
            throw e;
        }
    }
    on(command, fn, scope, options) {
        this._dispatcher.on(typeof command == "string" ? command : utils_1.Classes.className(command), fn, this, { await: true, parallel: true });
    }
}
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", engine_1.App)
], BaseBus.prototype, "app", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", inject_1.Injector)
], BaseBus.prototype, "injector", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", engine_1.Discovery)
], BaseBus.prototype, "discovery", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", logger_1.Logger)
], BaseBus.prototype, "logger", void 0);
tslib_1.__decorate([
    inject_1.initMethod(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BaseBus.prototype, "initialize", null);
exports.BaseBus = BaseBus;
//# sourceMappingURL=baseBus.js.map