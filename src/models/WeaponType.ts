import IStat from "../interfaces/IStat";

export default class WeaponType implements IStat {
    constructor(
        public name: string,
        public type: number,
        public value?: number
    ){}

    get swe_name() {
        switch (this.name) {
            case 'AXE': return 'Yxa';
            case 'SWORD': return 'Svärd';
            case 'MACE': return 'Hammare';
            case 'STAVE': return 'Stav';
            case 'SPEAR': return 'Spjut';
            case 'CHAIN': return 'Kätting';
            default: return this.name;
        }
    }
}