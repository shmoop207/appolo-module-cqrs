import {define, singleton, inject, init, Define, Injector} from '@appolo/inject'
import {EventDispatcher, IEventOptions} from '@appolo/events'
import {App, Discovery} from '@appolo/engine'
import {Classes, Guid} from '@appolo/utils'
import {BaseBus} from "../base/baseBus";
import {QuerySymbol} from "../decorators/decorators";
import {IQueryCtr, Query} from "../interfaces/IQuery";
import {Command} from "../interfaces/ICommand";
import {IHandlerMetadata, IHandlerMetaIndex} from "../interfaces/IHandlerMetadata";

@define()
@singleton()
export class QueryBus extends BaseBus {

    protected readonly Symbol = QuerySymbol;
    protected readonly QueryResultSymbol = "__QueryResultSymbol__";

    protected initialize() {

        super.initialize();

        this.on(this.QueryResultSymbol, this._onResult, this);
    }

    private _results = new Map<string, { resolve, reject }>();

    private _onResult(params: { guid: string, result: any, status: boolean, e: Error }) {
        let result = this._results.get(params.guid);

        if (!result ) {
            return;
        }

        this._results.delete(params.guid)

        if (params.status) {
            result.resolve(params.result);
        } else {
            result.reject(params.e);
        }
    }

    public async query<T>(command: Query | string): Promise<T> {

        return new Promise<T>(async (resolve, reject) => {
            let guid = Guid.guid();

            this._results.set(guid, {resolve, reject})

            await this._dispatcher.fireEventAsync(typeof command == "string" ? command : Classes.className(command.constructor), {
                guid,
                command
            })
        })
    }


    protected async _callHandler(define: Define, propertyKey: string, args: { guid: string, command: Command }) {

        try {
            let instance = this.injector.parent.get(define.id);

            let result = await instance[propertyKey](args.command);

            this._dispatcher.fireEvent(this.QueryResultSymbol, {guid: args.guid, result, status: true})

        } catch (e) {
            this._dispatcher.fireEvent(this.QueryResultSymbol, {guid: args.guid, result: null, status: false, e});
        }
    }

}
