enum UnitType {
    infantry,
    cavalry
}

enum ArmourClass {
    infantry,
    cavalry,
    uniqueUnit,
    eagleWarrior,
    camel,
    warElephant,
    mameluke,
    condottiero,
    spearman
}

class Upgrade {
    readonly name: string // Currently unused
    readonly hp: number
    readonly atk: number
    readonly rof: number
    readonly ma: number
    readonly pa: number

    constructor(hp: number, atk: number, rof: number, ma: number, pa: number) {
        this.hp = hp
        this.atk = atk
        this.rof = rof
        this.ma = ma
        this.pa = pa
    }

    public dps() {
        return this.atk / this.rof
    }
}
const upgrades: { [key: string]: Upgrade; } = {
    forging:            new Upgrade(0, 1, 0, 0, 0),
    ironCasting:        new Upgrade(0, 1, 0, 0, 0),
    blastFurnace:       new Upgrade(0, 2, 0, 0, 0),
    scaleMailArmor:     new Upgrade(0, 0, 0, 1, 1),
    chainMailArmor:     new Upgrade(0, 0, 0, 1, 1),
    plateMailArmor:     new Upgrade(0, 0, 0, 1, 2),
    scaleBardingArmor:  new Upgrade(0, 0, 0, 1, 1),
    chainBardingArmor:  new Upgrade(0, 0, 0, 1, 1),
    plateBardingArmor:  new Upgrade(0, 0, 0, 1, 2),
    bloodlines:         new Upgrade(20, 0, 0, 0, 0)
}

class Cost {
    readonly food: number
    readonly gold: number
    readonly wood: number
    readonly stone: number

    constructor(f: number, g: number, w: number, s: number) {
        this.food = f;
        this.gold = g;
        this.wood = w;
        this.stone = s;
    }
}

enum UnitId {
    champion = "champion",
    condottiero = "condottiero",
    halbardier = "halbardier",
    hussar = "hussar",
    eliteEagleWarrior = "eliteEagleWarrior",
    eliteHuskarl = "eliteHuskarl",
    eliteJaguarWarrior = "eliteJaguarWarrior",
    eliteTeutonicKnight = "eliteTeutonicKnight",
    eWoadRaider = "eWoadRaider",
    eShotel = "eShotel",
    eKarambit = "eKarambit",
    eDismountedKonnik = "eDismountedKonnik",
    twoHandedSwordsman = "twoHandedSwordsman",
    xolotl = "xolotl",
    knight = "knight",
    cavalier = "cavalier",
    paladin = "paladin",
    camel = "camel",
    heavyCamel = "heavyCamel",
    imperialCamel = "imperialCamel",
    eBattleElephant = "eBattleElephant",
    eSteppeLancer = "eSteppeLancer",
    eLeitis = "eLeitis",
    eKeshik = "eKeshik",
    eKonnik = "eKonnik",
    eBoyar = "eBoyar",
    eSamurai = "eSamurai",
    eWarElephant = "eWarElephant",
    eCataphract = "eCataphract",
    eBerserk = "eBerserk",
    eMagyarHuszar = "eMagyarHuszar",
    eKamayuk = "eKamayuk"
}

class AttackBonus {
    readonly armourClass: ArmourClass
    readonly value: number

    constructor(armourClass: ArmourClass, value: number) {
        this.armourClass = armourClass
        this.value = value
    }
}

class CivUnit {
    readonly unit: Unit
    readonly civ: Civ
    readonly upgrades: Upgrade // blacksmith / uni
    readonly special: Upgrade // civ bonuses or special techs
    readonly total: Upgrade // base + upgrades + special
    constructor (unit: Unit, civ: Civ) {
        this.unit = unit
        this.civ = civ

        // HP modification
        const hpUpgrades = civ.totalHPUpgrade(unit.type)
        const hpSpecial = civ.totalSpecialHPUpgrade()
        const hpTotal = unit.hp + (this.unit.hp * (hpSpecial/100)) + hpUpgrades

        // ATK modification
        const atkUpgrades = civ.totalMeleeAtkUpgrade()
        const atkSpecial = civ.totalSpecialAtkUpgrade()
        const atkTotal = unit.atk + atkUpgrades + atkSpecial

        // ROF modification
        var rofSpecial = 0
        civ.special.infantry.forEach(function(upgrade) {
            rofSpecial -= upgrade.rof
        });
        const rofTotal = unit.rof + (rofSpecial/100)

        // Armor modification
        const maUpgrades = civ.totalBlacksmithMAUpgrade(unit.type)
        const paUpgrades = civ.totalBlacksmithPAUpgrade(unit.type)
        const maSpecial = civ.totalSpecialMAUpgrade(unit.id)
        const paSpecial = civ.totalSpecialPAUpgrade(unit.id)
        const maTotal = unit.ma + maSpecial + maUpgrades
        const paTotal = unit.pa + paSpecial + paUpgrades

        this.upgrades = new Upgrade(hpUpgrades, atkUpgrades, 0, maUpgrades, paUpgrades)
        this.special = new Upgrade(hpSpecial, atkSpecial, rofSpecial, maSpecial, paSpecial)
        this.total = new Upgrade(hpTotal, atkTotal, rofTotal, maTotal, paTotal)
    }
}

class Service {

    private readonly unitData: UnitData
    private readonly civData: CivData

    constructor() {
        this.unitData = new UnitData()
        this.civData = new CivData(this.unitData.units)
    }

    public getCiv(id: number) {
        for (const civ of this.civData.civs) {
            if (civ.id == id) {
                return civ
            }
        }
        return null
    }

    public getUnit(identifier: string) {
        return this.unitData.units[identifier]
    }

    public getUnitByNumericId(id: number) {
        for (const unitId of Object.keys(this.unitData.units)) {
            const unit = this.unitData.units[unitId]
            if (unit.numericId == id) {
                return unit
            }
        }
        return null
    }

    public getCivs() {
        return this.civData.civs
    }

    public getRandomCiv() {
        return this.civData.civs[Math.floor(Math.random() * this.civData.civs.length)]
    }

}