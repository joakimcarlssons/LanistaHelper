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
                    className="initSelect"
                    required
                    id="race_type"
                    name="race_type_list"
                    value={selectedGladiator.Race?.swe_name || ""}
                    onChange={e => {
                        e.preventDefault();
                        handleGladiatorUpdate(races.find(r => r.swe_name === e.target.value), "Race");
                    }}
                >
                    <option disabled value="">V??lj din ras...</option>
                    {races.map((race, index) => {
                        return <option key={index} value={race.swe_name}>{race.swe_name}</option>
                    })};
                </select>
            </span>

            <span>
                <label htmlFor="weapon_type">Vapentyp:</label>
                <select
                    className="initSelect"
                    required
                    id="weapon_type"
                    name="weapon_type_list"
                    value={selectedGladiator.WeaponType?.swe_name || ""}
                    onChange={e => {
                        e.preventDefault();
                        handleGladiatorUpdate(weaponTypes.find(wt => wt.swe_name === e.target.value), "WeaponType");
                    }}
                >
                    <option disabled value="">V??lj vapentyp...</option>
                    {weaponTypes.map((wt, index) => {
                        return wt.name === "SHIELD" ? null : <option key={index} value={wt.swe_name}>{wt.swe_name}</option>
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
                    placeholderText="S??k efter vapen..."
                    data={filteredData.AttackWeapons.filter(w => w.type === selectedGladiator.WeaponType?.type)}
                    displayProperty="name"
                    selectedData={selectedGladiator.AttackWeapon}
                    propertyName="AttackWeapon"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            {!selectedGladiator.AttackWeapon?.is_two_handed && <span>
                <label htmlFor="defence_hand">Sk??ldhand:</label>
                <InputSearch 
                    input_id="defence_hand"
                    placeholderText="S??k efter vapen..."
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
                    placeholderText="S??k efter vapen..."
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
                    placeholderText="S??k efter rustning..."
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
                    placeholderText="S??k efter rustning..."
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
                    placeholderText="S??k efter rustning..."
                    data={filteredData.BodyArmors}
                    displayProperty="name"
                    selectedData={selectedGladiator.BodyArmor}
                    propertyName="BodyArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="armor_hands">H??nder:</label>
                <InputSearch 
                    input_id="armor_hands"
                    placeholderText="S??k efter rustning..."
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
                    placeholderText="S??k efter rustning..."
                    data={filteredData.LegArmors}
                    displayProperty="name"
                    selectedData={selectedGladiator.LegArmor}
                    propertyName="LegArmor"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <label htmlFor="armor_feet">F??tter:</label>
                <InputSearch 
                    input_id="armor_feet"
                    placeholderText="S??k efter rustning..."
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
                    placeholderText="S??k efter f??rem??l..."
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
                    placeholderText="S??k efter f??rem??l..."
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
                    placeholderText="S??k efter f??rem??l..."
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
                    placeholderText="S??k efter f??rem??l..."
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
                    placeholderText="S??k efter f??rem??l..."
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
                    placeholderText="S??k efter f??rem??l..."
                    data={filteredData.Ornaments}
                    displayProperty="name"
                    selectedData={selectedGladiator.Ornament}
                    propertyName="Ornament"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
        </section>

        <span className="divider" />

        <button type="submit" onClick={e => handleSubmit(e)}>G?? vidare</button>
        </form>
    </>
}

export default SetupForm;