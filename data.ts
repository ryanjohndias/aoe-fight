enum UnitType {
    infantry,
    cavalry
}

class UpgradeableStats {
    name: string
    hp: number
    atk: number
    rof: number
    ma: number
    pa: number
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

const upgrades = {
    forging:        new UpgradeableStats(0, 1, 0, 0, 0),
    ironCasting:    new UpgradeableStats(0, 1, 0, 0, 0),
    blastFurnace:   new UpgradeableStats(0, 2, 0, 0, 0),
    scaleMailArmor: new UpgradeableStats(0, 0, 0, 1, 1),
    chainMailArmor: new UpgradeableStats(0, 0, 0, 1, 1),
    plateMailArmor: new UpgradeableStats(0, 0, 0, 1, 2)
}

class Cost {
    food: number
    gold: number
    wood: number
    stone: number
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
    eliteEagleWarrior = "eliteEagleWarrior",
    eliteHuskarl = "eliteHuskarl",
    eliteTeutonicKnight = "eliteTeutonicKnight",
    eWoadRaider = "eWoadRaider"
}

// TODO: Unit, or UnitType
class AttackBonus {
    id: UnitId
    value: number
    constructor(id: UnitId, value: number) {
        this.id = id
        this.value = value
    }
}

class CivUnit {
    unit: Unit
    civ: Civ
    upgrades: UpgradeableStats // blacksmith / uni
    special: UpgradeableStats // civ bonuses or special techs
    total: UpgradeableStats // base + upgrades + special
    constructor (unit: Unit, civ: Civ) {
        this.unit = unit
        this.civ = civ

        // HP modification
        const hpSpecial = civ.totalSpecialHPUpgrade()
        const hpTotal = unit.hp + (this.unit.hp * (hpSpecial/100))

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
        const maUpgrades = civ.totalBlacksmithMAUpgrade()
        const paUpgrades = civ.totalBlacksmithPAUpgrade()
        const maTotal = unit.ma + maUpgrades
        const paTotal = unit.pa + paUpgrades

        this.upgrades = new UpgradeableStats(0, atkUpgrades, 0, maUpgrades, paUpgrades)
        this.special = new UpgradeableStats(hpSpecial, atkSpecial, rofSpecial, 0, 0)
        this.total = new UpgradeableStats(hpTotal, atkTotal, rofTotal, maTotal, paTotal)
    }
}

class Unit {
    id: UnitId
    name: string
    type: UnitType
    img: string
    cost: Cost
    hp: number
    atk: number
    rof: number
    ad: number
    ma: number
    pa: number
    atkBonuses: AttackBonus[]
    constructor(id: UnitId, name: string, type: UnitType, img: string, cost: Cost, hp: number,
        atk: number, rof: number, ad: number, ma: number, pa: number, atkBonuses: AttackBonus[]) {
        this.id = id
        this.name = name
        this.type = type
        this.img = img
        this.cost = cost
        this.hp = hp
        this.atk = atk
        this.rof = rof
        this.ad = ad
        this.ma = ma
        this.pa = pa
        this.atkBonuses = atkBonuses
    }

    /**
     * Damage output per second
     */
    public dps() {
        return this.atk / this.rof
    }
}

const units = {
    champion: new Unit (
        UnitId.champion,
        "Champion",
        UnitType.infantry,
        "https://vignette.wikia.nocookie.net/ageofempires/images/5/54/Champion_aoe2DE.png/revision/latest?cb=20200402012808",
        new Cost(60, 20, 0, 0),
        70, 13, 2.0, 0.63, 1, 1,
        [new AttackBonus(UnitId.eliteEagleWarrior, 8)]
    ),
    // TODO: Pavise
    condottiero: new Unit (
        UnitId.condottiero,
        "Condottiero",
        UnitType.infantry,
        "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CondottieroIcon-DE.png/revision/latest?cb=20191230141010",
        new Cost(50, 35, 0, 0),
        80, 10, 1.9, 0.75, 1, 0, []
    ),
    halbardier: new Unit (
        UnitId.halbardier,
        "Halbardier",
        UnitType.infantry,
        "https://vignette.wikia.nocookie.net/ageofempires/images/a/aa/Halberdier_aoe2DE.png/revision/latest?cb=20200403174747",
        new Cost(35, 0, 25, 0),
        60, 6, 3.05, 0.5, 0, 0,
        [new AttackBonus(UnitId.eliteEagleWarrior, 1)]
    ),
    eliteEagleWarrior: new Unit (
        UnitId.eliteEagleWarrior,
        "Elite Eagle Warrior",
        UnitType.infantry,
        "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Eliteeaglewarrior_aoe2DE.png/revision/latest?cb=20200331191114",
        new Cost(20, 50, 0, 0),
        60, 9, 2, 0.8, 0, 4, []
    ),

    eliteHuskarl: new Unit (
        UnitId.eliteHuskarl,
        "Elite Huskarl",
        UnitType.infantry,
        "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/HuskarlIcon-DE.png/revision/latest?cb=20191230145804",
        new Cost(52, 26, 0, 0),
        70, 12, 2, 0.8, 0, 8,
        [new AttackBonus(UnitId.eliteEagleWarrior, 3)]
    ),

    

    eliteTeutonicKnight: new Unit (
        UnitId.eliteTeutonicKnight,
        "Elite Teutonic Knight",
        UnitType.infantry,
        "https://vignette.wikia.nocookie.net/ageofempires/images/9/95/TeutonicKnightIcon-DE.png/revision/latest?cb=20200325131355",
        new Cost(85, 40, 0, 0),
        100, 17, 2.0, 0.75, 10, 2,
        [new AttackBonus(UnitId.eliteEagleWarrior, 4)]
    ),
    eWoadRaider: new Unit (
        UnitId.eWoadRaider,
        "Elite Woad Raider",
        UnitType.infantry,
        "https://vignette.wikia.nocookie.net/ageofempires/images/5/55/WoadRaiderIcon-DE.png/revision/latest?cb=20191230150759",
        new Cost(65, 25, 0, 0),
        80, 13, 2, 0.72, 0, 1,
        [new AttackBonus(UnitId.eliteEagleWarrior, 3)]
    )
}

class Civ {
    id: number
    name: string
    image: string
    units: Unit[]
    meleeUpgrades: UpgradeableStats[]
    infantryArmourUpgrades: UpgradeableStats[]
    special: any

    constructor(id: number, name: string, image: string, units: Unit[],
        meleeUpgrades: UpgradeableStats[], infantryArmourUpgrades: UpgradeableStats[], special: any) {
            this.id = id
            this.name = name
            this.image = image
            this.units = units
            this.meleeUpgrades = meleeUpgrades
            this.infantryArmourUpgrades = infantryArmourUpgrades
            this.special = special
    }

    // TODO: Pass in unit type
    public totalSpecialHPUpgrade() {
        let hp = 0
        this.special.infantry.forEach((upgrade) => hp += upgrade.hp)
        return hp
    }

    public totalMeleeAtkUpgrade() {
        // return this.meleeUpgrades.reduce(function(a, b) { return a + b.atk })
        let atk = 0
        this.meleeUpgrades.forEach((upgrade) => atk += upgrade.atk)
        return atk
    }

    public totalSpecialAtkUpgrade() {
        let atk = 0
        this.special.infantry.forEach((upgrade) => atk += upgrade.atk)
        return atk
    }

    public totalBlacksmithMAUpgrade() {
        let ma = 0
        this.infantryArmourUpgrades.forEach((upgrade) => ma += upgrade.ma)
        return ma
    }

    public totalBlacksmithPAUpgrade() {
        let pa = 0
        this.infantryArmourUpgrades.forEach((upgrade) => pa += upgrade.pa)
        return pa
    }
    // xxx
}

const civs = [
    new Civ(0, "Aztecs",
        "https://vignette.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png/revision/latest?cb=20191107173129",
        [units.champion, units.condottiero, units.eliteEagleWarrior],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {
            infantry: [
                { name: "Garland Wars", atk: 4, rof: 0, hp: 0, ma: 0, pa: 0 }
            ]
        }
    ),
    new Civ(1, "Berbers",
        "https://vignette.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png/revision/latest?cb=20191107173130",
        [units.champion, units.condottiero],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(2, "Britons",
        "https://vignette.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest?cb=20191107173130",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(3, "Byzantines",
        "https://vignette.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png/revision/latest?cb=20191107173131",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(4, "Burmese",
        "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png/revision/latest?cb=20191107173131",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        // TODO: Types for civ bonus vs unique tech
        // TODO: Cater for which age the bonus is available
        // TODO: Indicate if the bonus is accumulate, or exclusive to the age.
        // Possibly:
        // melee: [
        //     {type: .civBonus, age: .feudal, atk: 1},
        //     {type: .civBonus, age: .castle, atk: 1},
        //     {type: .civBonus, age: .imperial, atk: 1}
        // ]
        {
            infantry: [
                { name: "Civ bonus", atk: 3, rof: 0, hp: 0, ma: 0, pa: 0 }
            ]
        }
    ),
    new Civ(5, "Celts",
        "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Celts.png/revision/latest?cb=20191107173132",
        [units.champion, units.condottiero, units.eWoadRaider, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(6, "Chinese",
        "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png/revision/latest?cb=20191107173132",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(7, "Cumans",
        "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png/revision/latest?cb=20191107173133",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(8, "Ethiopians",
        "https://vignette.wikia.nocookie.net/ageofempires/images/c/cb/CivIcon-Ethiopians.png/revision/latest?cb=20191107173133",
        [units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(9, "Franks",
        "https://vignette.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png/revision/latest?cb=2019110717323",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(10, "Goths",
        "https://vignette.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png/revision/latest?cb=20191107173238",
        [units.champion, units.condottiero, units.eliteHuskarl, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor],
        {infantry: []}
    ),
    new Civ(11, "Huns",
        "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/CivIcon-Huns.png/revision/latest?cb=20191107173238",
        [units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor],
        {infantry: []}
    ),
    new Civ(12, "Incas",
        "https://vignette.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png/revision/latest?cb=20191107173239",
        [units.champion, units.condottiero, units.eliteEagleWarrior, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(13, "Indians",
        "https://vignette.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png/revision/latest?cb=20191107173239",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor],
        {infantry: []}
    ),
    new Civ(14, "Italians",
        "https://vignette.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png/revision/latest?cb=20191116050557",
        [units.champion, units.condottiero],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(15, "Japanese",
        "https://vignette.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest?cb=20191107173240",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {
            infantry: [
                { name: "Civ bonus", atk: 0, rof: 33, hp: 0, ma: 0, pa: 0 }
            ]
        }
    ),
    new Civ(16, "Khmer",
        "https://vignette.wikia.nocookie.net/ageofempires/images/e/ec/CivIcon-Khmer.png/revision/latest?cb=20191107173240",
        [units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor],
        {infantry: []}
    ),
    new Civ(17, "Koreans",
        "https://vignette.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png/revision/latest?cb=20191107173241",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(18, "Lithuanians",
        "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png/revision/latest?cb=20191107173241",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor],
        {infantry: []}
    ),
    new Civ(19, "Magyars",
        "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png/revision/latest?cb=20191107173242",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor],
        {infantry: []}
    ),
    new Civ(20, "Malians",
        "https://vignette.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png/revision/latest?cb=20191107173334",
        [units.champion, units.condottiero],
        [upgrades.forging, upgrades.ironCasting],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {
            infantry: [
                { name: "Civ bonus", atk: 0, rof: 0, hp: 0, ma: 0, pa: 3 }
            ]
        }
    ),
    new Civ(21, "Malay",
        "https://vignette.wikia.nocookie.net/ageofempires/images/c/c3/CivIcon-Malay.png/revision/latest?cb=20191107173334",
        [units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(22, "Mayans",
        "https://vignette.wikia.nocookie.net/ageofempires/images/0/05/CivIcon-Mayans.png/revision/latest?cb=20191107173335",
        [units.condottiero, units.eliteEagleWarrior, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(23, "Mongols",
        "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png/revision/latest?cb=20191107173335",
        [units.champion, units.condottiero],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(24, "Persians",
        "https://vignette.wikia.nocookie.net/ageofempires/images/a/ad/CivIcon-Persians.png/revision/latest?cb=20191107173335",
        [units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(25, "Portuguese",
        "https://vignette.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png/revision/latest?cb=20191107173336",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(26, "Saracens",
        "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png/revision/latest?cb=20191107173336",
        [units.champion, units.condottiero],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(27, "Slavs",
        "https://vignette.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png/revision/latest?cb=20191107173337",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(28, "Spanish",
        "https://vignette.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png/revision/latest?cb=20191107173337",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(29, "Tatars",
        "https://vignette.wikia.nocookie.net/ageofempires/images/f/f2/CivIcon-Tatars.png/revision/latest?cb=20191107173338",
        [units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor],
        {infantry: []}
    ),
    new Civ(30, "Teutons",
        "https://vignette.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png/revision/latest?cb=20191107173408",
        [units.champion, units.condottiero, units.eliteTeutonicKnight, units.halbardier],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(31, "Turks",
        "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png/revision/latest?cb=20191107173409",
        [units.champion, units.condottiero],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),

    new Civ(32, "Vietnamese",
        "https://vignette.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png/revision/latest?cb=20191107173409",
        [units.champion, units.condottiero, units.halbardier],
        [upgrades.forging, upgrades.ironCasting],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {infantry: []}
    ),
    new Civ(33, "Vikings",
        "https://vignette.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png/revision/latest?cb=20191107173410",
        [units.champion, units.condottiero],
        [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
        [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
        {
            infantry: [
                { name: "Civ bonus", atk: 0, rof: 0, hp: 20, ma: 0, pa: 0 }
            ]
        }
    )
]