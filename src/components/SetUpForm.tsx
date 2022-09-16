import React, { useEffect, useState } from "react";
import InputSearch from "./InputSearch";
import DataHelpers from '../helpers/DataHelpers';
import { Race, Weapon, WeaponType, Armor, Consumable } from '../data/Dtos/Dtos';
import Gladiator from '../models/Gladiator';
import { ArmorType } from "../data/Enums";

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

class FilteredData {
    constructor(
        public AttackWeapons: Weapon[] = [],
        public DefenceWeapons: Weapon[] = [],
        public RangeWeapons: Weapon[] = [],
        public HeadArmors: Armor[] = [],
        public ShoulderArmors: Armor[] = [],
        public BodyArmors: Armor[] = [],
        public HandArmors: Armor[] = [],
        public LegArmors: Armor[] = [],
        public FeetArmors: Armor[] = [],
        public Cloaks: Armor[] = [],
        public Necklaces: Armor[] = [],
        public Rings: Armor[] = [],
        public Amulets: Armor[] = [],
        public Armbands: Armor[] = [],
        public Ornaments: Armor[] = [],
    ){}
}

const SetupForm: React.FC<ISetupForm> = (ISetupForm) => {
    const { 
        stage, setStage, races, weaponTypes, weapons,
        armors, selectedGladiator, handleGladiatorUpdate
    } = ISetupForm;
    
    const [isValid, setIsValid] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<FilteredData>(new FilteredData());

    useEffect(() => {

        setFilteredData({
            AttackWeapons: DataHelpers.filterAvailableAttackWeapons(weapons, selectedGladiator),
            DefenceWeapons: selectedGladiator.AttackWeapon?.is_two_handed ? [] : DataHelpers.filterAvailableDefenceWeapons(weapons, selectedGladiator),
            RangeWeapons: DataHelpers.filterAvailableRangeWeapons(weapons, selectedGladiator),
            HeadArmors: DataHelpers.filterAvailableArmor(armors, ArmorType.Head, selectedGladiator),
            ShoulderArmors: DataHelpers.filterAvailableArmor(armors, ArmorType.Shoulders, selectedGladiator),
            BodyArmors: DataHelpers.filterAvailableArmor(armors, ArmorType.Body, selectedGladiator),
            HandArmors: DataHelpers.filterAvailableArmor(armors, ArmorType.Hands, selectedGladiator),
            LegArmors: DataHelpers.filterAvailableArmor(armors, ArmorType.Legs, selectedGladiator),
            FeetArmors: DataHelpers.filterAvailableArmor(armors, ArmorType.Feet, selectedGladiator),
            Cloaks: DataHelpers.filterAvailableArmor(armors, ArmorType.Cloak, selectedGladiator),
            Necklaces: DataHelpers.filterAvailableArmor(armors, ArmorType.Necklace, selectedGladiator),
            Rings: DataHelpers.filterAvailableArmor(armors, ArmorType.Ring, selectedGladiator),
            Amulets: DataHelpers.filterAvailableArmor(armors, ArmorType.Amulet, selectedGladiator),
            Armbands: DataHelpers.filterAvailableArmor(armors, ArmorType.Armband, selectedGladiator),
            Ornaments: DataHelpers.filterAvailableArmor(armors, ArmorType.Ornament, selectedGladiator),
        })

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
                    value={selectedGladiator.Race?.swe_name || ""}
                    onChange={e => {
                        e.preventDefault();
                        handleGladiatorUpdate(races.find(r => r.swe_name === e.target.value), "Race");
                    }}
                >
                    <option disabled value="">Välj din ras...</option>
                    {races.map((race, index) => {
                        return <option key={index} value={race.swe_name}>{race.swe_name}</option>
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
                    data={filteredData.AttackWeapons}
                    displayProperty="name"
                    selectedData={selectedGladiator.AttackWeapon}
                    propertyName="AttackWeapon"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            {!selectedGladiator.AttackWeapon?.is_two_handed && <span>
                <label htmlFor="defence_hand">Sköldhand:</label>
                <InputSearch 
                    input_id="defence_hand"
                    placeholderText="Sök efter vapen..."
                    data={filteredData.DefenceWeapons}
                    displayProperty="name"
                    selectedData={selectedGladiator.DefenceWeapon}
                    propertyName="DefenceWeapon"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>             
            }

            <span>
                <label htmlFor="distance_hand">Distansvapen:</label>
                <InputSearch 
                    input_id="distance_hand"
                    placeholderText="Sök efter vapen..."
                    data={filteredData.RangeWeapons}
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
                    data={filteredData.HeadArmors}
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
                    data={filteredData.ShoulderArmors}
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
                    data={filteredData.BodyArmors}
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
                    data={filteredData.HandArmors}
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
                    data={filteredData.LegArmors}
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
                    data={filteredData.FeetArmors}
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
                    data={filteredData.Cloaks}
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
                    data={filteredData.Necklaces}
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
                    data={filteredData.Rings}
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
                    data={filteredData.Amulets}
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
                    data={filteredData.Armbands}
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
                    data={filteredData.Ornaments}
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