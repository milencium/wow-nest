import { BasicCharacter } from "./BasicCharacter";

export class WarriorHorde extends BasicCharacter {
    constructor() {
        super()
        this.precision = 0.25;
        this.damage = 32;
        this.strikesInRound = 15;
        this.fireBallCall = 0.25;
        this.health = 175;
    }
}
