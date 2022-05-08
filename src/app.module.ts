import { Module } from '@nestjs/common';
import { BattleModule } from './battle/battle.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BattleModule, PrismaModule],
})
export class AppModule { }
