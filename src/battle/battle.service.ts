import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BasicCharacter } from "./BasicCharacter";
import { DruidAlliance } from "./DruidAlliance";
import { DruidHorde } from "./DruidHorde";
import { WarriorAlliance } from "./WarriorAlliance";
import { WarriorHorde } from "./WarriorHorde";

@Injectable()
export class BattleService {
    constructor(private prisma: PrismaService) { }
    public battleArray: BasicCharacter[][]

    public battleStart(army1: number, army2: number): void {
        if (army1 <= 0 || army2 <= 0) {
            throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
        }
        this.summonArmies(army1, army2);
        this.battle();
    }

    private summonArmies(army1: number, army2: number): void {
        this.battleArray = []
        this.battleArray.push(this.spawnArmy1(army1))
        this.battleArray.push(this.spawnArmy2(army2))
    }

    private spawnArmy1(army: number): BasicCharacter[] {
        if (army <= 0) {
            throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
        }
        var result: BasicCharacter[] = [];
        for (var i = 0; i < army; i++) {
            var rand = Math.round(Math.random() * 125)
            switch (true) {
                case rand <= 50:
                    result.push(new DruidAlliance);
                    break;
                case rand <= 80:
                    result.push(new WarriorAlliance);
                    break;
            }
        }
        return result
    }
    private spawnArmy2(army: number): BasicCharacter[] {
        if (army <= 0) {
            throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
        }
        var result: BasicCharacter[] = [];
        for (var i = 0; i < army; i++) {
            var rand = Math.round(Math.random() * 125)
            switch (true) {
                case rand <= 50:
                    result.push(new DruidHorde);
                    break;
                case rand <= 80:
                    result.push(new WarriorHorde);
                    break;
            }
        }
        return result
    }
    async battle() {
        var log: string = "";
        var logResult: string = "";
        var turn: number = Math.floor((Math.random() * 2))
        while (this.battleArray[0].length > 0 && this.battleArray[1].length > 0) {
            var dontHaveAggroIndex: number = (turn + 1) % 2;
            var haveAggro: BasicCharacter[] = this.battleArray[turn];
            var dontHaveAggro: BasicCharacter[] = this.battleArray[dontHaveAggroIndex];
            console.log(`this is dontHaveAggro ${dontHaveAggro.length}`)
            console.log(`this is haveAggro ${haveAggro.length}`)
            for (var i = 0; i < haveAggro.length && dontHaveAggro.length > 0; i++) {
                log = haveAggro[i].attack(dontHaveAggro)
            }
            turn = dontHaveAggroIndex


        }
        logResult = this.battleArray[0].length > 0 ? "Alliance wins the battle" : "Horde wins the battle";
        console.log(this.battleArray[0].length)
        console.log(this.battleArray[1].length)
        console.log(`this is logResult: ${logResult}`)
        const resultDb = await this.prisma.result.create({
            data: {
                result: logResult
            }
        });
        return { logResult, resultDb }
    }
}