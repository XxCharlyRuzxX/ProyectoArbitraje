import { IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerEntryDto } from '../players-dto/player-entry.dto';

export class SubstitutionDto {
  @ValidateNested()
  @Type(() => PlayerEntryDto)
  playerIn: PlayerEntryDto;

  @ValidateNested()
  @Type(() => PlayerEntryDto)
  playerOut: PlayerEntryDto;

  @IsInt()
  @Min(0)
  @Max(120)
  minute: number;
}
