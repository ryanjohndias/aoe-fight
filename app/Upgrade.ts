class Upgrade {
    readonly name: string // Currently unused
    readonly hp: number
    readonly atk: number
    readonly rof: number
    readonly ma: number
    readonly pa: number

    constructor(hp: number, atk: number, rof: number, ma: number, pa: number) {
        this.hp = hp
        this.atk = atk
        this.rof = rof
        this.ma = ma
        this.pa = pa
    }

    public dps() {
        return this.atk / this.rof
    }
}