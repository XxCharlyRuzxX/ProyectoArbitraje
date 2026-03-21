import {
  IsString,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SubstitutionDto } from './substitution.dto';
import { TeamStaffDto } from './team-staff.dto';
import { PlayerEntryDto } from '../players-dto/player-entry.dto';
import { TeamDisciplineDto } from '../discipline-dto/team-discipline.dto';

export class TeamsheetDto {
  @IsString()
  teamName: string;

  @ValidateNested()
  @Type(() => PlayerEntryDto)
  captain: PlayerEntryDto;

  @ValidateNested()
  @Type(() => TeamStaffDto)
  staff: TeamStaffDto;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(11)
  @ValidateNested({ each: true })
  @Type(() => PlayerEntryDto)
  players: PlayerEntryDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubstitutionDto)
  substitutions: SubstitutionDto[];

  @ValidateNested()
  @Type(() => TeamDisciplineDto)
  discipline: TeamDisciplineDto;
}
