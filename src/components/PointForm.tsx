import React, { useEffect, useState } from "react";
import Gladiator from "../models/Gladiator";
import InputSearch from '../components/InputSearch';
import '../styles/PointForm.css'
import Consumable from "../models/Consumable";
import { BonusType } from '../data/Enums';
import ObjectBonus from '../models/ObjectBonus'

interface IPointForm {
    setStage: React.Dispatch<React.SetStateAction<number>>
    selectedGladiator : Gladiator
    handleGladiatorUpdate: (data: any, propertyName: string) => void;
    consumables: Consumable[]
}

class BonusPoint {
    constructor(
        public Health: number = 0,
        public Strength: number = 0,
        public Endurance: number = 0,
        public Initiative: number = 0,
        public Dodge: number = 0,
        public WeaponSkill: number = 0,
    ){}
}

const PointForm: React.FC<IPointForm> = (IPointForm) => {
    const { setStage, selectedGladiator, handleGladiatorUpdate, consumables } = IPointForm;

    const [excludeRaceBonus, setExcludeRaceBonus] = useState<boolean>(false);
    const [excludeEquipmentBonus, setExcludeEquipmentBonus] = useState<boolean>(false);
    const [excludeDrinkBonus, setExcludeDrinkBonus] = useState<boolean>(false);

    const maxPoints = 150 + (24 * 20);
    const totalSetPoints = +selectedGladiator.Health + +selectedGladiator.Strength + +selectedGladiator.Endurance + +selectedGladiator.Initiative + +selectedGladiator.Dodge + +selectedGladiator.WeaponSkill;
    
    const weaponType = selectedGladiator.AttackWeapon?.type_name?.toUpperCase();
    const selectedWeaponTypeAsBonus = weaponType === "AXE" ? BonusType.Axe
        : weaponType === "SPEAR" ? BonusType.Spear
        : weaponType === "HAMMER" ? BonusType.Hammer
        : weaponType === "STAVE" ? BonusType.Stave
        : weaponType === "CHAIN" ? BonusType.Chain
        : BonusType.Sword;

    const [raceBonusPoints, setRaceBonusPoints] = useState<BonusPoint>(new BonusPoint());
    const [equipmentBonusPoints, setEquipmentBonusPoints] = useState<BonusPoint>(new BonusPoint());
    const [drink1BonusPoints, setDrink1BonusPoints] = useState<BonusPoint>(new BonusPoint());
    const [drink2BonusPoints, setDrink2BonusPoints] = useState<BonusPoint>(new BonusPoint());
    const [drink3BonusPoints, setDrink3BonusPoints] = useState<BonusPoint>(new BonusPoint());
    const drinkBonusPoints : BonusPoint = new BonusPoint(
        parseFloat((+drink1BonusPoints.Health + +drink2BonusPoints.Health + +drink3BonusPoints.Health).toFixed(2)),
        parseFloat((+drink1BonusPoints.Strength + +drink2BonusPoints.Strength + +drink3BonusPoints.Strength).toFixed(2)),
        parseFloat((+drink1BonusPoints.Endurance + +drink2BonusPoints.Endurance + +drink3BonusPoints.Endurance).toFixed(2)),
        parseFloat((+drink1BonusPoints.Initiative + +drink2BonusPoints.Initiative + +drink3BonusPoints.Initiative).toFixed(2)),
        parseFloat((drink1BonusPoints.Dodge + drink2BonusPoints.Dodge + drink3BonusPoints.Dodge).toFixed(2)),
        parseFloat((+drink1BonusPoints.WeaponSkill + +drink2BonusPoints.WeaponSkill + +drink3BonusPoints.WeaponSkill).toFixed(2))
    )

    const calculateTotalPoints = (placedPoints: number, raceBonusPoints: number, equipmentBonusPoints: number, drinkBonusPoints: number) : number => {
        return +placedPoints + (excludeRaceBonus ? 0 : +raceBonusPoints) + (excludeEquipmentBonus ? 0 : +equipmentBonusPoints) + (excludeDrinkBonus ? 0 : +drinkBonusPoints)
    }

    const totalHealthPoints = calculateTotalPoints(+selectedGladiator.Health, raceBonusPoints.Health, equipmentBonusPoints.Health, drinkBonusPoints.Health)
    const totalStrengthPoints = calculateTotalPoints(+selectedGladiator.Strength, raceBonusPoints.Strength, equipmentBonusPoints.Strength, drinkBonusPoints.Strength)
    const totalEndurancePoints = calculateTotalPoints(+selectedGladiator.Endurance, raceBonusPoints.Endurance, equipmentBonusPoints.Endurance, drinkBonusPoints.Endurance)
    const totalInitiativePoints = calculateTotalPoints(+selectedGladiator.Initiative, raceBonusPoints.Initiative, equipmentBonusPoints.Initiative, drinkBonusPoints.Initiative)
    const totalDodgePoints = calculateTotalPoints(+selectedGladiator.Dodge, raceBonusPoints.Dodge, equipmentBonusPoints.Dodge, drinkBonusPoints.Dodge)
    const totalWeaponSkillPoints = calculateTotalPoints(+selectedGladiator.WeaponSkill, raceBonusPoints.WeaponSkill, equipmentBonusPoints.WeaponSkill, drinkBonusPoints.WeaponSkill)

    const handlePointUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        handleGladiatorUpdate(e.target.value, e.target.name);
    }

    const calculatePercentageValue = (value: number) => Math.floor(parseFloat((value - 1).toFixed(2)) * 100);
    const getPropertyNameFromBonusName = (bonusName: string) : string => {
        switch (bonusName) {
            case "Bashälsa": return "Health";
            case "Styrka": return "Strength";
            case "Uthållighet": return "Endurance";
            case "Initiativstyrka": return "Initiative";
            case "Undvika anfall": return "Dodge";
            case "vapenfärdigheten yxor":
            case "vapenfärdigheten stickvapen":
            case "vapenfärdigheten hammare":
            case "vapenfärdigheten stavar":
            case "vapenfärdigheten kätting":
            case "vapenfärdigheten svärd":
            case "vapenfärdigheten sköldar":
                return "WeaponSkill";
            default: return "";
        }
    }
    const getEquipmentBonusValues = (bonusType: BonusType) : number => {
        
        let value = 0;
        (Object.keys(selectedGladiator)).forEach(prop => {
            switch (prop) {
                case "Race":
                case "Health":
                case "Strength":
                case "Endurance":
                case "Initiative":
                case "Dodge":
                case "WeaponSkill":
                    break;
                default:
                    if (selectedGladiator[prop]?.bonuses) {
                        const selectedBonuses : number[] = 
                            selectedGladiator[prop]?.bonuses?.filter((bonus : ObjectBonus) => bonus?.bonusable_name === bonusType)
                                .map((bonus : ObjectBonus) => 
                                    bonus.bonus_value_display.slice(-1) === '%'
                                    ? selectedGladiator[getPropertyNameFromBonusName(bonus.bonusable_name)] * (parseInt(bonus.bonus_value_display.slice(0, -1)) / 100)
                                    : parseInt(bonus.bonus_value_display));            
                        value = value + selectedBonuses.reduce((sum, val) => sum + val, 0);
                    }
            }
        })

        return value;
    }

    const calculateDrinkBonusValue = (bonus : ObjectBonus, propertyName: string) : number => {
        const bonusValue = bonus.bonus_value_display.slice(-1) === '%' ? 
            selectedGladiator[propertyName] * (parseInt(bonus.bonus_value_display.slice(0, -1)) / 100) 
            : parseInt(bonus.bonus_value_display);
        return bonusValue;
    }
    const setDrinkBonuses = (drink: Consumable | null, setDrinkBonusPoints : React.Dispatch<React.SetStateAction<BonusPoint>>) => {
        if (!drink?.bonuses) {
            setDrinkBonusPoints(new BonusPoint());
            return;
        }
        drink.bonuses.forEach(bonus => {
            switch (bonus.bonusable_name) {
                case BonusType.Health:
                    setDrinkBonusPoints(prev => ({...prev, ["Health"]: calculateDrinkBonusValue(bonus, "Health")}))
                    break;
                case BonusType.Strength:
                    setDrinkBonusPoints(prev => ({...prev, ["Strength"]: calculateDrinkBonusValue(bonus, "Strength")}))
                    break;
                case BonusType.Endurance:
                    setDrinkBonusPoints(prev => ({...prev, ["Endurance"]: calculateDrinkBonusValue(bonus, "Endurance")}))
                    break;
                case BonusType.Initative:
                    setDrinkBonusPoints(prev => ({...prev, ["Initiative"]: calculateDrinkBonusValue(bonus, "Initiative")}))
                    break;
                case BonusType.Dodge:
                    setDrinkBonusPoints(prev => ({...prev, ["Dodge"]: calculateDrinkBonusValue(bonus, "Dodge")}))
                    break;
                case selectedWeaponTypeAsBonus:
                    if (bonus.id === 252) break; // This is a id which gives plus to axes when it shouldn't
                    setDrinkBonusPoints(prev => ({...prev, ["WeaponSkill"]: calculateDrinkBonusValue(bonus, "WeaponSkill")}))
                    break;
            }
        });
    }

    useEffect(() => {

        const weaponType = selectedGladiator.AttackWeapon?.type_name?.toUpperCase();

    }, []);

    useEffect(() => {
        setRaceBonusPoints({
            Health: parseFloat(((selectedGladiator.Health * (selectedGladiator.Race?.bonuses.stats.find(s => s.name === 'STAMINA')?.value || 0)) - selectedGladiator.Health).toFixed(2)),
            Strength: parseFloat(((selectedGladiator.Strength * (selectedGladiator.Race?.bonuses.stats.find(s => s.name === 'STRENGTH')?.value || 0)) - selectedGladiator.Strength).toFixed(2)),
            Endurance: parseFloat(((selectedGladiator.Endurance * (selectedGladiator.Race?.bonuses.stats.find(s => s.name === 'ENDURANCE')?.value || 0)) - selectedGladiator.Endurance).toFixed(2)),
            Initiative: parseFloat(((selectedGladiator.Initiative * (selectedGladiator.Race?.bonuses.stats.find(s => s.name === 'INITIATIVE')?.value || 0)) - selectedGladiator.Initiative).toFixed(2)),
            Dodge: parseFloat(((selectedGladiator.Dodge * (selectedGladiator.Race?.bonuses.stats.find(s => s.name === 'DODGE')?.value || 0)) - selectedGladiator.Dodge).toFixed(2)),
            WeaponSkill: parseFloat(((selectedGladiator.WeaponSkill * (selectedGladiator.Race?.bonuses.weapon_skills.find(ws => ws.name === weaponType)?.value || 0)) - selectedGladiator.WeaponSkill).toFixed(2)),
        });

        setEquipmentBonusPoints({
            Health: getEquipmentBonusValues(BonusType.Health),
            Strength: getEquipmentBonusValues(BonusType.Strength),
            Endurance: getEquipmentBonusValues(BonusType.Endurance),
            Initiative: getEquipmentBonusValues(BonusType.Initative),
            Dodge: getEquipmentBonusValues(BonusType.Dodge),
            WeaponSkill: getEquipmentBonusValues(selectedWeaponTypeAsBonus),
        });

        setDrinkBonuses(selectedGladiator.Drink1 || null, setDrink1BonusPoints);
        setDrinkBonuses(selectedGladiator.Drink2 || null, setDrink2BonusPoints);
        setDrinkBonuses(selectedGladiator.Drink3 || null, setDrink3BonusPoints);
    }, [selectedGladiator])

    return <div className="PointForm">
        <button className="goBack" onClick={() => setStage(1)}>Gå tillbaka</button>

        <h3 style={{
            color: totalSetPoints > maxPoints ? "var(--color-darkred)" : "var(--color-black)"
        }}>Du har lagt ut: {totalSetPoints} / {maxPoints} poäng</h3>

        <div className="PointForm_Table">
            <div className="col">
                <span></span>
                <h5>Hälsa</h5>
                <h5>Styrka</h5>
                <h5>Uthållighet</h5>
                <h5>Initiativstyrka</h5>
                <h5>Undvika Anfall</h5>
                <h5>Vapenfärdighet</h5>
            </div> {/** End col 1 */}

            <div className="col">
                <span></span>
                <input
                    type="number" 
                    name="Health" 
                    value={selectedGladiator.Health}
                    onChange={e => handlePointUpdate(e)}
                />
                <input
                    type="number" 
                    name="Strength" 
                    value={selectedGladiator.Strength}
                    onChange={e => handlePointUpdate(e)}
                />
                <input
                    type="number" 
                    name="Endurance" 
                    value={selectedGladiator.Endurance}
                    onChange={e => handlePointUpdate(e)}
                />
                <input
                    type="number" 
                    name="Initiative" 
                    value={selectedGladiator.Initiative}
                    onChange={e => handlePointUpdate(e)}
                />
                <input
                    type="number" 
                    name="Dodge" 
                    value={selectedGladiator.Dodge}
                    onChange={e => handlePointUpdate(e)}
                />
                <input
                    type="number" 
                    name="WeaponSkill" 
                    value={selectedGladiator.WeaponSkill}
                    onChange={e => handlePointUpdate(e)}
                />
            </div> {/** End col 2 */}

            <div className="col">
                <span>
                    <input
                        id="exclude_racebonus"
                        type="checkbox"
                        checked={!excludeRaceBonus}
                        onChange={() => setExcludeRaceBonus(!excludeRaceBonus)}
                    />
                    <label htmlFor="exclude_racebonus" title="Rasbonus">RB</label>
                </span>
                <div className={excludeRaceBonus ? 'line-through' : ''}>
                    <span style={{color: raceBonusPoints.Health === 0 ? 'var(--color-black)' : raceBonusPoints.Health < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>
                            {raceBonusPoints.Health}
                    </span>
                </div>
                <div className={excludeRaceBonus ? 'line-through' : ''}>
                    <span style={{color: raceBonusPoints.Strength === 0 ? 'var(--color-black)' : raceBonusPoints.Strength < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{raceBonusPoints.Strength}</span>
                </div>
                <div className={excludeRaceBonus ? 'line-through' : ''}>
                    <span style={{color: raceBonusPoints.Endurance === 0 ? 'var(--color-black)' : raceBonusPoints.Endurance < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{raceBonusPoints.Endurance}</span>
                </div>
                <div className={excludeRaceBonus ? 'line-through' : ''}>
                    <span style={{color: raceBonusPoints.Initiative === 0 ? 'var(--color-black)' : raceBonusPoints.Initiative < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{raceBonusPoints.Initiative}</span>
                </div>
                <div className={excludeRaceBonus ? 'line-through' : ''}>
                    <span style={{color: raceBonusPoints.Dodge === 0 ? 'var(--color-black)' : raceBonusPoints.Dodge < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{raceBonusPoints.Dodge}</span>
                </div>
                <div className={excludeRaceBonus ? 'line-through' : ''}>
                    <span style={{color: raceBonusPoints.WeaponSkill === 0 ? 'var(--color-black)' : raceBonusPoints.WeaponSkill < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{raceBonusPoints.WeaponSkill}</span>
                </div>
            </div> {/** End col 3 */}
            
            <div className="col">
                <span>
                    <input
                        id="exclude_equipmentbonus"
                        type="checkbox"
                        checked={!excludeEquipmentBonus}
                        onChange={() => setExcludeEquipmentBonus(!excludeEquipmentBonus)}
                    />
                    <label htmlFor="exclude_equipmentbonus" title="Utrustningbonus">UB</label>
                </span>
                <div className={excludeEquipmentBonus ? 'line-through' : ''}>
                    <span style={{color: equipmentBonusPoints.Health === 0 ? 'var(--color-black)' : equipmentBonusPoints.Health < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{equipmentBonusPoints.Health}</span>
                </div>
                <div className={excludeEquipmentBonus ? 'line-through' : ''}>
                    <span style={{color: equipmentBonusPoints.Strength === 0 ? 'var(--color-black)' : equipmentBonusPoints.Strength < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{equipmentBonusPoints.Strength}</span>
                </div>
                <div className={excludeEquipmentBonus ? 'line-through' : ''}>
                    <span style={{color: equipmentBonusPoints.Endurance === 0 ? 'var(--color-black)' : equipmentBonusPoints.Endurance < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{equipmentBonusPoints.Endurance}</span>
                </div>
                <div className={excludeEquipmentBonus ? 'line-through' : ''}>
                    <span style={{color: equipmentBonusPoints.Initiative === 0 ? 'var(--color-black)' : equipmentBonusPoints.Initiative < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{equipmentBonusPoints.Initiative}</span>
                </div>
                <div className={excludeEquipmentBonus ? 'line-through' : ''}>
                    <span style={{color: equipmentBonusPoints.Dodge === 0 ? 'var(--color-black)' : equipmentBonusPoints.Dodge < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{equipmentBonusPoints.Dodge}</span>
                </div>
                <div className={excludeEquipmentBonus ? 'line-through' : ''}>
                    <span style={{color: equipmentBonusPoints.WeaponSkill === 0 ? 'var(--color-black)' : equipmentBonusPoints.WeaponSkill < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{equipmentBonusPoints.WeaponSkill}</span>
                </div>
            </div> {/** End col 4 */}

            <div className="col">
                <span>
                    <input
                        id="exclude_drinkbonus"
                        type="checkbox"
                        checked={!excludeDrinkBonus}
                        onChange={() => setExcludeDrinkBonus(!excludeDrinkBonus)}
                    />
                    <label htmlFor="exclude_drinkbonus" title="Dryckesbonus">DB</label>
                </span>
                <div className={excludeDrinkBonus ? 'line-through' : ''}>
                    <span style={{color: drinkBonusPoints.Health === 0 ? 'var(--color-black)' : drinkBonusPoints.Health < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{drinkBonusPoints.Health}</span>
                </div>
                <div className={excludeDrinkBonus ? 'line-through' : ''}>
                    <span style={{color: drinkBonusPoints.Strength === 0 ? 'var(--color-black)' : drinkBonusPoints.Strength < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{drinkBonusPoints.Strength}</span>
                </div>
                <div className={excludeDrinkBonus ? 'line-through' : ''}>
                    <span style={{color: drinkBonusPoints.Endurance === 0 ? 'var(--color-black)' : drinkBonusPoints.Endurance < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{drinkBonusPoints.Endurance}</span>
                </div>
                <div className={excludeDrinkBonus ? 'line-through' : ''}>
                    <span style={{color: drinkBonusPoints.Initiative === 0 ? 'var(--color-black)' : drinkBonusPoints.Initiative < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{drinkBonusPoints.Initiative}</span>
                </div>
                <div className={excludeDrinkBonus ? 'line-through' : ''}>
                    <span style={{color: drinkBonusPoints.Dodge === 0 ? 'var(--color-black)' : drinkBonusPoints.Dodge < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{drinkBonusPoints.Dodge}</span>
                </div>
                <div className={excludeDrinkBonus ? 'line-through' : ''}>
                    <span style={{color: drinkBonusPoints.WeaponSkill === 0 ? 'var(--color-black)' : drinkBonusPoints.WeaponSkill < 0 ? 'var(--color-darkred)' : 'var(--color-green)'}}>{drinkBonusPoints.WeaponSkill}</span>
                </div>
            </div> {/** End col 5 */}

            <div className="col">
                <span></span>
                <div className="equal_sign">=<span className="totalNumber">{totalHealthPoints}</span></div>
                <div className="equal_sign">=<span className="totalNumber">{totalStrengthPoints}</span></div>
                <div className="equal_sign">=<span className="totalNumber">{totalEndurancePoints}</span></div>
                <div className="equal_sign">=<span className="totalNumber">{totalInitiativePoints}</span></div>
                <div className="equal_sign">=<span className="totalNumber">{totalDodgePoints}</span></div>
                <div className="equal_sign">=<span className="totalNumber">{totalWeaponSkillPoints}</span></div>
            </div> {/** End col 6 */}
        </div>

        <span className="divider" />

        {/** Add drinks */}
        {/* <h4>Välj dina drycker</h4> */}
        <div className="drinks">
            <span>
                <p>Dryck 1</p>
                <InputSearch
                    input_id="drink1"
                    placeholderText="Sök efter dryck..."
                    data={consumables}
                    displayProperty="name"
                    selectedData={selectedGladiator.Drink1}
                    propertyName="Drink1"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <p>Dryck 2</p>
                <InputSearch
                    input_id="drink2"
                    placeholderText="Sök efter dryck..."
                    data={consumables}
                    displayProperty="name"
                    selectedData={selectedGladiator.Drink2}
                    propertyName="Drink2"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
            <span>
                <p>Dryck 3</p>
                <InputSearch
                    input_id="drink3"
                    placeholderText="Sök efter dryck..."
                    data={consumables}
                    displayProperty="name"
                    selectedData={selectedGladiator.Drink3}
                    propertyName="Drink3"
                    handleSelectedData={handleGladiatorUpdate}
                />
            </span>
        </div>

        <span className="divider" />
        {/** List requirements */}

    </div>
}

export default PointForm;