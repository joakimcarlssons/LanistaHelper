import { Race, Weapon, Armor, Consumable, WeaponType } from "../data/Dtos/Dtos";

interface Equipment {
    AttackWeapon? : Weapon | null | undefined,
    DefenceWeapon? : Weapon | null | undefined,
    RangeWeapon? : Weapon | null | undefined,
    HeadArmor? : Armor | null | undefined,
    ShoulderArmor? : Armor | null | undefined,
    BodyArmor? : Armor | null | undefined,
    HandsArmor? : Armor | null | undefined,
    LegArmor? : Armor | null | undefined,
    FeetArmor? : Armor | null | undefined,
    Cloak? : Armor | null | undefined,
    Necklace? : Armor | null | undefined,
    Ring? : Armor | null | undefined,
    Amulet? : Armor | null | undefined,
    Armband? : Armor | null | undefined,
    Ornament? : Armor | null | undefined,
    Drink1? : Consumable | null | undefined,
    Drink2? : Consumable | null | undefined,
    Drink3? : Consumable | null | undefined,
}

export default class Gladiator {
    constructor(
        public Health : number = 0,
        public Strength: number = 0,
        public Endurance: number = 0,
        public Initiative: number = 0,
        public Dodge: number = 0,
        public WeaponSkill: number = 0,
        public ShieldSkill: number = 0,
        public Race? : Race | null | undefined,
        public WeaponType?: WeaponType | null | undefined,
        public AttackWeapon? : Weapon | null | undefined,
        public DefenceWeapon? : Weapon | null | undefined,
        public RangeWeapon? : Weapon | null | undefined,
        public HeadArmor? : Armor | null | undefined,
        public ShoulderArmor? : Armor | null | undefined,
        public BodyArmor? : Armor | null | undefined,
        public HandsArmor? : Armor | null | undefined,
        public LegArmor? : Armor | null | undefined,
        public FeetArmor? : Armor | null | undefined,
        public Cloak? : Armor | null | undefined,
        public Necklace? : Armor | null | undefined,
        public Ring? : Armor | null | undefined,
        public Amulet? : Armor | null | undefined,
        public Armband? : Armor | null | undefined,
        public Ornament? : Armor | null | undefined,
        public Drink1? : Consumable | null | undefined,
        public Drink2? : Consumable | null | undefined,
        public Drink3? : Consumable | null | undefined,
    ){}
}