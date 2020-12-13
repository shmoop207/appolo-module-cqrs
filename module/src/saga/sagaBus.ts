import {define, singleton, inject, init, Define, Injector} from '@appolo/inject'
import {EventDispatcher, IEventOptions} from '@appolo/events'
import {App, Discovery} from '@appolo/engine'
import {Classes, Guid} from '@appolo/utils'
import {BaseBus} from "../base/baseBus";
import {QuerySymbol, SagaSymbol} from "../decorators/decorators";
import {IQueryCtr, Query} from "../interfaces/IQuery";
import {Command} from "../interfaces/ICommand";
import {IHandlerMetadata, IHandlerMetaIndex, ISagaMetadata, ISagaMetaIndex} from "../interfaces/IHandlerMetadata";
import {EventsBus} from "../events/eventsBus";
import {Logger} from "@appolo/logger/index";

@define()
@singleton()
export class SagaBus {

    protected readonly Symbol = SagaSymbol;
    @inject() protected injector: Injector;
    @inject() protected discovery: Discovery;
    @inject() protected eventsBus: EventsBus;
    @inject() protected logger: Logger;

    @init()
    protected initialize() {

        this.discovery.getParent().findAllReflectData<ISagaMetaIndex>(this.Symbol).forEach(item => {
            Object.values<ISagaMetadata>(item.metaData).forEach(metaData => this._createHandler(item.fn, item.define, metaData));
        })
    }

    protected _createHandler(fn: Function, define: Define, metaData: ISagaMetadata) {
        Object.values(metaData.items).forEach(item => {
            let results: any[][] = [];
            item.events.forEach((event, index) => {
                results[index] = [];

                let fn = SagaBus.sagaFn(results, index, this._callHandler.bind(this, define, metaData.propertyKey), this, item.identifier);

                this.eventsBus.on(event, fn, this)
            })
        })
    }

    protected async _callHandler(define: Define, propertyKey: string, ...args: any[]) {

        try {
            let instance = this.injector.parent.get(define.id);

            await instance[propertyKey](...args);

        } catch (e) {

            this.logger.error(`failed to call handler ${define.id} ${propertyKey}`, {err: e});
            throw e
        }
    }

    public static sagaFn(results: any[][], i: number, fn: (...args: any[]) => any, scope: any, identifier: (event: Event) => boolean) {
        let sagaFn = function (event) {
            results[i].push(event);

            if (!identifier) {
                identifier = ((event) => !!event);
            }

            let indexes = results.map(item => item.findIndex(i => identifier(i)))

            if (indexes.every(index => index > -1)) {
                let args = results.map((item, index) => item[indexes[index]]);
                results.forEach((item, index) => item.splice(indexes[index], 1));

                fn.apply(scope, args.reduce((acc, val) => acc.concat(val), []))
            }
        }

        fn["@__eventDispatcher__"] = sagaFn;
        return sagaFn;
    }

}
