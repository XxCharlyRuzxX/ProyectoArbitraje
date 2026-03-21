import { IsString, IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerEntryDto } from '../players-dto/player-entry.dto';

export class CardEventDto {
  @ValidateNested()
  @Type(() => PlayerEntryDto)
  player: PlayerEntryDto;

  @IsString()
  reason: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  @Max(120)
  minute: number;
}
