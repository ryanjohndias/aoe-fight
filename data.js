var UnitType;
(function (UnitType) {
    UnitType[UnitType["infantry"] = 0] = "infantry";
    UnitType[UnitType["cavalry"] = 1] = "cavalry";
})(UnitType || (UnitType = {}));
var Upgrade = /** @class */ (function () {
    function Upgrade(atk, ma, pa) {
        this.atk = atk;
        this.ma = ma;
        this.pa = pa;
    }
    return Upgrade;
}());
var upgrades = {
    forging: new Upgrade(1, 0, 0),
    ironCasting: new Upgrade(1, 0, 0),
    blastFurnace: new Upgrade(2, 0, 0),
    scaleMailArmor: new Upgrade(0, 1, 1),
    chainMailArmor: new Upgrade(0, 1, 1),
    plateMailArmor: new Upgrade(0, 1, 2)
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
    UnitId["eliteEagleWarrior"] = "eliteEagleWarrior";
    UnitId["eliteTeutonicKnight"] = "eliteTeutonicKnight";
    UnitId["eWoadRaider"] = "eWoadRaider";
})(UnitId || (UnitId = {}));
// TODO: Unit, or UnitType
var AttackBonus = /** @class */ (function () {
    function AttackBonus(id, value) {
        this.id = id;
        this.value = value;
    }
    return AttackBonus;
}());
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
var CivUnit = /** @class */ (function () {
    function CivUnit(unit, civ) {
        this.unit = unit;
        this.civ = civ;
        // HP modification
        var hpSpecial = 0;
        civ.special.infantry.forEach(function (bonus) {
            hpSpecial += bonus.hp;
        });
        var hpTotal = unit.hp + (this.unit.hp * (hpSpecial / 100));
        // ATK modification
        var atkUpgrades = 0;
        civ.upgrades.melee.forEach(function (upgrade) {
            atkUpgrades += upgrade.atk;
        });
        var atkSpecial = 0;
        civ.special.infantry.forEach(function (upgrade) {
            atkSpecial += upgrade.atk;
        });
        var atkTotal = unit.atk + atkUpgrades + atkSpecial;
        // ROF modification
        var rofSpecial = 0;
        civ.special.infantry.forEach(function (upgrade) {
            rofSpecial -= upgrade.rof;
        });
        var rofTotal = unit.rof + (rofSpecial / 100);
        // Armor modification
        var maUpgrades = 0, paUpgrades = 0;
        civ.upgrades.infantryArmor.forEach(function (upgrade) {
            maUpgrades += upgrade.ma;
            paUpgrades += upgrade.pa;
        });
        var maTotal = unit.ma + maUpgrades;
        var paTotal = unit.pa + paUpgrades;
        this.upgrades = new UpgradeableStats(0, atkUpgrades, 0, maUpgrades, paUpgrades);
        this.special = new UpgradeableStats(hpSpecial, atkSpecial, rofSpecial, 0, 0);
        this.total = new UpgradeableStats(hpTotal, atkTotal, rofTotal, maTotal, paTotal);
    }
    return CivUnit;
}());
var Unit = /** @class */ (function () {
    function Unit(id, name, type, img, cost, hp, atk, rof, ma, pa, atkBonuses) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.img = img;
        this.cost = cost;
        this.hp = hp;
        this.atk = atk;
        this.rof = rof;
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
    champion: new Unit(UnitId.champion, "Champion", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/54/Champion_aoe2DE.png/revision/latest?cb=20200402012808", new Cost(60, 20, 0, 0), 70, 13, 2.0, 1, 1, [new AttackBonus(UnitId.eliteEagleWarrior, 8)]),
    // TODO: Pavise
    condottiero: new Unit(UnitId.condottiero, "Condottiero", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CondottieroIcon-DE.png/revision/latest?cb=20191230141010", new Cost(50, 35, 0, 0), 80, 10, 1.9, 1, 0, []),
    halbardier: new Unit(UnitId.halbardier, "Halbardier", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/aa/Halberdier_aoe2DE.png/revision/latest?cb=20200403174747", new Cost(35, 0, 25, 0), 60, 6, 3.05, 0, 0, [new AttackBonus(UnitId.eliteEagleWarrior, 1)]),
    eliteEagleWarrior: new Unit(UnitId.eliteEagleWarrior, "Elite Eagle Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Eliteeaglewarrior_aoe2DE.png/revision/latest?cb=20200331191114", new Cost(20, 50, 0, 0), 60, 9, 2, 0, 4, []),
    eliteTeutonicKnight: new Unit(UnitId.eliteTeutonicKnight, "Elite Teutonic Knight", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/9/95/TeutonicKnightIcon-DE.png/revision/latest?cb=20200325131355", new Cost(85, 40, 0, 0), 100, 17, 2.0, 10, 2, [new AttackBonus(UnitId.eliteEagleWarrior, 4)]),
    eWoadRaider: new Unit(UnitId.eWoadRaider, "Elite Woad Raider", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/55/WoadRaiderIcon-DE.png/revision/latest?cb=20191230150759", new Cost(65, 25, 0, 0), 80, 13, 2, 0, 1, [new AttackBonus(UnitId.eliteEagleWarrior, 3)])
    // xxxxx: new Unit (
    //     "xxxxxx",
    //     "xxxxxx",
    //     UnitType.infantry,
    //     "xxxxxx",
    //     new Cost(00000, 00000, 00000, 00000),
    //     00000, 00000, 00000, 00000, 00000
    // )
};
var Civs = [
    // {
    //     id: xxxxxx,
    //     name: "xxxxxx",
    //     image: "xxxxxx",
    //     units: [units.xxxx],
    //     upgrades: {
    //         melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
    //         infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
    //     },
    //     special: {
    //         melee: [],
    //        defence: []
    //     }
    // },
    {
        id: 0,
        name: "Aztecs",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png/revision/latest?cb=20191107173129",
        units: [units.champion, units.condottiero, units.eliteEagleWarrior],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: [
                {
                    name: "Garland Wars",
                    atk: 4,
                    rof: 0,
                    hp: 0,
                    ma: 0,
                    pa: 0
                }
            ]
        }
    },
    {
        id: 123445,
        name: "Berbers",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png/revision/latest?cb=20191107173130",
        units: [units.champion, units.condottiero],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 5262523,
        name: "Britons",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest?cb=20191107173130",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 896786,
        name: "Byzantines",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png/revision/latest?cb=20191107173131",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 1223322,
        name: "Burmese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png/revision/latest?cb=20191107173131",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            // TODO: Types for civ bonus vs unique tech
            // TODO: Cater for which age the bonus is available
            // TODO: Indicate if the bonus is accumulate, or exclusive to the age.
            // Possibly:
            // melee: [
            //     {type: .civBonus, age: .feudal, atk: 1},
            //     {type: .civBonus, age: .castle, atk: 1},
            //     {type: .civBonus, age: .imperial, atk: 1}
            // ]
            infantry: [
                {
                    name: "Civ bonus",
                    atk: 3,
                    rof: 0,
                    hp: 0,
                    ma: 0,
                    pa: 0
                }
            ]
        }
    },
    {
        id: 254234,
        name: "Celts",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Celts.png/revision/latest?cb=20191107173132",
        units: [units.champion, units.condottiero, units.eWoadRaider, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 345345,
        name: "Chinese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png/revision/latest?cb=20191107173132",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 23432411,
        name: "Cumans",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png/revision/latest?cb=20191107173133",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // TODO: Ethiopians units.halbardier
    {
        id: 34343,
        name: "Franks",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png/revision/latest?cb=20191107173237",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 3434,
        name: "Goths",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png/revision/latest?cb=20191107173238",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // Huns , units.halbardier
    {
        id: 34333334,
        name: "Incas",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png/revision/latest?cb=20191107173239",
        units: [units.champion, units.condottiero, units.eliteEagleWarrior, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
        // TODO: Fabric Shields
    },
    {
        id: 33,
        name: "Indians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png/revision/latest?cb=20191107173239",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 445,
        name: "Italians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png/revision/latest?cb=20191116050557",
        units: [units.champion, units.condottiero],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 5534,
        name: "Japanese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest?cb=20191107173240",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: [
                {
                    name: "Civ bonus",
                    atk: 0,
                    rof: 33,
                    hp: 0,
                    ma: 0,
                    pa: 0
                }
            ]
        }
    },
    // Khmer , units.halbardier
    {
        id: 3424244,
        name: "Koreans",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png/revision/latest?cb=20191107173241",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 34343,
        name: "Lithuanians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png/revision/latest?cb=20191107173241",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 662775,
        name: "Magyars",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png/revision/latest?cb=20191107173242",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 23452452,
        name: "Malians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png/revision/latest?cb=20191107173334",
        units: [units.champion, units.condottiero],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: [
                {
                    name: "Civ bonus",
                    atk: 0,
                    rof: 0,
                    hp: 0,
                    ma: 0,
                    pa: 3
                }
            ]
        }
    },
    // Malay , units.halbardier
    // Mayans , units.halbardier, , units.eliteEagleWarrior
    {
        id: 324234,
        name: "Mongols",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png/revision/latest?cb=20191107173335",
        units: [units.champion, units.condottiero],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // Persians , units.halbardier
    {
        id: 56583655,
        name: "Portuguese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png/revision/latest?cb=20191107173336",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 453333,
        name: "Saracens",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png/revision/latest?cb=20191107173336",
        units: [units.champion, units.condottiero],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 4423466,
        name: "Slavs",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png/revision/latest?cb=20191107173337",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 52354363,
        name: "Spanish",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png/revision/latest?cb=20191107173337",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // Tatars , units.halbardier
    {
        id: 1,
        name: "Teutons",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png/revision/latest?cb=20191107173408",
        units: [units.champion, units.condottiero, units.eliteTeutonicKnight, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 235664,
        name: "Turks",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png/revision/latest?cb=20191107173409",
        units: [units.champion, units.condottiero],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 7275,
        name: "Vietnamese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png/revision/latest?cb=20191107173409",
        units: [units.champion, units.condottiero, units.halbardier],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 88467,
        name: "Vikings",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png/revision/latest?cb=20191107173410",
        units: [units.champion, units.condottiero],
        upgrades: {
            melee: [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
            infantryArmor: [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor]
        },
        special: {
            infantry: [
                {
                    name: "Civ bonus",
                    atk: 0,
                    rof: 0,
                    hp: 20,
                    ma: 0,
                    pa: 0
                }
            ]
        }
    }
];
//# sourceMappingURL=data.js.map