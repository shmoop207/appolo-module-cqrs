"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@appolo/core");
const index_1 = require("../../index");
const manager_1 = require("../mock/src/manager/manager");
const utils_1 = require("@appolo/utils");
let should = require('chai').should();
describe("CQRS module Spec", function () {
    let app;
    beforeEach(async () => {
        app = core_1.createApp({ root: process.cwd() + '/test/mock/', environment: "production", port: 8182 });
        await app.module.use(index_1.CqrsModule.for({}));
        await app.launch();
    });
    afterEach(async () => {
        await app.reset();
    });
    it('should get data', async () => {
        let result = await app.injector.get(manager_1.Manager).getData();
        await utils_1.Promises.delay(10);
        result.should.be.eq("aabbccdd");
    });
});
//# sourceMappingURL=spec.js.map