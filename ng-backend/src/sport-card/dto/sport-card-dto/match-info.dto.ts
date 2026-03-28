import { IsString, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import ScoreDto from './score.dto';

export class MatchInfoDto {
  @IsString()
  competitionName: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  fieldName: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  firstHalfStart?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  secondHalfStart?: Date;

  @ValidateNested()
  @Type(() => ScoreDto)
  score: ScoreDto;
}
