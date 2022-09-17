export interface Generic {
    name: string,
    type: number
}

export interface Race {
    name: string,
    id: number,
    bonuses: RaceBonus,
    swe_name?: string
}

interface RaceBonus {
    stats: RaceBonusStat[],
    weapon_skills: RaceBonusStat[]
}

interface RaceBonusStat {
    type: number,
    value: number
}

export interface Weapon {
    id?: number,
    name?: string,
    type?: number,
    type_name?: string,
    weight?: number,
    can_dual_wield?: boolean,
    is_two_handed?: boolean,
    is_shield?: boolean,
    is_ranged?: boolean,
    required_level?: number,
    requires_legend?: boolean,
    requirements?: Requirement[]
}

export interface WeaponType {
    name: string,
    type: number,
    value?: number
}

export interface Armor {
    id?: number,
    name?: string,
    type?: number,
    weight?: number,
    required_level?: number,
    requires_legend?: boolean,
    requirements?: Requirement[]
}

export interface Consumable {
    id?: number,
    name?: string,
    bonuses?: Bonus[]
}

export interface Requirement {
    id: number,
    requirement_text: string,
    requirement_value: string,
    requirement_type: string,
    requirementable: string,
    race_name?: string,
}

export interface Bonus {
    id: number,
    bonusable_name: string,
    bonus_value_display: string,
}