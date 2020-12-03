class Cost {
    readonly food: number
    readonly gold: number
    readonly wood: number
    readonly stone: number

    constructor(f: number, g: number, w: number, s: number) {
        this.food = f;
        this.gold = g;
        this.wood = w;
        this.stone = s;
    }
}