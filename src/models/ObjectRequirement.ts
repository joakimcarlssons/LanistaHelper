export default class ObjectRequirement {
    constructor(
        public id: number,
        public requirement_text: string,
        public requirement_value: string,
        public requirement_type: string,
        public requirementable: string,
        public race_name?: string,
    ){}
}