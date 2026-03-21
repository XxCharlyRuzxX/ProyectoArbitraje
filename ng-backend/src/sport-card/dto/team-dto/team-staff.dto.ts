import { IsString, IsArray, IsOptional } from 'class-validator';

export class TeamStaffDto {
  @IsString()
  coach: string;

  @IsOptional()
  @IsString()
  doctor?: string;

  @IsOptional()
  @IsString()
  fitnessCoach?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assistants?: string[];
}
