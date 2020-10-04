"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const index_1 = require("../../../../index");
const someCommand_1 = require("../comands/someCommand");
const queryBus_1 = require("../../../../module/src/query/queryBus");
const someQuery_1 = require("../query/someQuery");
let Manager = class Manager {
    async init() {
        await this.commandsBus.execute(new someCommand_1.SomeCommand("aa"));
    }
    async getData() {
        let result = await this.queryBus.query(new someQuery_1.SomeQuery());
        return result;
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", index_1.CommandsBus)
], Manager.prototype, "commandsBus", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", index_1.EventsBus)
], Manager.prototype, "eventsBus", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", queryBus_1.QueryBus)
], Manager.prototype, "queryBus", void 0);
tslib_1.__decorate([
    inject_1.initMethod(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Manager.prototype, "init", null);
Manager = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Manager);
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map