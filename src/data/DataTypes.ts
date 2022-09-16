import IRace from "../interfaces/IRace";
import IStat from "../interfaces/IStat";

export interface IRaceData {
    weapon_skills: IStat[],
    stats: IStat[],
    races: IRace[]
}