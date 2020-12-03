class Civ {
    readonly id: number
    readonly name: string
    readonly adjective: string
    readonly image: string
    readonly units: Unit[]
    readonly meleeUpgrades: Upgrade[]
    readonly infantryArmourUpgrades: Upgrade[]
    readonly cavUpgrades: Upgrade[]
    readonly special: any

    constructor(id: number, name: string, adjective: string, image: string, units: Unit[],
        meleeUpgrades: Upgrade[], infantryArmourUpgrades: Upgrade[], cavUpgrades: Upgrade[], special: any) {
            this.id = id
            this.name = name
            this.adjective = adjective
            this.image = image
            this.units = units
            this.meleeUpgrades = meleeUpgrades
            this.infantryArmourUpgrades = infantryArmourUpgrades
            this.cavUpgrades = cavUpgrades
            this.special = special
    }

    public totalHPUpgrade(unitType: UnitType) {
        let hp = 0
        if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach((upgrade) => hp += upgrade.hp)
        }
        return hp
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

    public totalBlacksmithMAUpgrade(unitType: UnitType) {
        let ma = 0
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach((upgrade) => ma += upgrade.ma)
        } else if (unitType == UnitType.cavalry ) {
            this.cavUpgrades.forEach((upgrade) => ma += upgrade.ma)
        }
        return ma
    }

    public totalBlacksmithPAUpgrade(unitType: UnitType) {
        let pa = 0
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach((upgrade) => pa += upgrade.pa)
        } else if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach((upgrade) => pa += upgrade.pa)
        }
        return pa
    }
    
    public totalSpecialMAUpgrade(unitId: UnitId) {
        if (this.special.specificUnits == null) {
            return 0
        }

        let ma = 0
        let data = this.special.specificUnits
        for (let i = 0; i < data.length; i++) {
            let upgrade = data[i];
            if (this.contains(upgrade.units, unitId)) {
                ma += upgrade.ma
            }
        }
        return ma
    }

    public totalSpecialPAUpgrade(unitId: UnitId) {
        if (this.special.specificUnits == null) {
            return 0
        }

        let pa = 0
        let data = this.special.specificUnits
        for (let i = 0; i < data.length; i++) {
            let upgrade = data[i];
            if (this.contains(upgrade.units, unitId)) {
                pa += upgrade.pa
            }
        }
        return pa
    }

    public contains(a: Array<UnitId>, unitId: UnitId) {
        var i = a.length
        while (i--) {
           if (a[i] === unitId) {
               return true
           }
        }
        return false
    }
}