import { BasicCharacter } from "./BasicCharacter";

export class DruidHorde extends BasicCharacter {
    constructor() {
        super()
        this.precision = 0.4;
        this.damage = 32;
        this.strikesInRound = 1;
        this.fireBallCall = 0.2;
        this.health = 175;
    }
}
