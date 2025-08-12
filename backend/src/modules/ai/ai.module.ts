import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    HttpModule,
  ],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService]
})
export class AiModule {}
