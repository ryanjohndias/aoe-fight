var UnitType;
(function (UnitType) {
    UnitType[UnitType["infantry"] = 0] = "infantry";
    UnitType[UnitType["cavalry"] = 1] = "cavalry";
})(UnitType || (UnitType = {}));
var UpgradeableStats = /** @class */ (function () {
    function UpgradeableStats(hp, atk, rof, ma, pa) {
        this.hp = hp;
        this.atk = atk;
        this.rof = rof;
        this.ma = ma;
        this.pa = pa;
    }
    UpgradeableStats.prototype.dps = function () {
        return this.atk / this.rof;
    };
    return UpgradeableStats;
}());
var upgrades = {
    forging: new UpgradeableStats(0, 1, 0, 0, 0),
    ironCasting: new UpgradeableStats(0, 1, 0, 0, 0),
    blastFurnace: new UpgradeableStats(0, 2, 0, 0, 0),
    scaleMailArmor: new UpgradeableStats(0, 0, 0, 1, 1),
    chainMailArmor: new UpgradeableStats(0, 0, 0, 1, 1),
    plateMailArmor: new UpgradeableStats(0, 0, 0, 1, 2)
};
var Cost = /** @class */ (function () {
    function Cost(f, g, w, s) {
        this.food = f;
        this.gold = g;
        this.wood = w;
        this.stone = s;
    }
    return Cost;
}());
var UnitId;
(function (UnitId) {
    UnitId["champion"] = "champion";
    UnitId["condottiero"] = "condottiero";
    UnitId["halbardier"] = "halbardier";
    UnitId["hussar"] = "hussar";
    UnitId["eliteEagleWarrior"] = "eliteEagleWarrior";
    UnitId["eliteHuskarl"] = "eliteHuskarl";
    UnitId["eliteJaguarWarrior"] = "eliteJaguarWarrior";
    UnitId["eliteTeutonicKnight"] = "eliteTeutonicKnight";
    UnitId["eWoadRaider"] = "eWoadRaider";
    UnitId["eShotel"] = "eShotel";
    UnitId["eKarambit"] = "eKarambit";
    UnitId["eDismountedKonnik"] = "eDismountedKonnik";
    UnitId["twoHandedSwordsman"] = "twoHandedSwordsman";
})(UnitId || (UnitId = {}));
// TODO: Unit, or UnitType
var AttackBonus = /** @class */ (function () {
    function AttackBonus(id, type, value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
    return AttackBonus;
}());
var CivUnit = /** @class */ (function () {
    function CivUnit(unit, civ) {
        this.unit = unit;
        this.civ = civ;
        // HP modification
        var hpSpecial = civ.totalSpecialHPUpgrade();
        var hpTotal = unit.hp + (this.unit.hp * (hpSpecial / 100));
        // ATK modification
        var atkUpgrades = civ.totalMeleeAtkUpgrade();
        var atkSpecial = civ.totalSpecialAtkUpgrade();
        var atkTotal = unit.atk + atkUpgrades + atkSpecial;
        // ROF modification
        var rofSpecial = 0;
        civ.special.infantry.forEach(function (upgrade) {
            rofSpecial -= upgrade.rof;
        });
        var rofTotal = unit.rof + (rofSpecial / 100);
        // Armor modification
        var maUpgrades = civ.totalBlacksmithMAUpgrade(unit.type);
        var paUpgrades = civ.totalBlacksmithPAUpgrade(unit.type);
        var maSpecial = civ.totalSpecialMAUpgrade(unit.id);
        var paSpecial = civ.totalSpecialPAUpgrade(unit.id);
        var maTotal = unit.ma + maSpecial + maUpgrades;
        var paTotal = unit.pa + paSpecial + paUpgrades;
        this.upgrades = new UpgradeableStats(0, atkUpgrades, 0, maUpgrades, paUpgrades);
        this.special = new UpgradeableStats(hpSpecial, atkSpecial, rofSpecial, maSpecial, paSpecial);
        this.total = new UpgradeableStats(hpTotal, atkTotal, rofTotal, maTotal, paTotal);
    }
    return CivUnit;
}());
var Unit = /** @class */ (function () {
    function Unit(id, name, type, img, cost, hp, atk, rof, ad, ma, pa, atkBonuses) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.img = img;
        this.cost = cost;
        this.hp = hp;
        this.atk = atk;
        this.rof = rof;
        this.ad = ad;
        this.ma = ma;
        this.pa = pa;
        this.atkBonuses = atkBonuses;
    }
    /**
     * Damage output per second
     */
    Unit.prototype.dps = function () {
        return this.atk / this.rof;
    };
    return Unit;
}());
var units = {
    champion: new Unit(UnitId.champion, "Champion", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/54/Champion_aoe2DE.png/revision/latest?cb=20200402012808", new Cost(60, 20, 0, 0), 70, 13, 2.0, 0.63, 1, 1, [new AttackBonus(UnitId.eliteEagleWarrior, null, 8)]),
    condottiero: new Unit(UnitId.condottiero, "Condottiero", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CondottieroIcon-DE.png/revision/latest?cb=20191230141010", new Cost(50, 35, 0, 0), 80, 10, 1.9, 0.75, 1, 0, []),
    halbardier: new Unit(UnitId.halbardier, "Halbardier", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/aa/Halberdier_aoe2DE.png/revision/latest?cb=20200403174747", new Cost(35, 0, 25, 0), 60, 6, 3.05, 0.5, 0, 0, [
        new AttackBonus(null, UnitType.cavalry, 32),
        new AttackBonus(UnitId.eliteEagleWarrior, null, 1)
    ]),
    hussar: new Unit(UnitId.hussar, "Hussar", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Hussar_aoe2DE.png/revision/latest?cb=20200403174747", new Cost(80, 0, 0, 0), 75, 7, 1.9, 0.95, 0, 2, []),
    eliteEagleWarrior: new Unit(UnitId.eliteEagleWarrior, "Elite Eagle Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Eliteeaglewarrior_aoe2DE.png/revision/latest?cb=20200331191114", new Cost(20, 50, 0, 0), 60, 9, 2, 0.8, 0, 4, []),
    eliteHuskarl: new Unit(UnitId.eliteHuskarl, "Elite Huskarl", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/HuskarlIcon-DE.png/revision/latest?cb=20191230145804", new Cost(52, 26, 0, 0), 70, 12, 2, 0.8, 0, 8, [new AttackBonus(UnitId.eliteEagleWarrior, null, 3)]),
    eliteJaguarWarrior: new Unit(UnitId.eliteJaguarWarrior, "Elite Jaguar Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/3/32/JaguarWarriorIcon-DE.png/revision/latest?cb=20191230143816", new Cost(60, 30, 0, 0), 75, 12, 2, 0.8, 2, 1, [
        new AttackBonus(null, UnitType.infantry, 11),
        new AttackBonus(UnitId.eliteEagleWarrior, null, 2),
        new AttackBonus(UnitId.condottiero, null, 10)
    ]),
    eliteTeutonicKnight: new Unit(UnitId.eliteTeutonicKnight, "Elite Teutonic Knight", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/9/95/TeutonicKnightIcon-DE.png/revision/latest?cb=20200325131355", new Cost(85, 40, 0, 0), 100, 17, 2.0, 0.75, 10, 2, [new AttackBonus(UnitId.eliteEagleWarrior, null, 4)]),
    eWoadRaider: new Unit(UnitId.eWoadRaider, "Elite Woad Raider", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/55/WoadRaiderIcon-DE.png/revision/latest?cb=20191230150759", new Cost(65, 25, 0, 0), 80, 13, 2, 0.72, 0, 1, [new AttackBonus(UnitId.eliteEagleWarrior, null, 3)]),
    eShotel: new Unit(UnitId.eShotel, "Elite Shotel Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/0/03/Shotelwarrioricon-DE.png/revision/latest?cb=20191210075606", new Cost(50, 30, 0, 0), 50, 18, 2, 0.75, 0, 1, [new AttackBonus(UnitId.eliteEagleWarrior, null, 2)]),
    eKarambit: new Unit(UnitId.eKarambit, "Elite Karambit Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/75/Karambitwarrioricon-DE.png/revision/latest/scale-to-width-down/256?cb=20191117115320", new Cost(25, 15, 0, 0), 40, 7, 2, 0.81, 1, 1, [new AttackBonus(UnitId.eliteEagleWarrior, null, 2)]),
    eDismountedKonnik: new Unit(UnitId.eDismountedKonnik, "Elite Dismounted Konnik", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/b5/Konnikdismountedicon.png/revision/latest/scale-to-width-down/256?cb=20191110154253", new Cost(60, 70, 0, 0), 50, 13, 2.4, 0.7, 0, 1, []),
    twoHandedSwordsman: new Unit(UnitId.twoHandedSwordsman, "Two-Handed Swordsman", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/3/3c/Twohanded_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401184348", new Cost(60, 20, 0, 0), 60, 12, 2, 0.5, 0, 1, [new AttackBonus(UnitId.eliteEagleWarrior, null, 8)])
};
var Civ = /** @class */ (function () {
    function Civ(id, name, image, units, meleeUpgrades, infantryArmourUpgrades, special) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.units = units;
        this.meleeUpgrades = meleeUpgrades;
        this.infantryArmourUpgrades = infantryArmourUpgrades;
        this.special = special;
    }
    // TODO: Pass in unit type
    Civ.prototype.totalSpecialHPUpgrade = function () {
        var hp = 0;
        this.special.infantry.forEach(function (upgrade) { return hp += upgrade.hp; });
        return hp;
    };
    Civ.prototype.totalMeleeAtkUpgrade = function () {
        // return this.meleeUpgrades.reduce(function(a, b) { return a + b.atk })
        var atk = 0;
        this.meleeUpgrades.forEach(function (upgrade) { return atk += upgrade.atk; });
        return atk;
    };
    Civ.prototype.totalSpecialAtkUpgrade = function () {
        var atk = 0;
        this.special.infantry.forEach(function (upgrade) { return atk += upgrade.atk; });
        return atk;
    };
    Civ.prototype.totalBlacksmithMAUpgrade = function (unitType) {
        var ma = 0;
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach(function (upgrade) { return ma += upgrade.ma; });
        }
        else if (unitType == UnitType.cavalry) {
            // TODO: cavalry upgrades
        }
        return ma;
    };
    Civ.prototype.totalBlacksmithPAUpgrade = function (unitType) {
        var pa = 0;
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach(function (upgrade) { return pa += upgrade.pa; });
        }
        else if (unitType == UnitType.cavalry) {
            // TODO: cavalry upgrades
        }
        return pa;
    };
    Civ.prototype.totalSpecialMAUpgrade = function (unitId) {
        if (this.special.specificUnits == null) {
            return 0;
        }
        var ma = 0;
        var data = this.special.specificUnits;
        for (var i = 0; i < data.length; i++) {
            var upgrade = data[i];
            if (this.contains(upgrade.units, unitId)) {
                ma += upgrade.ma;
            }
        }
        return ma;
    };
    Civ.prototype.totalSpecialPAUpgrade = function (unitId) {
        if (this.special.specificUnits == null) {
            return 0;
        }
        var pa = 0;
        var data = this.special.specificUnits;
        for (var i = 0; i < data.length; i++) {
            var upgrade = data[i];
            if (this.contains(upgrade.units, unitId)) {
                pa += upgrade.pa;
            }
        }
        return pa;
    };
    Civ.prototype.contains = function (a, unitId) {
        var i = a.length;
        while (i--) {
            if (a[i] === unitId) {
                return true;
            }
        }
        return false;
    };
    return Civ;
}());
var civs = [
    new Civ(0, "Aztecs", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png/revision/latest?cb=20191107173129", [units.champion, units.condottiero, units.eliteEagleWarrior, units.eliteJaguarWarrior], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], {
        infantry: [
            { name: "Garland Wars", atk: 4, rof: 0, hp: 0, ma: 0, pa: 0 }
        ]
    }),
    new Civ(1, "Berbers", "https://vignette.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png/revision/latest?cb=20191107173130", [units.champion, units.condottiero, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(2, "Britons", "https://vignette.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest?cb=20191107173130", [units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(34, "Bulgarians", "https://vignette.wikia.nocookie.net/ageofempires/images/c/ce/CivIcon-Bulgarians.png/revision/latest/scale-to-width-down/104?cb=20191107173130", [units.champion, units.condottiero, units.eDismountedKonnik, units.halbardier, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }
    // TODO Stirrups, Bagains https://ageofempires.fandom.com/wiki/Bulgarians/Tree
    ),
    new Civ(3, "Byzantines", "https://vignette.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png/revision/latest?cb=20191107173131", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(4, "Burmese", "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png/revision/latest?cb=20191107173131", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], 
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
    }),
    new Civ(5, "Celts", "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Celts.png/revision/latest?cb=20191107173132", [units.champion, units.condottiero, units.eWoadRaider, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(6, "Chinese", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png/revision/latest?cb=20191107173132", [units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(7, "Cumans", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png/revision/latest?cb=20191107173133", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(8, "Ethiopians", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cb/CivIcon-Ethiopians.png/revision/latest?cb=20191107173133", [units.condottiero, units.eShotel, units.halbardier, units.hussar, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(9, "Franks", "https://vignette.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png/revision/latest?cb=2019110717323", [units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(10, "Goths", "https://vignette.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png/revision/latest?cb=20191107173238", [units.champion, units.condottiero, units.eliteHuskarl, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], { infantry: [] }),
    new Civ(11, "Huns", "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/CivIcon-Huns.png/revision/latest?cb=20191107173238", [units.condottiero, units.halbardier, units.hussar, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], { infantry: [] }),
    new Civ(12, "Incas", "https://vignette.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png/revision/latest?cb=20191107173239", [units.champion, units.condottiero, units.eliteEagleWarrior, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(13, "Indians", "https://vignette.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png/revision/latest?cb=20191107173239", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], { infantry: [] }),
    new Civ(14, "Italians", "https://vignette.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png/revision/latest?cb=20191116050557", [units.champion, units.condottiero, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], {
        infantry: [],
        specificUnits: [
            { name: "Pavise", atk: 0, rof: 0, hp: 0, ma: 1, pa: 1, units: [UnitId.condottiero] }
        ]
    }),
    new Civ(15, "Japanese", "https://vignette.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest?cb=20191107173240", [units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], {
        infantry: [
            { name: "Civ bonus", atk: 0, rof: 33, hp: 0, ma: 0, pa: 0 }
        ]
    }),
    new Civ(16, "Khmer", "https://vignette.wikia.nocookie.net/ageofempires/images/e/ec/CivIcon-Khmer.png/revision/latest?cb=20191107173240", [units.condottiero, units.halbardier, units.hussar, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], { infantry: [] }),
    new Civ(17, "Koreans", "https://vignette.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png/revision/latest?cb=20191107173241", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(18, "Lithuanians", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png/revision/latest?cb=20191107173241", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], { infantry: [] }),
    new Civ(19, "Magyars", "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png/revision/latest?cb=20191107173242", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], { infantry: [] }),
    new Civ(20, "Malians", "https://vignette.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png/revision/latest?cb=20191107173334", [units.champion, units.condottiero], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], {
        infantry: [
            { name: "Civ bonus", atk: 0, rof: 0, hp: 0, ma: 0, pa: 3 }
        ]
    }),
    new Civ(21, "Malay", "https://vignette.wikia.nocookie.net/ageofempires/images/c/c3/CivIcon-Malay.png/revision/latest?cb=20191107173334", [units.condottiero, units.eKarambit, units.halbardier, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(22, "Mayans", "https://vignette.wikia.nocookie.net/ageofempires/images/0/05/CivIcon-Mayans.png/revision/latest?cb=20191107173335", [units.condottiero, units.eliteEagleWarrior, units.halbardier, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(23, "Mongols", "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png/revision/latest?cb=20191107173335", [units.champion, units.condottiero, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(24, "Persians", "https://vignette.wikia.nocookie.net/ageofempires/images/a/ad/CivIcon-Persians.png/revision/latest?cb=20191107173335", [units.condottiero, units.halbardier, units.hussar, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(25, "Portuguese", "https://vignette.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png/revision/latest?cb=20191107173336", [units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(26, "Saracens", "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png/revision/latest?cb=20191107173336", [units.champion, units.condottiero, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(27, "Slavs", "https://vignette.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png/revision/latest?cb=20191107173337", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(28, "Spanish", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png/revision/latest?cb=20191107173337", [units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(29, "Tatars", "https://vignette.wikia.nocookie.net/ageofempires/images/f/f2/CivIcon-Tatars.png/revision/latest?cb=20191107173338", [units.condottiero, units.halbardier, units.hussar, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor], { infantry: [] }),
    new Civ(30, "Teutons", "https://vignette.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png/revision/latest?cb=20191107173408", [units.champion, units.condottiero, units.eliteTeutonicKnight, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(31, "Turks", "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png/revision/latest?cb=20191107173409", [units.champion, units.condottiero, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(32, "Vietnamese", "https://vignette.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png/revision/latest?cb=20191107173409", [units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], { infantry: [] }),
    new Civ(33, "Vikings", "https://vignette.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png/revision/latest?cb=20191107173410", [units.champion, units.condottiero], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], {
        infantry: [
            { name: "Civ bonus", atk: 0, rof: 0, hp: 20, ma: 0, pa: 0 }
        ]
    })
];
//# sourceMappingURL=data.js.map