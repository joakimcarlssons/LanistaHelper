import React, { useEffect, useState } from "react"
import Armor from "../models/Armor"
import Gladiator from "../models/Gladiator"
import Race from "../models/Race"
import Weapon from "../models/Weapon"
import WeaponType from "../models/WeaponType"
import InputSearch from "./InputSearch"

interface ISetupForm {
    stage: number
    setStage: React.Dispatch<React.SetStateAction<number>>
    races: Race[]
    weaponTypes: WeaponType[]
    weapons: Weapon[]
    armors: Armor[],
    selectedGladiator : Gladiator,
    handleGladiatorUpdate: (data: any, propertyName: string) => void;
}

const SetupForm: React.FC<ISetupForm> = (ISetupForm) => {
    const { 
        stage, setStage, races, weaponTypes, weapons,
        armors, selectedGladiator, handleGladiatorUpdate
    } = ISetupForm;
    
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        // Validate
        setIsValid(true);
    }, [selectedGladiator])

    const handleSubmit = (e : React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (document.activeElement === e.target && isValid) setStage(prevStage => prevStage + 1);
    }

    return <>
        <form onSubmit={e => e.preventDefault()}>
        <section className="initInfo">
            <span>
                <label htmlFor="race_type">Ras:</label>
                <select
                    required
                    id="race_type"
                    name="race_type_list"
                    value={selectedGladiator.Race?.swe_name}
                    onChange={e => {
                        e.preventDefault();
                        handleGladiatorUpdate(races.find(r => r.swe_name === e.target.value), "Race");
                    }}
                    defaultValue=""
                >
                    <option disabled value="">Välj din ras...</option>
                    {races.map((race, index) => {
                        return <option key={index}>{race.swe_name}</option>
                    })};
                </select>
            </span>
        </section>
    
        <span className="divider" />

        <section className="weapons">
            <span>
                <label htmlFor="weapon_hand">Vapenhand:</label>
                <InputSearch 
                    input_id="weapon_hand"
                    placeholderText="Sök efter vapen..."
                    data={weapons}
                    displayProperty="name"
                    selectedData={selectedGladiator.AttackWeapon}
                    propertyName="AttackWeapon"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="defence_hand">Sköldhand:</label>
                <InputSearch 
                    input_id="defence_hand"
                    placeholderText="Sök efter vapen..."
                    data={weapons}
                    displayProperty="name"
                    selectedData={selectedGladiator.DefenceWeapon}
                    propertyName="DefenceWeapon"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="distance_hand">Distansvapen:</label>
                <InputSearch 
                    input_id="distance_hand"
                    placeholderText="Sök efter vapen..."
                    data={weapons}
                    displayProperty="name"
                    selectedData={selectedGladiator.RangeWeapon}
                    propertyName="RangeWeapon"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
        </section>
        <section className="armor">
            <span>
                <label htmlFor="armor_head">Huvud:</label>
                <InputSearch 
                    input_id="armor_head"
                    placeholderText="Sök efter rustning..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.HeadArmor}
                    propertyName="HeadArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="armor_shoulder">Axlar:</label>
                <InputSearch 
                    input_id="armor_shoulder"
                    placeholderText="Sök efter rustning..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.ShoulderArmor}
                    propertyName="ShoulderArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="armor_body">Harnesk:</label>
                <InputSearch 
                    input_id="armor_body"
                    placeholderText="Sök efter rustning..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.BodyArmor}
                    propertyName="BodyArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="armor_hands">Händer:</label>
                <InputSearch 
                    input_id="armor_hands"
                    placeholderText="Sök efter rustning..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.HandsArmor}
                    propertyName="HandsArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="armor_legs">Ben:</label>
                <InputSearch 
                    input_id="armor_legs"
                    placeholderText="Sök efter rustning..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.LegArmor}
                    propertyName="LegArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="armor_feet">Fötter:</label>
                <InputSearch 
                    input_id="armor_feet"
                    placeholderText="Sök efter rustning..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.FeetArmor}
                    propertyName="FeetArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
        </section>
        <section className="materials">
            <span>
                <label htmlFor="materials_cloak">Mantel:</label>
                <InputSearch 
                    input_id="materials_cloak"
                    placeholderText="Sök efter föremål..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.Cloak}
                    propertyName="Cloak"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="materials_necklace">Halsband:</label>
                <InputSearch 
                    input_id="materials_necklace"
                    placeholderText="Sök efter föremål..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.Necklace}
                    propertyName="Necklace"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="materials_ring">Ring:</label>
                <InputSearch 
                    input_id="materials_ring"
                    placeholderText="Sök efter föremål..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.Ring}
                    propertyName="Ring"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="materials_amulet">Amulett:</label>
                <InputSearch 
                    input_id="materials_amulet"
                    placeholderText="Sök efter föremål..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.Amulet}
                    propertyName="Amulet"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="materials_armband">Armband:</label>
                <InputSearch 
                    input_id="materials_armband"
                    placeholderText="Sök efter föremål..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.Armband}
                    propertyName="Armband"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="materials_ornament">Ornament:</label>
                <InputSearch 
                    input_id="materials_ornament"
                    placeholderText="Sök efter föremål..."
                    data={armors}
                    displayProperty="name"
                    selectedData={selectedGladiator.Ornament}
                    propertyName="Ornament"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
        </section>

        <span className="divider" />

        <button type="submit" onClick={e => handleSubmit(e)}>Gå vidare</button>
        </form>
    </>
}

export default SetupForm;