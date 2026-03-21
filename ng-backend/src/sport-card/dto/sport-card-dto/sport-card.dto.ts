import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MatchInfoDto } from './match-info.dto';
import { RefereeCrewDto } from '../team-dto/referee-crew.dto';
import { TeamsheetDto } from '../team-dto/teamsheet.dto';

export class SportCardDto {
  @ValidateNested()
  @Type(() => RefereeCrewDto)
  refereeCrew: RefereeCrewDto;

  @ValidateNested()
  @Type(() => MatchInfoDto)
  matchInfo: MatchInfoDto;

  @ValidateNested()
  @Type(() => TeamsheetDto)
  homeTeam: TeamsheetDto;

  @ValidateNested()
  @Type(() => TeamsheetDto)
  awayTeam: TeamsheetDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  observations?: string[];
}
