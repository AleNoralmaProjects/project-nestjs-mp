import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesionService } from './profesion.service';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';

import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('profesion')
export class ProfesionController {
  constructor(private readonly profesionService: ProfesionService) {}

  @Post('register')
  create(@Body() createProfesionDto: CreateProfesionDto) {
    return this.profesionService.create(createProfesionDto);
  }

  @Get('list')
  findAll() {
    return this.profesionService.findAll();
  }

  @Get('search/:term')
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.profesionService.findOne(term);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfesionDto: UpdateProfesionDto,
  ) {
    return this.profesionService.update(id, updateProfesionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.profesionService.remove(id);
  }
}
