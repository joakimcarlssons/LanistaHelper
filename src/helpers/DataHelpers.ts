import { Armor, Weapon } from "../data/Dtos/Dtos";
import { ArmorType, RequirementType } from "../data/Enums";
import Gladiator from "../models/Gladiator";

class DataHelpers {
    getRaceSweName(name: string) : string {
        switch (name) {
            case "HUMAN": return "Människa";
            case 'ELF': return 'Alv';
            case 'DWARF': return 'Dvärg';
            case 'ORC': return 'Ork';
            case 'TROLL': return 'Troll';
            case 'GOBLIN': return 'Goblin';
            case 'UNDEAD': return 'Odöd';
            default: return name;
        }
    }

    getWeaponTypeSweName(name: string) : string {
        switch (name) {
            case 'AXE': return 'Yxa';
            case 'SWORD': return 'Svärd';
            case 'MACE': return 'Hammare';
            case 'STAVE': return 'Stav';
            case 'SPEAR': return 'Spjut';
            case 'CHAIN': return 'Kätting';
            default: return name;
        }
    }

    applyCommonFilterRules<T extends Weapon | Armor>(data: T[], selectedGladiator: Gladiator) : T[] {
        let availableData : T[] = [];

        // Include data without requirements
        const nonReqData : T[] = data.filter(d => !d.requirements?.includes(d.requirements.filter(req => req.requirementable === RequirementType.Race)[0]));
        availableData = [...availableData, ...nonReqData];

        // Filter data for selected race
        const raceData = data.filter(d => d.requirements && 
            d.requirements.includes(d.requirements?.filter(req => req.race_name && req.race_name === selectedGladiator.Race?.swe_name?.toLowerCase())[0]));
        availableData = [...availableData, ...raceData];

        // Filter data for max level 25 (legendary tour)
        availableData = availableData.filter(d => (d.required_level || 0) <= 25);

        // Filter non legendary data
        availableData = availableData.filter(d => d.requires_legend === false);

        return availableData;
    }

    filterAvailableAttackWeapons(weapons: Weapon[], selectedGladiator: Gladiator) : Weapon[] {

        let availableWeapons : Weapon[] = [];

        // Apply common filters
        availableWeapons = this.applyCommonFilterRules(weapons, selectedGladiator);

        // Remove shields and range weapons
        availableWeapons = availableWeapons.filter(w => !w.is_shield || !w.is_ranged);
        
        return availableWeapons;
    }

    filterAvailableDefenceWeapons(weapons: Weapon[], selectedGladiator: Gladiator) : Weapon[] {

        let availableWeapons : Weapon[] = [];

        // Remove range weapons
        availableWeapons = availableWeapons.filter(w => !w.is_ranged);

        // Remove weapons that can't be wielded in shield arm
        availableWeapons = availableWeapons.filter(w => w.can_dual_wield);

        // But add shields
        availableWeapons = [...availableWeapons, ...weapons.filter(w => w.is_shield)]

        // Then apply common filters
        availableWeapons = this.applyCommonFilterRules(weapons, selectedGladiator);

        return availableWeapons;
    }

    filterAvailableRangeWeapons(weapons: Weapon[], selectedGladiator: Gladiator) : Weapon[] {

        let availableWeapons : Weapon[] = [];

        // Apply common filters
        availableWeapons = this.applyCommonFilterRules(weapons, selectedGladiator);

        // Filter range weapons
        availableWeapons = availableWeapons.filter(w => w.is_ranged);

        return availableWeapons;
    }

    filterAvailableArmor(armors: Armor[], armorType : ArmorType, selectedGladiator: Gladiator) : Armor[] {
        let availableArmors : Armor[] = [];

        // Apply common filter rules
        availableArmors = this.applyCommonFilterRules(armors, selectedGladiator);

        // Filter only selected armor type
        availableArmors = availableArmors.filter(a => a.type === armorType);

        return availableArmors;
    }
}

export default new DataHelpers();