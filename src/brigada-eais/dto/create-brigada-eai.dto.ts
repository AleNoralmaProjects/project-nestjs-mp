import { IsString, IsUUID } from 'class-validator';
import { Profesional } from '../../profesional/entities/profesional.entity';
import { InfoEai } from '../../info-eais/entities/info-eai.entity';

export class CreateBrigadaEaiDto {
  @IsString()
  @IsUUID()
  eais: InfoEai;

  @IsString()
  @IsUUID()
  profesional: Profesional;
}
