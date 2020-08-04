var UnitType;
(function (UnitType) {
    UnitType[UnitType["infantry"] = 0] = "infantry";
    UnitType[UnitType["cavalry"] = 1] = "cavalry";
})(UnitType || (UnitType = {}));
var Unit = {
    champion: {
        id: "champion",
        name: "Champion",
        type: UnitType.infantry,
        img: "https://vignette.wikia.nocookie.net/ageofempires/images/5/54/Champion_aoe2DE.png/revision/latest?cb=20200402012808",
        res: {
            food: 60,
            gold: 20,
            wood: 0
        },
        hp: 70,
        atk: 13,
        rof: 2.0,
        ma: 1,
        pa: 1,
        bonus: [
        // {
        //     unit: Unit.eagle,
        //     amt: 8
        // }
        ]
    },
    // TODO: Somehow cater for Pavise, which is Italians only
    condottiero: {
        id: "condottiero",
        name: "Condottiero",
        type: UnitType.infantry,
        img: "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CondottieroIcon-DE.png/revision/latest?cb=20191230141010",
        res: {
            food: 50,
            gold: 35,
            wood: 0
        },
        hp: 80,
        atk: 10,
        rof: 1.9,
        ma: 1,
        pa: 0,
        bonus: []
    },
    halbardier: {
        id: "halbardier",
        name: "Halbardier",
        type: UnitType.infantry,
        img: "https://vignette.wikia.nocookie.net/ageofempires/images/a/aa/Halberdier_aoe2DE.png/revision/latest?cb=20200403174747",
        res: {
            food: 35,
            gold: 0,
            wood: 25
        },
        hp: 60,
        atk: 6,
        rof: 3.05,
        ma: 0,
        pa: 0,
        bonus: []
    },
    eliteTeutonicKnight: {
        id: "eliteTeutonicKnight",
        name: "Elite Teutonic Knight",
        type: UnitType.infantry,
        img: "https://vignette.wikia.nocookie.net/ageofempires/images/9/95/TeutonicKnightIcon-DE.png/revision/latest?cb=20200325131355",
        res: {
            food: 85,
            gold: 40,
            wood: 0
        },
        hp: 100,
        atk: 17,
        rof: 2.0,
        ma: 10,
        pa: 2,
        bonus: []
    }
};
var Upgrade = {
    forging: { atk: 1, ma: 0, pa: 0 },
    ironCasting: { atk: 1, ma: 0, pa: 0 },
    blastFurnace: { atk: 2, ma: 0, pa: 0 },
    scaleMailArmor: { atk: 0, ma: 1, pa: 1 },
    chainMailArmor: { atk: 0, ma: 1, pa: 1 },
    plateMailArmor: { atk: 0, ma: 1, pa: 2 }
};
var Civs = [
    // {
    //     id: xxxxxx,
    //     name: "xxxxxx",
    //     image: "xxxxxx",
    //     units: [Unit.xxxx],
    //     upgrades: {
    //         melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
    //         infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
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
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
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
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 5262523,
        name: "Britons",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest?cb=20191107173130",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 896786,
        name: "Byzantines",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png/revision/latest?cb=20191107173131",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 1223322,
        name: "Burmese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png/revision/latest?cb=20191107173131",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
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
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 345345,
        name: "Chinese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png/revision/latest?cb=20191107173132",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 23432411,
        name: "Cumans",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png/revision/latest?cb=20191107173133",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // TODO: Ethiopians Unit.halbardier
    {
        id: 34343,
        name: "Franks",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png/revision/latest?cb=20191107173237",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 3434,
        name: "Goths",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png/revision/latest?cb=20191107173238",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // Huns , Unit.halbardier
    {
        id: 34333334,
        name: "Incas",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png/revision/latest?cb=20191107173239",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 33,
        name: "Indians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png/revision/latest?cb=20191107173239",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 445,
        name: "Italians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png/revision/latest?cb=20191116050557",
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 5534,
        name: "Japanese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest?cb=20191107173240",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
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
    // Khmer , Unit.halbardier
    {
        id: 3424244,
        name: "Koreans",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png/revision/latest?cb=20191107173241",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 34343,
        name: "Lithuanians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png/revision/latest?cb=20191107173241",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 662775,
        name: "Magyars",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png/revision/latest?cb=20191107173242",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 23452452,
        name: "Malians",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png/revision/latest?cb=20191107173334",
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
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
    // Malay , Unit.halbardier
    // Mayans , Unit.halbardier
    {
        id: 324234,
        name: "Mongols",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png/revision/latest?cb=20191107173335",
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // Persians , Unit.halbardier
    {
        id: 56583655,
        name: "Portuguese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png/revision/latest?cb=20191107173336",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 453333,
        name: "Saracens",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png/revision/latest?cb=20191107173336",
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 4423466,
        name: "Slavs",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png/revision/latest?cb=20191107173337",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 52354363,
        name: "Spanish",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png/revision/latest?cb=20191107173337",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    // Tatars , Unit.halbardier
    {
        id: 1,
        name: "Teutons",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png/revision/latest?cb=20191107173408",
        units: [Unit.champion, Unit.condottiero, Unit.eliteTeutonicKnight, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 235664,
        name: "Turks",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png/revision/latest?cb=20191107173409",
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 7275,
        name: "Vietnamese",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png/revision/latest?cb=20191107173409",
        units: [Unit.champion, Unit.condottiero, Unit.halbardier],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
        },
        special: {
            infantry: []
        }
    },
    {
        id: 88467,
        name: "Vikings",
        image: "https://vignette.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png/revision/latest?cb=20191107173410",
        units: [Unit.champion, Unit.condottiero],
        upgrades: {
            melee: [Upgrade.forging, Upgrade.ironCasting, Upgrade.blastFurnace],
            infantryArmor: [Upgrade.scaleMailArmor, Upgrade.chainMailArmor, Upgrade.plateMailArmor]
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