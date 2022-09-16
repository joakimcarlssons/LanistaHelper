import React, { useState } from "react";
import Armor from "../models/Armor";
import Race from "../models/Race";
import Weapon from "../models/Weapon";
import WeaponType from "../models/WeaponType";
import PointForm from "./PointForm";
import SetUpForm from "./SetUpForm";
import Gladiator from '../models/Gladiator';
import Consumable from "../models/Consumable";
import DataService from '../services/DataService';

interface IFormContent {
    stage: number
    setStage : React.Dispatch<React.SetStateAction<number>>
    races: Race[]
    weaponTypes: WeaponType[]
    weapons: Weapon[]
    armors: Armor[]
    consumables: Consumable[]
}

const FormContent : React.FC<IFormContent> = (IFormContent) => {
    const {
        stage, setStage, races, weaponTypes, weapons, armors, consumables
    } = IFormContent;

    const [selectedGladiator, setSelectedGladiator] = useState<Gladiator>(new Gladiator());

    const handleGladiatorUpdate = async (data: any, propertyName: string) => {
        switch (propertyName) {
            case "AttackWeapon":
            case "DefenceWeapon":
            case "RangeWeapon":
                data = await DataService.getSingleWeapon(data);
                break;
            case "Drink1":
            case "Drink2":
            case "Drink3":
                data = await DataService.getSingleConsumable(data);
                break;
            case "HeadArmor":
            case "ShoulderArmor":
            case "BodyArmor":
            case "HandsArmor":
            case "LegArmor":
            case "FeetArmor":
            case "Cloak":
            case "Necklace":
            case "Ring":
            case "Amulet":
            case "Armband":
            case "Ornament":
                data = await DataService.getSingleArmor(data);    
                break;
            default:
                break;   
        }

        setSelectedGladiator(curr => ({...curr, [propertyName]:data}));
    }

    switch (IFormContent.stage) {
        case 1:
            return <SetUpForm
                stage={stage ?? 1}
                setStage={setStage}
                races={races}
                weaponTypes={weaponTypes}
                weapons={weapons}
                armors={armors}
                selectedGladiator={selectedGladiator}
                handleGladiatorUpdate={handleGladiatorUpdate}
            />
        case 2:
            return <PointForm
                setStage={setStage}
                selectedGladiator={selectedGladiator}
                consumables={consumables}
                handleGladiatorUpdate={handleGladiatorUpdate}
            />
        default:
            return <p>Loading...</p>
    }
}

export default FormContent;