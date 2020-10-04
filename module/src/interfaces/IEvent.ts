export abstract class Event {

}


export interface IEventCtr {
    new(...rest: any[]): Event
}
