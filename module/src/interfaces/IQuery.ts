export abstract class Query {

}


export interface IQueryCtr {
    new(...rest: any[]): Query
}
