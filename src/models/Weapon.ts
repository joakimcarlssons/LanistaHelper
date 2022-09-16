import ObjectRequirement from "./ObjectRequirement";

export default class Weapon {
    constructor(
        public id: number,
        public name: string,
        public type?: number,
        public type_name?: string,
        public weight?: number,
        public is_two_handed?: boolean,
        public is_shield?: boolean,
        public requirements?: ObjectRequirement[]
    ){}
}