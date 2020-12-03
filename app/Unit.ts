class Unit {
    readonly id: UnitId
    readonly numericId: number
    readonly name: string
    readonly type: UnitType
    readonly img: string
    readonly cost: Cost
    readonly hp: number
    readonly atk: number
    readonly rof: number
    readonly ad: number
    readonly ma: number
    readonly pa: number
    readonly atkBonuses: AttackBonus[]
    readonly armourClasses: ArmourClass[]
    constructor(id: UnitId, numericId: number, name: string, type: UnitType, img: string, cost: Cost, hp: number,
        atk: number, rof: number, ad: number, ma: number, pa: number, atkBonuses: AttackBonus[], armourClasses: ArmourClass[]) {
        this.id = id
        this.numericId = numericId
        this.name = name
        this.type = type
        this.img = img
        this.cost = cost
        this.hp = hp
        this.atk = atk
        this.rof = rof
        this.ad = ad
        this.ma = ma
        this.pa = pa
        this.atkBonuses = atkBonuses
        this.armourClasses = armourClasses
    }

    /**
     * Damage output per second
     */
    public dps() {
        return this.atk / this.rof
    }
}