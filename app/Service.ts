class AttackBonus {
    readonly armourClass: ArmourClass
    readonly value: number

    constructor(armourClass: ArmourClass, value: number) {
        this.armourClass = armourClass
        this.value = value
    }
}

class Service {

    private readonly unitData: UnitData
    private readonly civData: CivData

    constructor() {
        this.unitData = new UnitData()
        this.civData = new CivData(this.unitData.units, new UpgradeData().upgrades)
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