import { Controller, Get, Param, Post } from "@nestjs/common";
import { BattleService } from "./battle.service";

@Controller()
export class BattleController {
    constructor(private battleService: BattleService) { }


    @Get(":army1&:army2")
    battle(@Param() params) {
        console.log(params.army1)
        console.log(params.army2)
        //return this.battleService.battle();
        return this.battleService.battleStart(params.army1, params.army2)
    }
}