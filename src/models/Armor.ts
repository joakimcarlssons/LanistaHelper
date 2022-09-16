import ObjectRequirement from "./ObjectRequirement";

export default class Armor {
    constructor(
        public id: number,
        public name: string,
        public type?: number,
        public weight?: number,
        public required_level?: number,
        public requirements?: ObjectRequirement[]
    ){}
}