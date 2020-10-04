import {define, singleton, inject, initMethod, Define, Injector} from '@appolo/inject'
import {CommandHandlerSymbol} from "../decorators/decorators";
import {BaseBus} from "../base/baseBus";
import {Command, ICommandCtr} from "../interfaces/ICommand";
import {Classes} from "@appolo/utils/index";
import {IEventOptions} from "@appolo/events/index";

@define()
@singleton()
export class CommandsBus extends BaseBus {


    protected readonly Symbol = CommandHandlerSymbol

    public execute(command: Command | string): Promise<void> {
        return this._dispatcher.fireEventAsync(typeof command == "string" ? command : Classes.className(command.constructor), command)
    }
    public on(command: ICommandCtr | string, fn: (...args: any[]) => any, scope?: any, options?: IEventOptions): void {
        super.on(command, fn, this);
    }

}
