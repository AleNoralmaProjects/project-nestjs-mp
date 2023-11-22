import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrigadaEaisService } from './brigada-eais.service';
import { CreateBrigadaEaiDto } from './dto/create-brigada-eai.dto';
import { UpdateBrigadaEaiDto } from './dto/update-brigada-eai.dto';

import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('brigada-eais')
export class BrigadaEaisController {
  constructor(private readonly brigadaEaisService: BrigadaEaisService) {}

  @Post('register')
  create(@Body() createBrigadaEaiDto: CreateBrigadaEaiDto) {
    return this.brigadaEaisService.create(createBrigadaEaiDto);
  }

  @Get('list')
  findAll() {
    return this.brigadaEaisService.findAll();
  }

  @Get('search/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.brigadaEaisService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrigadaEaiDto: UpdateBrigadaEaiDto,
  ) {
    return this.brigadaEaisService.update(id, updateBrigadaEaiDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.brigadaEaisService.remove(id);
  }
}
