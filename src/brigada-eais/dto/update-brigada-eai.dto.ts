import { PartialType } from '@nestjs/mapped-types';
import { CreateBrigadaEaiDto } from './create-brigada-eai.dto';

export class UpdateBrigadaEaiDto extends PartialType(CreateBrigadaEaiDto) {}
