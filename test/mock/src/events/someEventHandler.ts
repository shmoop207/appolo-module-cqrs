import {define, singleton, inject} from '@appolo/inject'
import {command, event, query} from "../../../../index";
import {Manager} from "../manager/manager";
import {SomeEvent} from "./someEvent";
import {SomeEvent2} from "./someEvent2";
import {SomeEvent3} from "./someEvent3";
import {saga} from "../../../../module/src/decorators/decorators";

@define()
@singleton()
export class SomeEventHandler {

    @inject() manager: Manager;

    @event()
    private async handleSomeEvent(command: SomeEvent) {
        return this.manager.event1Handled = command.name
    }

    @event()
    private async handleSomeEvent2(command: SomeEvent2) {
        return this.manager.event2Handled = command.name
    }

    @event()
    private async handleSomeEvent3(command: SomeEvent3) {
        return this.manager.event3Handled = command.name
    }

    @saga([SomeEvent2, SomeEvent3])
    private async handleSomeSaga(event2: SomeEvent2, event3: SomeEvent3) {
        return this.manager.event3Handled = command.name
    }


}
