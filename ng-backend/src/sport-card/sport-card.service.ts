import { Injectable } from '@nestjs/common';
import { CardType } from '@model/sportcard/CardType';
import SportCard from '@model/sportcard/SportCard';
import { SportCardFactory } from 'infrastructure/sport-card/factory/SportCardFactory';
import { PuppeteerService } from 'src/puppeteer-service/puppeteer-service.service';

@Injectable()
export class SportCardService {
  constructor(
    private readonly factory: SportCardFactory,
    private readonly puppeteerService: PuppeteerService,
  ) {}
  async generate(
    cardType: CardType,
    sportCardData: SportCard,
  ): Promise<Buffer> {
    return this.factory
      .create(cardType)
      .generate(sportCardData, this.puppeteerService);
  }
}
