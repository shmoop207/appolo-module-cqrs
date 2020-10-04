import {define, singleton, inject, initMethod, Define, Injector} from '@appolo/inject'
import {EventDispatcher, IEventOptions} from '@appolo/events'
import {App, Discovery} from '@appolo/engine'
import {Classes} from '@appolo/utils'
import {Command, ICommandCtr} from "../interfaces/ICommand";
import {CommandHandlerSymbol, EventSymbol} from "../decorators/decorators";
import {IHandlerMetadata, IHandlerMetaIndex} from "../interfaces/IHandlerMetadata";
import {BaseBus} from "../base/baseBus";
import {Event, IEventCtr} from "../interfaces/IEvent";

@define()
@singleton()
export class EventsBus extends BaseBus {

    protected readonly Symbol = EventSymbol;

    public publish(command: Event | string): Promise<void> {
        return this._dispatcher.fireEventAsync(typeof command == "string" ? command : Classes.className(command.constructor), command)
    }

    public on(event: IEventCtr | string, fn: (...args: any[]) => any, scope?: any, options?: IEventOptions): void {
        super.on(event, fn, this)
    }

}
