import { Module } from '@nestjs/common';
import { SportCardService } from './sport-card.service';
import { SportCardController } from './sport-card.controller';
import { SportCardFactory } from 'infrastructure/sport-card/factory/SportCardFactory';
import { buildSportCardFactory } from 'infrastructure/sport-card/factory/BuildSportCardFactory';
import { PuppeteerService } from 'src/puppeteer-service/puppeteer-service.service';

@Module({
  controllers: [SportCardController],
  providers: [
    SportCardService,
    {
      provide: SportCardFactory,
      useFactory: () => buildSportCardFactory(),
    },
    PuppeteerService,
  ],
})
export class SportCardModule {}
