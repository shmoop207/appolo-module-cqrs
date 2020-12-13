import {define, singleton, init, inject} from '@appolo/inject'
import {CommandsBus, EventsBus} from "../../../../index";
import {SomeCommand} from "../comands/someCommand";
import {QueryBus} from "../../../../module/src/query/queryBus";
import {SomeQuery} from "../query/someQuery";

@define()
@singleton()
export class Manager {

    @inject() private commandsBus: CommandsBus;
    @inject() private eventsBus: EventsBus;
    @inject() private queryBus: QueryBus;

    public commandHandled: string;
    public event1Handled: string;
    public event2Handled: string;
    public event3Handled: string;

    @init()
    private async init() {
        await this.commandsBus.execute(new SomeCommand("aa"))

    }

    public async getData() {
      let result =   await this.queryBus.query<string>(new SomeQuery())

        return result
    }
}
