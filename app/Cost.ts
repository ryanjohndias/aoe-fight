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

    static imageUrlFood = "https://vignette.wikia.nocookie.net/ageofempires/images/5/5f/Aoe2de_food.png/revision/latest/scale-to-width-down/16?cb=20200417075725"
    static imageUrlWood = "https://vignette.wikia.nocookie.net/ageofempires/images/8/84/Aoe2de_wood.png/revision/latest/scale-to-width-down/16?cb=20200417075938"
    static imageUrlGold = "https://vignette.wikia.nocookie.net/ageofempires/images/4/49/Aoe2de_gold.png/revision/latest/scale-to-width-down/16?cb=20200417080000"
}