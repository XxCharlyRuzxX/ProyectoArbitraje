import { Controller, Get, Res } from '@nestjs/common';
import express from 'express'; // Asegúrate de importar Response de express
import { SportCardService } from './sport-card.service';
import { CardType } from '@model/sportcard/CardType';
import { mockSportCard } from './dto/mock-sport-card';

@Controller('sport-card')
export class SportCardController {
  constructor(private readonly sportCardService: SportCardService) {}

  @Get('NG_CARD')
  async generateNggCard(@Res() res: express.Response): Promise<void> {
    const pdf = await this.sportCardService.generate(
      CardType.NG_CARD,
      mockSportCard,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="ng-card.pdf"',
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }
}
