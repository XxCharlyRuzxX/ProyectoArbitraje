import { IsInt, IsString, IsArray, IsNumber, Min, Max } from 'class-validator';

export class PlayerEntryDto {
  @IsInt()
  @Min(0)
  @Max(99)
  jerseyNumber: number;

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Max(120, { each: true })
  goalMinutes: number[];
}
