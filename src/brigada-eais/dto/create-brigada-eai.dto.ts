import { IsString, IsUUID } from 'class-validator';
import { Profesional } from '../../profesional/entities/profesional.entity';

export class CreateBrigadaEaiDto {
  @IsString()
  @IsUUID()
  eais: string;

  @IsString()
  @IsUUID()
  profesional: Profesional;
}
