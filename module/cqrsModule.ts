import {Module, module, IModuleParams, IModuleOptions, Discovery} from "@appolo/engine";
import {inject} from "@appolo/inject";
import {Reflector} from "@appolo/utils";
import {CommandsBus, EventsBus, IOptions} from "../index";
import {CommandHandlerSymbol} from "./src/decorators/decorators";
import {IHandlerMetadata} from "./src/interfaces/IHandlerMetadata";
import {QueryBus} from "./src/query/queryBus";

@module()
export class CqrsModule extends Module<IOptions> {

    protected readonly Defaults: Partial<IOptions> = {
        commandsBusId: "commandsBus",
        eventsBusId: "eventsBus",
        queryBusId: "queryBus"
    };


    public static for(options: IOptions, moduleOptions: IModuleOptions = {}): IModuleParams {
        return {module: CqrsModule, options, moduleOptions}
    }

    public get exports() {
        return [
            {id: this.moduleOptions.commandsBusId, type: CommandsBus},
            {id: this.moduleOptions.eventsBusId, type: EventsBus},
            {id: this.moduleOptions.queryBusId, type: QueryBus}
        ];
    }


}
