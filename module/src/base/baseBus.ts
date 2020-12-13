import {define, singleton, inject, init, Define, Injector} from '@appolo/inject'
import {EventDispatcher, IEventOptions} from '@appolo/events'
import {App, Discovery} from '@appolo/engine'
import {Classes} from '@appolo/utils'
import {Command, ICommandCtr} from "../interfaces/ICommand";
import {Logger} from "@appolo/logger";
import {IHandlerMetadata, IHandlerMetaIndex} from "../interfaces/IHandlerMetadata";


export abstract class BaseBus {
    protected _dispatcher = new EventDispatcher();

    @inject() protected app: App;
    @inject() protected injector: Injector;
    @inject() protected discovery: Discovery;
    @inject() protected logger: Logger;

    protected abstract readonly Symbol: string

    @init()
    protected initialize() {

        this.discovery.getParent().findAllReflectData<IHandlerMetaIndex>(this.Symbol).forEach(item => {
            Object.values<IHandlerMetadata>(item.metaData).forEach(metaData => this._createHandler(item.fn, item.define, metaData));
        })
    }

    protected _createHandler(fn: Function, define: Define, metaData: IHandlerMetadata) {
        Object.values(metaData.events).forEach(event =>
            this.on(event.eventName, (command: Command) => this._callHandler(define, metaData.propertyKey, command), this,{await:true}));
    }

    protected async _callHandler(define: Define, propertyKey: string, command: Command) {

        try {
            let instance = this.injector.parent.get(define.id);

            await instance[propertyKey](command);

        } catch (e) {

            this.logger.error(`failed to call handler ${define.id} ${propertyKey}`, {err: e});

            throw e;
        }
    }

    protected on(command: Function | string, fn: (...args: any[]) => any, scope?: any, options?: IEventOptions): void {
        this._dispatcher.on(typeof command == "string" ? command : Classes.className(command), fn, this,{await:true,parallel:true})
    }




}
