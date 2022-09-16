export enum ArmorType {
    Head = 0,
    Shoulders = 1,
    Body = 2,
    Hands = 3,
    Legs = 4,
    Feet = 5,
    Necklace = 6,
    Ring = 7,
    Cloak = 8,
    Amulet = 9,
    Armband = 10,
    Ornament = 11,
}

export enum RequirementType {
    Race = "App\\Models\\Race",
    Stat = "App\\Models\\Stat",
    WeaponSkill = "App\\Models\\WeaponSkill"
}

export enum BonusType {
    Health = "Bashälsa",
    Strength = "Styrka",
    Endurance = "Uthållighet",
    Initative = "Initiativstyrka",
    Dodge = "Undvika anfall",
    Axe = "vapenfärdigheten yxor",
    Spear = "vapenfärdigheten stickvapen",
    Hammer = "vapenfärdigheten hammare",
    Stave = "vapenfärdigheten stavar",
    Chain = "vapenfärdigheten kätting",
    Sword = "vapenfärdigheten svärd",
    Shield = "vapenfärdigheten sköldar",
}