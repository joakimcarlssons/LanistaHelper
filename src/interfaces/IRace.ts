import IStat from "./IStat";

export default interface IRace {
    name: string,
    id: number,
    bonuses: { stats: IStat[], weapon_skills: IStat[] }
}