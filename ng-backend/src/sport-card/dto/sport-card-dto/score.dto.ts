import { IsInt, Min } from 'class-validator';

export default class ScoreDto {
  @IsInt()
  @Min(0)
  homeScore: number;
  @IsInt()
  @Min(0)
  awayScore: number;
}
