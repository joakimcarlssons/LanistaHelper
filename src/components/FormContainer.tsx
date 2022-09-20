import React, { useEffect, useState } from "react";
import FormContent from "./FormContent";
import DataService from '../services/DataService';
import { Race, Weapon, WeaponType, Armor, Consumable } from '../data/Dtos/Dtos';

const FormContainer = () => {
    const [stage, setStage] = useState(0);
    const [races, setRaces] = useState<Race[]>([]);
    const [weaponTypes, setweaponTypes] = useState<WeaponType[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [armors, setArmors] = useState<Armor[]>([]);
    const [consumables, setConsumables] = useState<Consumable[]>([]);

    useEffect(() => {
        if (races.length <= 0) DataService.getRaces().then(res => setRaces(res));
        if (weaponTypes.length <= 0) DataService.getWeaponTypes().then(res => setweaponTypes(res));
        if (weapons.length <= 0) DataService.getAllWeapons().then(res => setWeapons(res));
        if (armors.length <= 0) DataService.getAllArmors().then(res => setArmors(res));
        if (consumables.length <= 0) DataService.getAllConsumables().then(res => setConsumables(res));
        setStage(1);
    }, []);

    return (
        <section className="FormContainer">
            <FormContent
                stage={stage}
                setStage={setStage}
                races={races}
                weaponTypes={weaponTypes}
                weapons={weapons}
                armors={armors}
                consumables={consumables}
            />
        </section>
    );
}

export default FormContainer;