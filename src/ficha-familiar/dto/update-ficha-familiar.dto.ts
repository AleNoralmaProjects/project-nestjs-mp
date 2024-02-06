import { PartialType } from '@nestjs/mapped-types';
import { CreateFichaFamiliarDto } from './create-ficha-familiar.dto';

export class UpdateFichaFamiliarDto extends PartialType(
  CreateFichaFamiliarDto,
) {}
