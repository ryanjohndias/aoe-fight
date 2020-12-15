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

    public totalSpecialHPUpgrade(unitType?: UnitType, unitId?: UnitId) {
        let hp = 0
        if (unitType == UnitType.infantry) {
            if (this.special.infantry != undefined)
                this.special.infantry.forEach((upgrade) => hp += upgrade.hp)
        } else if (unitType == UnitType.cavalry ) {
            if (this.special.cavalry != undefined)
                this.special.cavalry.forEach((upgrade) => hp += upgrade.hp)
        }
        if (unitId != undefined) {
            if (this.special.specificUnits != undefined) {
                this.special.specificUnits.forEach(
                    (upgrade) => {
                        if (upgrade.units.includes(unitId)) hp += upgrade.hp
                    } 
                )
            }
        }
        return hp
    }

    public totalSpecialROFUpgrade(unitType?: UnitType, unitId?: UnitId) {
        let rof = 0
        if (unitType == UnitType.infantry) {
            if (this.special.infantry != undefined)
                this.special.infantry.forEach((upgrade) => rof += upgrade.rof)
        } else if (unitType == UnitType.cavalry ) {
            if (this.special.cavalry != undefined)
                this.special.cavalry.forEach((upgrade) => rof += upgrade.rof)
        }
        if (unitId != undefined) {
            if (this.special.specificUnits != undefined) {
                this.special.specificUnits.forEach(
                    (upgrade) => {
                        if (upgrade.units.includes(unitId)) rof += upgrade.rof
                    } 
                )
            }
        }
        return rof
    }

    public totalMeleeAtkUpgrade(unitType?: UnitType) {
        // return this.meleeUpgrades.reduce(function(a, b) { return a + b.atk })
        let atk = 0
        this.meleeUpgrades.forEach((upgrade) => atk += upgrade.atk)
        if (unitType != UnitType.villager || this.id == 23)
            return atk
        else
            return 0
    }

    public totalSpecialAtkUpgrade(unitType?: UnitType, unitId?: UnitId) {
        let atk = 0
        if (unitType == UnitType.infantry) {
            if (this.special.infantry != undefined)
                this.special.infantry.forEach((upgrade) => atk += upgrade.atk)
        } else if (unitType == UnitType.cavalry ) {
            if (this.special.cavalry != undefined)
                this.special.cavalry.forEach((upgrade) => atk += upgrade.atk)
        }
        if (unitId != undefined) {
            if (this.special.specificUnits != undefined) {
                this.special.specificUnits.forEach(
                    (upgrade) => {
                        if (upgrade.units.includes(unitId)) atk += upgrade.atk
                    } 
                )
            }
        }
        return atk
    }

    public totalBlacksmithMAUpgrade(unitType: UnitType) {
        let ma = 0
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach((upgrade) => ma += upgrade.ma)
        } else if (unitType == UnitType.cavalry ) {
            this.cavUpgrades.forEach((upgrade) => ma += upgrade.ma)
        } else if (unitType == UnitType.villager && this.id == 23){
            this.infantryArmourUpgrades.forEach((upgrade) => ma += upgrade.ma)
        }
        return ma
    }

    public totalBlacksmithPAUpgrade(unitType: UnitType) {
        let pa = 0
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach((upgrade) => pa += upgrade.pa)
        } else if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach((upgrade) => pa += upgrade.pa)
        } else if (unitType == UnitType.villager && this.id == 23){
            this.infantryArmourUpgrades.forEach((upgrade) => pa += upgrade.pa)
        }
        return pa
    }
    
    public totalSpecialMAUpgrade(unitType?: UnitType, unitId?: UnitId) {
        let ma = 0
        if (unitType == UnitType.infantry) {
            if (this.special.infantry != undefined)
                this.special.infantry.forEach((upgrade) => ma += upgrade.ma)
        } else if (unitType == UnitType.cavalry ) {
            if (this.special.cavalry != undefined)
                this.special.cavalry.forEach((upgrade) => ma += upgrade.ma)
        }
        if (unitId != undefined) {
            if (this.special.specificUnits != undefined) {
                this.special.specificUnits.forEach(
                    (upgrade) => {
                        if (upgrade.units.includes(unitId)) ma += upgrade.ma
                    } 
                )
            }
        }
        return ma
    }

    public totalSpecialPAUpgrade(unitType?: UnitType, unitId?: UnitId) {
        let pa = 0
        if (unitType == UnitType.infantry) {
            if (this.special.infantry != undefined)
                this.special.infantry.forEach((upgrade) => pa += upgrade.pa)
        } else if (unitType == UnitType.cavalry ) {
            if (this.special.cavalry != undefined)
                this.special.cavalry.forEach((upgrade) => pa += upgrade.pa)
        }
        if (unitId != undefined) {
            if (this.special.specificUnits != undefined) {
                this.special.specificUnits.forEach(
                    (upgrade) => {
                        if (upgrade.units.includes(unitId)) pa += upgrade.pa
                    } 
                )
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