import axios from "../data/axios";
import { Generic, Race, Weapon, WeaponType, Armor, Consumable } from '../data/Dtos/Dtos';
import DataHelpers from '../helpers/DataHelpers';

class DataService {
    async getRaces() : Promise<Race[]> {

        const response = await axios.get<{ weapon_skills: Generic[], stats: Generic[], races: Race[] }>('/races');

        let races : Race[] = [];
        response.data.races.forEach(race => {
            race.bonuses.stats = race.bonuses.stats.map(stat => ({...stat, name: response.data.stats.find(s => s.type === stat.type)?.name || '' }));
            race.bonuses.weapon_skills = race.bonuses.weapon_skills.map(ws => ({...ws, name: response.data.weapon_skills.find(w => w.type === ws.type)?.name || '' }));
            race.swe_name = DataHelpers.getRaceSweName(race.name);
            races = [...races, race];
        });

        return races;
    }

    async getWeaponTypes() : Promise<WeaponType[]> {
        const response = (await axios.get<{ weapon_skills: Generic[], stats: Generic[], races: Race[] }>('/races')).data?.weapon_skills;
        return response.map(ws => {
            return ({...ws, swe_name: DataHelpers.getWeaponTypeSweName(ws.name)})
        });
    }

    async getAllWeapons() : Promise<Weapon[]> {
        const allWeapons = Object.entries<string>((await axios.get('/items/weapons/all')).data);
        
        let weapons : Weapon[] = [];
        allWeapons.forEach(weapon => {
            weapons = [...weapons, weapon[1] as Weapon];     
        });

        return weapons;
    }

    async getAllArmors() : Promise<Armor[]> {
        const allArmors = Object.entries<string>((await axios.get('/items/armors/all')).data);
        let armors : Armor[] = [];

        allArmors.forEach(armor => {
            armors = [...armors, armor[1] as Armor];     
        });

        return armors;
    }

    async getAllConsumables() : Promise<Consumable[]> {
        const allConsumables = Object.entries<string>((await axios.get('/items/consumables/all')).data);
        let consumables : Consumable[] = [];

        allConsumables.forEach(con => {
            consumables = [...consumables, con[1] as Consumable];
        });

        return consumables;
    }
}

export default new DataService();