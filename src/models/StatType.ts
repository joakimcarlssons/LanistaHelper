import IStat from "../interfaces/IStat";

export default class StatType implements IStat {
    constructor(
        public name: string,
        public type: number
    ){}
}