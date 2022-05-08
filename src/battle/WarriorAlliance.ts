import { BasicCharacter } from "./BasicCharacter";

export class WarriorAlliance extends BasicCharacter {
    constructor() {
        super()
        this.precision = 0.08;
        this.damage = 32;
        this.strikesInRound = 15;
        this.fireBallCall = 0.05;
        this.health = 175;
    }
}
