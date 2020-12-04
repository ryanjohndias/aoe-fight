class CivData {

    readonly civs: Civ[]

    constructor(units: { [key: string]: Unit; }, upgrades: { [key: string]: Upgrade; }) {
        this.civs = [
            new Civ(10, "Aztecs", "Aztec",
                "https://vignette.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png/revision/latest?cb=20191107173129",
                [units.champion, units.condottiero, units.eliteEagleWarrior, units.eliteJaguarWarrior, units.xolotl],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [],
                {
                    infantry: [
                        { name: "Garland Wars", atk: 4, rof: 0, hp: 0, ma: 0, pa: 0 }
                    ]
                }
            ),
            new Civ(11, "Berbers", "Berber",
                "https://vignette.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png/revision/latest?cb=20191107173130",
                [units.cavalier, units.champion, units.condottiero, units.hussar, units.heavyCamel],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(12, "Britons", "British",
                "https://vignette.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest?cb=20191107173130",
                [units.cavalier, units.champion, units.condottiero, units.halbardier],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(13, "Bulgarians", "Bulgarian",
                "https://vignette.wikia.nocookie.net/ageofempires/images/c/ce/CivIcon-Bulgarians.png/revision/latest/scale-to-width-down/104?cb=20191107173130",
                [units.cavalier, units.condottiero, units.eDismountedKonnik, units.halbardier, units.eKonnik, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
                // TODO Stirrups, Bagains https://ageofempires.fandom.com/wiki/Bulgarians/Tree
            ),
            new Civ(14, "Byzantines", "Byzantine",
                "https://vignette.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png/revision/latest?cb=20191107173131",
                [units.champion, units.condottiero, units.eCataphract, units.halbardier, units.hussar, units.heavyCamel, units.paladin],
                [upgrades.forging, upgrades.ironCasting],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(15, "Burmese", "Burmese",
                "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png/revision/latest?cb=20191107173131",
                [units.cavalier, units.champion, units.condottiero, units.eBattleElephant, units.halbardier, units.hussar],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
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
            new Civ(16, "Celts", "Celtic",
                "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Celts.png/revision/latest?cb=20191107173132",
                [units.champion, units.condottiero, units.eWoadRaider, units.halbardier, units.hussar, units.paladin],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {infantry: []}
            ),
            new Civ(17, "Chinese", "Chinese",
                "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png/revision/latest?cb=20191107173132",
                [units.cavalier, units.champion, units.condottiero, units.halbardier, units.heavyCamel],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(18, "Cumans", "Cuman",
                "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png/revision/latest?cb=20191107173133",
                [units.camel, units.champion, units.condottiero, units.eSteppeLancer, units.halbardier, units.hussar, units.paladin],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(19, "Ethiopians", "Ethiopian",
                "https://vignette.wikia.nocookie.net/ageofempires/images/c/cb/CivIcon-Ethiopians.png/revision/latest?cb=20191107173133",
                [units.cavalier, units.condottiero, units.eShotel, units.halbardier, units.hussar, units.heavyCamel, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {infantry: []}
            ),
            new Civ(20, "Franks", "Frank",
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png/revision/latest?cb=2019110717323",
                [units.champion, units.condottiero, units.halbardier, units.paladin],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(21, "Goths", "Goth",
                "https://vignette.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png/revision/latest?cb=20191107173238",
                [units.cavalier, units.champion, units.condottiero, units.eliteHuskarl, units.halbardier, units.hussar],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {infantry: []}
            ),
            new Civ(22, "Huns", "Hun",
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/CivIcon-Huns.png/revision/latest?cb=20191107173238",
                [units.condottiero, units.halbardier, units.hussar, units.paladin, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(23, "Incas", "Incan",
                "https://vignette.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png/revision/latest?cb=20191107173239",
                [units.champion, units.condottiero, units.eliteEagleWarrior, units.eKamayuk, units.halbardier, units.xolotl],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [],
                {infantry: []}
            ),
            new Civ(24, "Indians", "Indian",
                "https://vignette.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png/revision/latest?cb=20191107173239",
                [units.champion, units.condottiero, units.halbardier, units.hussar, units.imperialCamel, units.knight],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {infantry: []}
            ),
            new Civ(25, "Italians", "Italian",
                "https://vignette.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png/revision/latest?cb=20191116050557",
                [units.cavalier, units.champion, units.condottiero, units.hussar],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {
                    infantry: [],
                    specificUnits: [
                        { name: "Pavise", atk: 0, rof: 0, hp: 0, ma: 1, pa: 1, units: [UnitId.condottiero] }
                    ]
                }
            ),
            new Civ(26, "Japanese", "Japanese",
                "https://vignette.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest?cb=20191107173240",
                [units.cavalier, units.champion, units.condottiero, units.eSamurai, units.halbardier],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {
                    infantry: [
                        { name: "Civ bonus", atk: 0, rof: 33, hp: 0, ma: 0, pa: 0 }
                    ]
                }
            ),
            new Civ(27, "Khmer", "Khmer",
                "https://vignette.wikia.nocookie.net/ageofempires/images/e/ec/CivIcon-Khmer.png/revision/latest?cb=20191107173240",
                [units.cavalier, units.condottiero, units.eBattleElephant, units.halbardier, units.hussar, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(28, "Koreans", "Korean",
                "https://vignette.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png/revision/latest?cb=20191107173241",
                [units.cavalier, units.champion, units.condottiero, units.halbardier, units.hussar],
                [upgrades.forging, upgrades.ironCasting],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {infantry: []}
            ),
            new Civ(29, "Lithuanians", "Lithuanian",
                "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png/revision/latest?cb=20191107173241",
                [units.champion, units.condottiero, units.eLeitis, units.halbardier, units.hussar, units.paladin],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(30, "Magyars", "Magyar",
                "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png/revision/latest?cb=20191107173242",
                [units.champion, units.condottiero, units.eMagyarHuszar, units.halbardier, units.hussar, units.paladin],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(31, "Malians", "Malian",
                "https://vignette.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png/revision/latest?cb=20191107173334",
                [units.cavalier, units.champion, units.condottiero, units.heavyCamel],
                [upgrades.forging, upgrades.ironCasting],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {
                    infantry: [
                        { name: "Civ bonus", atk: 0, rof: 0, hp: 0, ma: 0, pa: 3 }
                    ]
                }
            ),
            new Civ(32, "Malay", "Malay",
                "https://vignette.wikia.nocookie.net/ageofempires/images/c/c3/CivIcon-Malay.png/revision/latest?cb=20191107173334",
                [units.cavalier, units.condottiero, units.eBattleElephant, units.eKarambit, units.halbardier, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor],
                {infantry: []}
            ),
            new Civ(33, "Mayans", "Mayan",
                "https://vignette.wikia.nocookie.net/ageofempires/images/0/05/CivIcon-Mayans.png/revision/latest?cb=20191107173335",
                [units.condottiero, units.eliteEagleWarrior, units.halbardier, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [],
                {infantry: []}
            ),
            new Civ(34, "Mongols", "Mongol",
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png/revision/latest?cb=20191107173335",
                [units.cavalier, units.champion, units.condottiero, units.eSteppeLancer, units.hussar, units.heavyCamel],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {infantry: []}
            ),
            new Civ(35, "Persians", "Persian",
                "https://vignette.wikia.nocookie.net/ageofempires/images/a/ad/CivIcon-Persians.png/revision/latest?cb=20191107173335",
                [units.condottiero, units.eWarElephant, units.halbardier, units.hussar, units.heavyCamel, units.paladin, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(36, "Portuguese", "Portuguese",
                "https://vignette.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png/revision/latest?cb=20191107173336",
                [units.cavalier, units.champion, units.condottiero, units.halbardier],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(37, "Saracens", "Saracen",
                "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png/revision/latest?cb=20191107173336",
                [units.champion, units.condottiero, units.hussar, units.heavyCamel, units.knight],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(38, "Slavs", "Slavic",
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png/revision/latest?cb=20191107173337",
                [units.eBoyar, units.cavalier, units.champion, units.condottiero, units.halbardier, units.hussar],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(39, "Spanish", "Spanish",
                "https://vignette.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png/revision/latest?cb=20191107173337",
                [units.champion, units.condottiero, units.halbardier, units.hussar, units.paladin],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(40, "Tatars", "Tatar",
                "https://vignette.wikia.nocookie.net/ageofempires/images/f/f2/CivIcon-Tatars.png/revision/latest?cb=20191107173338",
                [units.cavalier, units.condottiero, units.eSteppeLancer, units.halbardier, units.hussar, units.heavyCamel, units.eKeshik, units.twoHandedSwordsman],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(41, "Teutons", "Teutonic",
                "https://vignette.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png/revision/latest?cb=20191107173408",
                [units.champion, units.condottiero, units.eliteTeutonicKnight, units.halbardier, units.paladin],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(42, "Turks", "Turkish",
                "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png/revision/latest?cb=20191107173409",
                [units.cavalier, units.champion, units.condottiero, units.hussar, units.heavyCamel],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(43, "Vietnamese", "Vietnamese",
                "https://vignette.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png/revision/latest?cb=20191107173409",
                [units.cavalier, units.champion, units.condottiero, units.eBattleElephant, units.halbardier],
                [upgrades.forging, upgrades.ironCasting],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor],
                {infantry: []}
            ),
            new Civ(44, "Vikings", "Viking",
                "https://vignette.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png/revision/latest?cb=20191107173410",
                [units.eBerserk, units.cavalier, units.champion, units.condottiero],
                [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace],
                [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor],
                [upgrades.scaleBardingArmor, upgrades.chainBardingArmor],
                {
                    infantry: [
                        { name: "Civ bonus", atk: 0, rof: 0, hp: 20, ma: 0, pa: 0 }
                    ]
                }
            )
        ]
    }
}