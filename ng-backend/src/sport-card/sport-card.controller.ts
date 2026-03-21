import { Controller, Post, Body, Res } from '@nestjs/common';
import express from 'express';
import { SportCardService } from './sport-card.service';
import { CardType } from '@model/sportcard/CardType';
import { SportCardDto } from './dto/sport-card-dto/sport-card.dto';
import { SportCardMapper } from './dto';
@Controller('sport-card')
export class SportCardController {
  constructor(private readonly sportCardService: SportCardService) {}

  @Post('NG_CARD')
  async generateNgCard(
    @Body() dto: SportCardDto,
    @Res() res: express.Response,
  ): Promise<void> {
    const sportCardData = SportCardMapper.toModel(dto);
    //console.log('DTO recibido:', JSON.stringify(dto, null, 2)); // ← agrega esto
    const pdf = await this.sportCardService.generate(
      CardType.NG_CARD,
      sportCardData,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="ng-card.pdf"',
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }
}
