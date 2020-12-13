import {Module, module, IModuleParams} from "@appolo/engine";
import {CommandsBus, EventsBus, IOptions} from "../index";
import {QueryBus} from "./src/query/queryBus";

@module()
export class CqrsModule extends Module<IOptions> {

    protected readonly Defaults: Partial<IOptions> = {
        commandsBusId: "commandsBus",
        eventsBusId: "eventsBus",
        queryBusId: "queryBus"
    };


    public static for(options: IOptions): IModuleParams {
        return {type: CqrsModule, options}
    }

    public get exports() {
        return [
            {id: this.moduleOptions.commandsBusId, type: CommandsBus},
            {id: this.moduleOptions.eventsBusId, type: EventsBus},
            {id: this.moduleOptions.queryBusId, type: QueryBus}
        ];
    }


}
