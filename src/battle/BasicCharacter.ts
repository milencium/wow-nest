import { HttpException, HttpStatus } from "@nestjs/common"

export class BasicCharacter {
    public damage: number
    public precision: number
    public strikesInRound: number
    public fireBallCall: number
    public health: number
    public shotsLeft: number
    public targetIndex: number
    public outputResult1: string
    public outputResult2: string
    public outputLog: string
    public chance: number
    public hit: number

    public attack(opponentArmy: BasicCharacter[]): string {
        this.shotsLeft = this.strikesInRound
        while (this.shotsLeft > 0 && opponentArmy.length) {
            this.targetIndex = this.locate(opponentArmy);
            console.log(this.targetIndex)
            this.outputResult1 = this.strike(opponentArmy[this.targetIndex]);
            console.log(this.outputResult1)
            this.outputResult2 = this.removeHero(this.targetIndex, opponentArmy);
        }
        this.outputLog = this.outputResult1 + this.outputResult2;
        return this.outputLog
    }

    public locate(opponentArmy: BasicCharacter[]): number {
        return Math.round(Math.random() * opponentArmy.length - 1);
    }

    public strike(target: BasicCharacter): string {
        console.log(`this is target ${target}`)
        var result: string = ""
        if (target !== undefined) {
            this.chance = Math.round(Math.random() * 100) / 100;
            this.hit = this.chance <= this.fireBallCall ? this.damage * 2 : this.damage;
            target.health -= this.hit;
            result = `Hero striked with damage ${this.hit}`;
        }

        return result
    }

    public removeHero(targetIndex: number, opponentArmy: BasicCharacter[]): string {
        if (targetIndex >= opponentArmy.length) {
            throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
        }

        if (opponentArmy[targetIndex] !== undefined && opponentArmy[targetIndex].health <= 0) {
            console.log(`this is its health$ ${opponentArmy[targetIndex].health}`)
            opponentArmy.splice(targetIndex, 1)
            opponentArmy = opponentArmy.filter(n => n)
            console.log("Hero eliminated")
            return "Hero eliminated"
        }
        return ""
    }
}