"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeEventHandler = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const index_1 = require("../../../../index");
const manager_1 = require("../manager/manager");
const someEvent_1 = require("./someEvent");
const someEvent2_1 = require("./someEvent2");
const someEvent3_1 = require("./someEvent3");
const decorators_1 = require("../../../../module/src/decorators/decorators");
let SomeEventHandler = class SomeEventHandler {
    async handleSomeEvent(command) {
        return this.manager.event1Handled = command.name;
    }
    async handleSomeEvent2(command) {
        return this.manager.event2Handled = command.name;
    }
    async handleSomeEvent3(command) {
        return this.manager.event3Handled = command.name;
    }
    async handleSomeSaga(event2, event3) {
        return this.manager.event3Handled = index_1.command.name;
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", manager_1.Manager)
], SomeEventHandler.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.event(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [someEvent_1.SomeEvent]),
    tslib_1.__metadata("design:returntype", Promise)
], SomeEventHandler.prototype, "handleSomeEvent", null);
tslib_1.__decorate([
    index_1.event(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [someEvent2_1.SomeEvent2]),
    tslib_1.__metadata("design:returntype", Promise)
], SomeEventHandler.prototype, "handleSomeEvent2", null);
tslib_1.__decorate([
    index_1.event(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [someEvent3_1.SomeEvent3]),
    tslib_1.__metadata("design:returntype", Promise)
], SomeEventHandler.prototype, "handleSomeEvent3", null);
tslib_1.__decorate([
    decorators_1.saga([someEvent2_1.SomeEvent2, someEvent3_1.SomeEvent3]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [someEvent2_1.SomeEvent2, someEvent3_1.SomeEvent3]),
    tslib_1.__metadata("design:returntype", Promise)
], SomeEventHandler.prototype, "handleSomeSaga", null);
SomeEventHandler = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], SomeEventHandler);
exports.SomeEventHandler = SomeEventHandler;
//# sourceMappingURL=someEventHandler.js.map