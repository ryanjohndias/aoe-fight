var UnitType;
(function (UnitType) {
    UnitType[UnitType["infantry"] = 0] = "infantry";
    UnitType[UnitType["cavalry"] = 1] = "cavalry";
})(UnitType || (UnitType = {}));
var ArmourClass;
(function (ArmourClass) {
    ArmourClass[ArmourClass["infantry"] = 0] = "infantry";
    ArmourClass[ArmourClass["cavalry"] = 1] = "cavalry";
    ArmourClass[ArmourClass["uniqueUnit"] = 2] = "uniqueUnit";
    ArmourClass[ArmourClass["eagleWarrior"] = 3] = "eagleWarrior";
    ArmourClass[ArmourClass["camel"] = 4] = "camel";
    ArmourClass[ArmourClass["warElephant"] = 5] = "warElephant";
    ArmourClass[ArmourClass["mameluke"] = 6] = "mameluke";
    ArmourClass[ArmourClass["condottiero"] = 7] = "condottiero";
    ArmourClass[ArmourClass["spearman"] = 8] = "spearman";
})(ArmourClass || (ArmourClass = {}));
var Upgrade = /** @class */ (function () {
    function Upgrade(hp, atk, rof, ma, pa) {
        this.hp = hp;
        this.atk = atk;
        this.rof = rof;
        this.ma = ma;
        this.pa = pa;
    }
    Upgrade.prototype.dps = function () {
        return this.atk / this.rof;
    };
    return Upgrade;
}());
var upgrades = {
    forging: new Upgrade(0, 1, 0, 0, 0),
    ironCasting: new Upgrade(0, 1, 0, 0, 0),
    blastFurnace: new Upgrade(0, 2, 0, 0, 0),
    scaleMailArmor: new Upgrade(0, 0, 0, 1, 1),
    chainMailArmor: new Upgrade(0, 0, 0, 1, 1),
    plateMailArmor: new Upgrade(0, 0, 0, 1, 2),
    scaleBardingArmor: new Upgrade(0, 0, 0, 1, 1),
    chainBardingArmor: new Upgrade(0, 0, 0, 1, 1),
    plateBardingArmor: new Upgrade(0, 0, 0, 1, 2),
    bloodlines: new Upgrade(20, 0, 0, 0, 0)
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
    UnitId["xolotl"] = "xolotl";
    UnitId["knight"] = "knight";
    UnitId["cavalier"] = "cavalier";
    UnitId["paladin"] = "paladin";
    UnitId["camel"] = "camel";
    UnitId["heavyCamel"] = "heavyCamel";
    UnitId["imperialCamel"] = "imperialCamel";
    UnitId["eBattleElephant"] = "eBattleElephant";
    UnitId["eSteppeLancer"] = "eSteppeLancer";
    UnitId["eLeitis"] = "eLeitis";
    UnitId["eKeshik"] = "eKeshik";
    UnitId["eKonnik"] = "eKonnik";
    UnitId["eBoyar"] = "eBoyar";
    UnitId["eSamurai"] = "eSamurai";
    UnitId["eWarElephant"] = "eWarElephant";
    UnitId["eCataphract"] = "eCataphract";
    UnitId["eBerserk"] = "eBerserk";
    UnitId["eMagyarHuszar"] = "eMagyarHuszar";
    UnitId["eKamayuk"] = "eKamayuk";
})(UnitId || (UnitId = {}));
var AttackBonus = /** @class */ (function () {
    function AttackBonus(armourClass, value) {
        this.armourClass = armourClass;
        this.value = value;
    }
    return AttackBonus;
}());
var CivUnit = /** @class */ (function () {
    function CivUnit(unit, civ) {
        this.unit = unit;
        this.civ = civ;
        // HP modification
        var hpUpgrades = civ.totalHPUpgrade(unit.type);
        var hpSpecial = civ.totalSpecialHPUpgrade();
        var hpTotal = unit.hp + (this.unit.hp * (hpSpecial / 100)) + hpUpgrades;
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
        this.upgrades = new Upgrade(hpUpgrades, atkUpgrades, 0, maUpgrades, paUpgrades);
        this.special = new Upgrade(hpSpecial, atkSpecial, rofSpecial, maSpecial, paSpecial);
        this.total = new Upgrade(hpTotal, atkTotal, rofTotal, maTotal, paTotal);
    }
    return CivUnit;
}());
var Unit = /** @class */ (function () {
    function Unit(id, numericId, name, type, img, cost, hp, atk, rof, ad, ma, pa, atkBonuses, armourClasses) {
        this.id = id;
        this.numericId = numericId;
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
        this.armourClasses = armourClasses;
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
    champion: new Unit(UnitId.champion, 10, "Champion", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/54/Champion_aoe2DE.png/revision/latest?cb=20200402012808", new Cost(60, 20, 0, 0), 70, 13, 2.0, 0.63, 1, 1, [new AttackBonus(ArmourClass.eagleWarrior, 8)], [ArmourClass.infantry]),
    condottiero: new Unit(UnitId.condottiero, 11, "Condottiero", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CondottieroIcon-DE.png/revision/latest?cb=20191230141010", new Cost(50, 35, 0, 0), 80, 10, 1.9, 0.75, 1, 0, [], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit,
        ArmourClass.condottiero,
    ]),
    halbardier: new Unit(UnitId.halbardier, 12, "Halbardier", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/aa/Halberdier_aoe2DE.png/revision/latest?cb=20200403174747", new Cost(35, 0, 25, 0), 60, 6, 3.05, 0.5, 0, 0, [
        new AttackBonus(ArmourClass.camel, 26),
        new AttackBonus(ArmourClass.cavalry, 32),
        new AttackBonus(ArmourClass.eagleWarrior, 1),
        new AttackBonus(ArmourClass.warElephant, 28),
        new AttackBonus(ArmourClass.mameluke, 11)
    ], [
        ArmourClass.infantry,
        ArmourClass.spearman
    ]),
    hussar: new Unit(UnitId.hussar, 13, "Hussar", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Hussar_aoe2DE.png/revision/latest?cb=20200403174747", new Cost(80, 0, 0, 0), 75, 7, 1.9, 0.95, 0, 2, [], [
        ArmourClass.cavalry
    ]),
    eliteEagleWarrior: new Unit(UnitId.eliteEagleWarrior, 14, "Elite Eagle Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Eliteeaglewarrior_aoe2DE.png/revision/latest?cb=20200331191114", new Cost(20, 50, 0, 0), 60, 9, 2, 0.8, 0, 4, [
        new AttackBonus(ArmourClass.cavalry, 3),
        new AttackBonus(ArmourClass.camel, 2)
    ], [
        ArmourClass.cavalry
    ]),
    eliteHuskarl: new Unit(UnitId.eliteHuskarl, 15, "Elite Huskarl", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/HuskarlIcon-DE.png/revision/latest?cb=20191230145804", new Cost(52, 26, 0, 0), 70, 12, 2, 0.8, 0, 8, [new AttackBonus(ArmourClass.eagleWarrior, 3)], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eliteJaguarWarrior: new Unit(UnitId.eliteJaguarWarrior, 16, "Elite Jaguar Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/3/32/JaguarWarriorIcon-DE.png/revision/latest?cb=20191230143816", new Cost(60, 30, 0, 0), 75, 12, 2, 0.8, 2, 1, [
        new AttackBonus(ArmourClass.infantry, 11),
        new AttackBonus(ArmourClass.eagleWarrior, 2),
        new AttackBonus(ArmourClass.condottiero, 10)
    ], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eliteTeutonicKnight: new Unit(UnitId.eliteTeutonicKnight, 17, "Elite Teutonic Knight", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/9/95/TeutonicKnightIcon-DE.png/revision/latest?cb=20200325131355", new Cost(85, 40, 0, 0), 100, 17, 2.0, 0.75, 10, 2, [new AttackBonus(ArmourClass.eagleWarrior, 4)], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eWoadRaider: new Unit(UnitId.eWoadRaider, 18, "Elite Woad Raider", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/55/WoadRaiderIcon-DE.png/revision/latest?cb=20191230150759", new Cost(65, 25, 0, 0), 80, 13, 2, 0.72, 0, 1, [new AttackBonus(ArmourClass.eagleWarrior, 3)], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eShotel: new Unit(UnitId.eShotel, 19, "Elite Shotel Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/0/03/Shotelwarrioricon-DE.png/revision/latest?cb=20191210075606", new Cost(50, 30, 0, 0), 50, 18, 2, 0.75, 0, 1, [new AttackBonus(ArmourClass.eagleWarrior, 2)], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eKarambit: new Unit(UnitId.eKarambit, 20, "Elite Karambit Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/75/Karambitwarrioricon-DE.png/revision/latest/scale-to-width-down/256?cb=20191117115320", new Cost(25, 15, 0, 0), 40, 7, 2, 0.81, 1, 1, [new AttackBonus(ArmourClass.eagleWarrior, 2)], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eDismountedKonnik: new Unit(UnitId.eDismountedKonnik, 21, "Elite Dismounted Konnik", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/b5/Konnikdismountedicon.png/revision/latest/scale-to-width-down/256?cb=20191110154253", new Cost(60, 70, 0, 0), 50, 13, 2.4, 0.7, 0, 1, [], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    twoHandedSwordsman: new Unit(UnitId.twoHandedSwordsman, 22, "Two-Handed Swordsman", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/3/3c/Twohanded_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401184348", new Cost(60, 20, 0, 0), 60, 12, 2, 0.5, 0, 1, [new AttackBonus(ArmourClass.eagleWarrior, 8)], [
        ArmourClass.infantry
    ]),
    xolotl: new Unit(UnitId.xolotl, 23, "Xolotl Warrior", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/Xolotlicon.png/revision/latest/scale-to-width-down/256?cb=20191231081129", new Cost(60, 75, 0, 0), 100, 10, 1.8, 0.68, 2, 2, [], [
        ArmourClass.cavalry
    ]),
    knight: new Unit(UnitId.knight, 24, "Knight", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/7e/Knight_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401180458", new Cost(60, 75, 0, 0), 100, 10, 1.8, 0.68, 2, 2, [], [
        ArmourClass.cavalry
    ]),
    cavalier: new Unit(UnitId.cavalier, 25, "Cavalier", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/Cavalier_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401184346", new Cost(60, 75, 0, 0), 120, 12, 1.8, 0.68, 2, 2, [], [
        ArmourClass.cavalry
    ]),
    paladin: new Unit(UnitId.paladin, 26, "Paladin", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/2/28/Paladin_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401180849", new Cost(60, 75, 0, 0), 160, 14, 1.9, 0.68, 2, 3, [], [
        ArmourClass.cavalry
    ]),
    camel: new Unit(UnitId.camel, 27, "Camel Rider", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/f/ff/Camelrider_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200331164238", new Cost(55, 60, 0, 0), 100, 6, 2, 0.5, 0, 0, [
        new AttackBonus(ArmourClass.cavalry, 9),
        new AttackBonus(ArmourClass.camel, 5)
    ], [
        ArmourClass.camel
    ]),
    heavyCamel: new Unit(UnitId.heavyCamel, 28, "Heavy Camel Rider", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/8/89/Aoe2_heavycamelriderDE.png/revision/latest/scale-to-width-down/256?cb=20200330225627", new Cost(55, 60, 0, 0), 120, 7, 2, 0.5, 0, 0, [
        new AttackBonus(ArmourClass.cavalry, 18),
        new AttackBonus(ArmourClass.camel, 9),
        new AttackBonus(ArmourClass.mameluke, 7)
    ], [
        ArmourClass.camel
    ]),
    imperialCamel: new Unit(UnitId.imperialCamel, 29, "Imperial Camel Rider", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/5d/ImperialCamelRiderIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230143407", new Cost(55, 60, 0, 0), 140, 9, 2, 0.5, 0, 0, [
        new AttackBonus(ArmourClass.cavalry, 18),
        new AttackBonus(ArmourClass.camel, 9),
        new AttackBonus(ArmourClass.mameluke, 7)
    ], [
        ArmourClass.camel
    ]),
    eBattleElephant: new Unit(UnitId.eBattleElephant, 30, "Elite Battle Elephant", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/b2/Elite_battle_elephant_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200414003052", new Cost(120, 70, 0, 0), 300, 14, 2, 0.49, 1, 3, [], [
        ArmourClass.cavalry,
        ArmourClass.warElephant
    ]),
    eSteppeLancer: new Unit(UnitId.eSteppeLancer, 31, "Elite Steppe Lancer", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/Elitesteppelancericon.png/revision/latest/scale-to-width-down/256?cb=20191110161918", new Cost(70, 45, 0, 0), 80, 11, 2.3, 0.68, 0, 1, [], [
        ArmourClass.cavalry
    ]),
    eLeitis: new Unit(UnitId.eLeitis, 32, "Elite Leitis", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/6/64/Leitisicon.png/revision/latest/scale-to-width-down/256?cb=20191110154530", new Cost(70, 50, 0, 0), 130, 14, 1.9, 0.7, 2, 1, [
    // TODO: Ignores unit armour
    ], [
        ArmourClass.cavalry,
        ArmourClass.uniqueUnit
    ]),
    eKeshik: new Unit(UnitId.eKeshik, 33, "Elite Keshik", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/4/4c/Keshikicon.png/revision/latest/scale-to-width-down/256?cb=20191110154643", new Cost(50, 40, 0, 0), 140, 11, 1.9, 0.7, 1, 3, [], [
        ArmourClass.cavalry,
        ArmourClass.uniqueUnit
    ]),
    eKonnik: new Unit(UnitId.eKonnik, 34, "Elite Konnik", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/8/88/Konnikicon.png/revision/latest/scale-to-width-down/256?cb=20191110154203", new Cost(60, 70, 0, 0), 120, 14, 2.4, 0.7, 2, 2, [], [
        ArmourClass.cavalry,
        ArmourClass.uniqueUnit
    ]),
    eBoyar: new Unit(UnitId.eBoyar, 35, "Elite Boyar", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/bf/BoyarIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230135130", new Cost(50, 80, 0, 0), 130, 14, 1.9, 0.7, 6, 3, [], [
        ArmourClass.cavalry,
        ArmourClass.uniqueUnit
    ]),
    eSamurai: new Unit(UnitId.eSamurai, 36, "Elite Samurai", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/SamuraiIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230150219", new Cost(60, 30, 0, 0), 80, 12, 1.45, 0.8, 1, 1, [
        new AttackBonus(ArmourClass.uniqueUnit, 12),
        new AttackBonus(ArmourClass.eagleWarrior, 3)
    ], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eWarElephant: new Unit(UnitId.eWarElephant, 37, "Elite War Elephant", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/ab/WarElephantIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230145604", new Cost(200, 75, 0, 0), 600, 20, 2, 0.56, 1, 3, [], [
        ArmourClass.cavalry,
        ArmourClass.warElephant,
        ArmourClass.uniqueUnit
    ]),
    eCataphract: new Unit(UnitId.eCataphract, 38, "Elite Cataphract", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/bd/CataphractIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20200325131320", new Cost(70, 75, 0, 0), 150, 12, 1.7, 0.68, 2, 1, [
        new AttackBonus(ArmourClass.infantry, 12),
        new AttackBonus(ArmourClass.condottiero, 10)
    ], [
        ArmourClass.cavalry,
        ArmourClass.uniqueUnit
    ]),
    eBerserk: new Unit(UnitId.eBerserk, 39, "Elite Berserk", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/BerserkIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230150427", new Cost(65, 25, 0, 0), 62.5, 14, 2.0, 0.5, 2, 1, // TODO: Confirm this is the correct health
    [
        new AttackBonus(ArmourClass.eagleWarrior, 3)
    ], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ]),
    eMagyarHuszar: new Unit(UnitId.eMagyarHuszar, 40, "Elite Magyar Huszar", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/5b/MagyarHuszarIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230140432", new Cost(80, 10, 0, 0), 85, 10, 1.8, 0.68, 0, 2, [], [
        ArmourClass.cavalry,
        ArmourClass.uniqueUnit
    ]),
    eKamayuk: new Unit(UnitId.eKamayuk, 41, "Elite Kamayuk", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/8/85/KamayukIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230141856", new Cost(60, 30, 0, 0), 80, 8, 2.0, 0.5, 1, 0, [
        new AttackBonus(ArmourClass.warElephant, 20),
        new AttackBonus(ArmourClass.cavalry, 12),
        new AttackBonus(ArmourClass.camel, 10),
        new AttackBonus(ArmourClass.mameluke, 1)
    ], [
        ArmourClass.infantry,
        ArmourClass.uniqueUnit
    ])
};
var Civ = /** @class */ (function () {
    function Civ(id, name, adjective, image, units, meleeUpgrades, infantryArmourUpgrades, cavUpgrades, special) {
        this.id = id;
        this.name = name;
        this.adjective = adjective;
        this.image = image;
        this.units = units;
        this.meleeUpgrades = meleeUpgrades;
        this.infantryArmourUpgrades = infantryArmourUpgrades;
        this.cavUpgrades = cavUpgrades;
        this.special = special;
    }
    Civ.prototype.totalHPUpgrade = function (unitType) {
        var hp = 0;
        if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach(function (upgrade) { return hp += upgrade.hp; });
        }
        return hp;
    };
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
            this.cavUpgrades.forEach(function (upgrade) { return ma += upgrade.ma; });
        }
        return ma;
    };
    Civ.prototype.totalBlacksmithPAUpgrade = function (unitType) {
        var pa = 0;
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach(function (upgrade) { return pa += upgrade.pa; });
        }
        else if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach(function (upgrade) { return pa += upgrade.pa; });
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
    new Civ(10, "Aztecs", "Aztec", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png/revision/latest?cb=20191107173129", [units.champion, units.condottiero, units.eliteEagleWarrior, units.eliteJaguarWarrior, units.xolotl], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [], {
        infantry: [
            { name: "Garland Wars", atk: 4, rof: 0, hp: 0, ma: 0, pa: 0 }
        ]
    }),
    new Civ(11, "Berbers", "Berber", "https://vignette.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png/revision/latest?cb=20191107173130", [units.cavalier, units.champion, units.condottiero, units.hussar, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(12, "Britons", "British", "https://vignette.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest?cb=20191107173130", [units.cavalier, units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(13, "Bulgarians", "Bulgarian", "https://vignette.wikia.nocookie.net/ageofempires/images/c/ce/CivIcon-Bulgarians.png/revision/latest/scale-to-width-down/104?cb=20191107173130", [units.cavalier, units.condottiero, units.eDismountedKonnik, units.halbardier, units.eKonnik, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [upgrades.bloodlines] }
    // TODO Stirrups, Bagains https://ageofempires.fandom.com/wiki/Bulgarians/Tree
    ),
    new Civ(14, "Byzantines", "Byzantine", "https://vignette.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png/revision/latest?cb=20191107173131", [units.champion, units.condottiero, units.eCataphract, units.halbardier, units.hussar, units.heavyCamel, units.paladin], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(15, "Burmese", "Burmese", "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png/revision/latest?cb=20191107173131", [units.cavalier, units.champion, units.condottiero, units.eBattleElephant, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], 
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
    new Civ(16, "Celts", "Celtic", "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Celts.png/revision/latest?cb=20191107173132", [units.champion, units.condottiero, units.eWoadRaider, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
    new Civ(17, "Chinese", "Chinese", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png/revision/latest?cb=20191107173132", [units.cavalier, units.champion, units.condottiero, units.halbardier, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(18, "Cumans", "Cuman", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png/revision/latest?cb=20191107173133", [units.camel, units.champion, units.condottiero, units.eSteppeLancer, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(19, "Ethiopians", "Ethiopian", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cb/CivIcon-Ethiopians.png/revision/latest?cb=20191107173133", [units.cavalier, units.condottiero, units.eShotel, units.halbardier, units.hussar, units.heavyCamel, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
    new Civ(20, "Franks", "Frank", "https://vignette.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png/revision/latest?cb=2019110717323", [units.champion, units.condottiero, units.halbardier, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(21, "Goths", "Goth", "https://vignette.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png/revision/latest?cb=20191107173238", [units.cavalier, units.champion, units.condottiero, units.eliteHuskarl, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
    new Civ(22, "Huns", "Hun", "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/CivIcon-Huns.png/revision/latest?cb=20191107173238", [units.condottiero, units.halbardier, units.hussar, units.paladin, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(23, "Incas", "Incan", "https://vignette.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png/revision/latest?cb=20191107173239", [units.champion, units.condottiero, units.eliteEagleWarrior, units.eKamayuk, units.halbardier, units.xolotl], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [], { infantry: [] }),
    new Civ(24, "Indians", "Indian", "https://vignette.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png/revision/latest?cb=20191107173239", [units.champion, units.condottiero, units.halbardier, units.hussar, units.imperialCamel, units.knight], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
    new Civ(25, "Italians", "Italian", "https://vignette.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png/revision/latest?cb=20191116050557", [units.cavalier, units.champion, units.condottiero, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], {
        infantry: [],
        specificUnits: [
            { name: "Pavise", atk: 0, rof: 0, hp: 0, ma: 1, pa: 1, units: [UnitId.condottiero] }
        ]
    }),
    new Civ(26, "Japanese", "Japanese", "https://vignette.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest?cb=20191107173240", [units.cavalier, units.champion, units.condottiero, units.eSamurai, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], {
        infantry: [
            { name: "Civ bonus", atk: 0, rof: 33, hp: 0, ma: 0, pa: 0 }
        ]
    }),
    new Civ(27, "Khmer", "Khmer", "https://vignette.wikia.nocookie.net/ageofempires/images/e/ec/CivIcon-Khmer.png/revision/latest?cb=20191107173240", [units.cavalier, units.condottiero, units.eBattleElephant, units.halbardier, units.hussar, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(28, "Koreans", "Korean", "https://vignette.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png/revision/latest?cb=20191107173241", [units.cavalier, units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
    new Civ(29, "Lithuanians", "Lithuanian", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png/revision/latest?cb=20191107173241", [units.champion, units.condottiero, units.eLeitis, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(30, "Magyars", "Magyar", "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png/revision/latest?cb=20191107173242", [units.champion, units.condottiero, units.eMagyarHuszar, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(31, "Malians", "Malian", "https://vignette.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png/revision/latest?cb=20191107173334", [units.cavalier, units.champion, units.condottiero, units.heavyCamel], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], {
        infantry: [
            { name: "Civ bonus", atk: 0, rof: 0, hp: 0, ma: 0, pa: 3 }
        ]
    }),
    new Civ(32, "Malay", "Malay", "https://vignette.wikia.nocookie.net/ageofempires/images/c/c3/CivIcon-Malay.png/revision/latest?cb=20191107173334", [units.cavalier, units.condottiero, units.eBattleElephant, units.eKarambit, units.halbardier, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor], { infantry: [] }),
    new Civ(33, "Mayans", "Mayan", "https://vignette.wikia.nocookie.net/ageofempires/images/0/05/CivIcon-Mayans.png/revision/latest?cb=20191107173335", [units.condottiero, units.eliteEagleWarrior, units.halbardier, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [], { infantry: [] }),
    new Civ(34, "Mongols", "Mongol", "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png/revision/latest?cb=20191107173335", [units.cavalier, units.champion, units.condottiero, units.eSteppeLancer, units.hussar, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
    new Civ(35, "Persians", "Persian", "https://vignette.wikia.nocookie.net/ageofempires/images/a/ad/CivIcon-Persians.png/revision/latest?cb=20191107173335", [units.condottiero, units.eWarElephant, units.halbardier, units.hussar, units.heavyCamel, units.paladin, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(36, "Portuguese", "Portuguese", "https://vignette.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png/revision/latest?cb=20191107173336", [units.cavalier, units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(37, "Saracens", "Saracen", "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png/revision/latest?cb=20191107173336", [units.champion, units.condottiero, units.hussar, units.heavyCamel, units.knight], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(38, "Slavs", "Slavic", "https://vignette.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png/revision/latest?cb=20191107173337", [units.eBoyar, units.cavalier, units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(39, "Spanish", "Spanish", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png/revision/latest?cb=20191107173337", [units.champion, units.condottiero, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(40, "Tatars", "Tatar", "https://vignette.wikia.nocookie.net/ageofempires/images/f/f2/CivIcon-Tatars.png/revision/latest?cb=20191107173338", [units.cavalier, units.condottiero, units.eSteppeLancer, units.halbardier, units.hussar, units.heavyCamel, units.eKeshik, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(41, "Teutons", "Teutonic", "https://vignette.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png/revision/latest?cb=20191107173408", [units.champion, units.condottiero, units.eliteTeutonicKnight, units.halbardier, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(42, "Turks", "Turkish", "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png/revision/latest?cb=20191107173409", [units.cavalier, units.champion, units.condottiero, units.hussar, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(43, "Vietnamese", "Vietnamese", "https://vignette.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png/revision/latest?cb=20191107173409", [units.cavalier, units.champion, units.condottiero, units.eBattleElephant, units.halbardier], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
    new Civ(44, "Vikings", "Viking", "https://vignette.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png/revision/latest?cb=20191107173410", [units.eBerserk, units.cavalier, units.champion, units.condottiero], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], {
        infantry: [
            { name: "Civ bonus", atk: 0, rof: 0, hp: 20, ma: 0, pa: 0 }
        ]
    })
];
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.getCiv = function (id) {
        for (var _i = 0, civs_1 = civs; _i < civs_1.length; _i++) {
            var civ = civs_1[_i];
            if (civ.id == id) {
                return civ;
            }
        }
        return null;
    };
    Service.prototype.getUnitByNumericId = function (id) {
        for (var _i = 0, _a = Object.keys(units); _i < _a.length; _i++) {
            var unitId = _a[_i];
            var unit = units[unitId];
            if (unit.numericId == id) {
                return unit;
            }
        }
        return null;
    };
    return Service;
}());
//# sourceMappingURL=data.js.map