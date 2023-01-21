import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoEaiDto } from './create-info-eai.dto';

export class UpdateInfoEaiDto extends PartialType(CreateInfoEaiDto) {}
