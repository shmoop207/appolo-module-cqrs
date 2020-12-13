import {define, singleton, init, inject} from '@appolo/inject'
import {command, EventsBus} from "../../../../index";
import {SomeCommand} from "./someCommand";
import {Manager} from "../manager/manager";
import {SomeEvent} from "../events/someEvent";
import {SomeEvent3} from "../events/someEvent3";
import {SomeEvent2} from "../events/someEvent2";

@define()
@singleton()
export class SomeHandler {

    @inject() manager: Manager;
    @inject() eventsBus: EventsBus;

    @command()
    private async handleSomeCommand(command: SomeCommand) {
        this.manager.commandHandled = command.name;

        await Promise.all([this.eventsBus.publish(new SomeEvent("bb")),
            this.eventsBus.publish(new SomeEvent2("cc")),
            this.eventsBus.publish(new SomeEvent3("dd"))]);
    }
}
