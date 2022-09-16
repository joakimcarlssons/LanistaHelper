import ObjectBonus from "./ObjectBonus";

export default class Consumable {
    constructor(
        public id: number,
        public name: string,
        public bonuses?: ObjectBonus[]
    ){}
}