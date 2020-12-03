class UpgradeData {

    readonly upgrades: { [key: string]: Upgrade; }

    constructor() {
        this.upgrades = {
            forging:            new Upgrade(0, 1, 0, 0, 0),
            ironCasting:        new Upgrade(0, 1, 0, 0, 0),
            blastFurnace:       new Upgrade(0, 2, 0, 0, 0),
            scaleMailArmor:     new Upgrade(0, 0, 0, 1, 1),
            chainMailArmor:     new Upgrade(0, 0, 0, 1, 1),
            plateMailArmor:     new Upgrade(0, 0, 0, 1, 2),
            scaleBardingArmor:  new Upgrade(0, 0, 0, 1, 1),
            chainBardingArmor:  new Upgrade(0, 0, 0, 1, 1),
            plateBardingArmor:  new Upgrade(0, 0, 0, 1, 2),
            bloodlines:         new Upgrade(20, 0, 0, 0, 0)
        }
    }

}