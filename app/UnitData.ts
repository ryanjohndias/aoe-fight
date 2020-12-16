class UnitData {

    readonly units: { [key: string]: Unit; }

    constructor() {
        this.units = {
            champion: new Unit (
                UnitId.champion, 10,
                "Champion",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/5/54/Champion_aoe2DE.png/revision/latest?cb=20200402012808",
                new Cost(60, 20, 0, 0),
                70, 13, 2.0, 0.63, 1, 1,
                [new AttackBonus(ArmourClass.eagleWarrior, 8)],
                [ArmourClass.infantry]
            ),
            condottiero: new Unit (
                UnitId.condottiero, 11, 
                "Condottiero",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CondottieroIcon-DE.png/revision/latest?cb=20191230141010",
                new Cost(50, 35, 0, 0),
                80, 10, 1.9, 0.75, 1, 0, [],
                [
                    ArmourClass.infantry, // TODO: +10
                    ArmourClass.uniqueUnit,
                    ArmourClass.condottiero,
                ]
            ),
            halbardier: new Unit (
                UnitId.halbardier, 12,
                "Halbardier",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/a/aa/Halberdier_aoe2DE.png/revision/latest?cb=20200403174747",
                new Cost(35, 0, 25, 0),
                60, 6, 3.05, 0.5, 0, 0,
                [
                    new AttackBonus(ArmourClass.camel, 26),
                    new AttackBonus(ArmourClass.cavalry, 32),
                    new AttackBonus(ArmourClass.eagleWarrior, 1),
                    new AttackBonus(ArmourClass.warElephant, 28),
                    new AttackBonus(ArmourClass.mameluke, 11)
                ],
                [
                    ArmourClass.infantry,
                    ArmourClass.spearman
                ]
            ),
            hussar: new Unit (
                UnitId.hussar, 13,
                "Hussar",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Hussar_aoe2DE.png/revision/latest?cb=20200403174747",
                new Cost(80, 0, 0, 0),
                75, 7, 1.9, 0.95, 0, 2, [],
                [
                    ArmourClass.cavalry
                ]
            ),
            eliteEagleWarrior: new Unit (
                UnitId.eliteEagleWarrior, 14, 
                "Elite Eagle Warrior",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Eliteeaglewarrior_aoe2DE.png/revision/latest?cb=20200331191114",
                new Cost(20, 50, 0, 0),
                60, 9, 2, 0.8, 0, 4,
                [
                    new AttackBonus(ArmourClass.cavalry, 3),
                    new AttackBonus(ArmourClass.camel, 2)
                ],
                [
                    ArmourClass.cavalry
                ]
            ),
            eliteHuskarl: new Unit (
                UnitId.eliteHuskarl, 15, 
                "Elite Huskarl",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/HuskarlIcon-DE.png/revision/latest?cb=20191230145804",
                new Cost(52, 26, 0, 0),
                70, 12, 2, 0.8, 0, 8,
                [new AttackBonus(ArmourClass.eagleWarrior, 3)],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eliteJaguarWarrior: new Unit (
                UnitId.eliteJaguarWarrior, 16,
                "Elite Jaguar Warrior",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/3/32/JaguarWarriorIcon-DE.png/revision/latest?cb=20191230143816",
                new Cost(60, 30, 0, 0),
                75, 12, 2, 0.8, 2, 1,
                [
                    new AttackBonus(ArmourClass.infantry, 11),
                    new AttackBonus(ArmourClass.eagleWarrior, 2),
                    new AttackBonus(ArmourClass.condottiero, 10)
                ],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eliteTeutonicKnight: new Unit (
                UnitId.eliteTeutonicKnight, 17,
                "Elite Teutonic Knight",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/9/95/TeutonicKnightIcon-DE.png/revision/latest?cb=20200325131355",
                new Cost(85, 40, 0, 0),
                100, 17, 2.0, 0.75, 10, 2,
                [new AttackBonus(ArmourClass.eagleWarrior, 4)],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eWoadRaider: new Unit (
                UnitId.eWoadRaider, 18,
                "Elite Woad Raider",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/5/55/WoadRaiderIcon-DE.png/revision/latest?cb=20191230150759",
                new Cost(65, 25, 0, 0),
                80, 13, 2, 0.72, 0, 1,
                [new AttackBonus(ArmourClass.eagleWarrior, 3)],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eShotel: new Unit (
                UnitId.eShotel, 19,
                "Elite Shotel Warrior",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/0/03/Shotelwarrioricon-DE.png/revision/latest?cb=20191210075606",
                new Cost(50, 30, 0, 0),
                50, 18, 2, 0.75, 0, 1,
                [new AttackBonus(ArmourClass.eagleWarrior, 2)],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eKarambit: new Unit (
                UnitId.eKarambit, 20,
                "Elite Karambit Warrior",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/7/75/Karambitwarrioricon-DE.png/revision/latest/scale-to-width-down/256?cb=20191117115320",
                new Cost(25, 15, 0, 0),
                40, 7, 2, 0.81, 1, 1,
                [new AttackBonus(ArmourClass.eagleWarrior, 2)],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eDismountedKonnik: new Unit (
                UnitId.eDismountedKonnik, 21,
                "Elite Dismounted Konnik",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/b/b5/Konnikdismountedicon.png/revision/latest/scale-to-width-down/256?cb=20191110154253",
                new Cost(60, 70, 0, 0),
                50, 13, 2.4, 0.7, 0, 1,
                [],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            twoHandedSwordsman: new Unit (
                UnitId.twoHandedSwordsman, 22,
                "Two-Handed Swordsman",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/3/3c/Twohanded_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401184348",
                new Cost(60, 20, 0, 0),
                60, 12, 2, 0.5, 0, 1,
                [new AttackBonus(ArmourClass.eagleWarrior, 8)],
                [
                    ArmourClass.infantry
                ]
            ),
            xolotl: new Unit (
                UnitId.xolotl, 23,
                "Xolotl Warrior",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/Xolotlicon.png/revision/latest/scale-to-width-down/256?cb=20191231081129",
                new Cost(60, 75, 0, 0),
                100, 10, 1.8, 0.68, 2, 2,
                [],
                [
                    ArmourClass.cavalry
                ]
            ),
            knight: new Unit (
                UnitId.knight, 24,
                "Knight",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/7/7e/Knight_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401180458",
                new Cost(60, 75, 0, 0),
                100, 10, 1.8, 0.68, 2, 2,
                [],
                [
                    ArmourClass.cavalry
                ]
            ),
            cavalier: new Unit (
                UnitId.cavalier, 25,
                "Cavalier",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/Cavalier_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401184346",
                new Cost(60, 75, 0, 0),
                120, 12, 1.8, 0.68, 2, 2,
                [],
                [
                    ArmourClass.cavalry
                ]
            ),
            paladin: new Unit (
                UnitId.paladin, 26,
                "Paladin",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/2/28/Paladin_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401180849",
                new Cost(60, 75, 0, 0),
                160, 14, 1.9, 0.68, 2, 3,
                [],
                [
                    ArmourClass.cavalry
                ]
            ),
            camel: new Unit (
                UnitId.camel, 27,
                "Camel Rider",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/f/ff/Camelrider_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200331164238",
                new Cost(55, 60, 0, 0),
                100, 6, 2, 0.5, 0, 0,
                [
                    new AttackBonus(ArmourClass.cavalry, 9),
                    new AttackBonus(ArmourClass.camel, 5)
                ],
                [
                    ArmourClass.camel
                ]
            ),
            heavyCamel: new Unit (
                UnitId.heavyCamel, 28,
                "Heavy Camel Rider",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/8/89/Aoe2_heavycamelriderDE.png/revision/latest/scale-to-width-down/256?cb=20200330225627",
                new Cost(55, 60, 0, 0),
                120, 7, 2, 0.5, 0, 0,
                [
                    new AttackBonus(ArmourClass.cavalry, 18),
                    new AttackBonus(ArmourClass.camel, 9),
                    new AttackBonus(ArmourClass.mameluke, 7)
                ],
                [
                    ArmourClass.camel
                ]
            ),
            imperialCamel: new Unit (
                UnitId.imperialCamel, 29,
                "Imperial Camel Rider",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/5/5d/ImperialCamelRiderIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230143407",
                new Cost(55, 60, 0, 0),
                140, 9, 2, 0.5, 0, 0,
                [
                    new AttackBonus(ArmourClass.cavalry, 18),
                    new AttackBonus(ArmourClass.camel, 9),
                    new AttackBonus(ArmourClass.mameluke, 7)
                ],
                [
                    ArmourClass.camel
                ]
            ),
            eBattleElephant: new Unit (
                UnitId.eBattleElephant, 30,
                "Elite Battle Elephant",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/b/b2/Elite_battle_elephant_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200414003052",
                new Cost(120, 70, 0, 0),
                300, 14, 2, 0.49, 1, 3,
                [],
                [
                    ArmourClass.cavalry,
                    ArmourClass.warElephant
                ]
            ),
            eSteppeLancer: new Unit (
                UnitId.eSteppeLancer, 31,
                "Elite Steppe Lancer",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/Elitesteppelancericon.png/revision/latest/scale-to-width-down/256?cb=20191110161918",
                new Cost(70, 45, 0, 0),
                80, 11, 2.3, 0.68, 0, 1,
                [],
                [
                    ArmourClass.cavalry
                ]
            ),
            eLeitis: new Unit (
                UnitId.eLeitis, 32,
                "Elite Leitis",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/6/64/Leitisicon.png/revision/latest/scale-to-width-down/256?cb=20191110154530",
                new Cost(70, 50, 0, 0),
                130, 14, 1.9, 0.7, 2, 1,
                [
                    // TODO: Ignores unit armour
                ],
                [
                    ArmourClass.cavalry,
                    ArmourClass.uniqueUnit
                ]
            ), 
            eKeshik: new Unit (
                UnitId.eKeshik, 33,
                "Elite Keshik",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/4/4c/Keshikicon.png/revision/latest/scale-to-width-down/256?cb=20191110154643",
                new Cost(50, 40, 0, 0),
                140, 11, 1.9, 0.7, 1, 3,
                [],
                [
                    ArmourClass.cavalry,
                    ArmourClass.uniqueUnit
                ]
            ), 
            eKonnik: new Unit (
                UnitId.eKonnik, 34,
                "Elite Konnik",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/8/88/Konnikicon.png/revision/latest/scale-to-width-down/256?cb=20191110154203",
                new Cost(60, 70, 0, 0),
                120, 14, 2.4, 0.7, 2, 2,
                [],
                [
                    ArmourClass.cavalry,
                    ArmourClass.uniqueUnit
                ]
            ), 
            eBoyar: new Unit (
                UnitId.eBoyar, 35,
                "Elite Boyar",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/b/bf/BoyarIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230135130",
                new Cost(50, 80, 0, 0),
                130, 14, 1.9, 0.7, 6, 3,
                [],
                [
                    ArmourClass.cavalry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eSamurai: new Unit (
                UnitId.eSamurai, 36,
                "Elite Samurai",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/SamuraiIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230150219",
                new Cost(60, 30, 0, 0),
                80, 12, 1.45, 0.8, 1, 1,
                [
                    new AttackBonus(ArmourClass.uniqueUnit, 12),
                    new AttackBonus(ArmourClass.eagleWarrior, 3)
                ],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eWarElephant: new Unit (
                UnitId.eWarElephant, 37,
                "Elite War Elephant",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/a/ab/WarElephantIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230145604",
                new Cost(200, 75, 0, 0),
                600, 20, 2, 0.56, 1, 3,
                [],
                [
                    ArmourClass.cavalry,
                    ArmourClass.warElephant,
                    ArmourClass.uniqueUnit
                ]
            ),
            eCataphract: new Unit (
                UnitId.eCataphract, 38,
                "Elite Cataphract",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/b/bd/CataphractIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20200325131320",
                new Cost(70, 75, 0, 0),
                150, 12, 1.7, 0.68, 2, 1,
                [
                    new AttackBonus(ArmourClass.infantry, 12),
                    new AttackBonus(ArmourClass.condottiero, 10)
                ],
                [
                    ArmourClass.cavalry, // TODO: +16
                    ArmourClass.uniqueUnit
                ]
            ),
            eBerserk: new Unit (
                UnitId.eBerserk, 39,
                "Elite Berserk",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/BerserkIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230150427",
                new Cost(65, 25, 0, 0),
                62.5, 14, 2.0, 0.5, 2, 1, // TODO: Confirm this is the correct health
                [
                    new AttackBonus(ArmourClass.eagleWarrior, 3)
                ],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eMagyarHuszar: new Unit (
                UnitId.eMagyarHuszar, 40,
                "Elite Magyar Huszar",
                UnitType.cavalry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/5/5b/MagyarHuszarIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230140432",
                new Cost(80, 10, 0, 0),
                85, 10, 1.8, 0.68, 0, 2,
                [],
                [
                    ArmourClass.cavalry,
                    ArmourClass.uniqueUnit
                ]
            ),
            eKamayuk: new Unit (
                UnitId.eKamayuk, 41,
                "Elite Kamayuk",
                UnitType.infantry,
                "https://vignette.wikia.nocookie.net/ageofempires/images/8/85/KamayukIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230141856",
                new Cost(60, 30, 0, 0),
                80, 8, 2.0, 0.5, 1, 0,
                [
                    new AttackBonus(ArmourClass.warElephant, 20),
                    new AttackBonus(ArmourClass.cavalry, 12),
                    new AttackBonus(ArmourClass.camel, 10),
                    new AttackBonus(ArmourClass.mameluke, 1)
                ],
                [
                    ArmourClass.infantry,
                    ArmourClass.uniqueUnit
                ]
            ),
            villager: new Unit (
                UnitId.villager, 42,
                "Villager",
                UnitType.villager,
                "https://static.wikia.nocookie.net/ageofempires/images/f/fe/FEMALEVILLDE.jpg/revision/latest/scale-to-width-down/256?cb=20191201204928",
                // "https://static.wikia.nocookie.net/ageofempires/images/6/68/MaleVillDE.jpg/revision/latest/scale-to-width-down/256?cb=20191201204916",
                new Cost(50, 0, 0, 0),
                40, 3, 2.0, 0.64, 1, 2,
                [], []
            ),
            pikeman: new Unit (
                UnitId.pikeman, 43,
                "Pikeman",
                UnitType.infantry,
                "https://static.wikia.nocookie.net/ageofempires/images/a/a6/Aoe2-infantry-2-pikeman.png/revision/latest?cb=20200402184138",
                new Cost(35, 25, 0, 0),
                55, 4, 3.05, 0.5, 0, 0,
                [
                    new AttackBonus(ArmourClass.cavalry, 22),
                    new AttackBonus(ArmourClass.camel, 18),
                    new AttackBonus(ArmourClass.warElephant, 25),
                    new AttackBonus(ArmourClass.eagleWarrior, 1)
                ], 
                [
                    ArmourClass.infantry,
                    ArmourClass.spearman
                ]
            )
        }
    }
}