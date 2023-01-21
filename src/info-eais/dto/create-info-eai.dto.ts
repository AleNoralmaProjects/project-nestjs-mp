import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateInfoEaiDto {
  @IsString()
  @MaxLength(10)
  @MinLength(9)
  cod_eais: string;

  @IsString()
  parroquia: string;

  @IsString()
  canton: string;

  @IsString()
  provincia: string;

  @IsString()
  distrito: string;

  @IsString()
  zona: string;
}
