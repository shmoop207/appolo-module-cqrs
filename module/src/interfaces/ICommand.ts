export abstract class Command {

}


export interface ICommandCtr {
    new(...rest: any[]): Command
}
