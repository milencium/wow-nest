import { BasicCharacter } from "./BasicCharacter";

export class DruidAlliance extends BasicCharacter {
    constructor() {
        super()
        this.precision = 0.8;
        this.damage = 32;
        this.strikesInRound = 1;
        this.fireBallCall = 0.5;
        this.health = 175;
    }
}
