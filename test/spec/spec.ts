import {App, createApp} from '@appolo/core'
import {CqrsModule} from '../../index'
import {Manager} from "../mock/src/manager/manager";
import {Promises} from "@appolo/utils";

let should = require('chai').should();


describe("CQRS module Spec", function () {

    let app: App;

    beforeEach(async () => {

        app = createApp({root: process.cwd() + '/test/mock/', environment: "production", port: 8182});


        await app.module.use(CqrsModule.for({}));

        await app.launch();

    });

    afterEach(async () => {
        await app.reset();
    });

    it('should get data', async () => {

        let result = await app.injector.get<Manager>(Manager).getData();
        await Promises.delay(10);
        result.should.be.eq("aabbccdd")
    });

});

