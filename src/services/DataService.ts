import { parse } from "path";
import axios from "../data/axios";
import * as DT from '../data/DataTypes';
import Armor from "../models/Armor";
import Consumable from "../models/Consumable";
import Race from "../models/Race";
import Weapon from "../models/Weapon";
import WeaponType from "../models/WeaponType";

class DataService {
    async getRaces() : Promise<Race[]> {

        const response = await axios.get<DT.IRaceData>('/races');

        let races : Race[] = [];
        response.data.races.forEach(race => {
            let newRace = new Race(race.id, race.name,race.bonuses);
            newRace.bonuses.stats = newRace.bonuses.stats.map(stat => ({
                ...stat,
                name: response.data.stats.find(s => s.type === stat.type)?.name || ''
            }));
            newRace.bonuses.weapon_skills = newRace.bonuses.weapon_skills.map(ws => ({
                ...ws,
                name: response.data.weapon_skills.find(w => w.type === ws.type)?.name || ''
            }));
            races = [...races, newRace];
        });

        return races;
    }

    async getWeaponTypes() : Promise<WeaponType[]> {
        const response = (await axios.get<DT.IRaceData>('/races')).data.weapon_skills;
        let weaponTypes : WeaponType[] = [];

        response.forEach(ws => {
            weaponTypes = [...weaponTypes, new WeaponType(ws.name, ws.type)]
        });

        return weaponTypes;
    }

    async getAllWeapons() : Promise<Weapon[]> {
        const allWeapons = Object.entries<string>((await axios.get('/items/weapon/all')).data);
        let weapons : Weapon[] = [];

        allWeapons.forEach(weapon => {
            weapons = [...weapons, new Weapon(parseInt(weapon[0]), weapon[1])];     
        });

        return weapons;
    }

    async getSingleWeapon(chosenWeapon: Weapon) : Promise<Weapon> {
        const weapon = (await axios.get(`/items/weapon/${chosenWeapon.id}`)).data;
        return weapon;
    }

    async getAllArmors() : Promise<Armor[]> {
        const allArmors = Object.entries<string>((await axios.get('/items/armor/all')).data);
        let armors : Armor[] = [];

        allArmors.forEach(armor => {
            armors = [...armors, new Weapon(parseInt(armor[0]), armor[1])];     
        });

        return armors;
    }

    async getSingleArmor(chosenArmor: Armor) : Promise<Armor> {
        const armor = (await axios.get(`/items/armor/${chosenArmor.id}`)).data;
        return armor;
    }

    async getAllConsumables() : Promise<Consumable[]> {
        const allConsumables = Object.entries<string>((await axios.get('/items/consumables/all')).data);
        let consumables : Consumable[] = [];

        allConsumables.forEach(con => {
            consumables = [...consumables, new Consumable(parseInt(con[0]), con[1])];
        });

        return consumables;
    }

    async getSingleConsumable(chosenConsumable: Consumable) : Promise<Consumable | null>{
        if (!chosenConsumable?.id) return null;
        const consumable = (await axios.get(`/items/consumables/${chosenConsumable.id}`)).data;
        return consumable;
    }
}

export default new DataService();