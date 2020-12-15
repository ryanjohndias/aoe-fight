
/**
 * Represents the combination of a civilisation and unit, by applying the civ's available upgrades and bonuses to the unit
 */
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
        const hpSpecial = civ.totalSpecialHPUpgrade(unit.type, unit.id)
        const hpTotal = unit.hp + (this.unit.hp * (hpSpecial/100)) + hpUpgrades

        // ATK modification
        const atkUpgrades = civ.totalMeleeAtkUpgrade(unit.type)
        const atkSpecial = civ.totalSpecialAtkUpgrade(unit.type, unit.id)
        const atkTotal = unit.atk + atkUpgrades + atkSpecial

        // ROF modification
        var rofSpecial = civ.totalSpecialROFUpgrade(unit.type, unit.id)
        const rofTotal = unit.rof * (1 - rofSpecial/100)

        // Armor modification
        const maUpgrades = civ.totalBlacksmithMAUpgrade(unit.type)
        const paUpgrades = civ.totalBlacksmithPAUpgrade(unit.type)
        const maSpecial = civ.totalSpecialMAUpgrade(unit.type, unit.id)
        const paSpecial = civ.totalSpecialPAUpgrade(unit.type, unit.id)
        const maTotal = unit.ma + maSpecial + maUpgrades
        const paTotal = unit.pa + paSpecial + paUpgrades

        this.upgrades = new Upgrade(hpUpgrades, atkUpgrades, 0, maUpgrades, paUpgrades)
        this.special = new Upgrade(hpSpecial, atkSpecial, rofSpecial, maSpecial, paSpecial)
        this.total = new Upgrade(hpTotal, atkTotal, rofTotal, maTotal, paTotal)
    }
}