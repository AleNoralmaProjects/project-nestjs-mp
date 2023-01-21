import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { Profesion } from '../../profesion/entities/profesion.entity';

export class CreateProfesionalDto {
  //decoradores_ced
  @IsString()
  @IsUUID()
  profesion: Profesion;

  @IsString()
  role: string;

  @IsString()
  @MaxLength(10)
  @MinLength(9)
  cedula: string;

  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  @MaxLength(15)
  @MinLength(6)
  telefono: string;

  @IsString()
  user: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  password: string;
}
