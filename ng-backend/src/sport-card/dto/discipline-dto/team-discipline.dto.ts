import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CardEventDto } from './card-event.dto';

export class TeamDisciplineDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardEventDto)
  yellowCards: CardEventDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardEventDto)
  redCards: CardEventDto[];
}
