import {
  IsString,
  IsDate,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ScoreDto {
  @IsInt()
  @Min(0)
  homeScore: number;

  @IsInt()
  @Min(0)
  awayScore: number;
}

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
