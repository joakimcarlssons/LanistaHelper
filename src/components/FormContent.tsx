import React, { useState } from "react";
import PointForm from "./PointForm";
import SetUpForm from "./SetUpForm";
import Gladiator from '../models/Gladiator';
import { Race, Weapon, WeaponType, Armor, Consumable } from '../data/Dtos/Dtos';

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