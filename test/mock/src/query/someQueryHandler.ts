import {define, singleton, initMethod, inject} from '@appolo/inject'
import {command, event, query} from "../../../../index";
import {Manager} from "../manager/manager";
import {SomeQuery} from "./someQuery";

@define()
@singleton()
export class SomeQueryHandler {

    @inject() manager: Manager;

    @query()
    private async handleSomeEvent(command: SomeQuery) {
        return this.manager.commandHandled+this.manager.event1Handled+this.manager.event2Handled+this.manager.event3Handled
    }


}
