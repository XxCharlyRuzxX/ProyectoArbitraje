import { IsOptional, IsString } from 'class-validator';

export class RefereeCrewDto {
  @IsString()
  referee: string;

  @IsOptional()
  @IsString()
  assistant1: string;

  @IsOptional()
  @IsString()
  assistant2: string;

  @IsOptional()
  @IsString()
  fourthOfficial: string;
}
