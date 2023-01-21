import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { InfoEaisService } from './info-eais.service';
import { CreateInfoEaiDto } from './dto/create-info-eai.dto';
import { UpdateInfoEaiDto } from './dto/update-info-eai.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('info-eais')
export class InfoEaisController {
  constructor(private readonly infoEaisService: InfoEaisService) {}

  @Post('register')
  create(@Body() createInfoEaiDto: CreateInfoEaiDto) {
    return this.infoEaisService.create(createInfoEaiDto);
  }

  @Get('list')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.infoEaisService.findAll(paginationDto);
  }

  @Get('search/:term')
  findOne(@Param('term') term: string) {
    return this.infoEaisService.findOne(term);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInfoEaiDto: UpdateInfoEaiDto,
  ) {
    return this.infoEaisService.update(id, updateInfoEaiDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.infoEaisService.remove(id);
  }
}
