import IRace from "../interfaces/IRace";
import IStat from "../interfaces/IStat";

export default class Race implements IRace {
    constructor(
        public id: number,
        public name: string,
        public bonuses: { stats: IStat[], weapon_skills: IStat[] }
    ){}

    get swe_name() {
        switch (this.name) {
            case 'HUMAN': return 'Människa';
            case 'ELF': return 'Alv';
            case 'DWARF': return 'Dvärg';
            case 'ORC': return 'Ork';
            case 'TROLL': return 'Troll';
            case 'GOBLIN': return 'Goblin';
            case 'UNDEAD': return 'Odöd';
            default: return this.name;
        }
    }
}